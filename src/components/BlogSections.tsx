import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { realtyArticles, type RealtyArticle } from "@/lib/data";

function getDateParts(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return { day: "", month: date, year: "" };
  }

  return {
    day: String(parsed.getDate()).padStart(2, "0"),
    month: parsed.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    year: String(parsed.getFullYear())
  };
}

export function RealtyBlogArticle({ article }: { article: RealtyArticle }) {
  const relatedArticles = realtyArticles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const date = getDateParts(article.date);

  return (
    <>
      <section className="relative overflow-hidden bg-ink px-4 pb-7 pt-24 text-white sm:px-6 sm:pb-8 sm:pt-28 lg:px-8">
        <Image
          src="/images/realty-blog/article-hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/84 to-ink/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/18" />
        <div className="relative mx-auto max-w-[1038px]">
          <Link
            href="/realty-blog"
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Realty Blog
          </Link>

          <p className="mt-5 max-w-full break-words text-[11px] font-semibold uppercase leading-5 tracking-[0.22em] text-white/58 sm:mt-6 sm:text-xs sm:tracking-[0.26em]">
            {article.category} / {article.location}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-balance font-display text-3xl leading-[1.06] text-white sm:max-w-4xl sm:text-4xl sm:leading-[1.04] lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-[32ch] text-sm leading-6 text-white/72 sm:max-w-2xl sm:text-base sm:leading-7">
            {article.excerpt}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-[1038px]">
          <figure className="relative">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1400}
              height={620}
              sizes="(min-width: 1100px) 1038px, 100vw"
              className="aspect-[16/6.8] h-auto w-full object-cover"
            />
            {date.day ? (
              <figcaption className="absolute -bottom-10 left-4 flex h-[84px] w-[58px] flex-col items-center justify-center bg-[#f1aa15] text-center text-ink shadow-sm sm:left-5">
                <span className="text-2xl font-extrabold leading-none">{date.day}</span>
                <span className="mt-1 text-[12px] font-bold uppercase leading-none">
                  {date.month}
                </span>
                <span className="mt-1 text-[12px] font-bold leading-none">{date.year}</span>
              </figcaption>
            ) : null}
          </figure>

          <article className="mt-20 max-w-[36ch] space-y-6 break-words text-base leading-8 text-ink/68 sm:max-w-none sm:text-lg sm:leading-9">
            {article.body.map((paragraph, index) => (
              <p key={`${article.slug}-${index}`}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      {relatedArticles.length ? (
        <section className="bg-white px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1038px] border-t border-ink/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-realty-500">
              More from Milton Realty
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/realty-blog/${item.slug}`}
                  className="group grid gap-3 border border-ink/10 bg-[#f8f5ed] p-4 transition hover:-translate-y-1 hover:border-ink/24 sm:grid-cols-[0.42fr_0.58fr]"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={520}
                    height={300}
                    sizes="(min-width: 640px) 22vw, 100vw"
                    className="aspect-[16/10] h-auto w-full object-cover"
                  />
                  <span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/46">
                      {item.category}
                    </span>
                    <span className="mt-2 block text-lg font-bold leading-snug text-ink">
                      {item.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-ink">
                      Read More
                      <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
