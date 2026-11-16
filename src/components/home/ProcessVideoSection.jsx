import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, CheckCircle2, Video, X } from 'lucide-react';

const PROCESS_VIDEOS = [
  {
    id: 'v1',
    title: '5:00 AM Dawn Harvest',
    duration: '0:45',
    category: 'Greenhouse Live',
    thumbnail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    description: 'Witness our farmers cutting living wheatgrass and microgreen punnets at dawn when phytonutrient concentration peaks.'
  },
  {
    id: 'v2',
    title: 'Triple-RO Sprout Germination',
    duration: '0:60',
    category: 'Growing Biology',
    thumbnail: 'https://images.unsplash.com/photo-1526318896980-cf79972f2e27?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    description: 'How organic desi moong and chana seeds are soaked in purified triple-RO water to break down phytates and activate enzymes.'
  },
  {
    id: 'v3',
    title: 'Hyderabad Morning Transit',
    duration: '0:30',
    category: 'Doorstep Delivery',
    thumbnail: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    description: 'Packed fresh and dispatched across Gachibowli, Hitec City, and Jubilee Hills for crisp 6:30 AM delivery.'
  }
];

export default function ProcessVideoSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const scrollerRef = useRef(null);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-video-card]');
    const step = (card ? card.getBoundingClientRect().width : el.clientWidth * 0.8) + 24;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!activeVideo) return undefined;
    const onKey = (e) => e.key === 'Escape' && setActiveVideo(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeVideo]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#133A29] via-[#1F5A3E] to-[#4A9173] px-6 pb-8 pt-8 text-white shadow-[0_30px_70px_-30px_rgba(15,45,32,0.8)] sm:px-12 sm:pt-10 border border-white/10">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#98E59E]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#CDEFD2]/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D8F8DC] backdrop-blur-md">
              <Video size={13} aria-hidden="true" />
              <span>Transparent Farming</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#B8F5B1]">
              Watch Our Living Harvest Process
            </h2>
            <p className="text-xs sm:text-sm text-[#ECF8F0] leading-relaxed">
              From seed imbibition in purified indoor trays to zero-bloat ready-to-eat salad bowls delivered across Hyderabad.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous videos"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition hover:bg-[#98E59E] hover:text-[#0F2D20] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/15 disabled:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next videos"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition hover:bg-[#98E59E] hover:text-[#0F2D20] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/15 disabled:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROCESS_VIDEOS.map((vid) => (
              <article
                key={vid.id}
                data-video-card
                className="group flex w-[85%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] sm:w-[22rem] lg:w-[calc((100%-3rem)/3)]"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#152A1B]">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                    <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      {vid.category}
                    </span>

                    <span className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2 py-0.5 font-mono text-[10px] font-bold text-[#152A1B]">
                      {vid.duration}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveVideo(vid)}
                      aria-label={`Play ${vid.title}`}
                      className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white shadow-xl ring-1 ring-white/50 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[#98E59E] group-hover:text-[#0F2D20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Play size={22} className="ml-0.5 fill-current" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="space-y-2 p-5">
                    <h3 className="font-serif text-base font-bold text-white transition group-hover:text-[#B8F5B1]">
                      {vid.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#ECF8F0]">{vid.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 px-5 pb-5 pt-0 text-[11px] font-semibold text-[#B8F5B1]">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>100% Organic &amp; Chemical-Free</span>
                </div>
              </article>
            ))}
          </div>

          {canPrev && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[#133A29] to-transparent lg:block"
            />
          )}
          {canNext && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#133A29] to-transparent lg:block"
            />
          )}
        </div>

        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#0F2D20] shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-[#153B2B] p-4 text-white">
                <h3 className="font-serif text-sm font-bold">{activeVideo.title}</h3>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1`}
                  title={activeVideo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="bg-[#0F2D20] p-4 text-xs leading-relaxed text-white/70">{activeVideo.description}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}