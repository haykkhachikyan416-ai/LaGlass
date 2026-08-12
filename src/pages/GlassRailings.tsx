import { Seo } from "@/components/Seo";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { projectImages } from "@/lib/assets";

export default function GlassRailingsPage() {
  return (
    <>
      <Seo
        title="Glass Railings"
        description="Custom glass-railing installations for staircases, balconies, and interior spaces from LA Glass in the Los Angeles area."
        path="/services/glass-railings"
      />
      <ServiceDetail
        slug="glass-railings"
        eyebrow="Glass railings"
        title="Open sightlines, solid installation"
        images={[
          projectImages.railingCurvedBrass,
          projectImages.railingStoneLanding,
          projectImages.railingMezzanine,
          projectImages.railingOakStair,
        ]}
      />
    </>
  );
}
