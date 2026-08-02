"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  X,
  Youtube
} from "lucide-react";
import type { Division } from "@/lib/data";
import { contactConfig, divisionRoutes } from "@/lib/data";
import { MotionLayer } from "@/components/MotionLayer";

type SiteChromeProps = {
  division: Division;
  children: React.ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  children?: Array<{
    href: string;
    label: string;
  }>;
};

export function SiteChrome({ division, children }: SiteChromeProps) {
  return (
    <div className={`page-shell ${division === "solar" ? "solar-font" : ""}`}>
      <MotionLayer />
      <SiteHeader division={division} />
      {children}
      <SiteFooter division={division} />
      <FloatingActions division={division} />
    </div>
  );
}

function SiteHeader({ division }: { division: Division }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const groupRoutes: NavItem[] = [
    { href: "/", label: "Group" },
    { href: "/realty-home", label: "Milton Realty" },
    { href: "/solar-home", label: "Milton Solar" },
    { href: "/realty-listings", label: "Listings" },
    { href: "/solar-shop", label: "Solar Shop" }
  ];
  const routes: NavItem[] =
    division === "group"
      ? groupRoutes
      : (divisionRoutes[division] as NavItem[]);
  const accent =
    division === "solar"
      ? "border-solar-500 bg-solar-500 text-ink"
      : "border-realty-500 bg-realty-700 text-white";

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/18 bg-ink/68 text-white shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Milton Group">
          <span className={`flex h-11 w-11 items-center justify-center rounded-lg border ${accent}`}>
            MG
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.28em]">
              Milton
            </span>
            <span className="block text-xs text-white/68">
              {division === "realty"
                ? "Realty"
                : division === "solar"
                  ? "Solar"
                  : "Group"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {routes.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`inline-flex min-h-10 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/12 ${
                  pathname === item.href ? "bg-white/14 text-white" : "text-white/76"
                }`}
              >
                {item.label}
                {item.children ? (
                  <ChevronDown size={15} aria-hidden="true" />
                ) : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full min-w-48 translate-y-2 rounded-lg border border-white/10 bg-ink/94 p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-white/76 transition hover:bg-white/12 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/18 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/12 bg-ink/96 px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-1">
            {routes.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-white/84 hover:bg-white/10"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="ml-3 grid gap-1 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-white/62 hover:bg-white/10"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function SiteFooter({ division }: { division: Division }) {
  const contact = contactConfig[division];
  const socialLinks = [
    { href: "#", label: "Facebook", Icon: Facebook },
    { href: "#", label: "Instagram", Icon: Instagram },
    { href: "#", label: "LinkedIn", Icon: Linkedin },
    { href: "#", label: "YouTube", Icon: Youtube },
    { href: "#", label: "X / Twitter", Icon: Twitter }
  ];
  const realtyQuick = [
    ["Realty Home", "/realty-home"],
    ["Listings", "/realty-listings"],
    ["Channel Partner", "/realty-channel-partner"],
    ["Realty Contact", "/realty-contact"]
  ];
  const solarQuick = [
    ["Solar Home", "/solar-home"],
    ["Solutions", "/solar-solutions"],
    ["Shop", "/solar-shop"],
    ["Resources", "/solar-resources"],
    ["Solar Contact", "/solar-contact"]
  ];

  return (
    <footer className={`footer-surface relative overflow-hidden text-white ${division === "solar" ? "footer-surface-solar" : "footer-surface-realty"}`}>
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-12 sm:pt-10 xl:px-8 xl:py-12">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.34fr_0.9fr] xl:gap-10">
          <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/58">
            Milton Group
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight sm:mt-3 lg:text-3xl">
            {division === "solar"
              ? "Energy work with a human handover."
              : division === "realty"
                ? "Property decisions with room to breathe."
                : "Realty and solar, held under one roof."}
          </h2>
          <p className="mt-3 hidden max-w-sm text-sm leading-6 text-white/64 sm:block">
            {division === "group"
              ? "Milton Group connects property advisory and solar EPC through one parent identity."
              : `Part of Milton Group. Return to the parent hub from any ${division} page.`}
          </p>
          <Link
            href="/"
            className="mt-5 hidden rounded-lg border border-white/18 px-4 py-2 text-sm font-semibold text-white/82 transition hover:bg-white/10 lg:inline-flex"
          >
            Group Home
          </Link>
        </div>
          <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
            Contact
          </h3>
          <div className="mt-3 space-y-3 break-words text-[13px] leading-5 text-white/72 sm:mt-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                href={contact.phoneHref}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/14 px-3 py-2 font-semibold text-white/86 transition hover:bg-white/10 hover:text-white"
              >
                <Phone size={16} aria-hidden="true" />
                {contact.phone}
              </Link>
              <Link
                href={contact.emailHref}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/14 px-3 py-2 font-semibold text-white/86 transition hover:bg-white/10 hover:text-white"
              >
                <Mail size={16} aria-hidden="true" />
                {contact.email}
              </Link>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                  Branch Office
                </p>
                <p className="mt-1 flex gap-2">
                  <MapPin className="mt-0.5 shrink-0 text-white/44" size={15} aria-hidden="true" />
                  <span>{contact.branchOffice}</span>
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                  Corporate Office
                </p>
                <p className="mt-1 flex gap-2">
                  <MapPin className="mt-0.5 shrink-0 text-white/44" size={15} aria-hidden="true" />
                  <span>{contact.corporateOffice}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
          <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
            Newsletter
          </h3>
          <form className="mt-3 flex max-w-sm gap-2 sm:mt-5">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-lg border border-white/16 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/42 sm:py-3"
            />
            <button
              type="submit"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-ink transition hover:bg-solar-100 sm:h-12 sm:w-12"
              aria-label="Subscribe"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
              Social
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-white/72">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-white/8 transition hover:bg-white/14 hover:text-white"
                  aria-label={`Milton Group on ${label}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </Link>
              ))}
              <Link
                href={`https://wa.me/${contact.whatsapp}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-white/8 transition hover:bg-white/14 hover:text-white"
                aria-label="WhatsApp Milton Group"
              >
                <MessageCircle size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
            Quick Links
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm leading-5 text-white/72 sm:grid-cols-3 lg:grid-cols-5">
            {[...realtyQuick, ...solarQuick].map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
function FloatingActions({ division }: { division: Division }) {
  const contact = contactConfig[division];
  const text =
    division === "solar"
      ? "I want to discuss a Milton Solar enquiry."
      : division === "realty"
        ? "I want to discuss a Milton Realty property enquiry."
        : "I want to explore Milton Group.";

  return (
    <div className="fixed bottom-4 right-4 z-50 grid gap-2 sm:bottom-5 sm:right-5 sm:gap-3">
      <Link
        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`}
        target="_blank"
        className="floating-action inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#1f9d62] text-white opacity-0 shadow-soft transition hover:-translate-y-0.5 hover:bg-[#187d4f] sm:h-12 sm:w-12"
        aria-label="Open WhatsApp enquiry"
      >
        <MessageCircle size={18} aria-hidden="true" />
      </Link>
      <Link
        href={contact.contactHref}
        className="floating-action inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white opacity-0 shadow-soft transition hover:-translate-y-0.5 hover:bg-realty-700 sm:h-12 sm:w-12"
        aria-label="Open enquiry form"
      >
        <Mail size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}



