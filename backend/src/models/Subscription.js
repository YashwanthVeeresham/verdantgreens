import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      locality: { type: String, required: true },
      address: { type: String, required: true },
    },
    tier: {
      type: String,
      enum: ['petite', 'pro', 'chef'],
      required: true,
    },
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly'],
      required: true,
    },
    selectedGreens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cyclePrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },
    nextDeliveryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Subscription', subscriptionSchema);
