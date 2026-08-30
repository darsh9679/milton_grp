import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
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
  realtyDirectors,
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
  FootprintGallery,
  ListingsExplorer,
  MilestoneScroller,
  ProductCatalog,
  SolarSavingsCalculator,
  SolutionTabs
} from "@/components/InteractiveSections";

export function GroupHome() {
  return (
    <>
      <Hero
        division="group"
        kicker="Milton Group"
        title="Building value. Powering sustainable futures."
        text="Milton Realty shapes where we live, Milton Solar powers how we move forward. Where spaces grow, energy flows, & futures take shape."
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
              Distinct in expertise, united by one standard of quality. Each division
              retains its own identity while reflecting the values that define Milton.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
            <DivisionRouteCard
              title="Milton Realty"
              href="/realty-home"
              image={heroImages.realty}
              text="Curated property opportunities across India, shaped by local insight, market understanding, and long-term value."
              tone="realty"
            />
            <DivisionRouteCard
              title="Milton Solar"
              href="/solar-home"
              image={heroImages.solar}
              text="Power Your Home with Quality, Slash Your Bills with Savings, Own Your Energy with Pride."
              tone="solar"
            />
          </div>
        </div>
      </section>
      <FeatureGrid
        kicker="The Milton Way"
        title="Clear paths. Better context. Stronger decisions."
        cards={valueCards}
        division="group"
      />
      <SplitBand
        division="group"
        kicker="The Milton Identity"
        title="Every Path Leads to Milton."
        text="Every journey stays connected to Milton, while each division retains its distinct expertise and quality."
        highlight="Defined by Quality. Driven by Milton."
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
          title="Real estate decisions, curated with distinction."
          text="Trusted property advisory where expertise meets clarity, empowering every real estate decision with confidence."
          image={heroImages.realty}
          primary={{ href: "/realty-listings", label: "View Listings" }}
          secondary={{ href: "/realty-contact", label: "Talk to an Advisor" }}
        />
        <FeatureGrid
          kicker="Why Milton Realty"
          title="Where expertise, trust, and strategy come together to create exceptional real estate experiences."
          cards={realtyWhy}
          division="realty"
        />
        <ListingPreview />
        <StatsBand
          division="realty"
          stats={[
            ["111", "Properties in active review", ""],
            ["7", "Presence Across States & Countries", "+"],
            ["40", "Years of advisory memory", "+"]
          ]}
        />
        <ProcessBand division="realty" />
        <TestimonialsBand division="realty" />
        <FaqBand division="realty" />
        <ClosingCta
          division="realty"
          kicker="Let's Build Your Next Chapter"
          title="Because every great investment begins with trusted advice."
          text="Every successful property decision starts with understanding your goals. Let's begin with yours."
          href="/realty-contact"
          label="Start a Realty Enquiry"
        />
      </>
    );
  }

  if (kind === "about") {
    return (
      <>
        <RealtyAboutExperience />
        <ClosingCta
          division="realty"
          title="Begin a property conversation with context."
          text="Share your requirement, location preference, budget, or project interest and Milton Realty can route the right next step."
          href="/realty-contact"
          label="Start an Enquiry"
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
          image="/images/realty-blog/article-hero-banner.png"
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
            ["80", "Monthly bill saving", "%"]
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
        <SolarAboutExperience />
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
          title="Detailed solar system components."
          text="Panels, inverters, protection boxes, cables, and mounting structures are presented with the reliable brands used in Milton Solar installations."
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
          className={`mt-4 max-w-5xl break-words text-balance ${headingClass} text-3xl font-semibold leading-[1.12] sm:mt-5 sm:text-5xl sm:leading-tight lg:text-7xl`}
        >
          {title}
        </h1>
        <p data-hero-reveal className="mt-6 max-w-2xl break-words text-base leading-7 text-white/74">
          {text}
        </p>
      </div>
    </section>
  );
}

