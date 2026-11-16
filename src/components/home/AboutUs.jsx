import React from 'react';
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Droplets,
  HeartPulse,
  Leaf,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Sun,
  Truck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { unsplash as u } from '../../utils/unsplash';

// Unsplash photo IDs
const IMG = {
  trays: '1648128774225-b7cf04eb94c6',
  greens: '1647613233075-e0d5546b0f22',
  chaatBowl: '1505253716362-afaea1d3d1af',
  proteinBowl: '1599020792689-9fde458e7e17',
  sproutsBowl: '1785826799626-5d711dc8763a',
  sproutsClose: '1758701925687-1449ab265c2e',
  amaranth: '1768860371058-b782291437e2',
  wheatgrass: '1757557768362-89bc57635dbd',
  mustard: '1648128774137-5aecd8c061cf',
  plasticTray: '1647613233056-fc9918256a8d',
  beans: '1617175093903-1298b4985fcd'
};

const GROWTH_IMAGES = [IMG.beans, IMG.sproutsClose, IMG.trays, IMG.amaranth];

function Img({ id, w, alt, className = '' }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`bg-[#EAF5EC] ${className}`} />;
  return (
    <img
      src={u(id, w)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

const STATS = [
  { value: '5:00 AM', label: 'Daily harvest time' },
  { value: '9:00 AM', label: 'Delivered by' },
  { value: '10', label: 'Fresh products' },
  { value: '0', label: 'Chemical pesticides' }
];

const PILLARS = [
  {
    icon: Clock,
    title: '5:00 AM Harvest',
    text: 'Crops are cut at dawn, when enzyme activity and phytonutrient levels peak, so every bite is as vital as it can be.'
  },
  {
    icon: ShieldCheck,
    title: 'Triple-RO & Clean Tech',
    text: 'Grown in sterile indoor trays with triple-RO purified water, OMRI-certified organic mediums and no chemical pesticides.'
  },
  {
    icon: Sprout,
    title: 'Living & Root-Intact',
    text: 'Trays are delivered alive, with roots attached. Cut only what you need and the rest keeps growing in your fridge.'
  },
  {
    icon: Sun,
    title: 'Precision Lighting',
    text: 'Full-spectrum LEDs on a 16-hour cycle build dense chlorophyll and colour without relying on weather or season.'
  },
  {
    icon: Droplets,
    title: 'Desi Seed Heritage',
    text: 'We grow Deccani favourites such as pacha pesalu, gongura, methi and avalu, the flavours Hyderabad already cooks with.'
  },
  {
    icon: MapPin,
    title: 'Hyderabad Hub Delivery',
    text: 'Fast morning transit across Gachibowli, Hitec City, Jubilee Hills, Banjara Hills, Madhapur and Kondapur.'
  }
];

const GROWTH = [
  {
    day: 'Day 1–2',
    title: 'Awakening',
    text: 'Seeds are washed in purified water and soaked in darkness. This neutralises phytic acid and activates the enzymes that make sprouts easy to digest.'
  },
  {
    day: 'Day 3–5',
    title: 'Living sprout',
    text: 'Moong and chana germinate and are eaten whole, tender root tails included, at their peak of bioavailable amino acids.'
  },
  {
    day: 'Day 7–10',
    title: 'Microgreen',
    text: 'Seed leaves unfold under full-spectrum LEDs. Chlorophyll and carotenoids surge, and methi and gongura reach their flavour.'
  },
  {
    day: 'Day 12–14',
    title: 'True leaf',
    text: 'Avalu and red koyagura develop glucosinolates and betalain pigments, giving bold, tangy, peppery character.'
  }
];

const JOURNEY = [
  { icon: Sprout, time: '5:00 AM', title: 'Harvest', text: 'Cut at dawn from the greenhouse.' },
  { icon: PackageCheck, time: '6:00 AM', title: 'Pack', text: 'Cleaned, packed and sealed cold.' },
  { icon: Truck, time: '6:30 AM', title: 'Dispatch', text: 'Routed by neighbourhood hub.' },
  { icon: HeartPulse, time: 'By 9:00 AM', title: 'Your table', text: 'Fresh, living and ready to eat.' }
];

const RANGE = [
  {
    img: IMG.chaatBowl,
    tag: '4 bowls',
    title: 'Sprout Bowls',
    text: 'Ready-to-eat bowls built on living sprouts, from tangy chaat to a 22g-protein paneer recovery bowl.',
    tab: 'shop'
  },
  {
    img: IMG.mustard,
    tag: '6 varieties',
    title: 'Microgreens & Trays',
    text: 'Gongura, methi, red koyagura, mustard, wheatgrass and moong-chana sprouts, delivered with roots intact.',
    tab: 'shop'
  },
  {
    img: IMG.plasticTray,
    tag: 'Subscription',
    title: 'Weekly Boxes',
    text: 'Build a box around your week and get a fresh harvest at your door on schedule.',
    tab: 'box-builder'
  }
];

const FAQS = [
  {
    q: 'What does "living" or "root-intact" mean?',
    a: 'Our trays and punnets are delivered with the roots still in the growing medium. You snip what you need and the rest stays alive and fresh in your fridge, instead of wilting like pre-cut greens.'
  },
  {
    q: 'Which areas do you deliver to?',
    a: 'We currently deliver across Hyderabad: Gachibowli, Hitec City, Jubilee Hills, Banjara Hills, Madhapur and Kondapur, with morning delivery slots.'
  },
  {
    q: 'Are your greens organic?',
    a: 'They are grown in sterile indoor trays using OMRI-certified organic mediums and triple-RO purified water, with zero chemical pesticides.'
  },
  {
    q: 'How do I choose what is right for me?',
    a: 'Try our Health Match tool. Pick a goal such as detox, glycemic support, gut health or recovery and we will suggest the products that fit.'
  }
];

function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2C6E49]">{eyebrow}</span>
      <h2 className="mt-2 font-serif text-2xl font-bold text-[#153B2B] sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-sm leading-relaxed text-[#5C6E5F] sm:text-base">{text}</p>}
    </div>
  );
}

