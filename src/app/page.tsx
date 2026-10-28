import HeroCarousel from "@/components/home/HeroCarousel";
import CampusWireTicker from "@/components/home/CampusWireTicker";
import InThisIssueContents from "@/components/home/InThisIssueContents";
import FeatureSpread from "@/components/home/FeatureSpread";
import TheEdit from "@/components/home/TheEdit";
import ShortsSection from "@/components/home/ShortsSection";
import StyleCampusLife from "@/components/home/StyleCampusLife";
import WatchListen from "@/components/home/WatchListen";
import NustBoxdShelf from "@/components/home/NustBoxdShelf";
import QuoteCarousel from "@/components/home/QuoteCarousel";
import CallToAction from "@/components/home/CallToAction";
import { siteConfig } from "@/content/site-config";
import { getHomeData } from "@/lib/home";

export default async function Home() {
  const data = await getHomeData();

  return (
    <div className="w-full">
      <h1 className="sr-only">
        March &apos;91 — {siteConfig.tagline}
      </h1>

      {/* ── Section 3: The Cover (Hero Carousel + Cover Lines) ── */}
      <HeroCarousel slides={data.slides} coverLines={data.coverLines} />

      {/* ── Section 4: Campus Wire Marquee Ticker ── */}
      <CampusWireTicker articles={data.tickerArticles} />

      {/* ── Section 5: In This Issue Magazine Contents ── */}
      <InThisIssueContents articles={data.contents} />

      {/* ── Section 6: Feature Spread ── */}
      <FeatureSpread article={data.feature} />

      {/* ── Section 7: The Edit ── */}
      <TheEdit articles={data.edit} tagline={data.copy.editTagline} />

      {/* ── Section 8: Shorts ── */}
      <ShortsSection shorts={data.shorts} showPlaceholders={data.showMediaPlaceholders} />

      {/* ── Section 9: Style & Campus Life ── */}
      <StyleCampusLife lead={data.lifestyle.lead} list={data.lifestyle.list} />

      {/* ── Section 10: Watch & Listen ── */}
      <WatchListen videos={data.videos} showPlaceholders={data.showMediaPlaceholders} />

      {/* ── Section 11: NUST Box'd Shelf ── */}
      <NustBoxdShelf articles={data.shelf} tagline={data.copy.shelfTagline} />

      {/* ── Section 12: Quotes Carousel ── */}
      <QuoteCarousel />

      {/* ── Section 13: Call to Action ── */}
      <CallToAction />
    </div>
  );
}
