import { Seo } from "@/components/Seo";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { projectImages } from "@/lib/assets";

export default function ShowerEnclosuresPage() {
  return (
    <>
      <Seo
        title="Frameless Shower Enclosures & Shower Doors"
        description="Custom frameless shower enclosures and shower doors measured, fabricated, and installed by LA Glass in the Los Angeles area."
        path="/services/shower-enclosures"
      />
      <ServiceDetail
        slug="shower-enclosures"
        eyebrow="Shower enclosures & doors"
        title="Shower glass built for your bathroom's exact dimensions"
        images={[
          projectImages.showerSteamBench,
          projectImages.showerPandaQuartzite,
          projectImages.showerBlackHillside,
          projectImages.showerSlidingBarn,
        ]}
      />
    </>
  );
}
