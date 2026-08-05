import type { LucideIcon } from "lucide-react";
import {
  BadgeIndianRupee,
  BatteryCharging,
  Building2,
  Factory,
  Home,
  Leaf,
  Lightbulb,
  MapPin,
  PlugZap,
  ShieldCheck,
  SunMedium,
  Trees,
  Users,
  Wrench
} from "lucide-react";

export type Division = "group" | "realty" | "solar";

export type PageSlug =
  | "realty-home"
  | "realty-about"
  | "realty-listings"
  | "realty-blog"
  | "realty-channel-partner"
  | "realty-contact"
  | "solar-home"
  | "solar-about"
  | "solar-franchise"
  | "solar-solutions"
  | "solar-shop"
  | "solar-resources"
  | "solar-contact";

export type PageKind =
  | "home"
  | "about"
  | "listings"
  | "blog"
  | "partner"
  | "contact"
  | "franchise"
  | "solutions"
  | "shop"
  | "resources";

export const pageSlugs: PageSlug[] = [
  "realty-home",
  "realty-about",
  "realty-listings",
  "realty-blog",
  "realty-channel-partner",
  "realty-contact",
  "solar-home",
  "solar-about",
  "solar-franchise",
  "solar-solutions",
  "solar-shop",
  "solar-resources",
  "solar-contact"
];

export const pageInfo: Record<
  PageSlug,
  {
    title: string;
    description: string;
    division: Exclude<Division, "group">;
    kind: PageKind;
  }
> = {
  "realty-home": {
    title: "Milton Realty",
    description:
      "Mumbai and Maharashtra property advisory for flats, land, bungalows, resale, renting, and investment search.",
    division: "realty",
    kind: "home"
  },
  "realty-about": {
    title: "Milton Realty About",
    description:
      "The Milton Realty story, values, and property advisory approach across Mumbai and Maharashtra.",
    division: "realty",
    kind: "about"
  },
  "realty-listings": {
    title: "Milton Realty Listings",
    description:
      "Filter Milton Realty opportunities by city, property type, and budget, then enquire with property context prefilled.",
    division: "realty",
    kind: "listings"
  },
  "realty-blog": {
    title: "Milton Realty Blog",
    description:
      "Real estate articles on Mumbai micro-markets, coastal property, land investment, and buyer readiness.",
    division: "realty",
    kind: "blog"
  },
  "realty-channel-partner": {
    title: "Milton Realty Channel Partner",
    description:
      "Broker and channel partner programme for property professionals working with Milton Realty.",
    division: "realty",
    kind: "partner"
  },
  "realty-contact": {
    title: "Milton Realty Contact",
    description:
      "Contact Milton Realty for property enquiries, site visits, selling assistance, and rental advisory.",
    division: "realty",
    kind: "contact"
  },
  "solar-home": {
    title: "Milton Solar",
    description:
      "Solar EPC, rooftop solar, savings estimation, commercial systems, and AMC for homes and businesses.",
    division: "solar",
    kind: "home"
  },
  "solar-about": {
    title: "Milton Solar About",
    description:
      "Milton Solar's mission, team approach, and end-to-end solar EPC delivery model.",
    division: "solar",
    kind: "about"
  },
  "solar-franchise": {
    title: "Milton Solar Franchise",
    description:
      "Solar franchise and partnership opportunities for local entrepreneurs and energy advisors.",
    division: "solar",
    kind: "franchise"
  },
  "solar-solutions": {
    title: "Milton Solar Solutions",
    description:
      "Residential, commercial, industrial, and AMC solar services from site survey to commissioning.",
    division: "solar",
    kind: "solutions"
  },
  "solar-shop": {
    title: "Milton Solar Shop",
    description:
      "Enquiry-first solar product catalogue for solar systems, pumps, lights, panels, and accessories.",
    division: "solar",
    kind: "shop"
  },
  "solar-resources": {
    title: "Milton Solar Resources",
    description:
      "Solar learning hub with blogs, Solar Smart explainers, PM Surya Ghar subsidy guidance, and FAQs.",
    division: "solar",
    kind: "resources"
  },
  "solar-contact": {
    title: "Milton Solar Contact",
    description:
      "Contact Milton Solar for rooftop solar, EPC, franchise, product, and AMC enquiries.",
    division: "solar",
    kind: "contact"
  }
};

