"use client";

import type { BlogPost, FavoritePage, ProfileContent, ProjectContent } from "@/types/content";

interface InternetExplorerAppProps {
  page: FavoritePage;
  profile: ProfileContent;
  projects: ProjectContent[];
  blog: BlogPost[];
  onNavigate: (page: FavoritePage) => void;
}

function renderPage(
  page: FavoritePage,
  profile: ProfileContent,
  projects: ProjectContent[],
  blog: BlogPost[],
) {
  switch (page) {
    case "about":
      return (
        <div className="space-y-5">
          <header>
            <h1 className="text-3xl font-bold text-[#163864]">{profile.name}</h1>
            <p className="mt-2 text-lg text-[#44627e]">{profile.tagline}</p>
          </header>
          <section className="rounded-[16px] border border-[#d7d6cd] bg-[#f8f6ef] p-4">
            <h2 className="mb-2 text-lg font-bold text-[#173b68]">Bio</h2>
            <p className="leading-7 text-[#3d5675]">{profile.shortBio}</p>
            <div className="mt-4 space-y-3 text-[#4d6783]">
              {profile.longBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section className="rounded-[16px] border border-[#d7d6cd] bg-[#fff] p-4">
            <h2 className="mb-3 text-lg font-bold text-[#173b68]">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#b8d0f3] bg-[#ebf4ff] px-3 py-1 text-sm text-[#214775]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      );
    case "portfolio":
      return (
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-[#163864]">Portfolio</h1>
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-[16px] border border-[#d7d6cd] bg-white p-4 shadow-[0_1px_0_rgba(255,255,255,0.7)]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-[#163864]">{project.name}</h2>
                <span className="rounded-full bg-[#ecf4ff] px-3 py-1 text-xs font-bold text-[#235182]">
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-[#49627f]">{project.summary}</p>
              <p className="mt-3 leading-7 text-[#405a78]">{project.description}</p>
              <p className="mt-3 text-sm text-[#627b98]">
                Stack: {project.stack.join(", ")}
              </p>
            </article>
          ))}
        </div>
      );
    case "blog":
      return (
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-[#163864]">Blog</h1>
          {blog.map((post) => (
            <article key={post.id} className="rounded-[16px] border border-[#d7d6cd] bg-white p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-[#6b83a2]">{post.date}</div>
              <h2 className="mt-1 text-xl font-bold text-[#173b68]">{post.title}</h2>
              <p className="mt-2 text-[#4b6481]">{post.excerpt}</p>
              <p className="mt-4 leading-7 text-[#405a78]">{post.content}</p>
            </article>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-[#163864]">Contact</h1>
          <div className="rounded-[16px] border border-[#d7d6cd] bg-white p-4">
            <p className="text-[#45627e]">
              Email: <a href={`mailto:${profile.email}`} className="text-[#1d56b4] underline">{profile.email}</a>
            </p>
            <p className="mt-2 text-[#45627e]">
              Website: <a href={profile.website} className="text-[#1d56b4] underline">{profile.website}</a>
            </p>
          </div>
          <div className="rounded-[16px] border border-[#d7d6cd] bg-[#f8f6ef] p-4">
            <h2 className="mb-3 text-lg font-bold text-[#173b68]">Favorite Links</h2>
            <ul className="space-y-2">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url} className="text-[#1d56b4] underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "guestbook":
      return (
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-[#163864]">Guestbook</h1>
          <div className="rounded-[16px] border border-[#d7d6cd] bg-white p-4">
            <p className="leading-7 text-[#405a78]">
              This is a mock guestbook on purpose. Replace it with a form, a static list, or a real database-backed wall later. The nostalgic shell is already here.
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function InternetExplorerApp({
  page,
  profile,
  projects,
  blog,
  onNavigate,
}: InternetExplorerAppProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece9d8]">
      <div className="border-b border-[#b8ae97] bg-[linear-gradient(180deg,#fffef9,#eee4ce)] px-3 py-2">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {(["about", "portfolio", "blog", "contact", "guestbook"] as FavoritePage[]).map((item) => (
            <button
              key={item}
              type="button"
              className="xp-button px-3 py-1 text-xs capitalize"
              onClick={() => onNavigate(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="rounded border border-[#b6ab93] bg-white px-3 py-2 text-sm text-[#2a4a72]">
          https://personal.xp/{page}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white p-6">
        {renderPage(page, profile, projects, blog)}
      </div>
    </div>
  );
}
