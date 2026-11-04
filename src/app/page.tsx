import type { Metadata } from "next";
import { DivisionChooser } from "@/components/DivisionChooser";
import { GroupHome } from "@/components/PageSections";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

export default function Home() {
  return (
    <SiteChrome division="group">
      <DivisionChooser />
      <GroupHome />
    </SiteChrome>
  );
}