export const divisionRoutes = {
  realty: [
    { href: "/", label: "Group Home" },
    { href: "/realty-home", label: "Realty Home" },
    { href: "/realty-about", label: "About" },
    { href: "/realty-listings", label: "Listings" },
    { href: "/realty-blog", label: "Blog" },
    { href: "/realty-channel-partner", label: "Channel Partner" },
    { href: "/realty-contact", label: "Contact" },
    { href: "/solar-home", label: "Milton Solar" }
  ],
  solar: [
    { href: "/", label: "Group Home" },
    { href: "/solar-home", label: "Solar Home" },
    { href: "/solar-about", label: "About" },
    { href: "/solar-franchise", label: "Franchise" },
    {
      href: "/solar-solutions",
      label: "Solutions",
      children: [
        { href: "/solar-solutions#residential", label: "Residential" },
        { href: "/solar-solutions#commercial", label: "Commercial" },
        { href: "/solar-solutions#industrial", label: "Industrial" },
        { href: "/solar-solutions#amc", label: "AMC" }
      ]
    },
    { href: "/solar-shop", label: "Shop" },
    {
      href: "/solar-resources",
      label: "Resources",
      children: [
        { href: "/solar-resources#blog", label: "Blog" },
        { href: "/solar-resources#solar-smart", label: "Solar Smart" },
        { href: "/solar-resources#subsidy", label: "Avail Subsidy" },
        { href: "/solar-resources#faqs", label: "FAQs" }
      ]
    },
    { href: "/solar-contact", label: "Contact" },
    { href: "/realty-home", label: "Milton Realty" }
  ]
};

const sharedContactDetails = {
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "info@realestate.com",
  emailHref: "mailto:info@realestate.com",
  branchOffice:
    "Aman Chambers, 4th Floor, Office No 3, Next to HDFC Bank, Opera House, Opp Charni Road Station, Mumbai 400004",
  corporateOffice:
    "Maker Chamber V, 705, 7th Floor, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021",
  address:
    "Branch Office: Aman Chambers, 4th Floor, Office No 3, Next to HDFC Bank, Opera House, Opp Charni Road Station, Mumbai 400004. Corporate Office: Maker Chamber V, 705, 7th Floor, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021."
};

export const contactConfig = {
  group: {
    ...sharedContactDetails,
    whatsapp:
      process.env.NEXT_PUBLIC_MILTON_REALTY_WHATSAPP_NUMBER || "919876543210",
    contactHref: "/realty-contact",
    leadSource: "Milton Group Website"
  },
  realty: {
    ...sharedContactDetails,
    whatsapp:
      process.env.NEXT_PUBLIC_MILTON_REALTY_WHATSAPP_NUMBER || "919876543210",
    contactHref: "/realty-contact",
    leadSource: "Milton Realty Website"
  },
  solar: {
    ...sharedContactDetails,
    whatsapp:
      process.env.NEXT_PUBLIC_MILTON_SOLAR_WHATSAPP_NUMBER || "919876543210",
    contactHref: "/solar-contact",
    leadSource: "Milton Solar Website"
  }
};

export const heroImages = {
  group: "/images/milton-group-hero-desktop.webp",
  realty: "/images/milton-realty-hero.webp",
  solar: "/images/milton-solar-hero.webp",
  interior:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80",
  coastline:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
  field:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80",
  roof:
    "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1800&q=80"
};

const numberedGallery = (folder: string) =>
  [1, 2, 3, 4].map((number) => `/images/${folder}/${String(number).padStart(2, "0")}.jpg`);

