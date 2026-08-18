import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";

const founderProfile = {
  name: "Mr. Chiranjiv Vaghani",
  role: "Founder, Chairman & Visionary Leader",
  image: "/images/realty-about/html-reference-04.jpg",
  imageAlt: "Mr. Chiranjiv Vaghani, Founder, Chairman and Visionary Leader",
  summary:
    "A distinguished entrepreneur, investor, and visionary business leader with over four decades of experience across real estate, manufacturing, finance, strategic investments, and corporate leadership.",
  highlights: [
    ["40+", "Years of leadership"],
    ["1976", "Bombay University graduate"]
  ],
  sections: [
    {
      title: "Entrepreneurial Foundation",
      paragraphs: [
        <>
          <strong>Mr. Chiranjiv Vaghani</strong> is a distinguished entrepreneur, investor, and
          visionary business leader based in <strong>Mumbai, India</strong>, with over four
          decades of extensive experience spanning real estate development, strategic investments,
          manufacturing, finance, and corporate leadership.
        </>,
        <>
          Renowned for his foresight, integrity, and entrepreneurial excellence, he has played a
          pivotal role in building and leading successful businesses across multiple industries,
          earning the trust and respect of investors, partners, and stakeholders alike.
        </>
      ]
    },
    {
      title: "Education & Global Perspective",
      paragraphs: [
        <>
          A graduate of <strong>Bombay University</strong> in 1976 with a major in{" "}
          <strong>Statistics and Economics</strong>, Mr. Vaghani developed a strong academic
          foundation in analytical thinking, business economics, and strategic decision-making.
        </>,
        <>
          Driven by a passion for continuous learning and global business excellence, he further
          advanced his leadership capabilities by completing the prestigious{" "}
          <strong>Advanced Management Program at Harvard Business School</strong>, gaining valuable
          insights into international business strategy, organizational leadership, and corporate
          governance.
        </>
      ]
    },
    {
      title: "Building Milton Plastics",
      paragraphs: [
        <>
          One of the defining chapters of Mr. Vaghani&apos;s entrepreneurial journey was his
          leadership at <strong>Milton Plastics</strong>, where he served as{" "}
          <strong>Managing Director & Chief Executive Officer</strong>. With a clear vision,
          entrepreneurial mindset, and unwavering focus on quality, he played a pivotal role in
          building the Milton Plastics brand from the ground up.
        </>,
        <>
          Through strategic decision-making, operational excellence, product innovation, and a deep
          understanding of consumer needs, he helped establish <strong>Milton</strong> as a trusted
          and widely recognized household name. His contribution reflects his ability to transform an
          idea into a strong, enduring business with a reputation founded on quality, reliability,
          and trust.
        </>,
        <>
          <strong>MPL Plastics Limited</strong> stands as a well-established publicly listed company
          known for innovation and excellence in the plastics manufacturing sector. His strategic
          leadership has contributed significantly to sustained growth, operational efficiency, and
          long-term value creation.
        </>
      ]
    },
    {
      title: "Board Leadership & Corporate Governance",
      paragraphs: [
        <>
          In addition to his leadership at MPL Plastics Limited, Mr. Vaghani serves as a director on
          the boards of numerous leading Indian companies, including{" "}
          <strong>Ventura Mercantile & Finvest Co. Pvt. Ltd.</strong>,{" "}
          <strong>Soprano Holdings Co. Pvt. Ltd.</strong>,{" "}
          <strong>Roulette Mercantile Co. Pvt. Ltd.</strong>,{" "}
          <strong>Esprit Mercantile & Finvest Co. Pvt. Ltd.</strong>,{" "}
          <strong>Sierra Mercantile & Finvest Co. Pvt. Ltd.</strong>,{" "}
          <strong>Milton Investments Pvt. Ltd.</strong>,{" "}
          <strong>Milton Exports Pvt. Ltd.</strong>, and{" "}
          <strong>Rupani Spinning Mills Pvt. Ltd.</strong>
        </>,
        <>
          Registered with the <strong>Ministry of Corporate Affairs</strong>, he currently holds the
          position of Designated Director across <strong>different Indian enterprises</strong>,
          reflecting his extensive expertise in corporate governance, investment management,
          financial planning, business restructuring, and strategic growth.
        </>
      ]
    },
    {
      title: "Real Estate Vision",
      paragraphs: [
        <>
          Throughout his illustrious career, Mr. Vaghani has successfully spearheaded and advised
          numerous landmark residential, commercial, hospitality, industrial, and mixed-use
          developments across India.
        </>,
        <>
          His deep understanding of market dynamics, land acquisition, investment structuring,
          project execution, and sustainable value creation has enabled him to consistently identify
          high-potential opportunities and transform them into successful ventures.
        </>,
        <>
          His leadership philosophy combines <strong>innovation with disciplined execution</strong>,
          ensuring that every project is built on the foundations of quality, transparency,
          integrity, and long-term value.
        </>
      ]
    },
    {
      title: "Milton Realty & Legacy",
      paragraphs: [
        <>
          As the visionary force behind <strong>Milton Realty</strong>, Mr. Vaghani has been
          instrumental in shaping the company&apos;s vision of delivering thoughtfully planned
          developments that combine premium locations, superior design, quality construction, and
          enduring investment value.
        </>,
        <>
          His transition into real estate builds upon decades of entrepreneurial experience and a
          proven ability to understand markets, create trusted brands, and deliver value at scale.
        </>,
        <>
          Under his guidance, Milton Realty is driven by a commitment to quality and trust, with a
          growing portfolio spanning luxury residences, integrated townships, commercial
          developments, and investment-focused real estate opportunities.
        </>,
        <>
          The organization seeks to bring the same principles that helped establish the Milton name
          into the real estate sector: <strong>quality without compromise</strong>,{" "}
          <strong>transparency in every transaction</strong>, and{" "}
          <strong>trust built through consistent delivery</strong>.
        </>
      ]
    },
    {
      title: "Ethics, Mentorship & Long-Term Value",
      paragraphs: [
        <>
          Beyond his corporate accomplishments, Mr. Vaghani is widely respected for his ethical
          business practices, commitment to innovation, and long-term vision for nation-building
          through sustainable real estate development.
        </>,
        <>
          His ability to seamlessly integrate strategic planning with execution has made him a
          trusted mentor, respected industry leader, and influential figure in India&apos;s business
          landscape.
        </>,
        <>
          Today, Mr. Chiranjiv Vaghani continues to inspire the next generation of entrepreneurs and
          business leaders while steering Milton Realty toward new milestones. His journey - from
          building a trusted household brand from the ground up to shaping new opportunities in real
          estate - reflects a lifelong commitment to entrepreneurship, quality, innovation, and
          trust.
        </>,
        <>
          His unwavering pursuit of excellence and long-term value remains the driving force behind
          Milton Realty&apos;s continued growth, positioning the organization to build not just
          properties, but a lasting legacy of quality and trust in Indian real estate.
        </>
      ]
    }
  ]
} as const;

