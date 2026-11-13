import { unsplash as u } from '../utils/unsplash';

const A = '1540420773420-3366772f4999';
const B = '1512621776951-a57141f2eefd';
const C = '1505253758473-96b3d5ebcd96';
const D = '1550989460-0adf9ea622e2';
const E = '1546069901-ba9599a7e63c';
const F = '1592417817098-8f3d6910985b';
const G = '1540189549336-e6e99c3679fe';
const H = '1576045057995-568f588f82fb';
const I = '1594282486552-05b4d80fbb9f';
const J = '1508615039623-a25605d2b022';

export const PHOTO = { A, B, C, D, E, F, G, H, I, J };

export const PRODUCT_GALLERY_IDS = {
  'bowl-hyderabad-chaat': [A, B, C],
  'bowl-gongura-power': [B, D, A],
  'bowl-athlete-recovery': [E, A, F],
  'bowl-ayur-detox': [G, H, I],
  'gongura-shoots': [D, I, B],
  'kasuri-methi': [F, D, J],
  'desi-moong-chana': [C, A, E],
  'koyagura-amaranth': [I, D, G],
  'desi-avalu-mustard': [J, F, H],
  'godhuma-wheatgrass': [H, G, D]
};

export const DEFAULT_GALLERY_IDS = [A, B, D];

const gallery = (sku) => PRODUCT_GALLERY_IDS[sku].map((id) => u(id));

const product = (sku, fields) => ({
  id: sku,
  _id: sku,
  sku,
  image: gallery(sku)[0],
  ...fields
});

export const FALLBACK_PRODUCTS = [
  product('bowl-hyderabad-chaat', {
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
    badge: 'Chef Special'
  }),
  product('bowl-gongura-power', {
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
    badge: 'Hyd Favorite'
  }),
  product('bowl-athlete-recovery', {
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
    badge: '22g Protein'
  }),
  product('bowl-ayur-detox', {
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
    badge: 'Ayur Cleanse'
  }),
  product('gongura-shoots', {
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
    badge: 'Deccan Special'
  }),
  product('kasuri-methi', {
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
    badge: 'Glycemic Care'
  }),
  product('desi-moong-chana', {
    name: 'Desi Pacha Pesalu & Nalla Senagalu Sprouts',
    regional: 'అంకూర్ మొలకలు (Living Sprouts Tray)',
    tagline: 'Slow-soaked sprouted green gram & black chickpeas for kitchen cooking',
    category: 'greens',
    price: 89,
    unit: 'Living Sprouts Tray (120g)',
    harvestDays: 3,
    flavor: 'Crisp, sweet, fresh earthy crunch',
    biomarker: 'Bioavailable Plant Protein, Folate & Active Enzymes',
    idealFor: 'Morning fitness bowl, cooking curries, high-protein snack',
    badge: 'Daily Essential'
  }),
  product('koyagura-amaranth', {
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
  }),
  product('desi-avalu-mustard', {
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
  }),
  product('godhuma-wheatgrass', {
    name: 'Sanjeevani Sweet Wheatgrass',
    regional: 'గోధుమ గడ్డి (Godhuma Gaddi)',
    tagline: 'Living tray cut on harvest morning for daily prana juicing',
    category: 'greens',
    price: 149,
    unit: 'Living Root Tray (100g)',
    harvestDays: 8,
    flavor: 'Sweet, intense concentrated green nectar',
    biomarker: 'Pure Chlorophyll, Superoxide Dismutase (SOD)',
    idealFor: 'Morning detox shot, cellular alkalization',
    badge: 'Detox Elixir'
  })
];

export const POPULAR_CATEGORIES = [
  { id: 'all', label: 'All Harvest', count: '10 Items', bg: 'bg-[#E9F5EC]', img: u(A, 200) },
  { id: 'bowls', label: 'Sprout Bowls', count: '4 Bowls', bg: 'bg-[#FCECE3]', img: u(B, 200) },
  { id: 'greens', label: 'Microgreens', count: '6 Varieties', bg: 'bg-[#E6F1F5]', img: u(D, 200) },
  { id: 'protein', label: 'High Protein', count: '14g–22g Protein', bg: 'bg-[#F5E8EC]', img: u(E, 200) },
  { id: 'detox', label: 'Detox & Iron', count: 'Chlorophyll Rich', bg: 'bg-[#EFEAF8]', img: u(H, 200) },
  { id: 'sprouts', label: 'Living Trays', count: 'Root-Intact', bg: 'bg-[#F9F3DF]', img: u(C, 200) }
];

export const BEST_SELLER_PILLS = [
  { id: 'all', label: 'All Harvest' },
  { id: 'bowls', label: 'Sprouts Bowls' },
  { id: 'greens', label: 'Microgreens' },
  { id: 'protein', label: 'High Protein' },
  { id: 'detox', label: 'Detox' }
];

