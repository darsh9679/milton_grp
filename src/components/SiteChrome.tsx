"use client";

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
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
  Phone,
  Send,
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

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.87.5 3.65 1.45 5.23L2 22l4.9-1.42a9.94 9.94 0 0 0 5.11 1.4h.01c5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.01 2Zm5.86 14.29c-.25.7-1.23 1.28-2 1.44-.55.11-1.26.2-3.65-.78-2.86-1.18-4.7-4.08-4.85-4.27-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.25-.28.54-.35.72-.35.18 0 .36 0 .52.01.17.01.39-.06.6.47.25.6.83 2.06.9 2.21.07.15.11.32.02.51-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.13.55.16.28.7 1.17 1.51 1.9 1.04.94 1.9 1.24 2.18 1.38.28.14.44.12.61-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.25.09 1.61.77 1.89.91.28.14.46.21.53.33.07.12.07.68-.18 1.38Z" />
    </svg>
  );
}

function XSocialIcon({ size = 18 }: { size?: number; "aria-hidden"?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="font-sans font-bold leading-none"
      style={{ fontSize: `${size}px` }}
    >
      X
    </span>
  );
}

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
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brandLabel =
    division === "solar" ? "Solar LLP" : division === "realty" ? "Home LLP" : "Group";
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 border-b text-white shadow-sm transition-colors duration-300 ${
        scrolled
          ? "border-black/10 bg-ink"
          : "border-white/18 bg-ink/68 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Milton Group">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/18 bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
            <Image
              src="/images/logos/milton-building-mark.svg"
              alt=""
              width={290}
              height={348}
              priority
              className="h-full w-auto object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold uppercase tracking-[0.28em]">
              Milton
            </span>
            <span className="block text-xs text-white/68">{brandLabel}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {routes.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-white text-ink shadow-sm font-semibold"
                    : "text-white/76 hover:bg-white/12 hover:text-white"
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
          onClick={() => {
            setOpen((value) => !value);
            setExpandedMobileItem(null);
          }}
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
                <div className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block flex-1 rounded-lg px-3 py-3 text-sm transition ${
                      pathname === item.href
                        ? "bg-white font-semibold text-ink shadow-sm"
                        : "font-medium text-white/84 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobileItem((current) =>
                          current === item.href ? null : item.href
                        )
                      }
                      aria-expanded={expandedMobileItem === item.href}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform ${
                          expandedMobileItem === item.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : null}
                </div>
                {item.children && expandedMobileItem === item.href ? (
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
  const officeCards = contact.footerOffices;
  const socialLinks = [
    { href: "https://www.facebook.com/share/1Bh5QYD322/", label: "Facebook", Icon: Facebook },
    { href: "https://www.instagram.com/milton.real_estate/", label: "Instagram", Icon: Instagram },
    { href: "https://www.linkedin.com/company/milton-real-estates/", label: "LinkedIn", Icon: Linkedin },
    { href: "https://www.youtube.com/@MarketingMilton-l9n", label: "YouTube", Icon: Youtube },
    { href: "https://x.com/Milton_groups", label: "X", Icon: XSocialIcon }
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
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.5fr_0.82fr] xl:gap-10">
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
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link
                href={contact.phoneHref}
                className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-lg border border-white/14 px-3 py-2 font-semibold text-white/86 transition hover:bg-white/10 hover:text-white"
              >
                <Phone className="shrink-0" size={16} aria-hidden="true" />
                <span className="min-w-0 whitespace-nowrap">{contact.phone}</span>
              </Link>
              <Link
                href={contact.landlineHref}
                className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-lg border border-white/14 px-3 py-2 font-semibold text-white/86 transition hover:bg-white/10 hover:text-white"
              >
                <Phone className="shrink-0" size={16} aria-hidden="true" />
                <span className="min-w-0 whitespace-nowrap">{contact.landline}</span>
              </Link>
              <Link
                href={contact.emailHref}
                className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-lg border border-white/14 px-3 py-2 font-semibold text-white/86 transition hover:bg-white/10 hover:text-white md:col-span-2 lg:col-span-1 xl:col-span-2"
              >
                <Mail className="shrink-0" size={16} aria-hidden="true" />
                <span className="min-w-0 break-all text-[12px] leading-5 sm:text-[13px]">
                  {contact.email}
                </span>
              </Link>
            </div>
            <div
              className={`grid gap-2 ${
                officeCards.length > 1 ? "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" : ""
              }`}
            >
              {officeCards.map((office) => (
                <div key={office.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    {office.label}
                  </p>
                  <p className="mt-1 flex gap-2">
                    <MapPin className="mt-0.5 shrink-0 text-white/44" size={15} aria-hidden="true" />
                    <span>{office.address}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
          <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
            Newsletter
          </h3>
          <NewsletterForm division={division} />
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/52">
              Social
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-white/72">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-white/8 transition hover:bg-white/14 hover:text-white"
                  aria-label={`Milton Group on ${label}`}
                >
                  <Icon size={18} aria-hidden={true} />
                </a>
              ))}
              <Link
                href={`https://wa.me/${contact.whatsapp}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-white/8 transition hover:bg-white/14 hover:text-white"
                aria-label="WhatsApp Milton Group"
              >
                <WhatsAppIcon size={18} />
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

function NewsletterForm({ division }: { division: Division }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const inputId = `${division}-newsletter-email`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: formData
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Unable to subscribe.");
      }

      setStatus("sent");
      setMessage(result.message || "Subscribed.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe. Please try again."
      );
    }
  }

  return (
    <form
      action="/api/newsletter"
      method="post"
      onSubmit={handleSubmit}
      className="mt-3 max-w-sm sm:mt-5"
    >
      <input type="hidden" name="division" value={division} />
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="min-w-0 flex-1 rounded-lg border border-white/16 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/42 sm:py-3"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-ink transition hover:bg-solar-100 disabled:cursor-wait disabled:opacity-70 sm:h-12 sm:w-12"
          aria-label="Subscribe"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs leading-5 ${
            status === "error" ? "text-red-200" : "text-white/68"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
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
        className="floating-action inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#1eb858] sm:h-12 sm:w-12"
        aria-label="Open WhatsApp enquiry"
      >
        <WhatsAppIcon size={20} />
      </Link>
      <Link
        href={contact.contactHref}
        className="floating-action inline-flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-realty-700 sm:h-12 sm:w-12"
        aria-label="Open enquiry form"
      >
        <Mail size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}
