export type FavoritePage =
  | "about"
  | "portfolio"
  | "blog"
  | "contact"
  | "guestbook";

export type MusicSource = "mp3" | "youtube";
export type ContactStatus = "online" | "away" | "busy";

export interface ProfileLink {
  label: string;
  url: string;
  icon: string;
}

export interface FavoriteLink {
  label: string;
  page: FavoritePage;
}

export interface ProfileContent {
  name: string;
  role: string;
  location: string;
  tagline: string;
  shortBio: string;
  longBio: string[];
  email: string;
  website: string;
  links: ProfileLink[];
  favorites: FavoriteLink[];
  skills: string[];
}

export interface ProjectContent {
  id: string;
  name: string;
  year: string;
  summary: string;
  description: string;
  stack: string[];
  url: string;
  repo: string;
  status: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  duration: string;
  playlist: string;
  source: MusicSource;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  description: string;
}

export interface ChatMessage {
  from: "me" | string;
  text: string;
  time: string;
}

export interface ChatContact {
  id: string;
  name: string;
  email: string;
  status: ContactStatus;
  avatarColor: string;
  headline: string;
  messages: ChatMessage[];
}

export interface SiteContent {
  profile: ProfileContent;
  projects: ProjectContent[];
  music: MusicTrack[];
  blog: BlogPost[];
  gallery: GalleryItem[];
  chats: ChatContact[];
}
