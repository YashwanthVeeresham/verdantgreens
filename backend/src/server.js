import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const ATLAS_URI = 'mongodb+srv://verdant_admin:Verdant123@cluster0.mbgarwi.mongodb.net/verdant_hyderabad?retryWrites=true&w=majority';
const MONGO_URI = process.env.MONGO_URI || ATLAS_URI;

// --- MONGODB CONNECTION WITH TLS WORKAROUND ---
mongoose
  .connect(MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true, // Resolves OpenSSL SSL alert number 80 on Windows
    serverSelectionTimeoutMS: 7000,
  })
  .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

// --- SCHEMAS & MODELS ---

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    regional: { type: String, required: true },
    tagline: { type: String, required: true },
    category: {
      type: String,
      enum: ['bowls', 'greens', 'nutty', 'vitality', 'peppery', 'tangy'],
      required: true,
    },
    price: { type: Number, required: true },
    unit: { type: String, default: 'Living Punnet (80g)' },
    harvestDays: { type: Number, default: 7 },
    flavor: { type: String },
    biomarker: { type: String },
    idealFor: { type: String },
    badge: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Resilient Order Schema: product accepts SKU strings or ObjectIds without crashing
const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, default: 'Guest Customer' },
      phone: { type: String, default: 'Not Provided' },
      address: {
        street: { type: String, default: '' },
        locality: { type: String, default: 'Hyderabad' },
        pincode: { type: String, default: '500032' },
      },
    },
    items: [
      {
        product: { type: String }, // String prevents CastError
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
    deliverySlot: { type: String, default: 'morning_6_30_to_9_00' },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    couponApplied: { type: String, default: null },
    paymentMethod: { type: String, default: 'upi' },
    paymentStatus: { type: String, default: 'pending' },
    orderStatus: { type: String, default: 'harvest_scheduled' },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// --- DB READYSTATE CHECK MIDDLEWARE ---
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('Atlas connection pending or failed. Current readyState:', mongoose.connection.readyState);
    return res.status(503).json({
      success: false,
      message: 'MongoDB Atlas is connecting or unreachable. Please verify Network Access in Atlas.',
    });
  }
  next();
};

// --- ROUTES ---

// 1. Get products (with optional ?category= filter)
app.get('/api/products', checkDbConnection, async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isAvailable: true };
    if (category && category !== 'all') {
      filter.category = category;
    }
    const items = await Product.find(filter);
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    console.error('GET /api/products error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Check local Hyderabad delivery area
const HYDERABAD_HUBS = {
  '500032': 'Gachibowli',
  '500081': 'Hitec City / Madhapur',
  '500033': 'Jubilee Hills',
  '500034': 'Banjara Hills',
  '500084': 'Kondapur',
  '500072': 'Kukatpally',
  '500003': 'Secunderabad',
};

app.get('/api/delivery/check-pincode/:pincode', (req, res) => {
  const hub = HYDERABAD_HUBS[req.params.pincode];
  if (hub) {
    return res.json({
      serviceable: true,
      hub,
      slot: 'Morning 6:30 AM – 9:00 AM Daily',
    });
  }
  return res.json({
    serviceable: false,
    message: 'Currently serving core Hyderabad metro zones.',
  });
});

// 3. Checkout and place order
app.post('/api/orders/checkout', checkDbConnection, async (req, res) => {
  try {
    const { customer, items, coupon, deliverySlot, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart cannot be empty' });
    }

    let subtotal = 0;
    const resolvedItems = [];

    for (const item of items) {
      const price = Number(item.price) || 0;
      const qty = Math.max(1, Number(item.qty) || 1);
      subtotal += price * qty;
      resolvedItems.push({
        product: String(item.product || item.id || item._id || 'item'),
        name: String(item.name || 'Harvest Item'),
        price,
        qty,
      });
    }

    let discount = 0;
    let couponApplied = null;
    if (coupon && typeof coupon === 'string' && coupon.trim().toUpperCase() === 'HYD15') {
      discount = Math.round(subtotal * 0.15);
      couponApplied = 'HYD15';
    }

    const shippingFee = subtotal > 399 ? 0 : 49;
    const finalAmount = Math.max(0, subtotal - discount + shippingFee);

    const safeCustomer = {
      name: customer?.name || 'Customer',
      phone: customer?.phone || 'Not Provided',
      address: {
        street: customer?.address?.street || 'Hyderabad',
        locality: customer?.address?.locality || 'Hyderabad',
        pincode: customer?.address?.pincode || '500032',
      },
    };

    const newOrder = new Order({
      customer: safeCustomer,
      items: resolvedItems,
      deliverySlot: deliverySlot || 'morning_6_30_to_9_00',
      subtotal,
      discount,
      shippingFee,
      finalAmount,
      couponApplied,
      paymentMethod: paymentMethod || 'upi',
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      orderId: newOrder._id,
      finalAmount,
      message: 'Harvest scheduled for delivery between 6:30 AM - 9:00 AM in Hyderabad',
    });
  } catch (err) {
    console.error('POST /api/orders/checkout error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Fetch all orders (for the orders view tab)
app.get('/api/orders', checkDbConnection, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error('GET /api/orders error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Add '0.0.0.0' here so Render's proxy can route traffic to your app:
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Verdant Hyderabad API running on port ${PORT}`);
});