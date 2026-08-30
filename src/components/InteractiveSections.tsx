"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  SlidersHorizontal,
  Search,
  SunMedium,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Clock3
} from "lucide-react";
import {
  realtyArticles,
  realtyListings,
  solarArticles,
  solarProducts,
  solarSolutions
} from "@/lib/data";
import { LeadForm } from "@/components/LeadForm";

type Listing = (typeof realtyListings)[number];
type Product = (typeof solarProducts)[number];

const all = "All";

function useMeasuredWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const update = () => {
      setWidth(Math.round(element.clientWidth));
    };
    const frame = window.requestAnimationFrame(update);
    let observer: ResizeObserver | null = null;

    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(update);
      observer.observe(element);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return [ref, width] as const;
}

function useSwipeNavigation(onSwipe: (direction: 1 | -1) => void) {
  const touchStartX = useRef<number | null>(null);

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    onSwipe(deltaX < 0 ? 1 : -1);
  }

  return { onTouchStart, onTouchEnd };
}

export function ListingsExplorer() {
  const [city, setCity] = useState(all);
  const [type, setType] = useState(all);
  const [progress, setProgress] = useState(all);
  const [selected, setSelected] = useState<Listing | null>(null);

  const cities = [all, ...Array.from(new Set(realtyListings.map((item) => item.city)))];
  const types = [all, ...Array.from(new Set(realtyListings.map((item) => item.type)))];
  const progressOptions = [all, "Ongoing", "Upcoming", "Complete"];

  const filtered = realtyListings.filter(
    (item) =>
      (city === all || item.city === city) &&
      (type === all || item.type === type) &&
      (progress === all || item.progress === progress)
  );

  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              Realty Listings
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
              Filtered property discovery with human follow-through.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-ink/10 bg-white/62 p-2.5 shadow-sm sm:gap-3 sm:p-3">
            <FilterSelect label="City" value={city} options={cities} onChange={setCity} />
            <FilterSelect label="Type" value={type} options={types} onChange={setType} />
            <FilterSelect
              label="Progress"
              value={progress}
              options={progressOptions}
              onChange={setProgress}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {filtered.map((listing) => (
            <button
              key={listing.id}
              type="button"
              onClick={() => setSelected(listing)}
              className="group grid grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-lg border border-ink/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:flex sm:flex-col"
            >
              <span className="relative block min-h-[140px] overflow-hidden sm:aspect-[16/10] sm:min-h-0 sm:shrink-0 lg:aspect-[4/3]">
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 38vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {listing.type}
                </span>
                {listing.soldOut ? (
                  <>
                    <span
                      aria-label="Sold out"
                      className="absolute right-2 top-2 rounded-md bg-ink px-1.5 py-1 text-[8px] font-bold uppercase leading-none tracking-[0.1em] text-paper shadow-md sm:hidden"
                    >
                      Sold
                      <br />
                      Out
                    </span>
                    <span
                      aria-label="Sold out"
                      className="absolute right-[-42px] top-[18px] hidden w-[160px] rotate-45 bg-ink py-1 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-paper shadow-md ring-1 ring-white/20 sm:block"
                    >
                      Sold Out
                    </span>
                  </>
                ) : null}
              </span>
              <span className="block p-3 sm:flex sm:flex-1 sm:flex-col sm:p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-realty-500">
                  {listing.city} / {listing.locality}
                </span>
                <span className="compact-copy mt-2 block font-display text-xl leading-tight text-ink sm:mt-3 sm:text-2xl lg:text-3xl">
                  {listing.name}
                </span>
                <span className="compact-copy mt-2 block text-[12px] leading-5 text-ink/62 sm:mt-3 sm:text-sm sm:leading-6">
                  {listing.description}
                </span>
                <span className="mt-3 flex items-center justify-between gap-3 border-t border-ink/10 pt-3 text-xs font-semibold text-ink sm:mt-auto sm:gap-4 sm:pt-4 sm:text-sm">
                  {listing.progress}
                  <span className="inline-flex items-center gap-1 text-realty-700">
                    View <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {selected ? <ListingModal listing={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="min-w-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/48 sm:text-xs sm:tracking-[0.18em]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-10 w-full min-w-0 rounded-lg border border-ink/12 bg-white px-2 text-xs font-medium normal-case tracking-normal text-ink sm:mt-2 sm:h-11 sm:px-3 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ListingModal({
  listing,
  onClose
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [galleryPanelRef, galleryWidth] = useMeasuredWidth<HTMLDivElement>();
  const galleryImages = listing.gallery?.length ? listing.gallery : [listing.image];

  function scrollToImage(index: number) {
    const nextIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
    setActiveImage(nextIndex);
  }

  const swipeHandlers = useSwipeNavigation((direction) => scrollToImage(activeImage + direction));

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/72 p-3 backdrop-blur-sm sm:p-4 lg:p-5">
      <div
        className="my-auto grid max-h-[calc(100svh-1.5rem)] w-full max-w-7xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg bg-paper shadow-soft sm:max-h-[calc(100svh-2rem)] lg:max-h-none lg:overflow-hidden lg:grid-cols-[0.78fr_1fr] xl:grid-cols-[0.86fr_1fr]"
        role="dialog"
        aria-modal="true"
        aria-label={`${listing.name} property enquiry`}
      >
        <div ref={galleryPanelRef} className="relative h-[42svh] min-h-[260px] max-h-[390px] overflow-hidden bg-ink sm:h-auto sm:min-h-[320px] sm:max-h-none lg:min-h-full">
          {listing.soldOut ? (
            <span
              aria-label="Sold out"
              className="absolute right-[-46px] top-[22px] z-10 w-[180px] rotate-45 bg-ink py-1.5 text-center text-xs font-bold uppercase tracking-[0.28em] text-paper shadow-md ring-1 ring-white/20"
            >
              Sold Out
            </span>
          ) : null}
          <div
            data-listing-gallery
            data-active-image={activeImage}
            data-slide-width={galleryWidth}
            className="grid h-full grid-flow-col auto-cols-[100%] touch-pan-y transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translate3d(-${activeImage * galleryWidth}px, 0, 0)` }}
            onTouchStart={swipeHandlers.onTouchStart}
            onTouchEnd={swipeHandlers.onTouchEnd}
          >
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className="relative h-full w-full"
                aria-label={`${listing.name} photo ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${listing.name} photo ${index + 1}`}
                  fill
                  sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {galleryImages.length > 1 ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-3">
                <button
                  type="button"
                  onClick={() => scrollToImage(activeImage - 1)}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-ink shadow-soft transition hover:bg-white sm:h-10 sm:w-10"
                  aria-label="Previous property photo"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToImage(activeImage + 1)}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-ink shadow-soft transition hover:bg-white sm:h-10 sm:w-10"
                  aria-label="Next property photo"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/58 p-1.5 backdrop-blur-sm">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-dot`}
                    type="button"
                    onClick={() => scrollToImage(index)}
                    className={`h-2 rounded-full transition ${
                      activeImage === index ? "w-5 bg-white" : "w-2 bg-white/55"
                    }`}
                    aria-label={`Show property photo ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="p-4 sm:p-5 xl:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-realty-500">
                {listing.city} / {listing.type}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl xl:text-[2.1rem]">
                {listing.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/12 text-ink/70 transition hover:bg-white"
              aria-label="Close property detail"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/66 xl:mt-3">{listing.description}</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2 xl:mt-4">
            <div className="rounded-lg border border-ink/10 bg-white/68 p-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/42">
                Progress
              </dt>
              <dd className="mt-2 text-sm font-semibold text-ink">{listing.progress}</dd>
            </div>
            <div className="rounded-lg border border-ink/10 bg-white/68 p-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/42">
                Locality
              </dt>
              <dd className="mt-2 text-sm font-semibold text-ink">{listing.locality}</dd>
            </div>
          </dl>
          <div className="mt-3 rounded-lg border border-ink/10 bg-white/68 p-3 xl:mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/42">
              Key specs
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {listing.specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-lg bg-realty-100 px-3 py-1.5 text-xs font-semibold text-realty-900"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-ink/10 bg-white/70 p-3 xl:mt-4">
            <LeadForm
              division="realty"
              compact
              submitLabel="Enquire about this property"
              context={`Property enquiry: ${listing.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCatalog() {
  const [category, setCategory] = useState(all);
  const [selected, setSelected] = useState<Product | null>(null);
  const categories = [all, ...Array.from(new Set(solarProducts.map((item) => item.category)))];
  const products = solarProducts.filter(
    (product) => category === all || product.category === category
  );

  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
              Solar Shop
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
              Detailed system components with trusted brands.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/62 sm:text-base sm:leading-7">
              Every quote starts with the core parts of the system: modules,
              inverter, protection, cabling, and structure.
            </p>
          </div>
          <div className="flex max-w-full flex-wrap gap-2 rounded-lg border border-ink/10 bg-white/70 p-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`min-h-10 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition ${
                  category === item
                    ? "bg-solar-500 text-ink"
                    : "text-ink/62 hover:bg-ink/8 hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 48vw, calc(100vw - 32px)"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-solar-700">
                  {product.category}
                </p>
                <h3 className="compact-copy mt-2 font-display text-xl leading-tight text-ink sm:mt-3 sm:min-h-[58px] sm:text-2xl lg:min-h-[68px] lg:text-3xl">
                  {product.name}
                </h3>
                <p className="compact-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-3 sm:min-h-[48px] sm:text-sm sm:leading-6 lg:min-h-[72px]">
                  {product.spec}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/38">
                  Brands
                </p>
                <p className="compact-copy mt-1 text-[12px] leading-5 text-ink/68">
                  {product.brands.join(", ")}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink sm:mt-4">{product.price}</p>
                <button
                  type="button"
                  onClick={() => setSelected(product)}
                  className="mt-auto inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 text-sm font-semibold text-white transition hover:bg-solar-700 sm:min-h-11 sm:px-4"
                >
                  Request quote
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selected ? <ProductModal product={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

function ProductModal({
  product,
  onClose
}: {
  product: Product;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const galleryImages = product.gallery?.length ? product.gallery : [product.image];

  function scrollToImage(index: number) {
    const nextIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
    setActiveImage(nextIndex);
  }

  const swipeHandlers = useSwipeNavigation((direction) => scrollToImage(activeImage + direction));

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/72 p-3 backdrop-blur-sm sm:p-4 lg:p-5">
      <div
        className="my-auto grid max-h-[calc(100svh-1.5rem)] w-full max-w-7xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg bg-[#fffaf0] shadow-soft sm:max-h-[calc(100svh-2rem)] lg:max-h-[calc(100svh-2.5rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(420px,1fr)] lg:overflow-hidden xl:grid-cols-[minmax(0,1.45fr)_minmax(460px,1fr)]"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quote enquiry`}
      >
        <div className="relative h-[clamp(235px,68vw,320px)] w-full overflow-hidden bg-white sm:h-[clamp(300px,48vw,420px)] lg:h-full lg:min-h-[480px]">
          <div
            data-product-gallery
            data-active-image={activeImage}
            className="grid h-full grid-flow-col auto-cols-[100%] touch-pan-y transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translate3d(-${activeImage * 100}%, 0, 0)` }}
            onTouchStart={swipeHandlers.onTouchStart}
            onTouchEnd={swipeHandlers.onTouchEnd}
          >
            {galleryImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-full w-full"
                aria-label={`${product.name} photo ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} photo ${index + 1}`}
                  fill
                  sizes="(min-width: 1280px) 43vw, (min-width: 1024px) 40vw, 100vw"
                  className="object-contain"
                  loading={index === activeImage ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          {galleryImages.length > 1 ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-3">
                <button
                  type="button"
                  onClick={() => scrollToImage(activeImage - 1)}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-ink shadow-soft transition hover:bg-white sm:h-10 sm:w-10"
                  aria-label="Previous product photo"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToImage(activeImage + 1)}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-ink shadow-soft transition hover:bg-white sm:h-10 sm:w-10"
                  aria-label="Next product photo"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/58 p-1.5 backdrop-blur-sm">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}-dot`}
                    type="button"
                    onClick={() => scrollToImage(index)}
                    className={`h-2 rounded-full transition ${
                      activeImage === index ? "w-5 bg-white" : "w-2 bg-white/55"
                    }`}
                    aria-label={`Show product photo ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="p-4 sm:p-5 lg:overflow-y-auto xl:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-solar-700">
                {product.category}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl xl:text-[2.1rem]">
                {product.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/12 text-ink/70 transition hover:bg-white"
              aria-label="Close product detail"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/66 xl:mt-3">{product.spec}</p>
          <div className="mt-4 rounded-lg border border-ink/10 bg-white/70 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/42">
              Brands
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full bg-solar-100 px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 rounded-lg border border-ink/10 bg-white/70 p-3 text-sm font-semibold text-ink xl:mt-4">
            {product.price}
          </p>
          <div className="mt-3 rounded-lg border border-ink/10 bg-white/70 p-3 xl:mt-4">
            <LeadForm
              division="solar"
              compact
              submitLabel="Request product quote"
              context={`Product quote request: ${product.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolarSavingsCalculator() {
  const [bill, setBill] = useState(6500);
  const result = useMemo(() => {
    const tariff = 9;
    const monthlyUnits = bill / tariff;
    const systemSize = Math.min(10, Math.max(1, Math.ceil(monthlyUnits / 120)));
    const generation = systemSize * 120;
    const grossCost = systemSize * 65000;
    const subsidy =
      systemSize <= 1 ? 30000 : systemSize <= 2 ? 60000 : systemSize <= 3 ? 78000 : 78000;
    const monthlySavings = bill * 0.8;
    const effectiveCost = Math.max(0, grossCost - subsidy);
    const payback = effectiveCost / Math.max(1, monthlySavings * 12);

    return {
      systemSize,
      generation,
      subsidy,
      monthlySavings: Math.round(monthlySavings),
      effectiveCost,
      payback: Math.max(1, payback)
    };
  }, [bill]);

  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
            Live savings calculator
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Start with the bill. Let the system size answer back.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/64 sm:mt-5 sm:text-base sm:leading-7">
            This estimate uses practical rooftop assumptions and the current PM Surya
            Ghar subsidy bands for residential planning. Final quotes still depend on
            site survey and DISCOM feasibility.
          </p>
        </div>
        <div className="reveal rounded-lg border border-ink/10 bg-white p-4 shadow-glow sm:p-7">
          <label className="text-sm font-semibold text-ink">
            Monthly electricity bill
            <input
              type="range"
              min={1500}
              max={30000}
              step={500}
              value={bill}
              onChange={(event) => setBill(Number(event.target.value))}
              className="mt-4 w-full accent-solar-500 sm:mt-5"
            />
          </label>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-lg bg-solar-100 px-3 py-2 text-xl font-semibold text-ink sm:px-4 sm:py-3 sm:text-2xl">
              Rs. {bill.toLocaleString("en-IN")}
            </span>
            <SunMedium className="text-solar-700" size={28} aria-hidden="true" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">
            <CalcResult label="Suggested size" value={`${result.systemSize} kW`} />
            <CalcResult
              label="Monthly generation"
              value={`${Math.round(result.generation)} units`}
            />
            <CalcResult
              label="Indicative subsidy"
              value={`Rs. ${result.subsidy.toLocaleString("en-IN")}`}
            />
            <CalcResult
              label="80% monthly bill saving"
              value={`Rs. ${result.monthlySavings.toLocaleString("en-IN")}`}
            />
          </div>
          <div className="mt-4 rounded-lg bg-ink p-4 text-white sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
              Effective cost estimate
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-2xl font-semibold sm:text-3xl">
                Rs. {result.effectiveCost.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-white/64">
                Payback around {result.payback.toFixed(1)} years
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-[#fffaf0] p-3 sm:p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/42">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-ink sm:text-xl">{value}</p>
    </div>
  );
}

export function SolutionTabs() {
  const [active, setActive] = useState(solarSolutions[0].id);
  const current = solarSolutions.find((solution) => solution.id === active) || solarSolutions[0];
  const Icon = current.icon;

  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
            Solutions
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
            Four solar paths, one accountable delivery team.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div className="reveal grid grid-cols-2 gap-2 lg:grid-cols-1">
            {solarSolutions.map((solution) => (
              <button
                key={solution.id}
                id={solution.id}
                type="button"
                onClick={() => setActive(solution.id)}
                className={`flex min-h-14 items-center gap-2 rounded-lg border px-3 text-left text-sm transition sm:min-h-16 sm:gap-3 sm:px-4 ${
                  active === solution.id
                    ? "border-solar-500 bg-solar-100 text-ink"
                    : "border-ink/10 bg-white text-ink/66 hover:border-solar-500"
                }`}
              >
                <solution.icon size={21} aria-hidden="true" />
                <span className="font-semibold">{solution.title}</span>
              </button>
            ))}
          </div>
          <div className="reveal rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <Icon size={38} className="text-solar-700" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:mt-5 sm:text-4xl">
              {current.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/66 sm:mt-4 sm:text-base sm:leading-7">{current.text}</p>
            <div className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3">
              {current.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="rounded-lg border border-ink/10 bg-[#fffaf0] p-4 text-sm font-semibold text-ink"
                >
                  {bullet}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-ink/10 bg-[#fffaf0] p-3 sm:mt-8 sm:p-4">
              <LeadForm
                division="solar"
                compact
                submitLabel="Discuss this solution"
                context={`Solar solution enquiry: ${current.title}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleGrid({ division }: { division: "realty" | "solar" }) {
  const articles = division === "realty" ? realtyArticles : solarArticles;
  const [category, setCategory] = useState(all);
  const categories = [all, ...Array.from(new Set(articles.map((item) => item.category)))];
  const visible = articles.filter((item) => category === all || item.category === category);

  if (division === "realty") {
    const realtyVisible = visible as typeof realtyArticles;

    return (
      <section
        className="relative overflow-hidden bg-[#f7f3ea] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
        id="blog"
      >
        <div className="relative mx-auto max-w-[1180px]">
          <div className="reveal grid gap-6 border-b border-ink/10 pb-7 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
                <span className="h-px w-6 bg-realty-500" aria-hidden="true" />
                Milton Realty Blog
              </p>
              <h2 className="mt-3 max-w-[14ch] break-words font-display text-3xl leading-tight text-ink sm:max-w-3xl sm:text-5xl">
                Project stories with a sharper property lens.
              </h2>
              <p className="mt-4 max-w-[34ch] break-words text-base leading-7 text-ink/62 sm:max-w-2xl">
                Read the thinking behind Milton&apos;s residential, township, and commercial
                opportunities before the enquiry conversation begins.
              </p>
            </div>
            <div className="flex divide-x divide-ink/10 overflow-hidden rounded-lg border border-ink/10 bg-white/80 text-ink shadow-sm sm:max-w-sm lg:ml-auto">
              <div className="flex flex-1 items-center gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-solar-100 text-solar-700">
                  <Newspaper size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-2xl font-bold leading-none">
                    {realtyVisible.length}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/48">
                    Current notes
                  </span>
                </span>
              </div>
              <div className="flex flex-1 items-center gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-solar-100 text-solar-700">
                  <Clock3 size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-2xl font-bold leading-none">5</span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/48">
                    Minute reads
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-8 sm:mt-14 sm:space-y-10 lg:space-y-12">
            {realtyVisible.map((article, index) => {
              const reverse = index % 2 === 1;

              return (
                <article key={article.slug} className="reveal group">
                  <div
                    className={`grid overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(24,32,29,0.16)] lg:items-center ${
                      reverse ? "lg:grid-cols-[1fr_1.3fr]" : "lg:grid-cols-[1.3fr_1fr]"
                    }`}
                  >
                    <Link
                      href={`/realty-blog/${article.slug}`}
                      className={`relative block aspect-[2/1] w-full overflow-hidden ${
                        reverse ? "lg:order-2" : "lg:order-1"
                      }`}
                      aria-label={`Read ${article.title}`}
                    >
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-ink/38 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-ink shadow-md sm:left-5 sm:top-5">
                        0{index + 1}
                      </span>
                    </Link>

                    <div
                      className={`flex flex-col justify-center p-6 sm:p-8 lg:p-9 ${
                        reverse ? "lg:order-1" : "lg:order-2"
                      }`}
                      data-blog-panel={reverse ? "left" : "right"}
                    >
                      <div className="flex flex-wrap items-center gap-2 break-words text-[10px] font-bold uppercase tracking-[0.16em] text-solar-700 sm:text-[11px] sm:tracking-[0.18em]">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-ink/25" />
                        <span className="text-ink/45">{article.readingTime}</span>
                      </div>
                      <h3 className="mt-3 break-words font-display text-2xl leading-tight text-ink sm:mt-4 sm:text-4xl">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/42">
                        Date : {article.date}
                      </p>
                      <p className="mt-4 line-clamp-3 break-words text-sm leading-7 text-ink/68 sm:mt-5 sm:text-base">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                        {article.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-ink/12 bg-paper px-3 py-1 text-xs font-semibold text-ink/70"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/realty-blog/${article.slug}`}
                        className="mt-7 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-solar-500 hover:text-ink"
                      >
                        Read More
                        <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20" id="blog">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                division === "solar" ? "text-solar-700" : "text-realty-500"
              }`}
            >
              Blog
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
              Field notes for better decisions.
            </h2>
          </div>
          <div className="flex max-w-full flex-wrap gap-2 rounded-lg border border-ink/10 bg-white/70 p-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition ${
                  category === item
                    ? division === "solar"
                      ? "bg-solar-500 text-ink"
                      : "bg-realty-700 text-white"
                    : "text-ink/62 hover:bg-ink/8 hover:text-ink"
                }`}
              >
                {item === all ? <SlidersHorizontal size={16} aria-hidden="true" /> : null}
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {visible.map((article) => (
            <article
              key={article.title}
              className="rounded-lg border border-ink/10 bg-white p-3 shadow-sm sm:p-5 lg:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/42">
                {article.category} / {article.date}
              </p>
              <h3 className="mt-2 font-display text-xl leading-tight text-ink sm:mt-4 sm:text-2xl lg:text-3xl">
                {article.title}
              </h3>
              <p className="compact-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-3 sm:text-sm sm:leading-6 lg:mt-4">{article.excerpt}</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:mt-6"
              >
                <Search size={16} aria-hidden="true" />
                Read article
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Milestone = {
  label: string;
  title: string;
  text: string;
  image: string;
};

export function MilestoneScroller({ milestones }: { milestones: Milestone[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [imageOffsets, setImageOffsets] = useState<number[]>(() => milestones.map(() => 0));
  const progress = milestones.length > 1 ? ((activeMilestone + 1) / milestones.length) * 100 : 100;

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateMobileCarousel = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-about-mobile-milestone]"));

      if (!cards.length) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let nextActive = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const nextOffsets = cards.map((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = cardCenter - trackCenter;
        const absoluteDistance = Math.abs(distance);

        if (absoluteDistance < closestDistance) {
          closestDistance = absoluteDistance;
          nextActive = index;
        }

        const normalizedDistance = Math.max(-1, Math.min(1, distance / cardRect.width));
        return Math.round(normalizedDistance * -18);
      });

      setActiveMilestone((current) => (current === nextActive ? current : nextActive));
      setImageOffsets((current) =>
        current.length === nextOffsets.length &&
        current.every((value, index) => value === nextOffsets[index])
          ? current
          : nextOffsets
      );
    };

    const requestUpdate = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateMobileCarousel();
      });
    };

    requestUpdate();
    track.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    let observer: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(requestUpdate);
      observer.observe(track);
    }

    return () => {
      track.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      observer?.disconnect();

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [milestones]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>("[data-about-milestone]");
    const amount = card ? card.getBoundingClientRect().width + 20 : 340;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <>
      <div className="relative mt-10 lg:hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {milestones.map((milestone, index) => {
            const isActive = activeMilestone === index;

            return (
              <article
                key={milestone.title}
                data-about-milestone
                data-about-mobile-milestone
                aria-current={isActive ? "step" : undefined}
                className="w-[82vw] shrink-0 snap-start sm:w-[360px]"
              >
                <div
                  className={`h-full rounded-lg border p-4 backdrop-blur-sm transition duration-300 ease-out sm:p-5 ${
                    isActive
                      ? "scale-100 border-white/24 bg-white/10 opacity-100 shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                      : "scale-[0.94] border-white/10 bg-white/[0.055] opacity-[0.68]"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white/10">
                    <Image
                      src={milestone.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 360px, 82vw"
                      className="object-cover transition-transform duration-300 ease-out"
                      style={{
                        transform: `translateX(${imageOffsets[index] ?? 0}px) scale(${
                          isActive ? 1.08 : 1.04
                        })`
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                        isActive ? "text-white/58" : "text-white/38"
                      }`}
                    >
                      {milestone.label}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/62">{milestone.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div
            className="h-px flex-1 overflow-hidden rounded-full bg-white/14"
            role="progressbar"
            aria-label="Journey milestone progress"
            aria-valuemin={1}
            aria-valuemax={milestones.length}
            aria-valuenow={activeMilestone + 1}
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous milestone"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 text-white transition hover:bg-white hover:text-ink"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next milestone"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 text-white transition hover:bg-white hover:text-ink"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 hidden lg:block">
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/12" />
        <div data-about-timeline-line className="absolute left-1/2 top-0 w-px bg-realty-100" />
        <div className="grid gap-5">
          {milestones.map((milestone, index) => (
            <article
              key={milestone.title}
              data-about-milestone
              className={`relative grid gap-4 rounded-lg border border-white/12 bg-white/7 p-4 backdrop-blur-sm sm:p-5 lg:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
              }`}
            >
              <span
                className={`absolute top-5 h-3 w-3 rotate-45 border border-realty-100 bg-ink ${
                  index % 2 === 0 ? "-right-[2.42rem]" : "-left-[2.42rem]"
                }`}
              />
              <div className="relative aspect-[16/8] overflow-hidden rounded-lg bg-white/10">
                <Image
                  src={milestone.image}
                  alt=""
                  fill
                  sizes="44vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {milestone.label}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{milestone.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{milestone.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

type GalleryItem = {
  category: string;
  title: string;
  image: string;
};

export function FootprintGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState(all);
  const categories = [all, ...Array.from(new Set(items.map((item) => item.category)))];
  const visible = items.filter((item) => filter === all || item.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 rounded-lg border border-ink/10 bg-[#f8f5ed] p-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition ${
              filter === category ? "bg-realty-700 text-white" : "text-ink/62 hover:bg-ink/8 hover:text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <article
            key={`${item.category}-${item.title}`}
            data-about-gallery
            className={`group relative min-h-[240px] overflow-hidden rounded-lg bg-ink text-white shadow-sm sm:min-h-[320px] ${
              index === 0 ? "lg:row-span-2 lg:min-h-[520px]" : ""
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {item.category}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