const realtyListingImage = (id: string) => `/images/realty-listings/${id}/01.jpg`;
const realtyListingGallery = (id: string) => numberedGallery(`realty-listings/${id}`);
const solarProductImage = (id: string) => `/images/solar-shop/${id}/01.jpg`;
const solarProductGallery = (id: string) => numberedGallery(`solar-shop/${id}`);

const realtyListingImages = {
  versova: realtyListingImage("versova-sea-view"),
  tardeo: realtyListingImage("tardeo-heritage"),
  satara: realtyListingImage("satara-eco-plots"),
  guhagar: realtyListingImage("guhagar-coastal"),
  shirdi: realtyListingImage("shirdi-hospitality"),
  mahabaleshwar: realtyListingImage("mahabaleshwar-retreat"),
  kalyan: realtyListingImage("kalyan-compact")
};

export const realtyListings = [
  {
    id: "versova-sea-view",
    name: "Versova Sea-View Apartment",
    city: "Mumbai",
    locality: "Versova",
    type: "Flat",
    budgetBand: "Premium",
    budget: "Rs. 3.2 Cr onwards",
    specs: ["2 and 3 BHK", "Beach-side micro-market", "Metro-linked suburb"],
    image: realtyListingImages.versova,
    gallery: realtyListingGallery("versova-sea-view"),
    description:
      "A composed coastal apartment opportunity for end-users who want social infrastructure, beach proximity, and stronger western-suburb connectivity."
  },
  {
    id: "tardeo-heritage",
    name: "Tardeo Heritage Residence",
    city: "Mumbai",
    locality: "Tardeo",
    type: "Flat",
    budgetBand: "Luxury",
    budget: "Price on request",
    specs: ["Low-density tower", "South Mumbai address", "Large-format homes"],
    image: realtyListingImages.tardeo,
    gallery: realtyListingGallery("tardeo-heritage"),
    description:
      "A discreet South Mumbai residence positioned for buyers prioritising address value, privacy, and long-horizon capital preservation."
  },
  {
    id: "satara-eco-plots",
    name: "Satara Eco Plot Community",
    city: "Satara",
    locality: "Near Pandharpur and Bengaluru Highway access",
    type: "Land",
    budgetBand: "Value",
    budget: "Rs. 18 L onwards",
    specs: ["NA plots", "Eco-home ready", "Highway access"],
    image: realtyListingImages.satara,
    gallery: realtyListingGallery("satara-eco-plots"),
    description:
      "Grounded in Milton's existing Satara presence, this land-led opportunity is suited to second homes, compact villas, and patient investors."
  },
  {
    id: "guhagar-coastal",
    name: "Guhagar Coastal Bungalow Land",
    city: "Ratnagiri",
    locality: "Guhagar",
    type: "Bungalow",
    budgetBand: "Mid",
    budget: "Rs. 42 L onwards",
    specs: ["Konkan coast", "Villa footprint", "Weekend-home potential"],
    image: realtyListingImages.guhagar,
    gallery: realtyListingGallery("guhagar-coastal"),
    description:
      "A coastal bungalow canvas for buyers seeking open air, local character, and a slower investment rhythm beyond the city."
  },
  {
    id: "shirdi-hospitality",
    name: "Shirdi Hospitality Plot",
    city: "Shirdi",
    locality: "Pilgrim corridor",
    type: "Land",
    budgetBand: "Mid",
    budget: "Rs. 55 L onwards",
    specs: ["Commercial potential", "Tourism catchment", "Flexible frontage"],
    image: realtyListingImages.shirdi,
    gallery: realtyListingGallery("shirdi-hospitality"),
    description:
      "A land opportunity suited to operators and investors exploring hospitality, short-stay, or service-led development near Shirdi."
  },
  {
    id: "mahabaleshwar-retreat",
    name: "Hill Retreat near Mahabaleshwar",
    city: "Satara",
    locality: "Near Mahabaleshwar",
    type: "Bungalow",
    budgetBand: "Premium",
    budget: "Rs. 95 L onwards",
    specs: ["Hill-town access", "Low-density living", "Second-home plan"],
    image: realtyListingImages.mahabaleshwar,
    gallery: realtyListingGallery("mahabaleshwar-retreat"),
    description:
      "A second-home proposition for families who want climate, quiet, and a future-ready retreat close to established hill-town demand."
  },
  {
    id: "kalyan-compact",
    name: "Kalyan Connected Flats",
    city: "Kalyan",
    locality: "Kalyan West",
    type: "Flat",
    budgetBand: "Value",
    budget: "Rs. 48 L onwards",
    specs: ["1 and 2 BHK", "MMR growth corridor", "Transit-oriented demand"],
    image: realtyListingImages.kalyan,
    gallery: realtyListingGallery("kalyan-compact"),
    description:
      "A practical MMR option for first-time buyers, rental investors, and families upgrading within a defined budget."
  }
];

