const lc = (v) => (v || '').toLowerCase();

const SEARCH_FIELDS = ['name', 'regional', 'tagline', 'flavor', 'biomarker', 'idealFor', 'badge'];

export const searchProducts = (products, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((item) => SEARCH_FIELDS.some((f) => lc(item[f]).includes(q)));
};

export const filterByCategory = (list, catId) => {
  switch (catId) {
    case 'bowls':
      return list.filter((i) => i.category === 'bowls');
    case 'greens':
      return list.filter((i) => i.category !== 'bowls');
    case 'protein':
      return list.filter((i) => lc(i.biomarker).includes('protein') || lc(i.badge).includes('protein'));
    case 'detox':
      return list.filter(
        (i) => lc(i.idealFor).includes('detox') || lc(i.badge).includes('detox') || lc(i.badge).includes('cleanse')
      );
    case 'sprouts':
      return list.filter((i) => lc(i.unit).includes('tray') || lc(i.name).includes('sprout'));
    default:
      return list;
  }
};

export const getId = (item) => item._id || item.id;
