import type { FavoritePage, GalleryItem, MusicTrack } from "@/types/content";

export type FileType = "folder" | "text" | "image" | "audio" | "url";

export interface BaseFsEntry {
  id: string;
  name: string;
  path: string;
  type: FileType;
  icon: string;
}

export interface FolderEntry extends BaseFsEntry {
  type: "folder";
  children: FsEntry[];
}

export interface TextFileEntry extends BaseFsEntry {
  type: "text";
  extension: ".txt";
  content: string;
}

export interface ImageFileEntry extends BaseFsEntry {
  type: "image";
  extension: ".png" | ".jpg" | ".svg";
  src: string;
  description?: string;
}

export interface AudioFileEntry extends BaseFsEntry {
  type: "audio";
  extension: ".mp3";
  track: MusicTrack;
}

export interface UrlFileEntry extends BaseFsEntry {
  type: "url";
  extension: ".url";
  page: FavoritePage;
  url?: string;
}

export type FsFileEntry =
  | TextFileEntry
  | ImageFileEntry
  | AudioFileEntry
  | UrlFileEntry;

export type FsEntry = FolderEntry | FsFileEntry;

export interface ExplorerShortcut {
  label: string;
  path: string;
  description: string;
}

export interface ImageIndexItem {
  id: string;
  title: string;
  src: string;
  description: string;
}

export interface DesktopItem {
  id: string;
  label: string;
  icon: string;
  action:
    | { type: "folder"; path: string }
    | { type: "app"; appId: string }
    | { type: "page"; page: FavoritePage }
    | { type: "file"; path: string };
}

export function isFolder(entry: FsEntry): entry is FolderEntry {
  return entry.type === "folder";
}

export function isImageEntry(entry: FsEntry): entry is ImageFileEntry {
  return entry.type === "image";
}

export function toImageIndex(items: GalleryItem[]): ImageIndexItem[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    src: item.src,
    description: item.description,
  }));
}