export default function AboutUs() {
  const { setActiveTab } = useStore();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero section matching exact HeroBanner width & styling reference */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#133A29] via-[#1F5A3E] to-[#4A9173] px-6 pb-8 pt-8 text-white shadow-[0_30px_70px_-30px_rgba(15,45,32,0.8)] sm:px-12 sm:pt-10 border border-white/10">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#98E59E]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#CDEFD2]/20 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 py-2 lg:grid-cols-2">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D8F8DC] backdrop-blur-md">
              <Leaf size={14} aria-hidden="true" />
              <span>Rooted in Hyderabad</span>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight sm:text-6xl text-[#B8F5B1]">
              Living nutrition, <span className="text-white">harvested at dawn.</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[#ECF8F0] sm:text-lg">
              Sideshwara Greens is Hyderabad&rsquo;s farm-direct source for microgreens, living sprouts and
              ready-to-eat sprout bowls, grown in a controlled urban greenhouse and delivered to your door
              every morning.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="inline-flex items-center gap-2 rounded-full bg-[#98E59E] px-6 py-3 text-sm font-bold text-[#0F2D20] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Shop daily harvest
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('farm')}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                See how we grow
              </button>
            </div>
          </div>

          {/* Photo collage */}
          <div className="grid grid-cols-2 gap-4">
            <Img
              id={IMG.trays}
              w={800}
              alt="Trays of microgreens growing in the greenhouse"
              className="row-span-2 h-full min-h-[18rem] w-full rounded-3xl ring-1 ring-white/10"
            />
            <Img
              id={IMG.chaatBowl}
              w={600}
              alt="Fresh sprout salad bowl"
              className="h-40 w-full rounded-3xl ring-1 ring-white/10 sm:h-48"
            />
            <Img
              id={IMG.sproutsBowl}
              w={600}
              alt="Bowl of freshly sprouted mung beans"
              className="h-40 w-full rounded-3xl ring-1 ring-white/10 sm:h-48"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-8 border-t border-white/15 pt-6">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="font-serif text-3xl font-bold text-white sm:text-4xl">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/65">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <SectionHeading
          center={false}
          eyebrow="Our mission"
          title="Reconnecting urban living with living nutrition"
        />
        <div className="space-y-4 text-sm leading-relaxed text-[#5C6E5F] sm:text-base">
          <p>
            Modern diets often lack active enzymes and live chlorophyll. Produce spends days in transit and
            storage before it reaches the plate, and much of its vitality is lost on the way.
          </p>
          <p>
            By germinating ancient Deccani seeds like pacha pesalu, gongura and fenugreek under precision
            lighting, and harvesting them hours before delivery, we restore that vitality and bring
            digestive Agni back into your daily routine.
          </p>
        </div>
      </section>

      {/* Photo strip */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          { id: IMG.greens, caption: 'Fresh-cut microgreens' },
          { id: IMG.wheatgrass, caption: 'Living wheatgrass, roots intact' },
          { id: IMG.proteinBowl, caption: 'Ready-to-eat sprout bowls' }
        ].map((p) => (
          <figure key={p.caption} className="group relative overflow-hidden rounded-3xl shadow-sm">
            <Img
              id={p.id}
              w={800}
              alt={p.caption}
              className="h-64 w-full transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F2D20]/85 to-transparent p-4 pt-10 text-sm font-semibold text-white">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What sets us apart"
          title="Grown with care, delivered with speed"
          text="Every step, from seed to doorstep, is designed to keep the plant alive and nutrient-dense."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-3xl border border-[#E2EAE4] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2C6E49]/40 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF5EC] text-[#2C6E49] transition group-hover:bg-[#153B2B] group-hover:text-[#98E59E]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#153B2B]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6E5F]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Growth timeline */}
      <section className="bg-[#F4F8F5] py-16 border-y border-[#E2EAE4]">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Seed to plate"
            title="Fourteen days of growing biology"
            text="Different crops are harvested at different stages, each timed for the nutrition and flavour it is best at."
          />
          <ol className="relative grid gap-6 md:grid-cols-4">
            {GROWTH.map((g, i) => (
              <li key={g.day} className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#E2EAE4]">
                <div className="relative">
                  <Img id={GROWTH_IMAGES[i]} w={600} alt={`${g.title} stage`} className="h-40 w-full" />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#153B2B] text-sm font-bold text-[#98E59E] ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">{g.day}</p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-[#153B2B]">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C6E5F]">{g.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setActiveTab('farm')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C6E49] transition hover:text-[#153B2B]"
            >
              Explore the full growing story
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Harvest to door */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Harvest to door"
          title="From greenhouse to breakfast in hours"
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map(({ icon: Icon, time, title, text }) => (
            <li key={title} className="flex items-start gap-4 rounded-3xl border border-[#E2EAE4] bg-white p-5 shadow-xs">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5EC] text-[#2C6E49]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">{time}</p>
                <h3 className="font-serif text-base font-bold text-[#153B2B]">{title}</h3>
                <p className="mt-1 text-sm text-[#5C6E5F]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Range */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What we make" title="Everything we grow and prepare" />
        <div className="grid gap-6 md:grid-cols-3">
          {RANGE.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={() => setActiveTab(r.tab)}
              className="group flex flex-col items-start overflow-hidden rounded-3xl border border-[#E2EAE4] bg-white text-left shadow-sm transition hover:border-[#2C6E49]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
            >
              <div className="w-full overflow-hidden">
                <Img
                  id={r.img}
                  w={700}
                  alt={r.title}
                  className="h-44 w-full transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex w-full flex-1 flex-col items-start p-6">
                <span className="rounded-full bg-[#EAF5EC] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2C6E49]">
                  {r.tag}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#153B2B]">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5C6E5F]">{r.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C6E49] transition group-hover:gap-2.5">
                  Explore <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
        <div className="divide-y divide-[#E2EAE4] rounded-3xl border border-[#E2EAE4] bg-white overflow-hidden shadow-sm">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#153B2B] sm:text-base [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[#2C6E49] transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#5C6E5F]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#153B2B] to-[#2C6E49] p-8 text-white shadow-xl sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#98E59E]/15 blur-2xl"
          />
          <div className="relative max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#98E59E]">Our promise</span>
            <h2 className="font-serif text-2xl font-bold sm:text-4xl">
              Fresh from the greenhouse, every single morning
            </h2>
            <p className="text-sm leading-relaxed text-[#E2EAE4] sm:text-base">
              Start with a single tray or build a weekly box. Either way, it arrives alive, clean and
              harvested that day.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#153B2B] transition hover:bg-[#EAF5EC]"
              >
                Explore daily harvest
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('health')}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Find my health match
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}