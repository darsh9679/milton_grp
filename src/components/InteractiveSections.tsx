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
  ChevronRight
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

export function ListingsExplorer() {
  const [city, setCity] = useState(all);
  const [type, setType] = useState(all);
  const [budget, setBudget] = useState(all);
  const [selected, setSelected] = useState<Listing | null>(null);

  const cities = [all, ...Array.from(new Set(realtyListings.map((item) => item.city)))];
  const types = [all, ...Array.from(new Set(realtyListings.map((item) => item.type)))];
  const budgets = [
    all,
    ...Array.from(new Set(realtyListings.map((item) => item.budgetBand)))
  ];

  const filtered = realtyListings.filter(
    (item) =>
      (city === all || item.city === city) &&
      (type === all || item.type === type) &&
      (budget === all || item.budgetBand === budget)
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
          <div className="grid gap-3 rounded-lg border border-ink/10 bg-white/62 p-3 shadow-sm sm:grid-cols-3">
            <FilterSelect label="City" value={city} options={cities} onChange={setCity} />
            <FilterSelect label="Type" value={type} options={types} onChange={setType} />
            <FilterSelect
              label="Budget"
              value={budget}
              options={budgets}
              onChange={setBudget}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {filtered.map((listing) => (
            <button
              key={listing.id}
              type="button"
              onClick={() => setSelected(listing)}
              className="group grid grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-lg border border-ink/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:block"
            >
              <span className="relative block min-h-[140px] overflow-hidden sm:aspect-[16/10] sm:min-h-0 lg:aspect-[4/3]">
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
              </span>
              <span className="block p-3 sm:p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-realty-500">
                  {listing.city} / {listing.locality}
                </span>
                <span className="compact-copy mt-2 block font-display text-xl leading-tight text-ink sm:mt-3 sm:text-2xl lg:text-3xl">
                  {listing.name}
                </span>
                <span className="compact-copy mt-2 block text-[12px] leading-5 text-ink/62 sm:mt-3 sm:text-sm sm:leading-6">
                  {listing.description}
                </span>
                <span className="mt-3 flex items-center justify-between gap-3 border-t border-ink/10 pt-3 text-xs font-semibold text-ink sm:mt-5 sm:gap-4 sm:pt-4 sm:text-sm">
                  {listing.budget}
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
    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/48">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full min-w-36 rounded-lg border border-ink/12 bg-white px-3 text-sm font-medium normal-case tracking-normal text-ink"
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

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/72 p-3 backdrop-blur-sm sm:p-4 lg:p-5">
      <div
        className="my-auto grid max-h-[calc(100svh-1.5rem)] w-full max-w-7xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg bg-paper shadow-soft sm:max-h-[calc(100svh-2rem)] lg:max-h-none lg:overflow-hidden lg:grid-cols-[0.78fr_1fr] xl:grid-cols-[0.86fr_1fr]"
        role="dialog"
        aria-modal="true"
        aria-label={`${listing.name} property enquiry`}
      >
        <div ref={galleryPanelRef} className="relative h-[42svh] min-h-[260px] max-h-[390px] overflow-hidden bg-ink sm:h-auto sm:min-h-[320px] sm:max-h-none lg:min-h-full">
          <div
            data-listing-gallery
            data-active-image={activeImage}
            data-slide-width={galleryWidth}
            className="grid h-full grid-flow-col auto-cols-[100%] transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translate3d(-${activeImage * galleryWidth}px, 0, 0)` }}
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
                Budget
              </dt>
              <dd className="mt-2 text-sm font-semibold text-ink">{listing.budget}</dd>
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
              A product catalogue built for enquiries, not checkout.
            </h2>
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
          {products.map((product) => (
            <article
              key={product.id}
              className="grid grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm sm:block"
            >
              <div className="relative min-h-[140px] overflow-hidden sm:aspect-[16/10] sm:min-h-0 lg:aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 38vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-solar-700">
                  {product.category}
                </p>
                <h3 className="compact-copy mt-2 font-display text-xl leading-tight text-ink sm:mt-3 sm:min-h-[58px] sm:text-2xl lg:min-h-[68px] lg:text-3xl">
                  {product.name}
                </h3>
                <p className="compact-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-3 sm:min-h-[48px] sm:text-sm sm:leading-6 lg:min-h-[72px]">
                  {product.spec}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink sm:mt-4">{product.price}</p>
                <button
                  type="button"
                  onClick={() => setSelected(product)}
                  className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-ink px-3 text-sm font-semibold text-white transition hover:bg-solar-700 sm:mt-5 sm:min-h-11 sm:px-4"
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
  const [galleryPanelRef, galleryWidth] = useMeasuredWidth<HTMLDivElement>();
  const galleryImages = product.gallery?.length ? product.gallery : [product.image];

  function scrollToImage(index: number) {
    const nextIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
    setActiveImage(nextIndex);
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/72 p-3 backdrop-blur-sm sm:p-4 lg:p-5">
      <div
        className="my-auto grid max-h-[calc(100svh-1.5rem)] w-full max-w-7xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg bg-[#fffaf0] shadow-soft sm:max-h-[calc(100svh-2rem)] lg:max-h-none lg:overflow-hidden lg:grid-cols-[0.78fr_1fr] xl:grid-cols-[0.86fr_1fr]"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quote enquiry`}
      >
        <div ref={galleryPanelRef} className="relative h-[42svh] min-h-[260px] max-h-[390px] overflow-hidden bg-ink sm:h-auto sm:min-h-[320px] sm:max-h-none lg:min-h-full">
          <div
            data-product-gallery
            data-active-image={activeImage}
            data-slide-width={galleryWidth}
            className="grid h-full grid-flow-col auto-cols-[100%] transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translate3d(-${activeImage * galleryWidth}px, 0, 0)` }}
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
        <div className="p-4 sm:p-5 xl:p-6">
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
    const monthlySavings = Math.min(bill * 0.82, generation * tariff * 0.86);
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
              label="Monthly savings"
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
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white to-transparent" />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="reveal grid gap-6 border-b border-ink/10 pb-7 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
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
            <div className="grid grid-cols-2 gap-3 text-ink sm:max-w-sm lg:ml-auto">
              <div className="rounded-lg border border-ink/10 bg-white/76 p-4 shadow-sm">
                <p className="text-2xl font-bold leading-none">{realtyVisible.length}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/48">
                  Current notes
                </p>
              </div>
              <div className="rounded-lg border border-ink/10 bg-white/76 p-4 shadow-sm">
                <p className="text-2xl font-bold leading-none">5</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/48">
                  Minute reads
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12 lg:space-y-16">
            {realtyVisible.map((article, index) => {
              const reverse = index % 2 === 1;

              return (
                <article key={article.slug} className="reveal group">
                  <div
                    className={`grid items-center ${
                      reverse
                        ? "lg:grid-cols-[420px_1fr] xl:grid-cols-[470px_1fr]"
                        : "lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_470px]"
                    }`}
                  >
                    <Link
                      href={`/realty-blog/${article.slug}`}
                      className={`relative block overflow-hidden rounded-lg bg-ink shadow-soft ${
                        reverse ? "lg:order-2" : "lg:order-1"
                      }`}
                      aria-label={`Read ${article.title}`}
                    >
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        width={1400}
                        height={620}
                        sizes="(min-width: 1280px) 1170px, 100vw"
                        className="aspect-[16/9] h-auto w-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-[16/8] lg:aspect-[16/7.6]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/34 via-ink/4 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/24 bg-ink/50 px-3 py-1 text-xs font-semibold text-white/84 backdrop-blur-sm">
                        0{index + 1}
                      </span>
                    </Link>

                    <div
                      className={`relative z-10 mx-3 -mt-10 sm:mx-8 lg:mx-0 lg:mt-0 ${
                        reverse
                          ? "lg:order-1 lg:-mr-16 lg:justify-self-end"
                          : "lg:order-2 lg:-ml-16"
                      }`}
                      data-blog-panel={reverse ? "left" : "right"}
                    >
                      <div className="rounded-lg border border-white/10 bg-ink p-5 text-white shadow-[0_28px_90px_rgba(24,32,29,0.25)] sm:p-7 lg:w-[420px] xl:w-[470px]">
                        <div className="flex flex-wrap items-center gap-2 break-words text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52 sm:text-[11px] sm:tracking-[0.18em]">
                          <span>{article.category}</span>
                          <span className="h-1 w-1 rounded-full bg-white/30" />
                          <span>{article.readingTime}</span>
                        </div>
                        <h3 className="mt-3 break-words font-display text-2xl leading-tight text-white sm:mt-4 sm:text-4xl">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                          Date : {article.date}
                        </p>
                        <p className="mt-4 break-words text-sm leading-7 text-white/76 sm:mt-5 sm:text-base">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                          {article.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full border border-white/16 bg-white/7 px-3 py-1 text-xs font-semibold text-white/78"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/realty-blog/${article.slug}`}
                          className="mt-7 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-solar-500"
                        >
                          Read More
                          <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                      </div>
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
