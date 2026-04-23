# xp-personal-site

`xp-personal-site` is a personal portfolio built as a browser-based retro operating system inspired by the feeling of Windows XP. Instead of a normal landing page, visitors arrive inside a desktop with icons, draggable windows, a Start menu, a taskbar, mock system sounds, and portfolio content distributed across nostalgic apps.

The project uses the public `ryo.lu` / `os.ryo.lu` experience only as a reference for execution quality, density of interaction, and the idea of an OS in the browser. No assets, code, or branding from that project are reused here.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Local persistence with `localStorage`

## What is implemented

- Boot screen before the desktop loads
- XP-style wallpaper, taskbar, Start button, systray, clock, and desktop icons
- Draggable and resizable windows
- Minimize, maximize, close, focus, and taskbar restore
- File Explorer with folder navigation, breadcrumbs, sidebar, and mock file handling
- Retro media player with playlist support for local MP3 files and YouTube-configured entries
- MSN Messenger mock with contacts and separate conversation windows
- Functional calculator
- Notepad with local save per text file
- Internet Explorer mock with internal pages
- Image viewer connected to gallery content
- Paint mock, command prompt mock, Minesweeper, login screen, screensaver, and fake power actions
- Content-driven data model via JSON files

## Project structure

```txt
content/                       Editable site content
public/media/                  Covers, gallery artwork, and local music files
src/app/                       App Router entrypoints
src/lib/                       Server-side content loading
src/types/                     Shared content types
src/modules/admin/content/     Content file references
src/modules/audio/             UI sound helpers
src/modules/file-system/       File system entry types
src/modules/mock-data/         Mock desktop/file system generation
src/modules/window-manager/    Window state, persistence, and geometry
src/modules/desktop/           Desktop shell, taskbar, start menu, chrome
src/modules/apps/              Individual OS apps
```

## Editable content

You can change the portfolio without touching the app code by editing:

- `content/profile.json`
- `content/projects.json`
- `content/music.json`
- `content/blog.json`
- `content/gallery.json`
- `content/msn-chats.json`

### Content notes

- `music.json`: accepts `title`, `artist`, `url`, `cover`, `duration`, `playlist`, and `source`.
- `source: "mp3"` plays directly in the media player.
- `source: "youtube"` renders in the embedded YouTube mode.
- Local MP3 files can live under `public/media/music/` and be referenced as `/media/music/your-file.mp3`.
- Gallery art and cover art can point to local files under `public/` or remote URLs.
- Text opened in Notepad is saved in `localStorage` per file path, so quick edits persist between sessions.

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
npm run start
```

## Deployment on Vercel

This project is already structured for Vercel deployment:

1. Push the repository to GitHub or deploy directly with the Vercel CLI.
2. Import the repository into Vercel if you want Git-based deployments.
3. Keep the default framework detection as Next.js.
4. Deploy.

There are no required environment variables for the current mock-driven version.

## Architecture notes

- `src/app/page.tsx` loads JSON content on the server and passes it into the desktop shell.
- `src/modules/mock-data/file-system.ts` converts content JSON into a fake file system that powers the Explorer and file opening behavior.
- `src/modules/window-manager/use-window-manager.ts` owns window creation, focus order, minimize/maximize state, and persisted desktop preferences.
- `src/modules/desktop/desktop-shell.tsx` is the main orchestrator that maps desktop actions to app windows.
- Each app is isolated in `src/modules/apps/*`, which keeps the system extensible for future additions and content-driven updates.