export const solarProducts = [
  {
    id: "solar-power-5kw",
    category: "Solar Systems",
    name: "On-Grid Solar Plant 5kW",
    spec: "Rooftop on-grid package with inverter, net-metering support, and optional AMC.",
    price: "Quote based on site survey",
    image: solarProductImage("solar-power-5kw"),
    gallery: solarProductGallery("solar-power-5kw")
  },
  {
    id: "hybrid-home-system",
    category: "Solar Systems",
    name: "Hybrid Home Solar System",
    spec: "Battery-ready residential system for backup-sensitive homes.",
    price: "Request estimate",
    image: solarProductImage("hybrid-home-system"),
    gallery: solarProductGallery("hybrid-home-system")
  },
  {
    id: "solar-water-pump",
    category: "Solar Water Pumps",
    name: "Solar Water Pump Set",
    spec: "Agriculture and bungalow pumping package with controller and panel sizing.",
    price: "Request quote",
    image: solarProductImage("solar-water-pump"),
    gallery: solarProductGallery("solar-water-pump")
  },
  {
    id: "semi-integrated-street-light",
    category: "Solar Lights",
    name: "Semi Integrated Solar Street Light 200W",
    spec: "Street and society pathway lighting with panel, battery, and dusk sensor.",
    price: "Rs. 5,041 indicative",
    image: solarProductImage("semi-integrated-street-light"),
    gallery: solarProductGallery("semi-integrated-street-light")
  },
  {
    id: "solar-flood-200",
    category: "Solar Lights",
    name: "Solar Flood Light 200W",
    spec: "Outdoor security and yard lighting with remote control and IP-rated body.",
    price: "Rs. 4,200 indicative",
    image: solarProductImage("solar-flood-200"),
    gallery: solarProductGallery("solar-flood-200")
  },
  {
    id: "solar-garden-flame",
    category: "Solar Lights",
    name: "Solar Flame Garden Lamp",
    spec: "Decorative garden lighting with automatic dusk operation.",
    price: "Rs. 820 indicative",
    image: solarProductImage("solar-garden-flame"),
    gallery: solarProductGallery("solar-garden-flame")
  },
  {
    id: "bubble-string-light",
    category: "Solar Lights",
    name: "Bubble Crystal Solar String Light",
    spec: "Decorative warm LED string light for terraces and outdoor seating.",
    price: "Rs. 877 indicative",
    image: solarProductImage("bubble-string-light"),
    gallery: solarProductGallery("bubble-string-light")
  },
  {
    id: "solar-inverter",
    category: "Solar Inverters",
    name: "Grid-Tied Solar Inverter",
    spec: "Single and three-phase inverter options matched to residential or C&I load.",
    price: "Request quote",
    image: solarProductImage("solar-inverter"),
    gallery: solarProductGallery("solar-inverter")
  }
];

