import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk } from "next/font/google";
import { ConsoleIdentity } from "@/components/ConsoleIdentity";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const solarAlt = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-solar",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://milton-grp.vercel.app"
  ),
  title: {
    default: "Milton Group | Realty and Solar",
    template: "%s | Milton Group"
  },
  description:
    "Milton Group brings together Milton Realty and Milton Solar: property advisory and solar energy solutions for Maharashtra."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${solarAlt.variable}`}>
        <ConsoleIdentity />
        {children}
      </body>
    </html>
  );
}
