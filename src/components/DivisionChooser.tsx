"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
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
      className="chooser-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-ink/72 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="division-chooser-title"
    >
      <div className="w-full max-w-5xl rounded-lg border border-white/16 bg-paper p-4 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/48">
              Milton Group
            </p>
            <h2
              id="division-chooser-title"
              className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl"
            >
              Where should we begin?
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dismiss()}
            className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-ink/58 transition hover:bg-ink/8 hover:text-ink sm:self-auto"
          >
            Explore both
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ChooserPanel
            title="Milton Realty"
            description="Homes, land, bungalows, resale, renting, and property advisory across Mumbai and Maharashtra."
            image={heroImages.realty}
            tone="realty"
            onClick={() => dismiss("/realty-home")}
          />
          <ChooserPanel
            title="Milton Solar"
            description="Rooftop solar, EPC, product enquiries, franchise conversations, and system maintenance."
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
      className="chooser-panel group relative min-h-[340px] overflow-hidden rounded-lg text-left text-white shadow-soft transition duration-500 hover:-translate-y-1"
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
      <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-ink">
          <ArrowRight size={18} aria-hidden="true" />
        </span>
        <span className="block font-display text-4xl leading-none">{title}</span>
        <span className="mt-3 block max-w-md text-sm leading-6 text-white/78">
          {description}
        </span>
      </span>
    </button>
  );
}
