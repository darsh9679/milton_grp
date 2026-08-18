"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowRight, X } from "lucide-react";
import { heroImages } from "@/lib/data";

const storageKey = "milton-division-chooser-seen";

export function DivisionChooser() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const seen = window.sessionStorage.getItem(storageKey);
      if (!seen) {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || !modalRef.current) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".chooser-backdrop",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" }
      );
      gsap.fromTo(
        ".chooser-panel",
        { opacity: 0, y: 22, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          stagger: 0.12,
          delay: 0.18,
          ease: "power3.out"
        }
      );
    }, modalRef);

    return () => context.revert();
  }, [visible]);

  function dismiss(route?: string) {
    window.sessionStorage.setItem(storageKey, "true");
    setVisible(false);
    if (route) {
      router.push(route);
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="chooser-backdrop fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink/72 p-2 backdrop-blur-md sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="division-chooser-title"
    >
      <div className="relative max-h-[calc(100svh-1rem)] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-lg border border-white/16 bg-paper p-3 shadow-soft sm:max-h-[calc(100svh-2rem)] sm:p-6">
        <button
          type="button"
          onClick={() => dismiss()}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/75 text-ink/55 backdrop-blur transition hover:bg-ink/8 hover:text-ink sm:right-4 sm:top-4"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-2 pr-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/48 sm:text-xs sm:tracking-[0.3em]">
              Milton Group
            </p>
            <h2
              id="division-chooser-title"
              className="mt-1 font-display text-3xl leading-[1.05] text-ink min-[390px]:text-4xl sm:mt-2 sm:text-5xl"
            >
              Where should we begin?
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dismiss()}
            className="self-start rounded-lg px-2 py-1.5 text-sm font-semibold text-ink/58 transition hover:bg-ink/8 hover:text-ink sm:self-auto sm:px-3 sm:py-2"
          >
            Explore both
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
          <ChooserPanel
            title="Milton Realty"
            description="Curated property opportunities across India, shaped by local insight, market understanding, and long-term value."
            image={heroImages.realty}
            tone="realty"
            onClick={() => dismiss("/realty-home")}
          />
          <ChooserPanel
            title="Milton Solar"
            description="Power Your Home with Quality, Slash Your Bills with Savings, Own Your Energy with Pride."
            image={heroImages.solar}
            tone="solar"
            onClick={() => dismiss("/solar-home")}
          />
        </div>
      </div>
    </div>
  );
}

function ChooserPanel({
  title,
  description,
  image,
  tone,
  onClick
}: {
  title: string;
  description: string;
  image: string;
  tone: "realty" | "solar";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="chooser-panel group relative min-h-[188px] overflow-hidden rounded-lg text-left text-white shadow-soft transition duration-500 hover:-translate-y-1 min-[390px]:min-h-[218px] sm:min-h-[280px] md:min-h-[340px]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <span
        className={`absolute inset-0 ${
          tone === "solar" ? "bg-[#2f2604]/54" : "bg-realty-900/58"
        } transition group-hover:bg-ink/48`}
      />
      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
        <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-ink sm:mb-4 sm:h-10 sm:w-10">
          <ArrowRight size={18} aria-hidden="true" />
        </span>
        <span className="block font-display text-3xl leading-none min-[390px]:text-[2rem] sm:text-4xl">{title}</span>
        <span className="mt-2 block max-w-md text-sm leading-5 text-white/82 sm:mt-3 sm:leading-6">
          {description}
        </span>
      </span>
    </button>
  );
}
