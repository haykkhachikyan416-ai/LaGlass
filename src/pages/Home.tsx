import { Seo } from "@/components/Seo";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyUs } from "@/components/home/WhyUs";
import { Stats } from "@/components/home/Stats";
import { WorkInMotion } from "@/components/home/WorkInMotion";
import { Process } from "@/components/home/Process";
import { WhatToExpect } from "@/components/home/WhatToExpect";
import { ServiceArea } from "@/components/home/ServiceArea";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { StructuredData } from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <Seo
        title="LA Glass"
        description="Custom shower enclosures, shower doors, glass railings, and glass installation throughout the Los Angeles area. View completed work and request a free quote."
        path="/"
      />
      <StructuredData />
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <FeaturedProjects />
      <WhyUs />
      <Stats />
      <WorkInMotion />
      <Process />
      <WhatToExpect />
      <ServiceArea />
      <Faq />
      <FinalCta />
    </>
  );
}