export const realtyArticles = [
  {
    slug: "satara-hingani",
    category: "Township Living",
    title: "Satara Hingani: A New Address for Sustainable Living",
    eyebrow: "Residential Township",
    location: "Satara, Maharashtra",
    date: "August 04, 2026",
    readingTime: "5 min read",
    image: "/images/realty-blog/satara-hingani/cover.png",
    imageAlt: "Satara Hingani residential township with bungalow, gardens, and evening lighting",
    excerpt:
      "A 350-acre residential destination planned around mini bungalows, solar-ready living, open landscapes, and everyday community convenience.",
    highlights: ["350-acre township", "5,000 mini bungalows", "Solar-ready homes"],
    body: [
      "Imagine waking up every morning to fresh mountain air, expansive open landscapes, and the peaceful sounds of nature, while still enjoying the comforts of a thoughtfully planned modern township. Satara Hingani is a one-of-a-kind residential destination that brings together luxury, sustainability, and convenience in a way that redefines modern living.",
      "Located at a prime position near the Pandharpur-Maswad Highway, the project offers excellent connectivity while allowing residents to enjoy a serene lifestyle away from the congestion and noise of the city. It is designed for people who want calm surroundings without feeling disconnected from essential access.",
      "Spread across an impressive 350 acres, Satara Hingani has been envisioned as a self-sustained township featuring 5,000 luxurious 1 BHK mini bungalows. Every bungalow has been carefully designed to maximize comfort, functionality, and natural light, making it an ideal choice for young professionals, families, retirees, weekend homeowners, and investors alike.",
      "One of the defining features of Satara Hingani is its strong commitment to green and sustainable living. The township incorporates a solar energy concept, where every bungalow is designed to support solar panel integration. This promotes clean, renewable energy while reducing electricity costs and creating long-term savings for residents.",
      "Beyond beautiful homes, Satara Hingani has been planned as a complete lifestyle destination where everyday necessities are within easy reach. The township includes landscaped gardens, walking paths, children's play areas, open recreational spaces, a grocery store for daily essentials, and a medical clinic for timely healthcare access.",
      "Nature is at the heart of the Satara Hingani experience. Wide internal roads, lush green landscapes, open spaces, and scenic surroundings create a calm and refreshing environment that encourages healthier living. Residents can enjoy morning walks, evenings in maintained gardens, and a peaceful atmosphere that is becoming rare in fast-paced urban life.",
      "From an investment perspective, Satara Hingani presents a strong opportunity. Satara is steadily emerging as one of Maharashtra's promising growth corridors, supported by improving infrastructure, enhanced road connectivity, and increasing demand for quality residential developments.",
      "Whether you are searching for your first home, a peaceful weekend retreat, a retirement destination, or a secure real estate investment, Satara Hingani offers a lifestyle that balances comfort, nature, and modern amenities. It is more than a residential project; it is a thoughtfully crafted community where every detail supports a healthier, greener, and more fulfilling future."
    ]
  },
  {
    slug: "cine-mall-vadodara",
    category: "Commercial Landmark",
    title: "Cine Mall, Vadodara: The City's Premier Lifestyle and Entertainment Destination",
    eyebrow: "Retail and Entertainment",
    location: "Vadodara, Gujarat",
    date: "August 04, 2026",
    readingTime: "5 min read",
    image: "/images/realty-blog/cine-mall-vadodara/cover.png",
    imageAlt: "Cine Mall Vadodara exterior with glass facade and evening lights",
    excerpt:
      "A modern commercial landmark combining retail, multiplex entertainment, dining, visibility, and strong urban footfall.",
    highlights: ["Prime commercial road", "Luxury multiplex", "Retail and food court"],
    body: [
      "In the heart of Vadodara, where the city thrives with business, culture, and modern living, stands Cine Mall: a landmark that has transformed the way people shop, dine, and entertain themselves. Strategically located on one of the city's busiest commercial streets, Cine Mall is more than a shopping centre; it is a vibrant lifestyle destination where contemporary architecture meets world-class experiences.",
      "Its prime location, premium retail offerings, luxurious entertainment facilities, and dynamic ambience make it one of Vadodara's most influential commercial landmarks. The development has been shaped to serve shoppers, families, professionals, visitors, and investors who understand the value of high-visibility urban destinations.",
      "Designed with a striking modern architectural facade, Cine Mall commands attention from the moment you arrive. The elegant glass frontage, clean contemporary lines, spacious interiors, and thoughtfully designed public areas create a sophisticated environment that reflects the aspirations of today's urban lifestyle.",
      "Shopping at Cine Mall is an experience in itself. Home to renowned national and international retail brands, the mall offers an exciting mix of fashion, lifestyle, beauty, electronics, and everyday essentials under one roof. Visitors can explore trends, shop for premium products, or spend a relaxed day with family and friends in an environment that balances luxury with convenience.",
      "Entertainment takes centre stage with the mall's luxurious multiplex theatre. Advanced projection systems, premium seating, exceptional acoustics, and a modern viewing environment transform every movie into a memorable occasion. Whether it is a blockbuster, a family outing, or a weekend escape, the theatre offers entertainment at its finest.",
      "No lifestyle destination is complete without exceptional dining, and Cine Mall delivers through its vibrant food court. With restaurants, cafes, and quick-service outlets, the food court caters to every palate, from local favourites to international cuisines. A quick coffee, casual lunch, or family dinner can comfortably become part of the visit.",
      "One of Cine Mall's greatest strengths is its strategic location. Positioned on one of Vadodara's busiest and most prominent roads, the mall enjoys strong visibility and seamless connectivity from every corner of the city. Surrounded by residential neighbourhoods, commercial offices, educational institutions, and business hubs, it attracts a diverse audience throughout the day.",
      "As Vadodara continues to grow into a thriving metropolitan city, Cine Mall remains a symbol of its modern aspirations: bringing together luxury retail, premium entertainment, fine dining, and architectural excellence in one iconic destination."
    ]
  }
];

