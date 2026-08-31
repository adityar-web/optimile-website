import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logos";
import { OperatorReality } from "@/components/sections/operator-reality";
import { Platform } from "@/components/sections/platform";
import { Depth } from "@/components/sections/depth";
import { Intelligence } from "@/components/sections/intelligence";
import { Outcomes } from "@/components/sections/outcomes";
import { Integrations } from "@/components/sections/integrations";
import { Testimonial } from "@/components/sections/testimonial";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <LogoWall />
        <OperatorReality />
        <Platform />
        <Depth />
        <Intelligence />
        <Outcomes />
        <Integrations />
        <Testimonial />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
