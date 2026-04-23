"use client";

import type { CSSProperties, PropsWithChildren } from "react";

type IconName =
  | "computer"
  | "documents"
  | "folder"
  | "folder-star"
  | "image"
  | "music"
  | "ie"
  | "player"
  | "messenger"
  | "notepad"
  | "calculator"
  | "bin"
  | "text"
  | "url"
  | "paint"
  | "command"
  | "control-panel"
  | "minesweeper"
  | "power";

interface SystemIconProps {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}

function BaseIcon({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

export function SystemIcon({ name, className, style }: SystemIconProps) {
  switch (name) {
    case "computer":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="10" y="11" width="32" height="28" rx="3" fill="#a8dbff" stroke="#2961b6" strokeWidth="3" />
          <rect x="15" y="16" width="22" height="18" rx="2" fill="#e2f4ff" />
          <rect x="20" y="42" width="12" height="5" rx="1" fill="#5a79b3" />
          <rect x="16" y="47" width="20" height="4" rx="2" fill="#9fb6dc" />
          <rect x="42" y="14" width="13" height="34" rx="3" fill="#d9c4ff" stroke="#57409a" strokeWidth="3" />
          <circle cx="48.5" cy="41.5" r="2.5" fill="#7af17c" />
        </BaseIcon>
      );
    case "documents":
      return (
        <BaseIcon className={className} style={style}>
          <path d="M14 8H42L50 16V54H14V8Z" fill="#fbf9f0" stroke="#62729f" strokeWidth="3" />
          <path d="M42 8V16H50" fill="#dfe9ff" />
          <path d="M42 8V16H50" stroke="#62729f" strokeWidth="3" />
          <rect x="21" y="24" width="22" height="4" rx="2" fill="#7aa0dc" />
          <rect x="21" y="33" width="16" height="4" rx="2" fill="#99b8ea" />
          <rect x="18" y="14" width="20" height="22" rx="2" fill="#fffdf8" stroke="#3d5da1" strokeWidth="3" />
        </BaseIcon>
      );
    case "folder":
    case "folder-star":
      return (
        <BaseIcon className={className} style={style}>
          <path d="M8 20H27L31 15H56V50H8V20Z" fill="#f4cf6f" stroke="#8f6724" strokeWidth="3" />
          <path d="M8 24H56V50H8V24Z" fill="#ffd769" />
          {name === "folder-star" ? (
            <path d="M44 29L46.7 34.4L52.7 35.3L48.4 39.5L49.4 45.5L44 42.7L38.6 45.5L39.6 39.5L35.3 35.3L41.3 34.4L44 29Z" fill="#5e83d6" />
          ) : null}
        </BaseIcon>
      );
    case "image":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="10" y="10" width="44" height="44" rx="4" fill="#f8fbff" stroke="#2b5ab5" strokeWidth="3" />
          <circle cx="23" cy="24" r="6" fill="#ffdf74" />
          <path d="M16 44L28 31L37 39L43 33L49 44H16Z" fill="#5dbb74" />
          <path d="M16 44L28 31L37 39L43 33L49 44" stroke="#2f7a4a" strokeWidth="3" strokeLinejoin="round" />
        </BaseIcon>
      );
    case "music":
      return (
        <BaseIcon className={className} style={style}>
          <circle cx="23" cy="44" r="9" fill="#7b87ff" />
          <circle cx="43" cy="36" r="9" fill="#96e0ff" />
          <path d="M32 15V40L52 32V11L32 15Z" fill="#ffd36a" stroke="#8e6220" strokeWidth="3" strokeLinejoin="round" />
        </BaseIcon>
      );
    case "ie":
      return (
        <BaseIcon className={className} style={style}>
          <circle cx="32" cy="32" r="15" fill="#2d7ed8" />
          <path d="M18 31C18 22 24 17 33 17C39 17 45 20 48 25H31C27 25 25 27 25 31H48C48 40 41 47 32 47C23 47 16 40 16 31C16 22 23 15 32 15" stroke="#7fd7ff" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M12 30C20 27 28 26 38 26C46 26 54 27 60 30" stroke="#ffca4b" strokeWidth="4" strokeLinecap="round" />
        </BaseIcon>
      );
    case "player":
      return (
        <BaseIcon className={className} style={style}>
          <circle cx="32" cy="32" r="26" fill="#f0f4fb" stroke="#5d81c8" strokeWidth="3" />
          <circle cx="32" cy="32" r="20" fill="#d2e8ff" />
          <path d="M27 21L45 32L27 43V21Z" fill="#5fae5f" />
          <path d="M18 45C18 52 24 56 31 56C38 56 44 52 46 45" stroke="#ffb749" strokeWidth="5" strokeLinecap="round" />
        </BaseIcon>
      );
    case "messenger":
      return (
        <BaseIcon className={className} style={style}>
          <circle cx="26" cy="23" r="11" fill="#7ad3ff" />
          <circle cx="39" cy="40" r="11" fill="#9df08d" />
          <circle cx="22" cy="41" r="9" fill="#f9cc58" />
          <circle cx="42" cy="20" r="9" fill="#7c8fff" />
          <path d="M34 27L30 34L38 32L35 38" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </BaseIcon>
      );
    case "notepad":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="17" y="9" width="30" height="46" rx="4" fill="#fff8ee" stroke="#5880c7" strokeWidth="3" />
          <rect x="17" y="14" width="30" height="7" fill="#8fc1ff" />
          <rect x="22" y="27" width="20" height="3" rx="1.5" fill="#6797d3" />
          <rect x="22" y="34" width="18" height="3" rx="1.5" fill="#a3bce0" />
          <rect x="22" y="41" width="14" height="3" rx="1.5" fill="#a3bce0" />
        </BaseIcon>
      );
    case "calculator":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="16" y="8" width="32" height="48" rx="5" fill="#e9edf7" stroke="#62719f" strokeWidth="3" />
          <rect x="22" y="14" width="20" height="8" rx="2" fill="#9bc7a0" />
          <g fill="#7292c8">
            <rect x="22" y="28" width="6" height="6" rx="1.5" />
            <rect x="31" y="28" width="6" height="6" rx="1.5" />
            <rect x="40" y="28" width="6" height="6" rx="1.5" />
            <rect x="22" y="37" width="6" height="6" rx="1.5" />
            <rect x="31" y="37" width="6" height="6" rx="1.5" />
            <rect x="40" y="37" width="6" height="15" rx="1.5" />
            <rect x="22" y="46" width="15" height="6" rx="1.5" />
          </g>
        </BaseIcon>
      );
    case "bin":
      return (
        <BaseIcon className={className} style={style}>
          <path d="M20 18H44L41 50H23L20 18Z" fill="#f0fbff" stroke="#4e86c8" strokeWidth="3" />
          <path d="M17 18H47" stroke="#4e86c8" strokeWidth="4" strokeLinecap="round" />
          <path d="M25 16C25 12.6863 27.6863 10 31 10H33C36.3137 10 39 12.6863 39 16" stroke="#7ab9ff" strokeWidth="3" />
          <path d="M27 23V45M33 23V45M39 23V45" stroke="#8cc2ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 39C24 34 29 33 34 34C39 35 43 38 46 42" stroke="#57c447" strokeWidth="4" strokeLinecap="round" />
        </BaseIcon>
      );
    case "paint":
      return (
        <BaseIcon className={className} style={style}>
          <path d="M15 44L31 12L39 20L24 50H15V44Z" fill="#ffce6d" stroke="#936623" strokeWidth="3" />
          <path d="M31 12L41 9L55 23L52 33L39 20" fill="#ff7a7a" stroke="#8b3d3d" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="16" cy="48" r="5" fill="#5c9dff" />
          <circle cx="28" cy="48" r="5" fill="#66d9a1" />
          <circle cx="40" cy="48" r="5" fill="#ffd05d" />
        </BaseIcon>
      );
    case "command":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="9" y="14" width="46" height="34" rx="4" fill="#121920" stroke="#6d87a9" strokeWidth="3" />
          <path d="M18 24L25 30L18 36" stroke="#9fe4ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 37H43" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </BaseIcon>
      );
    case "control-panel":
      return (
        <BaseIcon className={className} style={style}>
          <circle cx="32" cy="32" r="12" fill="#b6c8e8" stroke="#60789f" strokeWidth="3" />
          <path d="M32 12V18M32 46V52M52 32H46M18 32H12M45.4 18.6L41.1 22.9M22.9 41.1L18.6 45.4M45.4 45.4L41.1 41.1M22.9 22.9L18.6 18.6" stroke="#7894bd" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="32" r="4" fill="#487dd6" />
        </BaseIcon>
      );
    case "minesweeper":
      return (
        <BaseIcon className={className} style={style}>
          <rect x="10" y="10" width="44" height="44" rx="4" fill="#d7dce5" stroke="#6e7485" strokeWidth="3" />
          <circle cx="32" cy="32" r="9" fill="#23262d" />
          <path d="M32 15V22M32 42V49M15 32H22M42 32H49M20 20L24.5 24.5M39.5 39.5L44 44M44 20L39.5 24.5M24.5 39.5L20 44" stroke="#23262d" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="32" r="3" fill="#f7f8fb" />
        </BaseIcon>
      );
    case "power":
      return (
        <BaseIcon className={className} style={style}>
          <path d="M32 10V30" stroke="#ff8d61" strokeWidth="5" strokeLinecap="round" />
          <path d="M21 17C16 20.7 13 26.2 13 32.2C13 42.6 21.6 51 32 51C42.4 51 51 42.6 51 32.2C51 26.2 48 20.7 43 17" stroke="#5d82d7" strokeWidth="5" strokeLinecap="round" />
        </BaseIcon>
      );
    case "text":
      return <SystemIcon name="notepad" className={className} style={style} />;
    case "url":
      return <SystemIcon name="ie" className={className} style={style} />;
    default:
      return <SystemIcon name="folder" className={className} style={style} />;
  }
}
