import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export const createOrder = async (req, res) => {
  try {
    const { customer, items, coupon, deliverySlot, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart cannot be empty' });
    }

    let subtotal = 0;
    const resolvedItems = [];

    for (const item of items) {
      if (item.id && String(item.id).startsWith('box-')) {
        subtotal += Number(item.price) * item.qty;
        resolvedItems.push({
          name: item.name,
          price: item.price,
          qty: item.qty,
        });
      } else {
        let product = null;
        if (item.id && item.id.match(/^[0-9a-fA-F]{24}$/)) {
          product = await Product.findById(item.id);
        } else if (item.id) {
          product = await Product.findOne({ sku: item.id });
        }

        const price = product ? product.price : (item.price || 99);
        const name = product ? product.name : (item.name || 'Microgreens');

        subtotal += price * item.qty;
        resolvedItems.push({
          product: product ? product._id : undefined,
          name,
          price,
          qty: item.qty,
        });
      }
    }

    let discount = 0;
    let couponApplied = null;
    if (coupon && coupon.toUpperCase() === 'HYD15') {
      discount = Math.round(subtotal * 0.15);
      couponApplied = 'HYD15';
    }

    const shippingFee = subtotal > 399 ? 0 : 49;
    const finalAmount = subtotal - discount + shippingFee;

    const newOrder = new Order({
      customer,
      items: resolvedItems,
      deliverySlot: deliverySlot || 'morning_6_30_to_9_00',
      subtotal,
      discount,
      shippingFee,
      finalAmount,
      couponApplied,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'cod' : 'pending',
    });

    let rzpOrder = null;
    if (paymentMethod === 'upi' || paymentMethod === 'card') {
      try {
        rzpOrder = await razorpay.orders.create({
          amount: finalAmount * 100,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        });
        newOrder.razorpayOrderId = rzpOrder.id;
      } catch (err) {
        console.warn('Razorpay order initialization skipped/failed:', err.message);
      }
    }

    await newOrder.save();

    return res.status(201).json({
      success: true,
      orderId: newOrder._id,
      finalAmount,
      currency: 'INR',
      razorpayOrder: rzpOrder,
      message: 'Harvest scheduled for delivery between 6:30 AM - 9:00 AM in Hyderabad',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
      });

      return res.status(200).json({ success: true, message: 'Payment confirmed via UPI' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
