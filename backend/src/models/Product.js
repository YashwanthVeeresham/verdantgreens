import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    sku: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true 
    },
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    regional: { 
      type: String, 
      required: true,
      trim: true 
    },
    tagline: { 
      type: String, 
      required: true 
    },
    category: {
      type: String,
      enum: ['bowls', 'greens', 'nutty', 'vitality', 'peppery', 'tangy'],
      required: true,
    },
    price: { 
      type: Number, 
      required: true,
      min: 0 
    },
    unit: { 
      type: String, 
      default: 'Living Punnet (80g)' 
    },
    harvestDays: { 
      type: Number, 
      default: 7 
    },
    flavor: { 
      type: String 
    },
    biomarker: { 
      type: String 
    },
    idealFor: { 
      type: String 
    },
    badge: { 
      type: String 
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
  },
  { 
    timestamps: true 
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;