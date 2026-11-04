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
    { href: "/realty-contact", label: "Contact" },
    { href: "/solar-home", label: "Milton Solar" }
  ],
  solar: [
    { href: "/", label: "Group Home" },
    { href: "/solar-home", label: "Solar Home" },
    { href: "/solar-about", label: "About" },
    { href: "/solar-solutions", label: "Solutions" },
    { href: "/solar-shop", label: "Shop" },
    { href: "/solar-resources", label: "Resources" },
    { href: "/solar-contact", label: "Contact" },
    { href: "/realty-home", label: "Milton Realty" }
  ]
};

const sharedFooterOffices = [
  {
    label: "Branch Office",
    address:
      "Aman Chambers, 4th Floor, Office Nos. 3, 4 & 5, Next to HDFC Bank, Opera House, Opp Charni Road Station, Mumbai 400004"
  },
  {
    label: "Corporate Office",
    address:
      "Maker Chamber V, 705, 7th Floor, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021"
  }
];

const sharedContactDetails = {
  phone: "8104418614",
  phoneHref: "tel:+918104418614",
  landline: "022-35082485",
  landlineHref: "tel:+912235082485",
  email: "info@miltonhomespace.com",
  emailHref: "mailto:info@miltonhomespace.com",
  mapQuery: "",
  mapEmbedSrc: "",
  branchOffice:
    "Aman Chambers, 4th Floor, Office Nos. 3, 4 & 5, Next to HDFC Bank, Opera House, Opp Charni Road Station, Mumbai 400004",
  corporateOffice:
    "Maker Chamber V, 705, 7th Floor, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021",
  address:
    "Branch Office: Aman Chambers, 4th Floor, Office Nos. 3, 4 & 5, Next to HDFC Bank, Opera House, Opp Charni Road Station, Mumbai 400004. Corporate Office: Maker Chamber V, 705, 7th Floor, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021.",
  footerOffices: sharedFooterOffices
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
    phone: "8104417820",
    phoneHref: "tel:+918104417820",
    email: "info@miltonhomespace.com",
    emailHref: "mailto:info@miltonhomespace.com",
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
    name: "Anthea Sea-View Apartment",
    city: "Mumbai",
    locality: "Versova",
    type: "Flats",
    budgetBand: "Premium",
    budget: "Rs. 3.2 Cr onwards",
    progress: "Ongoing",
    specs: ["Versova Beach", "Metro-linked suburb", "Sea Front"],
    image: realtyListingImages.versova,
    gallery: realtyListingGallery("versova-sea-view"),
    description:
      "A composed coastal apartment opportunity for end-users who want social infrastructure, beach proximity, and stronger western-suburb connectivity.",
    soldOut: false
  },
  {
    id: "tardeo-heritage",
    name: "Stardeous Heritage Residence",
    city: "Mumbai",
    locality: "Tardeo",
    type: "Flats",
    budgetBand: "Luxury",
    budget: "Price on request",
    progress: "Ongoing",
    specs: ["Haji Ali Sea Side", "Multi-Modal transit connectivity", "Upscale Residential"],
    image: realtyListingImages.tardeo,
    gallery: realtyListingGallery("tardeo-heritage"),
    description:
      "A discreet South Mumbai residence positioned for buyers prioritising address value, privacy, and long-horizon capital preservation.",
    soldOut: true
  },
  {
    id: "satara-eco-plots",
    name: "Shri Dharmaveer Chhatrapati Sambhaji Maharaj.",
    city: "Satara",
    locality: "Pandharpur Mhaswad Highway",
    type: "Bungalows",
    budgetBand: "Value",
    budget: "Rs. 18 L onwards",
    progress: "Ongoing",
    specs: ["Pilgrimage Hub Pandharpur", "Mumbai - Pune Bangalore highway", "Township project"],
    image: realtyListingImages.satara,
    gallery: realtyListingGallery("satara-eco-plots"),
    description:
      "Grounded in Milton's existing Satara presence, this land-led opportunity is suited to second homes, compact villas, and patient investors.",
    soldOut: false
  },
  {
    id: "guhagar-coastal",
    name: "Guhagar Coastal Bliss",
    city: "Ratnagiri",
    locality: "Asgoli Beach",
    type: "Bungalows",
    budgetBand: "Mid",
    budget: "Rs. 42 L onwards",
    progress: "Upcoming",
    specs: ["Pristine Coastal Town", "Agro-Tourism Potential", "Growing Tourism appeal"],
    image: realtyListingImages.guhagar,
    gallery: realtyListingGallery("guhagar-coastal"),
    description:
      "A coastal bungalow canvas for buyers seeking open air, local character, and a slower investment rhythm beyond the city.",
    soldOut: false
  },
  {
    id: "shirdi-hospitality",
    name: "Shirdi Multi-Purpose Plots",
    city: "Shirdi",
    locality: "Ahilyanagar",
    type: "Bungalows",
    budgetBand: "Mid",
    budget: "Rs. 55 L onwards",
    progress: "Ongoing",
    specs: ["Global spiritual destination", "Booming Tourism & economy", "Safe & peaceful city"],
    image: realtyListingImages.shirdi,
    gallery: realtyListingGallery("shirdi-hospitality"),
    description:
      "Prime farmland near Shirdi, offering investors a strategic opportunity for agricultural use and long-term appreciation",
    soldOut: false
  },
  {
    id: "mahabaleshwar-retreat",
    name: "Mini Mahabaleshwar",
    city: "Satara",
    locality: "Patan",
    type: "Bungalows",
    budgetBand: "Premium",
    budget: "Rs. 95 L onwards",
    progress: "Upcoming",
    specs: ["Sahyadri Advantage", "Religious & Heritage", "Tourism Destination"],
    image: realtyListingImages.mahabaleshwar,
    gallery: realtyListingGallery("mahabaleshwar-retreat"),
    description:
      "A second-home proposition for families who want climate, quiet, and a future-ready retreat close to established hill-town demand.",
    soldOut: false
  },
  {
    id: "kalyan-compact",
    name: "Kalyan Connected Bungalows",
    city: "Kalyan",
    locality: "Kalyan West",
    type: "Bungalows",
    budgetBand: "Value",
    budget: "Rs. 48 L onwards",
    progress: "Upcoming",
    specs: ["MMR advantage", "Infrastructure expansion", "Residential Demand"],
    image: realtyListingImages.kalyan,
    gallery: realtyListingGallery("kalyan-compact"),
    description:
      "A practical MMR option for first-time buyers, rental investors, and families upgrading within a defined budget.",
    soldOut: false
  }
];

