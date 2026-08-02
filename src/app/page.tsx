import { DivisionChooser } from "@/components/DivisionChooser";
import { GroupHome } from "@/components/PageSections";
import { SiteChrome } from "@/components/SiteChrome";

export default function Home() {
  return (
    <SiteChrome division="group">
      <DivisionChooser />
      <GroupHome />
    </SiteChrome>
  );
}
