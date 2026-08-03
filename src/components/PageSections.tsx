import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  SunMedium
} from "lucide-react";
import {
  contactConfig,
  faqs,
  heroImages,
  pageInfo,
  processSteps,
  realtyListings,
  realtyWhy,
  solarWhy,
  testimonials,
  valueCards,
  type Division,
  type PageSlug
} from "@/lib/data";
import { LeadForm } from "@/components/LeadForm";
import {
  ArticleGrid,
  ListingsExplorer,
  ProductCatalog,
  SolarSavingsCalculator,
  SolutionTabs
} from "@/components/InteractiveSections";

const divisionLogos = {
  realty: {
    src: "/images/logos/milton-home-llp-logo.svg",
    alt: "Milton Home LLP"
  },
  solar: {
    src: "/images/logos/milton-solar-llp-logo.svg",
    alt: "Milton Solar LLP"
  }
} as const;

export function GroupHome() {
  return (
    <>
      <Hero
        division="group"
        kicker="Milton Group"
        title="Property, energy, and the long life of built assets."
        text="Milton Group brings together two independently operating divisions: Milton Realty for property decisions and Milton Solar for rooftop energy, EPC, products, and maintenance."
        image={heroImages.group}
        primary={{ href: "/realty-home", label: "Enter Realty" }}
        secondary={{ href: "/solar-home", label: "Enter Solar" }}
      />
      <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="reveal max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              One parent, two clear paths
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
              A shared Milton identity, without blurring the work.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink/64">
              Realty and Solar need different rhythms, proof points, and conversion
              paths. This hub keeps both divisions connected while preserving the
              visual and operational clarity each one needs.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
            <DivisionRouteCard
              title="Milton Realty"
              href="/realty-home"
              image={heroImages.realty}
              text="Mumbai flats, MMR value corridors, Satara land, Ratnagiri coast, Shirdi plots, and hill-town second homes."
              tone="realty"
            />
            <DivisionRouteCard
              title="Milton Solar"
              href="/solar-home"
              image={heroImages.solar}
              text="Residential rooftop, commercial EPC, industrial systems, AMC, solar products, franchise, and subsidy guidance."
              tone="solar"
            />
          </div>
        </div>
      </section>
      <FeatureGrid
        kicker="System"
        title="The site is designed around routing, context, and conversion discipline."
        cards={valueCards}
        division="group"
      />
      <SplitBand
        division="group"
        kicker="Parent brand"
        title="Every path returns to Milton Group."
        text="The architecture keeps the two divisions cross-linked from header, footer, floating actions, and conversion flows. A visitor can move from property to solar without losing the parent identity or being forced through a generic enquiry path."
        image={heroImages.interior}
        cta={{ href: "/realty-listings", label: "Browse Realty Listings" }}
        secondary={{ href: "/solar-shop", label: "View Solar Shop" }}
      />
    </>
  );
}

export function DivisionPage({ slug }: { slug: PageSlug }) {
  const info = pageInfo[slug];

  if (info.division === "realty") {
    return <RealtyPage kind={info.kind} />;
  }

  return <SolarPage kind={info.kind} />;
}

