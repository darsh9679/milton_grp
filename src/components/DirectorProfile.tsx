import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { RealtyDirector } from "@/lib/data";

type RealtyDirectorProfileProps = {
  director: RealtyDirector;
};

export function RealtyDirectorProfile({ director }: RealtyDirectorProfileProps) {
  const quote = "quote" in director ? director.quote : undefined;

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/realty-about#realty-directors"
          className="inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:text-realty-700"
        >
          <ArrowLeft size={19} aria-hidden="true" />
          Back
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.43fr_0.57fr] lg:gap-16 xl:gap-20">
          <figure
            data-about-image
            className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#ece7dc] shadow-sm lg:sticky lg:top-28 lg:self-start"
          >
            <Image
              src={director.image}
              alt={director.imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
              style={{ objectPosition: director.position }}
              className="object-cover"
            />
          </figure>

          <article data-about-panel="right" className="max-w-3xl">
            <header className="border-b border-ink/10 pb-6">
              <h1 className="font-sans text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
                {director.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-ink/58 sm:text-xl">
                {director.role}
              </p>
            </header>

            <p className="mt-8 text-lg font-medium leading-8 text-ink/76 sm:text-xl sm:leading-9">
              {director.summary}
            </p>

            <div className="mt-7 space-y-5 text-base leading-8 text-ink/66 sm:text-[17px] sm:leading-9">
              {director.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {quote ? (
              <blockquote className="mt-9 border-l-2 border-realty-500 pl-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
                <span aria-hidden="true">&ldquo;</span>
                {quote}
                <span aria-hidden="true">&rdquo;</span>
              </blockquote>
            ) : null}
          </article>
        </section>
      </div>
    </main>
  );
}
