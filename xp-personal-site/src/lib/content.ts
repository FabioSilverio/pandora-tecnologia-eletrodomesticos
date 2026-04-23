import { promises as fs } from "node:fs";
import path from "node:path";

import type { SiteContent } from "@/types/content";

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "content", filename);
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as T;
}

export async function loadSiteContent(): Promise<SiteContent> {
  const [profile, projects, music, blog, gallery, chats] = await Promise.all([
    readJsonFile<SiteContent["profile"]>("profile.json"),
    readJsonFile<SiteContent["projects"]>("projects.json"),
    readJsonFile<SiteContent["music"]>("music.json"),
    readJsonFile<SiteContent["blog"]>("blog.json"),
    readJsonFile<SiteContent["gallery"]>("gallery.json"),
    readJsonFile<SiteContent["chats"]>("msn-chats.json"),
  ]);

  return {
    profile,
    projects,
    music,
    blog,
    gallery,
    chats,
  };
}