export const metadata: Metadata = {
  title: "Chiranjiv Vaghani | Milton Realty",
  description: founderProfile.summary,
  alternates: {
    canonical: "/chiranjiv-vaghani"
  },
  openGraph: {
    title: "Chiranjiv Vaghani | Milton Realty",
    description: founderProfile.summary,
    images: [
      {
        url: founderProfile.image,
        alt: founderProfile.imageAlt
      }
    ]
  }
};

export default function ChiranjivVaghaniPage() {
  return (
    <SiteChrome division="realty">
      <main className="min-h-screen bg-[#fbfaf6] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/realty-about"
            className="inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:text-realty-700"
          >
            <ArrowLeft size={19} aria-hidden="true" />
            Back
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14 xl:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <figure
                data-about-image
                className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#ece7dc] shadow-sm lg:h-[calc(100vh-9rem)] lg:max-h-[720px]"
              >
                <Image
                  src={founderProfile.image}
                  alt={founderProfile.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/78 to-transparent p-5 text-white sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/64">
                    Over four decades
                  </p>
                  <p className="mt-2 font-display text-3xl leading-none">
                    Leadership built on trust.
                  </p>
                </div>
              </figure>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {founderProfile.highlights.map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-ink/10 bg-white p-3">
                    <p className="font-sans text-lg font-semibold leading-none text-ink">{value}</p>
                    <p className="mt-1 text-[11px] font-medium leading-4 text-ink/54">{label}</p>
                  </div>
                ))}
              </div>
            </aside>

            <article data-about-panel="right" className="max-w-3xl">
              <header className="border-b border-ink/10 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
                  Full Profile
                </p>
                <h1 className="mt-3 font-sans text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
                  {founderProfile.name}
                </h1>
                <p className="mt-3 text-lg font-medium text-ink/58 sm:text-xl">
                  {founderProfile.role}
                </p>
              </header>

              <p className="mt-8 text-lg font-medium leading-8 text-ink/76 sm:text-xl sm:leading-9">
                {founderProfile.summary}
              </p>

              <div className="mt-9 space-y-9">
                {founderProfile.sections.map((section) => (
                  <section key={section.title} className="border-t border-ink/10 pt-6">
                    <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-ink/66 sm:text-[17px] sm:leading-9 [&_strong]:font-semibold [&_strong]:text-ink">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.title}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <blockquote className="mt-10 border-l-2 border-realty-500 pl-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
                His journey reflects a lifelong commitment to entrepreneurship, quality,
                innovation, and trust.
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/realty-contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-realty-700"
                >
                  Contact Milton Realty
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/realty-about"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ink/12 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"
                >
                  Back to About
                </Link>
              </div>
            </article>
          </section>
        </div>
      </main>
    </SiteChrome>
  );
}
