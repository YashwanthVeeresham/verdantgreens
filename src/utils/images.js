import { PRODUCT_GALLERY_IDS, DEFAULT_GALLERY_IDS } from '../data/products';
import { unsplash } from './unsplash';

export const getProductImages = (item) => {
  const key = item?.sku || item?.id || item?._id;
  const ids = PRODUCT_GALLERY_IDS[key] || DEFAULT_GALLERY_IDS;
  const gallery = ids.map((id) => unsplash(id));
  const custom = item?.image?.trim();
  return custom && !gallery.includes(custom) ? [custom, ...gallery] : gallery;
};

export const getProductImage = (item) => getProductImages(item)[0];
