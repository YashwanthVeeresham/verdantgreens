import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: {
        street: { type: String, required: true },
        locality: {
          type: String,
          required: true,
          enum: [
            'Gachibowli',
            'Hitec City',
            'Jubilee Hills',
            'Banjara Hills',
            'Madhapur',
            'Kondapur',
            'Kukatpally',
            'Secunderabad',
          ],
        },
        pincode: { type: String, required: true },
      },
    },
    items: [orderItemSchema],
    deliverySlot: {
      type: String,
      enum: ['morning_6_30_to_9_00', 'evening_5_00_to_7_00'],
      default: 'morning_6_30_to_9_00',
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    couponApplied: { type: String, default: null },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cod'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'card', 'cod'],
      default: 'upi',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    orderStatus: {
      type: String,
      enum: ['harvest_scheduled', 'snipped_and_packed', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'harvest_scheduled',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