function RealtyPage({ kind }: { kind: string }) {
  if (kind === "home") {
    return (
      <>
        <Hero
          division="realty"
          kicker="Milton Realty"
          title="Real estate decisions, edited with care."
          text="Property advisory across Mumbai, MMR, Satara, Ratnagiri, Shirdi, and hill-town second-home belts, built around clarity before commitment."
          image={heroImages.realty}
          primary={{ href: "/realty-listings", label: "View Listings" }}
          secondary={{ href: "/realty-contact", label: "Talk to an Advisor" }}
        />
        <FeatureGrid
          kicker="Why Milton Realty"
          title="Buying, selling, and renting handled as three different decisions."
          cards={realtyWhy}
          division="realty"
        />
        <ListingPreview />
        <StatsBand
          division="realty"
          stats={[
            ["148", "Properties in active review", ""],
            ["7", "Cities and corridors covered", ""],
            ["12", "Years of advisory memory", "+"]
          ]}
        />
        <ProcessBand division="realty" />
        <TestimonialsBand division="realty" />
        <FaqBand division="realty" />
        <ClosingCta
          division="realty"
          title="Bring us the decision, not just the budget."
          text="Milton Realty can start from a property name, a locality, a resale target, or a family brief."
          href="/realty-contact"
          label="Start a Realty Enquiry"
        />
      </>
    );
  }

  if (kind === "about") {
    return (
      <>
        <SubHero
          division="realty"
          title="A property desk built around trust, timing, and local reading."
          text="Milton Realty's role is to reduce noise in high-stakes property decisions: what to see, what to ignore, what to verify, and when to move."
          image={heroImages.interior}
        />
        <StoryBand
          division="realty"
          title="The founding story is intentionally practical."
          text="Milton Realty grew from the repeat work of families, sellers, and investors who needed someone to translate local property signals into clear next steps. The brand now sits under Milton Group with a wider asset view: homes, land, second homes, and the energy systems that increasingly support them."
          points={[
            "Advisory that starts with purpose before inventory.",
            "Locality-specific guidance across city and non-city assets.",
            "A preference for fewer, sharper options over crowded shortlists."
          ]}
        />
        <TeamBand division="realty" />
        <ClosingCta
          division="realty"
          title="A quieter property conversation starts here."
          text="Share what you are solving for and the Realty team can shape the right next step."
          href="/realty-contact"
          label="Contact Realty"
        />
      </>
    );
  }

  if (kind === "listings") {
    return (
      <>
        <SubHero
          division="realty"
          title="Listings grounded in Milton's real Maharashtra footprint."
          text="Filter flats, land, and bungalow opportunities across Mumbai, Kalyan, Satara, Ratnagiri, Shirdi, and the Mahabaleshwar belt."
          image={heroImages.coastline}
        />
        <ListingsExplorer />
      </>
    );
  }

  if (kind === "blog") {
    return (
      <>
        <SubHero
          division="realty"
          title="Realty reading for buyers, owners, and investors."
          text="Micro-market thinking, land checks, second-home logic, and practical property literacy."
          image={heroImages.field}
        />
        <ArticleGrid division="realty" />
      </>
    );
  }

  if (kind === "partner") {
    return (
      <>
        <SubHero
          division="realty"
          title="A channel partner programme built for serious property professionals."
          text="Bring qualified inventory, buyer mandates, local relationships, or transaction capability into Milton Realty's advisory network."
          image={heroImages.interior}
        />
        <PartnerBand />
      </>
    );
  }

  return (
    <>
      <SubHero
        division="realty"
        title="Talk to Milton Realty."
        text="Send a property brief, selling enquiry, channel partner proposal, or site-visit request."
        image={heroImages.realty}
      />
      <ContactBand division="realty" />
    </>
  );
}