export type RealtyArticle = (typeof realtyArticles)[number];

export const solarArticles = [
  {
    category: "Solar Smart",
    title: "What changes when your monthly bill crosses Rs. 6,000",
    excerpt:
      "How load profile, system size, and daytime consumption shape rooftop solar payback.",
    date: "July 22, 2026"
  },
  {
    category: "Subsidy",
    title: "PM Surya Ghar: documents to prepare before feasibility approval",
    excerpt:
      "Electricity bill, bank details, ownership proof, and vendor selection steps in one place.",
    date: "July 15, 2026"
  },
  {
    category: "Commercial",
    title: "Why factories need shadow analysis before final EPC pricing",
    excerpt:
      "A practical look at roof strength, cable routing, safety clearance, and monitoring needs.",
    date: "June 29, 2026"
  }
];

export const realtyWhy: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: Home,
    title: "Buying",
    text: "Shortlisted homes and land options are compared by locality, paperwork, lifestyle, and resale logic."
  },
  {
    icon: BadgeIndianRupee,
    title: "Selling",
    text: "Owners get pricing clarity, sharper positioning, and buyer handling that protects negotiation quality."
  },
  {
    icon: Users,
    title: "Renting",
    text: "Families and investors get practical guidance on tenant profiles, commute, furnishing, and lease fit."
  }
];

export const solarWhy: Array<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: SunMedium,
    title: "Residential",
    text: "Rooftop systems sized around monthly bill, usable roof area, subsidy eligibility, and future appliance load."
  },
  {
    icon: Factory,
    title: "Commercial",
    text: "C&I projects focus on tariff offset, peak usage, safety, metering, monitoring, and predictable payback."
  },
  {
    icon: BatteryCharging,
    title: "Storage",
    text: "Hybrid and battery-ready designs support homes and businesses that cannot tolerate avoidable downtime."
  }
];

export const processSteps = {
  realty: [
    "Define intent, budget, location preference, and decision timeline.",
    "Shortlist verified options and compare them against practical living or investment criteria.",
    "Coordinate site visits, documentation checks, negotiations, and closure support."
  ],
  solar: [
    "Read the electricity bill, load profile, roof structure, and shade pattern.",
    "Prepare system sizing, subsidy path, commercial estimate, and generation assumptions.",
    "Install, commission, monitor, and maintain the plant through Milton Solar's AMC path."
  ]
};