function RealtyAboutExperience() {
  const legacyStats = [
    ["40", "Years of legacy", "+", "Relationship-led property work across residences, land, and long-term advisory."],
    ["2", "Flagship towers", "", "Stardeous at Tardeo and Anthea at Versova anchor the Mumbai story."],
    ["5000", "Homes planned", "+", "A township-scale ambition connected to the Satara Hingani footprint."],
    ["7", "Corridors read", "", "Mumbai, MMR, Satara, Ratnagiri, Shirdi, Mahabaleshwar, and growth belts."]
  ];
  const pillars = [
    {
      title: "Vision",
      paragraphs: [
        "To shape the future through innovative, sustainable, and thoughtfully planned spaces that elevate the way people live. We aspire to build lasting value through excellence, while making quality and trust the foundation of every Milton development."
      ]
    },
    {
      title: "Mission",
      paragraphs: [
        "To create thoughtfully planned, quality spaces that meet diverse needs and deliver lasting value. We are committed to transparency, care, and excellence in every development, while building enduring relationships founded on trust."
      ]
    }
  ];
  const founder = {
    name: "Chiranjiv Vaghani",
    role: "Founder, Chairman & Visionary Leader",
    image: "/images/realty-about/html-reference-04.jpg",
    paragraphs: [
      "Mr. Chiranjiv Vaghani is a distinguished entrepreneur and visionary business leader with over four decades of experience, known for building trusted brands, creating lasting value, and identifying opportunities across industries.",
      "A graduate of Bombay University in Statistics and Economics and an alumnus of the Advanced Management Program at Harvard Business School, he brings a unique blend of strategic insight, business acumen, and disciplined execution.",
      "As Managing Director & CEO of Milton Plastics, Mr. Vaghani played a pivotal role in building it into a trusted household name - and now brings that same philosophy of quality, integrity, innovation, and trust to real estate.",
      "As the driving force behind Milton Realty, his vision is to create thoughtfully planned developments that offer not just exceptional spaces, but lasting value and a legacy built on trust."
    ]
  };
  const milestones = [
    {
      label: "Foundations",
      title: "Where the name was built",
      text: "Strategically positioned in a high-visibility location. Designed to capture attention and strengthen market presence.",
      image: "/images/realty-about/html-reference-14.jpg"
    },
    {
      label: "Tardeo, South Mumbai",
      title: "Stardeous",
      text: "A refined residential setting shaped by privacy and address value. An opportunity designed with a long-term perspective.",
      image: "/images/realty-about/html-reference-09.jpg"
    },
    {
      label: "Versova, Mumbai",
      title: "Anthea",
      text: "Coastal proximity. Elevated urban living. Connected to lifestyle, convenience, and opportunity.",
      image: "/images/realty-about/html-reference-01.jpg"
    },
    {
      label: "Expanding Horizons",
      title: "A growing presence",
      text: "Across destinations where lifestyle, growth, and opportunity converge.",
      image: "/images/realty-about/html-reference-13.jpg"
    },
    {
      label: "Today",
      title: "A Legacy That Continues",
      text: "An established presence in Satara. A local presence built on experience, relationships, and an informed understanding of property.",
      image: "/images/milton-group-hero-desktop.webp"
    }
  ];
  const projects = [
    {
      title: "Stardeous",
      place: "Tardeo, South Mumbai",
      image: "/images/realty-about/html-reference-09.jpg",
      text:
        "A high-value city residence story for buyers who want address strength, discretion, and connected urban access."
    },
    {
      title: "Anthea",
      place: "Versova, Mumbai",
      image: "/images/realty-about/html-reference-01.jpg",
      text:
        "A coastal western-suburb project story built around lifestyle access, metro connectivity, and social infrastructure."
    }
  ];
  const gallery = [
    { category: "Present project", title: "Anthea, Versova", image: "/images/realty-about/html-reference-01.jpg" },
    { category: "Present project", title: "Stardeous, Tardeo", image: "/images/realty-about/html-reference-09.jpg" },
    { category: "Land bank", title: "Satara footprint", image: "/images/realty-about/html-reference-13.jpg" },
    { category: "Past project", title: "Cine Mall, Vadodara", image: "/images/realty-about/html-reference-14.jpg" },
    { category: "Second homes", title: "Bungalow living", image: "/images/realty-about/html-reference-15.jpg" },
    { category: "Present project", title: "Anthea evening view", image: "/images/realty-about/html-reference-16.jpg" }
  ];
  const values = [
    ["Trust", "A clear brief, verified context, and patient advice before a shortlist is pushed."],
    ["Value", "Property guidance measured by fit, timing, documentation, and long-term use."],
    ["Excellence", "Premium service discipline for both high-value residences and budget-sensitive decisions."]
  ];

  return (
    <>
      <section className="relative flex min-h-[76svh] items-end overflow-hidden px-4 pb-10 pt-28 text-white sm:px-6 sm:pb-14 sm:pt-36 lg:min-h-[88vh] lg:px-8">
        <Image
          src="/images/realty-about/html-reference-01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(246,242,233,0.12),transparent_28%),linear-gradient(180deg,rgba(24,32,29,0.28)_0%,rgba(24,32,29,0.7)_64%,rgba(15,23,20,0.94)_100%),linear-gradient(90deg,rgba(24,32,29,0.9)_0%,rgba(24,32,29,0.52)_48%,rgba(24,32,29,0.12)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p data-hero-reveal className="text-xs font-semibold uppercase tracking-[0.32em] text-white/68">
            Residential - Plots - Lands
          </p>
          <h1
            data-hero-reveal
            className="mt-4 max-w-5xl text-balance font-display text-4xl font-semibold leading-[1.02] sm:mt-5 sm:text-6xl lg:text-8xl"
          >
            Over 40+ Years of Excellence, Quality & Trust
          </h1>
          <div className="mt-7 flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p data-hero-reveal className="max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
              From landmark Mumbai residences to serene second homes across Maharashtra, we create quality spaces designed for living, investing, and lasting value.
            </p>
            <div data-hero-reveal className="flex flex-wrap gap-3">
              <Link
                href="#realty-profile"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-realty-100"
              >
                Our Story
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/realty-contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/32 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4">
            {legacyStats.map(([value, label, suffix]) => (
              <div key={label} data-hero-reveal className="border border-white/12 bg-white/8 p-3 backdrop-blur-sm">
                <p className="font-display text-3xl leading-none sm:text-4xl" data-counter={value} data-suffix={suffix}>
                  {value}
                  {suffix}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="realty-profile" className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div data-about-image className="relative min-h-[340px] overflow-hidden rounded-lg bg-ink shadow-soft sm:min-h-[520px]">
            <Image
              src="/images/realty-about/html-reference-02.jpg"
              alt="Milton Realty property landscape"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/62 via-ink/8 to-transparent" />
            <div className="absolute bottom-4 left-4 max-w-[240px] rounded-lg border border-white/18 bg-white/12 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Milton Realty
              </p>
              <p className="mt-2 font-display text-3xl leading-none">Trust first. Transaction second.</p>
            </div>
          </div>
          <div data-about-panel="right">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              The profile
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
              Decades of Experience, Quality & Trust.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/66 sm:text-lg sm:leading-9">
              <p>
                Milton Realty brings the trusted Milton legacy into real estate, backed by decades of business experience, market knowledge, and a commitment to quality. We create thoughtfully planned residences, townships, plots, and second-home opportunities designed to deliver lasting value, transparent experiences, and the confidence that comes with a trusted name.
              </p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["40+ years", "Chiranjiv Vaghani", "Mumbai, India"].map((item) => (
                <div key={item} className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
                  <Sparkles size={18} className="text-realty-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionVisionEditorial division="realty" pillars={pillars} />

      <section className="scroll-mt-24 bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-12">
          <div data-about-panel="left" className="flex flex-col lg:h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Founder & Chairman
            </h2>
            <div data-about-image className="relative mt-5 aspect-square w-full overflow-hidden bg-ink shadow-soft sm:aspect-[3/4] lg:aspect-auto lg:h-auto lg:flex-1">
              <Image
                src={founder.image}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/72 to-transparent p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66">
                  Over four decades
                </p>
                <p className="mt-1 font-display text-2xl leading-none sm:text-3xl">
                  Real estate leadership
                </p>
              </div>
            </div>
          </div>
          <article data-about-panel="right" className="max-w-[60ch]">
            <div className="border-b border-ink/12 pb-4 sm:pb-5">
              <h3 className="font-sans text-2xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.15rem]">
                {founder.name}
              </h3>
              <p className="mt-2 text-base font-medium text-realty-500">
                {founder.role}
              </p>
            </div>
            <div className="mt-5 space-y-3 text-[15px] leading-7 text-ink/68 sm:text-base sm:leading-8 lg:text-[15px] lg:leading-7">
              {founder.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "text-base font-medium leading-8 text-ink/86 sm:text-[17px] sm:leading-8" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/chiranjiv-vaghani"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-realty-700"
            >
              View full profile
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section id="realty-directors" className="scroll-mt-24 bg-[#f8f7f2] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div data-about-panel="left" className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              The board
            </p>
            <h2 className="mt-3 font-sans text-[2rem] font-black uppercase leading-none text-ink sm:text-4xl lg:text-[2.85rem]">
              <span className="block sm:inline">Board of</span>{" "}
              <span className="block sm:inline">Directors</span>
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-8 lg:gap-10">
            {realtyDirectors.map((director) => (
              <Link
                key={director.slug}
                href={director.href}
                data-about-gallery
                className="group min-w-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#ece7dc] sm:aspect-[5/5.6] md:aspect-auto md:h-[clamp(260px,27vw,360px)]">
                  <Image
                    src={director.image}
                    alt={director.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 30vw, 48vw"
                    style={{ objectPosition: director.position }}
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4 sm:gap-3 md:mt-5 md:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-base lg:text-2xl">{director.name}</h3>
                    <p className="mt-1.5 text-[11px] leading-4 text-ink/60 sm:text-xs md:mt-2 md:text-sm md:leading-5 lg:text-[15px]">{director.cardRole}</p>
                  </div>
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-end text-ink transition duration-300 group-hover:translate-x-1.5 group-hover:text-realty-700 sm:h-6 sm:w-6 md:h-8 md:w-8">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[23px] lg:w-[23px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              The journey
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              Milestones of a legacy.
            </h2>
          </div>
          <MilestoneScroller milestones={milestones} />
        </div>
      </section>

      <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
                Flagship developments
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
                Project stories that explain the standard.
              </h2>
            </div>
            <Link href="/realty-listings" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              View Listings
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.title} data-about-panel={index === 0 ? "left" : "right"} className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-realty-500">{project.place}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/64 sm:text-base">{project.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              Past and present
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
              A gallery of the footprint.
            </h2>
          </div>
          <div className="mt-8">
            <FootprintGallery items={gallery} />
          </div>
        </div>
      </section>

      <section className="bg-realty-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/46">
              Why invest with Milton
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              Building trust. Creating value. Delivering excellence.
            </h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-3">
            {values.map(([title, text]) => (
              <article key={title} data-about-panel="up" className="bg-realty-900 p-5 sm:p-7">
                <ShieldCheck size={22} className="text-realty-100" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SolarAboutExperience() {
  const legacyStats = [
    ["1", "Solar desk", "", "Residential, commercial, product, subsidy, and AMC conversations routed through one team."],
    ["4", "Core paths", "", "Rooftop EPC, commercial systems, solar products, and long-term maintenance."],
    ["80", "Monthly bill saving", "%", "Planning starts with practical savings assumptions before system selection."],
    ["24", "Support mindset", "x7", "Every enquiry is handled with installation, service, and after-care context."]
  ];
  const pillars = [
    {
      title: "Vision",
      paragraphs: [
        "To shape the future through innovative, sustainable, and thoughtfully planned spaces that elevate the way people live. We aspire to build lasting value through excellence, while making quality and trust the foundation of every Milton development."
      ]
    },
    {
      title: "Mission",
      paragraphs: [
        "To create thoughtfully planned, quality spaces that meet diverse needs and deliver lasting value. We are committed to transparency, care, and excellence in every development, while building enduring relationships founded on trust."
      ]
    }
  ];
  const founder = {
    name: "Chiranjiv Vaghani",
    role: "Founder, Chairman & Visionary Leader",
    image: "/images/solar-about/html-reference-04.jpg",
    paragraphs: [
      "Mr. Chiranjiv Vaghani is a distinguished entrepreneur and visionary business leader with over four decades of experience, known for building trusted brands, creating lasting value, and identifying opportunities across industries.",
      "A graduate of Bombay University in Statistics and Economics and an alumnus of the Advanced Management Program at Harvard Business School, he brings a unique blend of strategic insight, business acumen, and disciplined execution.",
      "As Managing Director & CEO of Milton Plastics, Mr. Vaghani played a pivotal role in building it into a trusted household name - and now brings that same philosophy of quality, integrity, innovation, and trust to real estate.",
      "As the driving force behind Milton Realty, his vision is to create thoughtfully planned developments that offer not just exceptional spaces, but lasting value and a legacy built on trust."
    ]
  };
  const solarDirectors = realtyDirectors.map((director) => ({
    ...director,
    image: director.image.replace("/images/realty-about/", "/images/solar-about/")
  }));
  const projects = [
    {
      title: "Residential Rooftop",
      place: "Homes and societies",
      image: heroImages.roof,
      text:
        "Bill-led rooftop planning with subsidy guidance, net-metering support, inverter selection, and clean handover."
    },
    {
      title: "Commercial Solar",
      place: "Business and industrial roofs",
      image: heroImages.solar,
      text:
        "EPC planning for operating buildings where daytime consumption, roof safety, monitoring, and payback matter."
    }
  ];
  const gallery = [
    { category: "Panels", title: "Solar Panels", image: "/images/solar-shop/panels/01.jpg" },
    { category: "Inverter", title: "Solar Inverter", image: "/images/solar-shop/inverter/01.jpg" },
    { category: "Protection", title: "ACDB & DCDB", image: "/images/solar-shop/acdb-dcdb/01.jpg" },
    { category: "Cables", title: "Solar Cables", image: "/images/solar-shop/cables/01.jpg" },
    { category: "Structure", title: "Mounting Structure", image: "/images/solar-shop/structure/01.jpg" }
  ];
  const values = [
    ["Calculation", "Every proposal begins with real usage, practical sizing, and savings logic."],
    ["Engineering", "Roof, shade, safety, metering, inverter, and cable routing are treated as one system."],
    ["Support", "Commissioning is not the finish line; monitoring, AMC, and service keep the asset healthy."]
  ];

  return (
    <>
      <section className="relative flex min-h-[76svh] items-end overflow-hidden px-4 pb-10 pt-28 text-white sm:px-6 sm:pb-14 sm:pt-36 lg:min-h-[88vh] lg:px-8">
        <Image
          src={heroImages.solar}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_center]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(255,239,186,0.16),transparent_30%),linear-gradient(180deg,rgba(24,32,29,0.24)_0%,rgba(24,32,29,0.66)_62%,rgba(15,23,20,0.95)_100%),linear-gradient(90deg,rgba(24,32,29,0.9)_0%,rgba(24,32,29,0.52)_48%,rgba(24,32,29,0.12)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p data-hero-reveal className="text-xs font-semibold uppercase tracking-[0.32em] text-white/68">
            Rooftop - EPC - Maintenance
          </p>
          <h1
            data-hero-reveal
            className="mt-4 max-w-5xl text-balance solar-heading text-4xl font-semibold leading-[1.02] sm:mt-5 sm:text-6xl lg:text-8xl"
          >
            Solar decisions built on real numbers.
          </h1>
          <div className="mt-7 flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p data-hero-reveal className="max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
              From home rooftops to commercial systems, Milton Solar turns electricity bills, roofs, products, and maintenance into a clear adoption path.
            </p>
            <div data-hero-reveal className="flex flex-wrap gap-3">
              <Link
                href="#solar-profile"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-solar-100"
              >
                Our Story
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/solar-contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/32 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4">
            {legacyStats.map(([value, label, suffix]) => (
              <div key={label} data-hero-reveal className="border border-white/12 bg-white/8 p-3 backdrop-blur-sm">
                <p className="solar-heading text-3xl font-semibold leading-none sm:text-4xl" data-counter={value} data-suffix={suffix}>
                  {value}
                  {suffix}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solar-profile" className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div data-about-image className="relative min-h-[340px] overflow-hidden rounded-lg bg-ink shadow-soft sm:min-h-[520px]">
            <Image
              src={heroImages.roof}
              alt="Milton Solar rooftop installation"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/62 via-ink/8 to-transparent" />
            <div className="absolute bottom-4 left-4 max-w-[240px] rounded-lg border border-white/18 bg-white/12 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Milton Solar
              </p>
              <p className="mt-2 solar-heading text-3xl font-semibold leading-none">Calculate first. Install second.</p>
            </div>
          </div>
          <div data-about-panel="right">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
              The profile
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
              A solar desk built for clarity before commitment.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/66 sm:text-lg sm:leading-9">
              <p>
                Milton Solar helps customers understand whether solar makes sense for their bill, roof, usage pattern, subsidy eligibility, and long-term maintenance expectations.
              </p>
              <p>
                The work is intentionally practical: read the site, calculate the system, explain the economics, install responsibly, and stay available after commissioning.
              </p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Bill-led sizing", "EPC discipline", "AMC support"].map((item) => (
                <div key={item} className="rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
                  <SunMedium size={18} className="text-solar-700" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionVisionEditorial division="solar" pillars={pillars} />

      <section className="scroll-mt-24 bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-12">
          <div data-about-panel="left" className="flex flex-col lg:h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Founder & Chairman
            </h2>
            <div data-about-image className="relative mt-5 aspect-square w-full overflow-hidden bg-ink shadow-soft sm:aspect-[3/4] lg:aspect-auto lg:h-auto lg:flex-1">
              <Image
                src={founder.image}
                alt={`${founder.name}, ${founder.role}`}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/72 to-transparent p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66">
                  Over four decades
                </p>
                <p className="mt-1 font-display text-2xl leading-none sm:text-3xl">
                  Real estate leadership
                </p>
              </div>
            </div>
          </div>
          <article data-about-panel="right" className="max-w-[60ch]">
            <div className="border-b border-ink/12 pb-4 sm:pb-5">
              <h3 className="font-sans text-2xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.15rem]">
                {founder.name}
              </h3>
              <p className="mt-2 text-base font-medium text-solar-700">
                {founder.role}
              </p>
            </div>
            <div className="mt-5 space-y-3 text-[15px] leading-7 text-ink/68 sm:text-base sm:leading-8 lg:text-[15px] lg:leading-7">
              {founder.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "text-base font-medium leading-8 text-ink/86 sm:text-[17px] sm:leading-8" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href="/chiranjiv-vaghani"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-solar-700"
            >
              View full profile
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section id="solar-directors" className="scroll-mt-24 bg-[#f8f7f2] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div data-about-panel="left" className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
              The board
            </p>
            <h2 className="mt-3 font-sans text-[2rem] font-black uppercase leading-none text-ink sm:text-4xl lg:text-[2.85rem]">
              <span className="block sm:inline">Board of</span>{" "}
              <span className="block sm:inline">Directors</span>
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-8 lg:gap-10">
            {solarDirectors.map((director) => (
              <Link
                key={director.slug}
                href={director.href}
                data-about-gallery
                className="group min-w-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#ece7dc] sm:aspect-[5/5.6] md:aspect-auto md:h-[clamp(260px,27vw,360px)]">
                  <Image
                    src={director.image}
                    alt={director.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 30vw, 48vw"
                    style={{ objectPosition: director.position }}
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4 sm:gap-3 md:mt-5 md:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-base lg:text-2xl">{director.name}</h3>
                    <p className="mt-1.5 text-[11px] leading-4 text-ink/60 sm:text-xs md:mt-2 md:text-sm md:leading-5 lg:text-[15px]">{director.cardRole}</p>
                  </div>
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-end text-ink transition duration-300 group-hover:translate-x-1.5 group-hover:text-solar-700 sm:h-6 sm:w-6 md:h-8 md:w-8">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-[23px] lg:w-[23px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
                Flagship solutions
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-5xl">
                Solar paths that explain the standard.
              </h2>
            </div>
            <Link href="/solar-solutions" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              View Solutions
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.title} data-about-panel={index === 0 ? "left" : "right"} className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-solar-700">{project.place}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/64 sm:text-base">{project.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-solar-700">
              Systems and products
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
              A gallery of the solar footprint.
            </h2>
          </div>
          <div className="mt-8">
            <FootprintGallery items={gallery} />
          </div>
        </div>
      </section>

      <section className="bg-solar-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-about-panel="left" className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/46">
              Why choose Milton Solar
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-5xl">
              Clear calculations. Careful installation. Dependable support.
            </h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 md:grid-cols-3">
            {values.map(([title, text]) => (
              <article key={title} data-about-panel="up" className="bg-solar-900 p-5 sm:p-7">
                <ShieldCheck size={22} className="text-solar-100" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type MissionVisionPillar = {
  title: string;
  paragraphs: string[];
};

function MissionVisionEditorial({
  division,
  pillars
}: {
  division: Exclude<Division, "group">;
  pillars: MissionVisionPillar[];
}) {
  const accent = division === "solar" ? "text-solar-700" : "text-[#8a5f28]";
  const mission = pillars.find((pillar) => pillar.title === "Mission") ?? pillars[1];
  const vision = pillars.find((pillar) => pillar.title === "Vision") ?? pillars[0];

  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div data-about-panel="up" className="mx-auto max-w-3xl text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${accent}`}>
            What drives us
          </p>
          <h2 className="mt-5 font-display text-5xl leading-tight text-[#33271c] sm:text-6xl">
            Mission &amp; Vision
          </h2>
          <div className="mx-auto mt-8 h-px w-14 bg-[#b08d57]/45" />
        </div>

        <div className="mx-auto mt-16 grid max-w-[1180px] items-center justify-center gap-8 text-center lg:mt-20 lg:grid-cols-[minmax(0,440px)_auto_minmax(0,440px)] lg:gap-14 lg:text-left">
          <div data-about-panel="left" className="mx-auto w-full max-w-[440px]">
            <p className="font-display text-2xl italic leading-tight text-[#8a5f28]">
              Mission
            </p>
            <div className="mt-5 space-y-4">
              {mission.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-9 text-[#5c4c3c] sm:text-xl sm:leading-10">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            data-about-panel="up"
            className="font-display text-7xl leading-none text-[#b08d57] sm:text-8xl lg:px-2"
            aria-hidden="true"
          >
            &amp;
          </div>

          <div data-about-panel="right" className="mx-auto w-full max-w-[440px]">
            <p className="font-display text-2xl italic leading-tight text-[#1f3049]">
              Vision
            </p>
            <div className="mt-5 space-y-4">
              {vision.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-9 text-[#5c4c3c] sm:text-xl sm:leading-10">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
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
              Discover opportunities worth your attention.
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
              className="reveal grid grid-cols-[0.76fr_1.24fr] overflow-hidden rounded-lg border border-white/12 bg-white/8 sm:flex sm:flex-col"
            >
              <div className="relative min-h-[140px] overflow-hidden sm:aspect-[5/3] sm:min-h-0 sm:shrink-0 lg:aspect-[4/3]">
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 38vw"
                  className="object-cover"
                />
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
              </div>
              <div className="p-4 sm:flex sm:flex-1 sm:flex-col sm:p-5">
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
  const kicker = division === "realty" ? "The Milton Way" : "Process";
  const title =
    division === "realty"
      ? "A seamless journey, thoughtfully designed to guide every property decision with clarity & confidence."
      : "A short sequence because the work is actually sequential.";

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
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
            {title}
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
  const title = division === "realty" ? "Everything Worth Knowing." : "Questions worth answering before the form.";

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
            {title}
          </h2>
        </div>
        <div className="mt-8 divide-y divide-ink/10 rounded-lg border border-ink/10 bg-white">
          {faqs[division].map((item) => (
            <details key={item.q} className="group p-4 open:bg-white sm:p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                {item.q}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-ink/48 transition-transform duration-300 group-open:rotate-180"
                />
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
  kicker = "Next step",
  title,
  text,
  href,
  label
}: {
  division: Exclude<Division, "group">;
  kicker?: string;
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
            {kicker}
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

function ContactBand({ division }: { division: Exclude<Division, "group"> }) {
  const contact = contactConfig[division];
  const mapAddress =
    division === "realty" ? contact.branchOffice : contact.mapQuery || contact.branchOffice;
  const mapSrc =
    contact.mapEmbedSrc ||
    `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`;
  const officeCards =
    division === "solar"
      ? [{ label: "Solar Office", address: contact.branchOffice }]
      : [
          { label: "Branch Office", address: contact.branchOffice },
          { label: "Corporate Office", address: contact.corporateOffice }
        ];
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
            <div className={`grid gap-2 ${officeCards.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {officeCards.map((office) => (
                <div key={office.label} className="rounded-lg border border-ink/10 bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/42">
                    {office.label}
                  </p>
                  <p className="mt-1 flex gap-2">
                    <MapPin className="mt-1 shrink-0 text-ink/42" size={16} aria-hidden="true" />
                    <span>{office.address}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <iframe
            title={`Milton ${division} office map`}
            className="mt-5 h-64 w-full rounded-lg border border-ink/10 sm:mt-8 sm:h-auto sm:aspect-[4/3]"
            loading="lazy"
            src={mapSrc}
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
  highlight,
  image,
  cta,
  secondary
}: {
  division: Division;
  kicker: string;
  title: string;
  text: string;
  highlight?: string;
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
          {highlight ? (
            <p
              className={`mt-4 border-l-2 pl-4 text-base font-semibold leading-7 text-ink sm:text-lg ${
                division === "solar" ? "border-solar-500/60" : "border-realty-500/60"
              }`}
            >
              {highlight}
            </p>
          ) : null}
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