function SolarPage({ kind }: { kind: string }) {
  if (kind === "home") {
    return (
      <>
        <Hero
          division="solar"
          kicker="Milton Solar"
          title="Rooftop energy that calculates before it claims."
          text="Solar EPC, residential rooftop, commercial systems, product enquiries, franchise conversations, and maintenance with a practical savings-first lens."
          image={heroImages.solar}
          primary={{ href: "/solar-solutions", label: "Explore Solutions" }}
          secondary={{ href: "/solar-shop", label: "View Shop" }}
        />
        <SolarSavingsCalculator />
        <FeatureGrid
          kicker="Why Milton Solar"
          title="Residential clarity, commercial payback, and storage readiness."
          cards={solarWhy}
          division="solar"
        />
        <StatsBand
          division="solar"
          stats={[
            ["1200", "Panels planned and installed", "+"],
            ["2.4", "MW portfolio capacity", " MW"],
            ["94", "Client satisfaction", "%"],
            ["68", "Average bill reduction", "%"]
          ]}
        />
        <ProcessBand division="solar" />
        <TestimonialsBand division="solar" />
        <FaqBand division="solar" />
        <ClosingCta
          division="solar"
          title="Run the numbers before you run the wiring."
          text="Milton Solar can size a system from your bill, roof details, and expected usage."
          href="/solar-contact"
          label="Start a Solar Enquiry"
        />
      </>
    );
  }

  if (kind === "about") {
    return (
      <>
        <SubHero
          division="solar"
          title="A solar team shaped around practical adoption."
          text="Milton Solar exists to make rooftop power feel legible: bill, roof, system, subsidy, installation, maintenance."
          image={heroImages.roof}
        />
        <StoryBand
          division="solar"
          title="The story begins where energy decisions get stuck."
          text="Most buyers do not reject solar because they dislike clean power; they pause because system size, subsidy steps, roof readiness, and payback are hard to connect. Milton Solar is positioned to close that gap through clear estimation, site-led engineering, and accountable support after commissioning."
          points={[
            "Savings conversations anchored in actual monthly bills.",
            "EPC delivery that respects roof structure and site operations.",
            "A product and franchise model that routes every lead to a human quote."
          ]}
        />
        <TeamBand division="solar" />
        <ClosingCta
          division="solar"
          title="Clarity is the first solar product."
          text="Bring a bill, a roof, or an expansion plan and the team can map the next step."
          href="/solar-contact"
          label="Contact Solar"
        />
      </>
    );
  }

  if (kind === "franchise") {
    return (
      <>
        <SubHero
          division="solar"
          title="Franchise and partnership paths for local solar demand."
          text="Milton Solar needs partners who can create trust locally while the core team protects technical quality, quote discipline, and delivery standards."
          image={heroImages.solar}
        />
        <FranchiseBand />
      </>
    );
  }

  if (kind === "solutions") {
    return (
      <>
        <SubHero
          division="solar"
          title="Solar solutions by use case, not generic package names."
          text="Residential, commercial, industrial, and AMC paths each carry different engineering and commercial decisions."
          image={heroImages.roof}
        />
        <SolutionTabs />
      </>
    );
  }

  if (kind === "shop") {
    return (
      <>
        <SubHero
          division="solar"
          title="Solar Shop without ecommerce noise."
          text="Systems, pumps, lights, and inverters are shown as quote-ready products. No cart, no checkout, no account flow."
          image={heroImages.solar}
        />
        <ProductCatalog />
      </>
    );
  }

  if (kind === "resources") {
    return (
      <>
        <SubHero
          division="solar"
          title="Resources for the questions that come before the quote."
          text="Blog articles, Solar Smart explainers, subsidy guidance, and FAQs for residential and commercial solar buyers."
          image={heroImages.roof}
        />
        <ResourcesHub />
        <ArticleGrid division="solar" />
        <FaqBand division="solar" />
      </>
    );
  }

  return (
    <>
      <SubHero
        division="solar"
        title="Talk to Milton Solar."
        text="Send your bill, roof context, product interest, franchise enquiry, or AMC request."
        image={heroImages.solar}
      />
      <ContactBand division="solar" />
    </>
  );
}

