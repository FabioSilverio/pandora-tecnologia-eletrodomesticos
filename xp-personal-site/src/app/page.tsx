import { loadSiteContent } from "@/lib/content";
import { DesktopShell } from "@/modules/desktop/desktop-shell";

export default async function Home() {
  const content = await loadSiteContent();

  return <DesktopShell content={content} />;
}
