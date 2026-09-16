import { readdirSync } from "node:fs";
import { join } from "node:path";

const captured = new Set(
  readdirSync(join(process.cwd(), "public/uikit/previews"))
    .filter((file) => file.endsWith(".png"))
    .map((file) => file.slice(0, -4)),
);

/** Docs aliases that were not staged as their own catalog type. */
const fallback: Record<string, string> = {
  NVAlert: "NVBanner",
  NVOfflineBanner: "NVBanner",
  NVAppBar: "NVToolbar",
  NVHeatMap: "NVTreeMap",
  NVMaps: "NVMap",
  NVSparkline: "NVChart",
  NVListView: "NVCollectionView",
  NVCardsView: "NVCollectionView",
  NVSideDrawer: "NVNavigationDrawer",
  NVNavigationView: "NVNavigationDrawer",
  NVSlideView: "NVCarousel",
  NVGauge: "NVRadialGauge",
  NVStepper: "NVStepProgressBar",
  NVAiAssistView: "NVAIPrompt",
};

export function uiKitPreviewSrc(name: string): string | null {
  const file = captured.has(name) ? name : fallback[name];
  return file && captured.has(file) ? `/uikit/previews/${file}.png` : null;
}
