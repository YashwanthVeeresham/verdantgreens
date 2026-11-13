import React, { useState } from 'react';
import { X, Clock, Minus, Plus, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useCarousel } from '../../hooks/useCarousel';
import { getProductImages } from '../../utils/images';

export default function ProductModal() {
  const { selectedProduct: product, setSelectedProduct, addToCart } = useStore();
  if (!product) return null;
  return <ProductModalBody key={product._id || product.id} product={product} onClose={() => setSelectedProduct(null)} addToCart={addToCart} />;
}

function ProductModalBody({ product, onClose, addToCart }) {
  const images = getProductImages(product);
  const carousel = useCarousel(images.length);
  const [qty, setQty] = useState(1);
  const isBowl = product.category === 'bowls';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={carousel.pause}
        onMouseLeave={carousel.resume}
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E2EAE4] relative grid grid-cols-1 md:grid-cols-12"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#152A1B] flex items-center justify-center shadow-md border border-[#E2EAE4] transition"
        >
          <X size={18} />
        </button>

        <div className="md:col-span-6 bg-[#F4F7F5] p-4 sm:p-5 flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-white border border-[#E2EAE4] shadow-xs">
            <img
              src={images[carousel.index]}
              alt={`${product.name} view ${carousel.index + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#153B2B]/90 text-[#98E59E] backdrop-blur-xs">
              {product.badge || '5 AM Harvest'}
            </span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={carousel.prev}
                  aria-label="Previous image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#152A1B] flex items-center justify-center shadow-md transition"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={carousel.next}
                  aria-label="Next image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#152A1B] flex items-center justify-center shadow-md transition"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => carousel.setIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    carousel.index === idx ? 'w-5 bg-[#98E59E]' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-3">
            {images.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => carousel.setIndex(idx)}
                className={`h-16 rounded-xl overflow-hidden border-2 transition ${
                  carousel.index === idx
                    ? 'border-[#153B2B] ring-2 ring-[#153B2B]/20'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-bold text-[#2C6E49]">
                <Clock size={12} />
                <span>{isBowl ? 'Freshly Assembled at 5:30 AM' : `${product.harvestDays || 7}-Day Hydroponic Harvest`}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#152A1B] mt-1 pr-6">{product.name}</h2>
              <p className="text-xs font-semibold text-[#2C6E49]">{product.regional}</p>
            </div>

            <p className="text-xs text-[#4A5D4D] leading-relaxed">{product.tagline}</p>

            <div className="p-3.5 rounded-2xl bg-[#F5F8F6] border border-[#E2EAE4] space-y-2 text-xs">
              <p>
                <strong className="text-[#152A1B]">Taste & Texture:</strong>{' '}
                <span className="text-[#4A5D4D]">{product.flavor}</span>
              </p>
              <p>
                <strong className="text-[#152A1B]">Nutritional Profile:</strong>{' '}
                <span className="text-[#4A5D4D]">{product.biomarker}</span>
              </p>
              <p>
                <strong className="text-[#152A1B]">Ideal Culinary Use:</strong>{' '}
                <span className="text-[#2C6E49] font-medium">{product.idealFor}</span>
              </p>
              <p>
                <strong className="text-[#152A1B]">Pack Size:</strong>{' '}
                <span className="text-[#4A5D4D]">
                  {product.unit || (isBowl ? 'Single Serving Bowl (280g)' : 'Living Punnet (80g)')}
                </span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F0F4F1] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[#7A8C7E] block">Farm-Direct Price</span>
              <span className="font-serif text-2xl font-bold text-[#152A1B]">₹{product.price * qty}</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-[#F5F8F6] border border-[#DCE6DF] rounded-full px-2.5 py-1.5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#152A1B] shadow-2xs"
                >
                  <Minus size={11} />
                </button>
                <span className="text-xs font-bold w-4 text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#152A1B] shadow-2xs"
                >
                  <Plus size={11} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(product, qty);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-full bg-[#153B2B] hover:bg-[#0D261B] text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
              >
                <ShoppingBag size={13} />
                <span>Add to Basket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