export const solarProducts = [
  {
    id: "panels",
    category: "Panels",
    name: "Solar Panels",
    spec: "High-performance photovoltaic modules selected for dependable generation and long system life.",
    brands: ["Rayzon", "Novasys", "Navitas", "Vikram", "Waaree", "Adani"],
    price: "Quote based on system size",
    image: solarProductImage("panels"),
    gallery: solarProductGallery("panels")
  },
  {
    id: "inverter",
    category: "Inverter",
    name: "Solar Inverter",
    spec: "Grid-ready inverter options matched to the roof design, load profile, and performance expectations.",
    brands: ["Polycab", "Growatt", "Ksolare", "Solis", "Sungrow"],
    price: "Quote after site survey",
    image: solarProductImage("inverter"),
    gallery: solarProductGallery("inverter")
  },
  {
    id: "acdb-dcdb",
    category: "Protection",
    name: "ACDB & DCDB",
    spec: "Electrical protection boxes that keep solar DC and AC routing safer, organized, and serviceable.",
    brands: ["Polycab"],
    price: "Included as per system design",
    image: solarProductImage("acdb-dcdb"),
    gallery: solarProductGallery("acdb-dcdb")
  },
  {
    id: "cables",
    category: "Cables",
    name: "Solar Cables",
    spec: "Durable DC and AC cabling selected for clean routing, weather exposure, and long-term reliability.",
    brands: ["Polycab"],
    price: "Included as per system design",
    image: solarProductImage("cables"),
    gallery: solarProductGallery("cables")
  },
  {
    id: "structure",
    category: "Structure",
    name: "Mounting Structure",
    spec: "Engineered support structure for stable installation, clean panel alignment, and lasting roof performance.",
    brands: ["Nespro Pvt Ltd"],
    price: "Quote after structural review",
    image: solarProductImage("structure"),
    gallery: solarProductGallery("structure")
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
      "A 302.54 Acre residential destination planned around mini bungalows, solar-ready living, open landscapes, and everyday community convenience.",
    highlights: ["302.54 Acre township", "5,000 mini bungalows", "Solar-ready homes"],
    body: [
      "Imagine waking up every morning to fresh mountain air, expansive open landscapes, and the peaceful sounds of nature, while still enjoying the comforts of a thoughtfully planned modern township. Satara Hingani is a one-of-a-kind residential destination that brings together luxury, sustainability, and convenience in a way that redefines modern living.",
      "Located at a prime position near the Pandharpur-Maswad Highway, the project offers excellent connectivity while allowing residents to enjoy a serene lifestyle away from the congestion and noise of the city. It is designed for people who want calm surroundings without feeling disconnected from essential access.",
      "Spread across an impressive 302.54 Acre, Satara Hingani has been envisioned as a self-sustained township featuring 5,000 luxurious 1 BHK mini bungalows. Every bungalow has been carefully designed to maximize comfort, functionality, and natural light, making it an ideal choice for young professionals, families, retirees, weekend homeowners, and investors alike.",
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

export const realtyDirectors = [
  {
    slug: "vinay-vaghani",
    href: "/realty-directors/vinay-vaghani",
    name: "Vinay Vaghani",
    role: "Director | Milton Real Estate",
    cardRole: "Director, Milton Real Estate",
    image: "/images/realty-about/html-reference-05.jpg",
    imageAlt: "Mr. Vinay Vaghani, Director of Milton Real Estate",
    position: "center 42%",
    summary:
      "A seasoned real estate professional with over 15 years of experience across investments, acquisitions, development, and strategic business management.",
    paragraphs: [
      "Mr. Vinay Vaghani is a seasoned real estate professional with over 15 years of experience in real estate investments, land acquisitions, property development, and strategic business management. As the Director of Milton Real Estate, he has successfully led large-scale residential, commercial, industrial, and plotted development projects, with expertise in end-to-end transaction management, contract negotiations, portfolio management, and equity investments.",
      "His strong market knowledge, strategic vision, and analytical approach have enabled him to identify high-value investment opportunities and deliver sustainable growth for clients and stakeholders. Before leading Milton Real Estate, he gained valuable experience with G Corp Realty Pvt. Ltd. and Principal Asset Management, where he built a solid foundation in real estate transactions, investment analysis, and market research.",
      "Recognized for his integrity, leadership, and customer-centric approach, Mr. Vaghani continues to drive Milton Real Estate with a commitment to transparency, innovation, and delivering long-term value through trusted and quality real estate developments."
    ]
  },
  {
    slug: "mubarak-shaikh",
    href: "/realty-directors/mubarak-shaikh",
    name: "Mubarak Shaikh",
    role: "Honarary Board Member | Milton Realty",
    cardRole: "Honarary Board Member, Milton Realty",
    image: "/images/directors/mubarak-shaikh.png",
    imageAlt: "Mr. Mubarak Shaikh, Honorary Board Member of Milton Realty",
    position: "center top",
    summary:
      "A real estate professional shaped by perseverance, land investment expertise, and a deep belief in transparent long-term value creation.",
    quote:
      "Success is not defined by where you begin, but by the determination with which you continue your journey.",
    paragraphs: [
      "Mr. Mubarak Shaikh's journey is a true testament to perseverance, resilience, and an unwavering belief in hard work. Like many aspiring entrepreneurs, his early academic years were modest, but his determination to build something meaningful set him apart from the very beginning. Rather than following a conventional path, he chose to learn through real-world experiences, embracing every challenge as an opportunity to grow.",
      "In the early stages of his entrepreneurial career, Mr. Shaikh explored multiple business ventures across different sectors. While these ventures provided invaluable experience, they did not deliver the long-term vision and fulfillment he was seeking. Instead of viewing these challenges as setbacks, he transformed them into stepping stones, gaining practical knowledge in business operations, market understanding, and strategic decision-making.",
      "His life took a defining turn when he entered the world of land and plot investments. Recognizing the immense potential of real estate, Mr. Shaikh dedicated himself to understanding every aspect of the industry, from land acquisition and legal due diligence to market trends, investment strategies, and long-term value creation. Through years of relentless dedication, continuous learning, and on-ground experience, he established himself as a trusted name in land investments. His ability to identify opportunities, understand market dynamics, and create value for investors earned him widespread respect, making him a specialist in the field.",
      "After building extensive expertise and a strong reputation in the real estate sector, Mr. Mubarak Shaikh joined hands with Milton Real Estate under the visionary leadership of Mr. Chiranjiv Vaghani. This partnership was built not merely on business objectives, but on a shared vision of creating lasting value, transparency, and trust in the real estate industry.",
      "Mr. Shaikh holds Mr. Chiranjiv Vaghani in the highest regard, considering him not only a mentor but also a father figure whose wisdom, leadership, and values have greatly influenced his professional journey. Together, they have cultivated a relationship founded on mutual respect, trust, and a shared commitment to excellence. Their collaboration reflects the spirit of a family working toward a common vision of delivering exceptional real estate opportunities.",
      "Today, Mr. Mubarak Shaikh continues to play a pivotal role in the growth of Milton Real Estate, bringing his deep market knowledge, strategic thinking, and unwavering dedication to every project. His journey from humble beginnings to becoming a respected real estate professional stands as an inspiration to aspiring entrepreneurs, proving that success is achieved through perseverance, continuous learning, and an uncompromising commitment to one's vision."
    ]
  },
  {
    slug: "dinesh-bhandari",
    href: "/realty-directors/dinesh-bhandari",
    name: "Dinesh Bhandari",
    role: "Director | Milton Realty",
    cardRole: "Director, Milton Realty",
    image: "/images/realty-about/html-reference-07.jpg",
    imageAlt: "Mr. Dinesh Bhandari, Director of Milton Realty",
    position: "center center",
    summary:
      "An entrepreneur, investor, and business leader with over two decades of experience across trading, electronics, investments, philanthropy, and real estate.",
    quote:
      "Leadership is not measured by the businesses you build, but by the trust you earn, the lives you touch, and the legacy you leave behind.",
    paragraphs: [
      "Mr. Dinesh Bhandari is a distinguished entrepreneur, investor, and business leader whose journey is built on a strong foundation of integrity, perseverance, and visionary leadership. Born and raised in South Mumbai, he inherited his entrepreneurial spirit from his father, who introduced him to the values of business, ethics, and hard work at an early age.",
      "In 2003, he officially entered the world of business through the trading industry, where he gained extensive experience in market operations, strategic planning, and customer relationship management. His dedication, discipline, and commitment to excellence earned him a reputation as a dependable and forward-thinking businessman.",
      "Driven by a vision to establish his own enterprise, Mr. Bhandari founded Myricc Electronics in 2013, where he serves as the Director and Chief Executive Officer. Under his leadership, Myricc Electronics has grown into a respected name in the electronics industry, known for delivering quality products, innovative solutions, and customer-centric services.",
      "Beyond his achievements in business, Mr. Bhandari is widely admired for his generous nature and strong commitment to social responsibility. Believing that true success is measured by the positive impact one creates, he actively supports initiatives focused on children's welfare, education, charitable causes, and community development.",
      "Through various charitable contributions and philanthropic efforts, he continues to give back to society, reflecting his compassionate outlook and belief in creating opportunities for those in need.",
      "In 2020, Mr. Bhandari expanded his business interests into the real estate sector as a strategic investor. Recognizing the immense potential of land and plotted developments, he began investing in premium land parcels and real estate assets, gradually building a strong understanding of the industry's long-term value and growth potential.",
      "His journey in real estate led him to Milton Real Estate, where he joined hands with Mr. Chiranjiv Vaghani, a respected industry veteran whose leadership and vision have inspired him immensely. More than a business association, their relationship is built on mutual respect, unwavering trust, shared values, and a family-like bond. Mr. Bhandari regards Mr. Vaghani not only as a mentor but also as a cherished family member, believing that their partnership is founded on loyalty, transparency, and a common vision of creating lasting value through Milton Real Estate.",
      "Today, with over two decades of entrepreneurial experience spanning trading, electronics, strategic investments, philanthropy, and real estate, Mr. Dinesh Bhandari continues to lead with passion, integrity, and innovation. His commitment to excellence, coupled with his people-first approach and long-term vision, continues to contribute significantly to the growth and success of every venture he undertakes."
    ]
  }
] as const;

export type RealtyDirector = (typeof realtyDirectors)[number];

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
    title: "Purchase",
    text: "Find the right property with expert insights, legal clarity, market intelligence, and long-term value."
  },
  {
    icon: BadgeIndianRupee,
    title: "Strategic Selling",
    text: "Expert strategies that elevate your property's market appeal. Helping you secure the best value with complete confidence."
  },
  {
    icon: Users,
    title: "Property Advisory",
    text: "Expert guidance backed by market insights, legal clarity, and informed decision-making."
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
    "Start with your needs, preferences, budget, and timeline.",
    "Explore verified options aligned with your lifestyle and investment goals.",
    "Evaluate verified options through lifestyle, value, and investment potential."
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
      quote: "Every visit felt closer to 'This is the one.'",
      name: "Homebuyer, Western Mumbai"
    },
    {
      quote: "The right strategy brought the right buyer at the right value.",
      name: "Landowner, Satara"
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
      q: "What property opportunities can I explore?",
      a: "From elegant residences to select land, bungalows, and villas curated opportunities chosen for quality, character, and lasting value."
    },
    {
      q: "What sets Milton Realty's properties apart?",
      a: "A discerning approach to quality, where every opportunity is evaluated for its character, fundamentals, and long-term value."
    },
    {
      q: "What should I consider before investing in property?",
      a: "We help you look beyond the purchase - considering the opportunity, its fundamentals, market context, and potential for long-term value."
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
    title: "Built on Quality",
    text: "Where quality, precision, and thoughtful execution define everything we do."
  },
  {
    icon: MapPin,
    title: "Locally Rooted. Broadly Connected.",
    text: "Deep local insight across evolving markets and opportunities."
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
    title: "Purposeful Interactions",
    text: "Every interaction adds clarity, context, and value to the experience."
  },
  {
    icon: Trees,
    title: "Growth, Guided by Clarity",
    text: "The parent identity gives both divisions room to expand without siloed navigation or duplicated content."
  }
];
