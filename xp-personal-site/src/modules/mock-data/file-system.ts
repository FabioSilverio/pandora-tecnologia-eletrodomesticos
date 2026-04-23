import type { SiteContent } from "@/types/content";
import type {
  DesktopItem,
  ExplorerShortcut,
  FolderEntry,
  FsEntry,
  FsFileEntry,
  ImageFileEntry,
  ImageIndexItem,
  UrlFileEntry,
} from "@/modules/file-system/types";
import { toImageIndex } from "@/modules/file-system/types";

function normalizePath(path: string) {
  return path.replace(/\/+/g, "/");
}

function folder(name: string, path: string, children: FsEntry[] = []): FolderEntry {
  return {
    id: normalizePath(path),
    name,
    path: normalizePath(path),
    type: "folder",
    icon: "folder",
    children,
  };
}

function textFile(
  name: string,
  path: string,
  content: string,
  icon = "text",
): FsFileEntry {
  return {
    id: normalizePath(path),
    name,
    path: normalizePath(path),
    type: "text",
    extension: ".txt",
    icon,
    content,
  };
}

function imageFile(
  name: string,
  path: string,
  src: string,
  description: string,
): ImageFileEntry {
  return {
    id: normalizePath(path),
    name,
    path: normalizePath(path),
    type: "image",
    extension: ".svg",
    icon: "image",
    src,
    description,
  };
}

function urlFile(
  name: string,
  path: string,
  page: UrlFileEntry["page"],
  url?: string,
): UrlFileEntry {
  return {
    id: normalizePath(path),
    name,
    path: normalizePath(path),
    type: "url",
    extension: ".url",
    icon: "url",
    page,
    url,
  };
}

export interface MockFileSystem {
  root: FolderEntry;
  imageIndex: ImageIndexItem[];
  desktopItems: DesktopItem[];
  quickAccess: ExplorerShortcut[];
}

