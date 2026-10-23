import { HomeHero } from '../components/home/HomeHero';
import { Ecosystem } from '../components/home/Ecosystem';
import { Capabilities } from '../components/home/Capabilities';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { Methodology } from '../components/home/Methodology';
import { Expertise } from '../components/home/Expertise';
import { LatestResearch } from '../components/home/LatestResearch';
import { ClosingCta } from '../components/ClosingCta';

export function Home() {
  return (
    <>
      <HomeHero />
      <Ecosystem />
      <Capabilities />
      <FeaturedProducts />
      <Methodology />
      <Expertise />
      <LatestResearch />
      <ClosingCta
        title="Not sure which one you need?"
        lead="You shouldn’t have to diagnose your own technology problem before talking to someone who does this for a living. Tell us what’s happening and we’ll say whether you need a small fix, a focused project, a larger programme — or nothing from us at all."
      />
    </>
  );
}