export const HEALTH_GOALS = {
  detox: {
    title: 'Cellular Detox & Blood Cleansing',
    description: 'Traditional Deccani botanicals supporting liver bile flow and prana vitality.',
    recommended: ['godhuma-wheatgrass', 'koyagura-amaranth'],
    highlight: 'Wheatgrass and Amaranth provide living chlorophyll and bioavailable iron for cellular purification.'
  },
  sugar: {
    title: 'Glycemic Support & Metabolism',
    description: 'Slows carbohydrate digestion and stabilizes post-meal glucose spikes naturally.',
    recommended: ['kasuri-methi', 'bowl-hyderabad-chaat'],
    highlight: 'Fenugreek microgreens release natural trigonelline to stabilize insulin sensitivity.'
  },
  gut: {
    title: 'Digestive Agni & Gut Microbiome',
    description: 'Active raw plant enzymes that digest bloat and feed healthy enteric flora.',
    recommended: ['bowl-gongura-power', 'desi-moong-chana'],
    highlight: 'Sprouted Moong and raw Roselle greens stimulate gastric enzymes without acid reflux.'
  },
  recovery: {
    title: 'Athletic Muscle Recovery & Protein',
    description: 'Rich in easily absorbable vegan amino acids, BCAAs, and natural electrolytes.',
    recommended: ['bowl-athlete-recovery', 'koyagura-amaranth'],
    highlight: 'Provides 22g protein per bowl along with cellular potassium to speed muscle recovery.'
  }
};

export const GROWTH_STAGES = [
  {
    tab: 'Day 1-2 (Awakening)',
    image: u(C, 1000),
    alt: 'Seed Awakening',
    title: 'Stage 1: Seed Imbibition & Phytic Acid Breakdown',
    body: 'Seeds are washed in purified RO water. Water penetrates the outer seed coat, inactivating digestive inhibitors (phytates) and releasing active amylases and proteases.',
    facts: [['Light', 'Total Darkness'], ['Water', 'Triple RO Filtered'], ['Bioactivity', 'Phytate Neutralization']]
  },
  {
    tab: 'Day 3-5 (Living Sprout)',
    image: u(A, 1000),
    alt: 'Living Sprout Stage',
    title: 'Stage 2: The Living Sprout Stage (Pacha Pesalu & Chana)',
    body: 'Consumed whole including tender root tails and germinated seed hulls. Offers peak concentration of bioavailable amino acids and living digestive enzymes.',
    facts: [['Harvest Unit', 'Whole Organism'], ['Enzymes', 'Peak Bioavailability'], ['Texture', 'Tender, Fresh Crunch']]
  },
  {
    tab: 'Day 7-10 (Microgreen)',
    image: u(D, 1000),
    alt: 'Microgreen Photosynthesis',
    title: 'Stage 3: Microgreen Photosynthesis (Methi & Gongura)',
    body: 'Cotyledon seed leaves unfold under full-spectrum indoor agricultural LEDs. Chlorophyll and carotenoid biosynthesis surge to peak levels.',
    facts: [['Light Cycle', '16 hrs Full Spectrum'], ['Chlorophyll', 'Maximum Density'], ['Format', 'Living Root Tray']]
  },
  {
    tab: 'Day 12-14 (True Leaf)',
    image: u(I, 1000),
    alt: 'True Leaf Maturity',
    title: 'Stage 4: True Leaf Maturity (Avalu & Koyagura)',
    body: 'Complex aromatic glucosinolates and crimson betalain pigments emerge, creating bold culinary flavor and strong cellular defense compounds.',
    facts: [['Harvest Time', 'Day 10 - 12'], ['Flavor', 'Potent & Tangy'], ['Micronutrients', 'Vitamin C, K1, Folate']]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Ananya Reddy',
    locality: 'Jubilee Hills',
    role: 'Weekly Pro Box Subscriber',
    rating: 5,
    productSku: 'bowl-gongura-power',
    productName: 'Deccani Gongura & Sprout Power Bowl',
    comment:
      'Delivered at 7:10 AM sharp every morning. The Gongura microgreens have an authentic tangy punch that pairs brilliantly with the sprouted moong and roasted peanut crumble—zero afternoon heaviness.',
    date: '2 days ago',
    featured: true
  },
  {
    id: 'rev-2',
    name: 'Karthik Varma',
    locality: 'Gachibowli',
    role: 'Morning Runner & Fitness Coach',
    rating: 5,
    productSku: 'bowl-athlete-recovery',
    productName: 'Gym Pro Sprout & Paneer Salad Bowl',
    comment:
      '22g clean protein right after my KBR Park run. Fresh malai paneer cubes and crisp sunflower shoots beat any protein shake.',
    date: '4 days ago',
    featured: false
  },
  {
    id: 'rev-3',
    name: 'Dr. Meenakshi Rao',
    locality: 'Banjara Hills',
    role: 'Clinical Nutritionist',
    rating: 5,
    productSku: 'kasuri-methi',
    productName: 'Kasuri Methi Microgreens',
    comment:
      'Living root trays stay crisp in the fridge for a full week. I recommend their Kasuri Methi and Wheatgrass trays to clients managing post-meal glucose spikes.',
    date: '1 week ago',
    featured: false
  },
  {
    id: 'rev-4',
    name: 'Siddharth Nair',
    locality: 'Kondapur',
    role: 'Product Designer • Hitec City',
    rating: 5,
    productSku: 'bowl-hyderabad-chaat',
    productName: 'Nawabi Sprouted Moong & Chana Chaat Bowl',
    comment:
      'Best desk breakfast in Hyderabad. Zero bloating, cold-pressed lime dressing tastes freshly squeezed, and the sprouts are genuinely crunchy.',
    date: '1 week ago',
    featured: false
  }
];
