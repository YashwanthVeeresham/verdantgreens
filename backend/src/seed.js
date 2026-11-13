import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ATLAS_URI = 'mongodb+srv://verdant_admin:Verdant123@cluster0.mbgarwi.mongodb.net/verdant_hyderabad?retryWrites=true&w=majority';

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

const products = [
  {
    sku: 'bowl-hyderabad-chaat',
    name: 'Nawabi Sprouted Moong & Chana Chaat Bowl',
    regional: 'అంకూర్ చాట్ బౌల్ (Ready-to-Eat)',
    tagline: 'Germinated desi moong & kala chana tossed with diced cucumbers, pomegranate, mint & cold-pressed lime zest',
    category: 'bowls',
    price: 139,
    unit: 'Single Serving Bowl (280g)',
    harvestDays: 1,
    flavor: 'Zesty, tangy, crunchy with fresh jeera punch',
    biomarker: '14g Bio-Protein • High Prebiotic Fiber',
    idealFor: 'Light breakfast, mid-day office snack, zero bloating',
    badge: 'Chef Special Bowl'
  },
  {
    sku: 'bowl-gongura-power',
    name: 'Deccani Gongura & Sprout Power Bowl',
    regional: 'గోంగూర మొలకల సలాడ్ బౌల్ (High Iron)',
    tagline: 'Living sprouts tossed with fresh Gongura micro leaves, roasted flaxseeds, peanut crumble, and ginger-lime glaze',
    category: 'bowls',
    price: 149,
    unit: 'Single Serving Bowl (280g)',
    harvestDays: 1,
    flavor: 'Signature Hyderabadi tartness balanced by nutty crunch',
    biomarker: '12g Protein • 35% Daily Plant Iron',
    idealFor: 'Anemia recovery, blood oxygenation, gut vitality',
    badge: 'Hyderabad Favorite'
  },
  {
    sku: 'bowl-athlete-recovery',
    name: 'Gym Pro Sprout & Paneer Salad Bowl',
    regional: 'హై-ప్రోటీన్ రికవరీ బౌల్ (Post-Workout)',
    tagline: 'Sprouted green gram, low-fat fresh malai paneer cubes, sunflower microgreens, pumpkin seeds, and black pepper dressing',
    category: 'bowls',
    price: 169,
    unit: 'Single Serving Bowl (280g)',
    harvestDays: 1,
    flavor: 'Creamy, savory, crisp and pepper-spiced',
    biomarker: '22g Lean Protein • Rich in BCAAs & Magnesium',
    idealFor: 'Post-gym workout fuel, lean muscle synthesis',
    badge: 'High Protein'
  },
  {
    sku: 'bowl-ayur-detox',
    name: 'Sanjeevani Tri-Dosha Alkalizing Bowl',
    regional: 'ఆయుర్వేద డీటాక్స్ బౌల్ (Light Agni)',
    tagline: 'Tender sprouted moth beans, wheatgrass-infused mint chutney, grated carrot, amaranth microgreens, and rock salt',
    category: 'bowls',
    price: 129,
    unit: 'Single Serving Bowl (280g)',
    harvestDays: 1,
    flavor: 'Earthy, refreshing, cooling mint & herbal notes',
    biomarker: 'Live Chlorophyll & SOD Digestive Enzymes',
    idealFor: 'Morning detox thali, fasting cleanse, light dinners',
    badge: 'Ayurvedic Cleanse'
  },
  {
    sku: 'gongura-shoots',
    name: 'Gongura / Roselle Microgreens',
    regional: 'పుంటికూర (Punti Koora / Gongura)',
    tagline: 'Distinct tangy Deccani sour kick packed with bioavailable iron',
    category: 'greens',
    price: 119,
    unit: 'Living Punnet (80g)',
    harvestDays: 8,
    flavor: 'Signature tangy, sharp citrus-berry tartness',
    biomarker: 'Vitamin C, Anthocyanins & Plant Iron',
    idealFor: 'Pappu, dal finish, salads, blood purification',
    badge: 'Hyderabad Special'
  },
  {
    sku: 'kasuri-methi',
    name: 'Kasuri Methi Microgreens',
    regional: 'మెంతికూర (Menti Koora)',
    tagline: 'Young fenugreek greens with warm aromatic bitters',
    category: 'greens',
    price: 109,
    unit: 'Living Punnet (80g)',
    harvestDays: 6,
    flavor: 'Pleasant herbal bitter, sweet nutty finish',
    biomarker: 'Trigonelline & 4-hydroxyisoleucine',
    idealFor: 'Glycemic blood sugar regulation, gut Agni',
    badge: 'Diabetic Friendly'
  },
  {
    sku: 'desi-moong-chana',
    name: 'Desi Pacha Pesalu & Nalla Senagalu Sprouts',
    regional: 'అంకూర్ మొలకలు (Living Sprouts Tray)',
    tagline: 'Slow-soaked sprouted green gram & black chickpeas for kitchen cooking',
    category: 'greens',
    price: 89,
    unit: 'Living Punnet (120g)',
    harvestDays: 3,
    flavor: 'Crisp, sweet, fresh earthy crunch',
    biomarker: 'Bioavailable Plant Protein, Folate & Active Enzymes',
    idealFor: 'Morning fitness bowl, cooking curries, high-protein snack',
    badge: 'Everyday Essential'
  },
  {
    sku: 'koyagura-amaranth',
    name: 'Lal Chaulai / Red Koyagura Microgreens',
    regional: 'ఎర్ర తోటకూర / కోయగూర (Erra Thotakura)',
    tagline: 'Jewel-red baby leaves harvested with living roots',
    category: 'greens',
    price: 129,
    unit: 'Living Punnet (80g)',
    harvestDays: 10,
    flavor: 'Mildly sweet, mineral-dense beetroot nuance',
    biomarker: 'Betalain pigments, Folate & Calcium',
    idealFor: 'Hemoglobin support, post-workout recovery',
    badge: 'Iron Booster'
  },
  {
    sku: 'desi-avalu-mustard',
    name: 'Deccani Avalu Mustard Microgreens',
    regional: 'ఆవాల మైక్రోగ్రీన్స్ (Mustard Shoots)',
    tagline: 'Spicy mustard leaves delivering a sinus-clearing wasabi zest',
    category: 'greens',
    price: 99,
    unit: 'Living Punnet (80g)',
    harvestDays: 5,
    flavor: 'Pungent, zesty, warming mustard kick',
    biomarker: 'Sinigrin, Glucosinolates & Vitamin A',
    idealFor: 'Metabolic ignition, respiratory clarity, rasam toppings',
    badge: 'Zesty Kick'
  },
  {
    sku: 'godhuma-wheatgrass',
    name: 'Sanjeevani Sweet Wheatgrass',
    regional: 'గోధుమ గడ్డి (Godhuma Gaddi)',
    tagline: 'Living tray cut on harvest morning for daily prana juicing',
    category: 'greens',
    price: 149,
    unit: 'Living Tray (100g)',
    harvestDays: 8,
    flavor: 'Sweet, intense concentrated green nectar',
    biomarker: 'Pure Chlorophyll, Superoxide Dismutase (SOD)',
    idealFor: 'Morning detox shot, cellular alkalization',
    badge: 'Detox Elixir'
  }
];

async function seedData() {
  try {
    const uri = process.env.MONGO_URI || ATLAS_URI;
    console.log('Connecting to MongoDB Atlas...');
    
    // Explicit TLS options to bypass OpenSSL alert 80 on Windows
    await mongoose.connect(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 7000,
    });
    
    console.log('Connected to MongoDB Atlas!');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Hyderabad Greens & Sprouts Bowls Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error.message);
    process.exit(1);
  }
}

seedData();