function Hero({
  division,
  kicker,
  title,
  text,
  image,
  primary,
  secondary
}: {
  division: Division;
  kicker: string;
  title: string;
  text: string;
  image: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  const headingClass = division === "solar" ? "solar-heading" : "font-display";
  const isGroup = division === "group";
  return (
    <section
      className={`relative flex items-end overflow-hidden px-4 pb-10 pt-24 text-white sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 ${isGroup ? "group-hero-section" : "min-h-[70svh] sm:min-h-[68vh] lg:min-h-[88vh]"}`}
      data-mouse-reveal
    >
      {isGroup ? (
        <div aria-hidden="true" className="group-hero-art absolute inset-0" />
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover ${
            division === "solar" ? "object-[52%_center]" : "object-[50%_center]"
          }`}
        />
      )}
      <div
        className={`absolute inset-0 ${
          isGroup ? "group-hero-overlay" : "division-hero-overlay"
        }`}
      />
      <div className="mouse-wash absolute inset-0 opacity-80" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p data-hero-reveal className="text-xs font-semibold uppercase tracking-[0.32em] text-white/68">
          {kicker}
        </p>
        <h1
          data-hero-reveal
          className={`mt-4 max-w-5xl text-balance ${headingClass} text-4xl font-semibold leading-[1.02] sm:mt-5 sm:text-6xl sm:leading-none lg:text-8xl`}
        >
          {title}
        </h1>
        <div
          className={`mt-8 flex max-w-4xl flex-col gap-6 ${
            isGroup ? "pr-14 sm:pr-0" : "lg:flex-row lg:items-end lg:justify-between"
          }`}
        >
          <p data-hero-reveal className="max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
            {text}
          </p>
          <div data-hero-reveal className="flex flex-wrap gap-3">
            <Link
              href={primary.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-solar-100"
            >
              {primary.label}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={secondary.href}
              className={
                isGroup
                  ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-solar-100"
                  : "inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
              }
            >
              {secondary.label}
              {isGroup ? <ArrowRight size={17} aria-hidden="true" /> : null}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubHero({
  division,
  title,
  text,
  image
}: {
  division: Exclude<Division, "group">;
  title: string;
  text: string;
  image: string;
}) {
  const headingClass = division === "solar" ? "solar-heading" : "font-display";
  return (
    <section className="relative flex min-h-[46svh] items-end overflow-hidden px-4 pb-10 pt-24 text-white sm:min-h-[54vh] sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${
          division === "solar" ? "object-[52%_center]" : "object-[50%_center]"
        }`}
      />
      <div className="sub-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl">
        <p data-hero-reveal className="text-xs font-semibold uppercase tracking-[0.32em] text-white/68">
          Milton {division === "solar" ? "Solar" : "Realty"}
        </p>
        <h1
          data-hero-reveal
          className={`mt-4 max-w-5xl text-balance ${headingClass} text-3xl font-semibold leading-[1.12] sm:mt-5 sm:text-5xl sm:leading-tight lg:text-7xl`}
        >
          {title}
        </h1>
        <p data-hero-reveal className="mt-6 max-w-2xl text-base leading-7 text-white/74">
          {text}
        </p>
      </div>
    </section>
  );
}

function FeatureGrid({
  kicker,
  title,
  cards,
  division
}: {
  kicker: string;
  title: string;
  cards: Array<{ icon: React.ElementType; title: string; text: string }>;
  division: Division;
}) {
  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
              division === "solar" ? "text-solar-700" : "text-realty-500"
            }`}
          >
            {kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">{title}</h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="reveal rounded-lg border border-ink/10 bg-white p-3 shadow-sm sm:p-6"
              >
                <div className="flex items-start gap-2 sm:block">
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 sm:mt-0 sm:h-7 sm:w-7 ${division === "solar" ? "text-solar-700" : "text-realty-700"}`}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg leading-tight text-ink sm:mt-5 sm:text-3xl sm:leading-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="feature-card-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-4 sm:text-sm sm:leading-6">{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ListingPreview() {
  return (
    <section className="bg-realty-900 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/54">
              Featured listings
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
              One listing, one scene, one reason to enquire.
            </h2>
          </div>
          <Link
            href="/realty-listings"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-realty-100"
          >
            Open all listings
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {realtyListings.slice(0, 3).map((listing) => (
            <article
              key={listing.id}
              className="reveal grid grid-cols-[0.76fr_1.24fr] overflow-hidden rounded-lg border border-white/12 bg-white/8 sm:block"
            >
              <div className="relative min-h-[140px] overflow-hidden sm:aspect-[5/3] sm:min-h-0 lg:aspect-[4/3]">
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 38vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">
                  {listing.city} / {listing.type}
                </p>
                <h3 className="mt-2 font-display text-xl leading-tight sm:mt-3 sm:text-2xl lg:text-3xl">{listing.name}</h3>
                <p className="compact-copy mt-2 text-[12px] leading-5 text-white/62 sm:mt-3 sm:text-sm sm:leading-6">{listing.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand({
  division,
  stats
}: {
  division: Exclude<Division, "group">;
  stats: Array<[string, string, string]>;
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {stats.map(([value, label, suffix]) => (
          <div key={label} className="reveal rounded-lg border border-ink/10 bg-paper p-3 sm:p-6">
            <p
              className={`text-4xl font-semibold sm:text-5xl ${
                division === "solar" ? "text-solar-700" : "text-realty-700"
              }`}
              data-counter={value}
              data-suffix={suffix}
            >
              {value}
              {suffix}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink/48">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessBand({ division }: { division: Exclude<Division, "group"> }) {
  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
              division === "solar" ? "text-solar-700" : "text-realty-500"
            }`}
          >
            Process
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            A short sequence because the work is actually sequential.
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {processSteps[division].map((step, index) => (
            <article
              key={step}
              className="reveal rounded-lg border border-ink/10 bg-white p-3 shadow-sm sm:p-6"
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold ${
                  division === "solar" ? "bg-solar-100 text-ink" : "bg-realty-100 text-realty-900"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm leading-6 text-ink/72 sm:mt-6 sm:text-base sm:leading-7">{step}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsBand({ division }: { division: Exclude<Division, "group"> }) {
  return (
    <section className="bg-ink px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {testimonials[division].map((item) => (
          <blockquote
            key={item.name}
            className="reveal rounded-lg border border-white/12 bg-white/8 p-6 sm:p-8"
          >
            <Sparkles
              size={24}
              className={division === "solar" ? "text-solar-500" : "text-realty-100"}
              aria-hidden="true"
            />
            <p className="mt-4 font-display text-2xl leading-tight text-white/88 sm:mt-6 sm:text-3xl">
              &ldquo;{item.quote}&rdquo;
            </p>
            <cite className="mt-5 block text-sm not-italic text-white/54">{item.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function FaqBand({ division }: { division: Exclude<Division, "group"> }) {
  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20" id="faqs">
      <div className="mx-auto max-w-4xl">
        <div className="reveal">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
              division === "solar" ? "text-solar-700" : "text-realty-500"
            }`}
          >
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Questions worth answering before the form.
          </h2>
        </div>
        <div className="mt-8 divide-y divide-ink/10 rounded-lg border border-ink/10 bg-white">
          {faqs[division].map((item) => (
            <details key={item.q} className="group p-4 open:bg-white sm:p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink">
                {item.q}
              </summary>
              <p className="mt-4 text-sm leading-6 text-ink/64">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta({
  division,
  title,
  text,
  href,
  label
}: {
  division: Exclude<Division, "group">;
  title: string;
  text: string;
  href: string;
  label: string;
}) {
  return (
    <section
      className={`px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20 ${
        division === "solar" ? "bg-solar-100" : "bg-realty-100"
      }`}
    >
      <div className="reveal mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/42">
            Next step
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink/64">{text}</p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {label}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function StoryBand({
  division,
  title,
  text,
  points
}: {
  division: Exclude<Division, "group">;
  title: string;
  text: string;
  points: string[];
}) {
  const logo = divisionLogos[division];

  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
              division === "solar" ? "text-solar-700" : "text-realty-500"
            }`}
          >
            Story
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">{title}</h2>
          <div className="mt-6 inline-flex rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={468}
              height={588}
              className="h-32 w-auto object-contain sm:h-40"
            />
          </div>
        </div>
        <div className="reveal">
          <p className="text-lg leading-8 text-ink/68">{text}</p>
          <div className="mt-8 grid gap-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-lg border border-ink/10 bg-white p-4"
              >
                <BadgeCheck
                  size={20}
                  className={division === "solar" ? "text-solar-700" : "text-realty-700"}
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-ink/66">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamBand({ division }: { division: Exclude<Division, "group"> }) {
  const roles =
    division === "solar"
      ? ["Energy Advisor", "EPC Engineer", "Subsidy and DISCOM Coordinator"]
      : ["Property Advisor", "Locality Research Lead", "Transaction Coordinator"];
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/42">
            Team
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Small expert teams around one accountable point of contact.
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role}
              className="reveal rounded-lg border border-ink/10 bg-paper p-3 sm:p-6"
            >
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${
                  division === "solar" ? "bg-solar-100" : "bg-realty-100"
                }`}
              >
                <Handshake size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug text-ink sm:mt-5 sm:text-3xl sm:leading-tight">{role}</h3>
              <p className="feature-card-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-4 sm:text-sm sm:leading-6">
                A named role in the workflow so clients know who is responsible for
                advice, documentation, coordination, and next-step clarity.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBand({ division }: { division: Exclude<Division, "group"> }) {
  const contact = contactConfig[division];
  const mapAddress = division === "realty" ? contact.branchOffice : contact.corporateOffice;
  const responseSteps =
    division === "realty"
      ? ["Property brief", "Site visit", "Advisor callback"]
      : ["Bill review", "Site survey", "Quote callback"];
  const accentText = division === "realty" ? "text-realty-500" : "text-solar-700";
  const accentIcon = division === "realty" ? "text-realty-700" : "text-solar-700";
  const panelClass =
    division === "realty"
      ? "border-realty-500/20 bg-realty-50"
      : "border-solar-500/25 bg-solar-50";

  return (
    <section className="bg-paper px-4 py-7 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-stretch lg:gap-8">
        <div className="reveal order-1 rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-6 lg:order-2 lg:p-8">
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${accentText}`}>
            Enquiry
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            Start with the form.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/62">
            Share your requirement and the team can respond with the right next step.
          </p>
          <div className="mt-5">
            <LeadForm division={division} compact submitLabel={`Send ${division} enquiry`} />
          </div>
          <div className="mt-5 border-t border-ink/10 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/42">
              Next steps
            </p>
            <div className="mt-3 grid gap-2 text-sm font-medium text-ink/68 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {responseSteps.map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <BadgeCheck size={16} className={`shrink-0 ${accentIcon}`} aria-hidden="true" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`reveal order-2 rounded-lg border p-4 shadow-sm sm:p-6 lg:order-1 lg:p-8 ${panelClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${accentText}`}>
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Send the right context to the right team.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-ink/66">
            <div className="flex flex-wrap gap-2">
              <Link
                href={contact.phoneHref}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ink/10 bg-white px-3 py-2 font-semibold text-ink shadow-sm transition hover:bg-ink hover:text-white"
              >
                <Phone size={16} aria-hidden="true" />
                {contact.phone}
              </Link>
              <Link
                href={contact.emailHref}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ink/10 bg-white px-3 py-2 font-semibold text-ink shadow-sm transition hover:bg-ink hover:text-white"
              >
                <Mail size={16} aria-hidden="true" />
                {contact.email}
              </Link>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-ink/10 bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/42">
                  Branch Office
                </p>
                <p className="mt-1 flex gap-2">
                  <MapPin className="mt-1 shrink-0 text-ink/42" size={16} aria-hidden="true" />
                  <span>{contact.branchOffice}</span>
                </p>
              </div>
              <div className="rounded-lg border border-ink/10 bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/42">
                  Corporate Office
                </p>
                <p className="mt-1 flex gap-2">
                  <MapPin className="mt-1 shrink-0 text-ink/42" size={16} aria-hidden="true" />
                  <span>{contact.corporateOffice}</span>
                </p>
              </div>
            </div>
          </div>
          <iframe
            title={`Milton ${division} office map`}
            className="mt-5 h-64 w-full rounded-lg border border-ink/10 sm:mt-8 sm:h-auto sm:aspect-[4/3]"
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}

function PartnerBand() {
  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
            Partner programme
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Better mandates need better context.
          </h2>
          <p className="mt-5 text-base leading-7 text-ink/64">
            Channel partners can share inventory, buyer requirements, hyperlocal
            intelligence, or transaction capacity. Milton Realty responds best to
            specific mandates with clean ownership and documentation status.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            {["Qualified inventory", "Buyer mandates", "Closure coordination"].map((item) => (
              <div key={item} className="rounded-lg border border-ink/10 bg-white p-3 sm:p-4">
                <ShieldCheck size={18} className="text-realty-700 sm:h-5 sm:w-5" aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold leading-snug text-ink sm:mt-3 sm:text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <LeadForm
            division="realty"
            compact
            submitLabel="Apply as channel partner"
            context="Channel partner enquiry"
          />
        </div>
      </div>
    </section>
  );
}

function FranchiseBand() {
  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
            Franchise
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            Local demand generation with central technical discipline.
          </h2>
          <p className="mt-5 text-base leading-7 text-ink/64">
            A good solar franchise partner knows the locality, earns trust fast, and
            sends qualified information into a quote process that the technical team
            can actually use.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            {["Lead qualification", "Survey coordination", "After-sales support"].map(
              (item) => (
                <div key={item} className="rounded-lg border border-ink/10 bg-white p-3 sm:p-4">
                  <SunMedium size={18} className="text-solar-700 sm:h-5 sm:w-5" aria-hidden="true" />
                  <p className="mt-2 text-xs font-semibold leading-snug text-ink sm:mt-3 sm:text-sm">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="reveal rounded-lg border border-ink/10 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <LeadForm
            division="solar"
            compact
            submitLabel="Apply for franchise"
            context="Solar franchise enquiry"
          />
        </div>
      </div>
    </section>
  );
}

function ResourcesHub() {
  const items = [
    {
      id: "solar-smart",
      title: "Solar Smart",
      text: "Plain-language explainers for bill reading, net metering, inverter choices, and generation expectations."
    },
    {
      id: "subsidy",
      title: "Avail Subsidy",
      text: "PM Surya Ghar guidance for residential applicants, including portal, vendor, document, and feasibility steps."
    },
    {
      id: "faqs",
      title: "FAQs",
      text: "Common questions about estimates, installation, product quotes, AMC, and enquiry handover."
    }
  ];

  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
            Resources
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            A hub shaped like the questions buyers actually ask.
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="reveal rounded-lg border border-ink/10 bg-white p-3 shadow-sm sm:p-6"
            >
              <MapPinned size={25} className="text-solar-700" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl leading-snug text-ink sm:mt-5 sm:text-3xl sm:leading-tight">
                {item.title}
              </h3>
              <p className="feature-card-copy mt-2 text-[12px] leading-5 text-ink/62 sm:mt-4 sm:text-sm sm:leading-6">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitBand({
  division,
  kicker,
  title,
  text,
  image,
  cta,
  secondary
}: {
  division: Division;
  kicker: string;
  title: string;
  text: string;
  image: string;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="grid bg-white lg:grid-cols-2">
      <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
        <div className="reveal max-w-xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.28em] ${
              division === "solar" ? "text-solar-700" : "text-realty-500"
            }`}
          >
            {kicker}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-7 text-ink/64">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              {cta.label}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-ink/14 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-ink/8"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DivisionRouteCard({
  title,
  href,
  image,
  text,
  tone
}: {
  title: string;
  href: string;
  image: string;
  text: string;
  tone: "realty" | "solar";
}) {
  return (
    <Link
      href={href}
      className="reveal group relative min-h-[260px] overflow-hidden rounded-lg text-white shadow-soft sm:min-h-[320px] lg:min-h-[420px]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <span
        className={`absolute inset-0 ${tone === "solar" ? "bg-[#312500]/58" : "bg-realty-900/60"}`}
      />
      <span className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="font-display text-2xl leading-tight sm:text-4xl lg:text-5xl">{title}</span>
        <span className="compact-copy mt-2 block max-w-md text-sm leading-6 text-white/72 sm:mt-4">{text}</span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          Enter division <ArrowRight size={17} aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}







