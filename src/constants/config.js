// Change this (or read it from your bundler's env) for staging/production.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const PROFILE_STORAGE_KEY = 'verdant_user_profile';

export const LOCALITIES = [
  'Gachibowli',
  'Hitec City',
  'Jubilee Hills',
  'Banjara Hills',
  'Madhapur',
  'Kondapur',
  'Kukatpally',
  'Secunderabad'
];

export const BOX_CAPACITIES = {
  petite: { count: 3, price: 349, name: 'Hyderabad Small Family Box' },
  pro: { count: 5, price: 549, name: 'Ayur-Vitality Pro Box' },
  chef: { count: 8, price: 799, name: 'Gourmet Kitchen Reserve' }
};

export const BOX_FREQUENCY_DISCOUNT = { weekly: 0.85, biweekly: 0.9 };

export const COUPONS = {
  HYD15: { rate: 0.15, minSubtotal: 0, label: '15% OFF' },
  MORNING20: { rate: 0.2, minSubtotal: 299, label: '20% OFF' }
};

export const FREE_SHIPPING_THRESHOLD = 399;
export const SHIPPING_FEE = 49;

export const DEFAULT_PROFILE = {
  name: 'Guest Customer',
  email: 'guest@verdant.local',
  phone: '',
  street: '',
  locality: 'Gachibowli',
  pincode: '500032',
  deliverySlot: 'morning_6_30_to_9_00',
  dietaryFocus: 'High Plant Protein & Gut Vitality',
  memberTier: 'Guest Explorer'
};

export const DEMO_PROFILE = {
  name: 'Sravan Kumar',
  email: 'sravan.k@hyderabadbio.in',
  phone: '9876543210',
  street: 'Flat 402, Green Meadows, Financial District Road',
  locality: 'Gachibowli',
  pincode: '500032',
  deliverySlot: 'morning_6_30_to_9_00',
  dietaryFocus: 'High Plant Protein & Gut Vitality',
  memberTier: 'Greenhouse Resident (Daily Harvest)'
};

export const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'box-builder', label: 'Weekly Boxes' },
  { id: 'health', label: 'Health Match' },
  { id: 'farm', label: 'Growing Biology' },
  { id: 'about', label: 'About Us' }
];