export function buildMockFileSystem(content: SiteContent): MockFileSystem {
  const aboutText = [
    `Oi, aqui e o ${content.profile.name}.`,
    `${content.profile.role} no ${content.profile.location}.`,
    "",
    content.profile.shortBio,
    "",
    ...content.profile.longBio,
    "",
    "Skills:",
    ...content.profile.skills.map((skill) => `- ${skill}`),
  ].join("\n");

  const contactText = [
    `Email: ${content.profile.email}`,
    `Website: ${content.profile.website}`,
    "",
    "Find me online:",
    ...content.profile.links.map((link) => `- ${link.label}: ${link.url}`),
  ].join("\n");

  const projectFiles = content.projects.map((project) =>
    textFile(
      `${project.name}.txt`,
      `/Portfolio/Projects/${project.name}.txt`,
      [
        `${project.name} (${project.year})`,
        `Status: ${project.status}`,
        "",
        project.summary,
        "",
        project.description,
        "",
        `Stack: ${project.stack.join(", ")}`,
        `Website: ${project.url}`,
        `Repository: ${project.repo}`,
      ].join("\n"),
    ),
  );

  const blogFiles = content.blog.map((post) =>
    textFile(
      `${post.title}.txt`,
      `/Blog/${post.title}.txt`,
      `${post.title}\n${post.date}\n\n${post.excerpt}\n\n${post.content}`,
    ),
  );

  const musicFiles = content.music.map((track) => ({
    id: `/My Music/${track.title}.mp3`,
    name: `${track.title}.mp3`,
    path: `/My Music/${track.title}.mp3`,
    type: "audio" as const,
    extension: ".mp3" as const,
    icon: "music",
    track,
  }));

  const pictureFiles = content.gallery.map((item) =>
    imageFile(item.title, `/My Pictures/${item.title}.svg`, item.src, item.description),
  );

  const root = folder("/", "/", [
    folder("Desktop", "/Desktop", [
      urlFile("About Me.url", "/Desktop/About Me.url", "about"),
      urlFile("Portfolio.url", "/Desktop/Portfolio.url", "portfolio"),
      urlFile("Contact.url", "/Desktop/Contact.url", "contact"),
    ]),
    folder("My Documents", "/My Documents", [
      textFile(
        "Oi, aqui e o Fabio.txt",
        "/My Documents/Oi, aqui e o Fabio.txt",
        [
          `Oi, aqui e o ${content.profile.name}.`,
          "",
          "Este desktop e meu portfolio pessoal em formato de Windows XP navegavel.",
          "Pode abrir os arquivos, explorar os projetos, testar o Internet Explorer e ouvir minhas musicas no Windows Media Player.",
          "",
          content.profile.shortBio,
        ].join("\n"),
      ),
      textFile("Read Me First.txt", "/My Documents/Read Me First.txt", aboutText),
      textFile("Contact.txt", "/My Documents/Contact.txt", contactText),
    ]),
    folder("My Pictures", "/My Pictures", pictureFiles),
    folder("My Music", "/My Music", musicFiles),
    folder("Portfolio", "/Portfolio", [
      folder("About Me", "/Portfolio/About Me", [
        textFile("bio.txt", "/Portfolio/About Me/bio.txt", aboutText),
      ]),
      folder("Projects", "/Portfolio/Projects", projectFiles),
      folder("Contact", "/Portfolio/Contact", [
        textFile("contact.txt", "/Portfolio/Contact/contact.txt", contactText),
      ]),
    ]),
    folder("About Me", "/About Me", [
      textFile("manifesto.txt", "/About Me/manifesto.txt", aboutText),
    ]),
    folder("Blog", "/Blog", blogFiles),
    folder("Projects", "/Projects", projectFiles),
    folder("Contact", "/Contact", [
      textFile("contact.txt", "/Contact/contact.txt", contactText),
      urlFile("Guestbook.url", "/Contact/Guestbook.url", "guestbook"),
    ]),
    folder("Accessories", "/Accessories", [
      textFile(
        "Prompt Tips.txt",
        "/Accessories/Prompt Tips.txt",
        "Useful command prompt commands:\n\nhelp\nwhoami\nskills\nprojects\ncontact\nopen explorer\nopen msn\nopen paint\nopen control\nclear",
      ),
    ]),
    folder("Downloads", "/Downloads", [
      urlFile("Favorite Links.url", "/Downloads/Favorite Links.url", "portfolio"),
    ]),
    folder("Recycle Bin", "/Recycle Bin", []),
  ]);

  const desktopItems: DesktopItem[] = [
    { id: "my-computer", label: "My Computer", icon: "computer", action: { type: "folder", path: "/" } },
    { id: "documents", label: "My Documents", icon: "documents", action: { type: "folder", path: "/My Documents" } },
    { id: "pictures", label: "My Pictures", icon: "image", action: { type: "folder", path: "/My Pictures" } },
    { id: "music", label: "My Music", icon: "music", action: { type: "folder", path: "/My Music" } },
    { id: "portfolio", label: "Portfolio", icon: "folder-star", action: { type: "folder", path: "/Portfolio" } },
    { id: "internet-explorer", label: "Internet Explorer", icon: "ie", action: { type: "page", page: "about" } },
    { id: "media-player", label: "Media Player", icon: "player", action: { type: "app", appId: "media-player" } },
    { id: "messenger", label: "MSN Messenger", icon: "messenger", action: { type: "app", appId: "msn" } },
    { id: "notepad", label: "Notepad", icon: "notepad", action: { type: "file", path: "/My Documents/Read Me First.txt" } },
    { id: "calculator", label: "Calculator", icon: "calculator", action: { type: "app", appId: "calculator" } },
    { id: "paint", label: "Paint", icon: "paint", action: { type: "app", appId: "paint" } },
    { id: "cmd", label: "Command Prompt", icon: "command", action: { type: "app", appId: "command-prompt" } },
    { id: "control-panel", label: "Control Panel", icon: "control-panel", action: { type: "app", appId: "control-panel" } },
    { id: "minesweeper", label: "Minesweeper", icon: "minesweeper", action: { type: "app", appId: "minesweeper" } },
    { id: "recycle-bin", label: "Recycle Bin", icon: "bin", action: { type: "folder", path: "/Recycle Bin" } },
  ];

  const quickAccess: ExplorerShortcut[] = [
    { label: "Desktop", path: "/Desktop", description: "Quick access to desktop shortcuts" },
    { label: "My Documents", path: "/My Documents", description: "Personal notes and profile files" },
    { label: "My Pictures", path: "/My Pictures", description: "Artwork, covers, and screenshots" },
    { label: "My Music", path: "/My Music", description: "MP3 tracks loaded from content/music.json" },
    { label: "Portfolio", path: "/Portfolio", description: "Projects, bio, and contact folders" },
    { label: "Blog", path: "/Blog", description: "Short text posts in plain text form" },
  ];

  return {
    root,
    imageIndex: toImageIndex(content.gallery),
    desktopItems,
    quickAccess,
  };
}

export function findEntryByPath(entry: FsEntry, path: string): FsEntry | null {
  if (entry.path === path) {
    return entry;
  }

  if (entry.type !== "folder") {
    return null;
  }

  for (const child of entry.children) {
    const match = findEntryByPath(child, path);
    if (match) {
      return match;
    }
  }

  return null;
}

export function getFolderChildren(root: FolderEntry, path: string): FsEntry[] {
  const folderEntry = findEntryByPath(root, path);
  if (!folderEntry || folderEntry.type !== "folder") {
    return [];
  }

  return folderEntry.children;
}

export function getBreadcrumbs(path: string): Array<{ label: string; path: string }> {
  if (path === "/") {
    return [{ label: "My Computer", path: "/" }];
  }

  const segments = path.split("/").filter(Boolean);
  return [
    { label: "My Computer", path: "/" },
    ...segments.map((segment, index) => ({
      label: segment,
      path: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];
}