export const testimonials = {
  realty: [
    {
      quote:
        "Milton gave us a shortlist that felt edited, not dumped. Every visit had a reason behind it.",
      name: "A western suburbs homebuyer"
    },
    {
      quote:
        "The team helped us position our land parcel for the right buyer profile instead of chasing noise.",
      name: "Land owner, Satara"
    }
  ],
  solar: [
    {
      quote:
        "The savings estimate was explained clearly before the site survey, and the final proposal stayed practical.",
      name: "Residential client, Mumbai"
    },
    {
      quote:
        "Milton Solar treated our factory roof like an engineering asset, not just empty space.",
      name: "Operations head, SME unit"
    }
  ]
};

export const faqs = {
  realty: [
    {
      q: "Can Milton Realty help with both city flats and non-city land?",
      a: "Yes. The current focus spans Mumbai flats, MMR growth locations, Satara, Ratnagiri, Shirdi, and hill-town second-home opportunities."
    },
    {
      q: "Do listings have verified paperwork?",
      a: "Every serious enquiry should move through document review before commitment. Milton Realty coordinates that verification step before closure."
    },
    {
      q: "Can owners list a property with Milton Realty?",
      a: "Yes. Owners can use the contact or channel-partner path and share location, property type, expected value, and documents available."
    }
  ],
  solar: [
    {
      q: "Is the calculator a final quotation?",
      a: "No. It is a live planning estimate. Final pricing depends on roof area, structure, metering, inverter choice, wiring distance, and subsidy eligibility."
    },
    {
      q: "Does the shop include checkout?",
      a: "No. Milton Solar Shop is an enquiry catalogue. Every product routes to a human quote conversation."
    },
    {
      q: "Can Milton Solar handle AMC for existing systems?",
      a: "Yes. AMC support can include cleaning schedules, generation checks, inverter review, wiring inspection, and fault response."
    }
  ]
};

export const solarSolutions = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Solar",
    text:
      "Bill-led rooftop sizing, subsidy guidance, net-metering support, inverter selection, and clean handover for homes and housing societies.",
    bullets: ["1-10 kW planning", "PM Surya Ghar guidance", "Roof safety and shade check"]
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Solar",
    text:
      "Systems for offices, retail, schools, clinics, and mid-sized buildings where daytime consumption can turn roof area into predictable savings.",
    bullets: ["Tariff-offset analysis", "Monitoring dashboard", "Operation-friendly installation"]
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Solar",
    text:
      "C&I EPC with structural review, cable routing, safety documentation, generation modelling, and phased commissioning for active sites.",
    bullets: ["Large roof and shed planning", "Safety method statement", "Generation reporting"]
  },
  {
    id: "amc",
    icon: Wrench,
    title: "Solar AMC",
    text:
      "Preventive maintenance for existing systems, including panel cleaning cadence, inverter checks, fault logs, and performance recovery.",
    bullets: ["Cleaning and inspection", "Fault response", "Performance reports"]
  }
];

export const valueCards = [
  {
    icon: ShieldCheck,
    title: "Two divisions, clean routing",
    text: "Realty and Solar keep their own enquiry paths while staying visibly part of Milton Group."
  },
  {
    icon: MapPin,
    title: "Maharashtra-grounded",
    text: "The site anchors itself in Mumbai, MMR, Satara, Konkan, Shirdi, and western India energy demand."
  },
  {
    icon: Leaf,
    title: "Built asset mindset",
    text: "Homes, land, rooftops, and operating buildings are treated as durable long-term decisions."
  },
  {
    icon: PlugZap,
    title: "Human-led conversion",
    text: "Every product, property, and quote path sends context to the right team instead of forcing a generic form."
  },
  {
    icon: Lightbulb,
    title: "Useful interactions",
    text: "Calculators, filters, reveal states, and enquiry context support decision-making instead of decorating it."
  },
  {
    icon: Trees,
    title: "Growth without sprawl",
    text: "The parent identity gives both divisions room to expand without siloed navigation or duplicated content."
  }
];
