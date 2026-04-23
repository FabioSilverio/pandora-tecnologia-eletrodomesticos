"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { MusicTrack } from "@/types/content";

interface MediaPlayerAppProps {
  tracks: MusicTrack[];
  initialTrackId?: string;
}

function getYoutubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return match?.[1] ?? "";
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function ControlButton({
  label,
  icon,
  primary = false,
  onClick,
}: {
  label: string;
  icon: "play" | "pause" | "stop" | "previous" | "next" | "mute";
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`wmp-control ${primary ? "wmp-control-primary" : ""}`}
      onClick={onClick}
    >
      <span className={`wmp-control-icon wmp-${icon}`} />
    </button>
  );
}

export function MediaPlayerApp({ tracks, initialTrackId }: MediaPlayerAppProps) {
  const initialIndex = Math.max(
    0,
    initialTrackId ? tracks.findIndex((track) => track.id === initialTrackId) : 0,
  );
  const [index, setIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const groupedPlaylists = useMemo(() => {
    return tracks.reduce<Record<string, MusicTrack[]>>((accumulator, track) => {
      accumulator[track.playlist] ??= [];
      accumulator[track.playlist].push(track);
      return accumulator;
    }, {});
  }, [tracks]);

  const currentTrack = tracks[index] ?? tracks[0];
  const elapsed = formatTime(progress);
  const totalTime = duration ? formatTime(duration) : currentTrack.duration;
  const progressPercent = duration ? Math.min(100, (progress / duration) * 100) : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || currentTrack.source !== "mp3") {
      return;
    }

    audio.volume = volume;
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || currentTrack.source !== "mp3") {
      return;
    }

    audio.currentTime = 0;
    setProgress(0);
    setDuration(0);
  }, [currentTrack]);

  const playTrackAt = (trackIndex: number) => {
    const nextTrack = tracks[trackIndex];
    setIndex(trackIndex);
    setIsPlaying(nextTrack?.source === "mp3");
  };

  const previousTrack = () => {
    playTrackAt((index - 1 + tracks.length) % tracks.length);
  };

  const nextTrack = () => {
    playTrackAt((index + 1) % tracks.length);
  };

  const stopTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#d7dceb] text-[11px] text-[#071c42]">
      <audio
        ref={audioRef}
        src={currentTrack?.source === "mp3" ? currentTrack.url : undefined}
        onTimeUpdate={(event) => {
          setProgress(event.currentTarget.currentTime);
          setDuration(event.currentTarget.duration || 0);
        }}
        onEnded={nextTrack}
      />

      <div className="flex h-[22px] shrink-0 items-center gap-4 border-b border-[#9aa8c6] bg-[#fffef8] px-2 text-[11px] text-black">
        {["File", "View", "Play", "Tools", "Help"].map((item) => (
          <button key={item} type="button" className="px-1 hover:bg-[#316ac5] hover:text-white">
            {item}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col border-t border-white bg-[linear-gradient(180deg,#eef3ff_0,#cbd5ec_58px,#9baed6_59px,#7b8fbd_100%)] p-2">
        <div className="mb-2 flex h-[31px] shrink-0 items-center justify-between rounded-t-[18px] border border-[#8a9fc7] bg-[linear-gradient(180deg,#f8fbff,#c8d5f1_55%,#8195c4)] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <button
            type="button"
            aria-label="Back"
            title="Back"
            className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[#758ab5] bg-[linear-gradient(180deg,#ffffff,#c9d4ea)]"
          >
            <span className="h-0 w-0 border-y-[4px] border-r-[6px] border-y-transparent border-r-[#40537c]" />
          </button>
          <div className="flex h-[24px] min-w-[210px] items-center justify-between rounded border border-[#6f84ad] bg-[linear-gradient(180deg,#eef5ff,#bdccea)] px-2 shadow-[inset_1px_1px_0_rgba(255,255,255,0.9)]">
            <span className="flex items-center gap-1">
              <span className="grid h-4 w-4 place-items-center rounded-sm border border-[#7590c4] bg-white">
                <span className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-[#316ac5]" />
              </span>
              Now Playing
            </span>
            <span className="h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-[#203d77]" />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[88px_minmax(260px,1fr)_196px] overflow-hidden rounded-[3px] border border-[#7688b1] bg-[#44547c]">
          <aside className="flex min-h-0 flex-col overflow-hidden border-r border-[#9eb0d0] bg-[linear-gradient(180deg,#e9f2ff,#c6d4ed_48%,#aebfdf)]">
            {[
              "Now Playing",
              "Media Guide",
              "Copy from CD",
              "Media Library",
              "Radio Tuner",
              "Copy to CD or Device",
            ].map((item, itemIndex) => (
              <button
                key={item}
                type="button"
                className={`border-b border-[#b2c2dd] px-2 py-2 text-left text-[11px] font-bold leading-[13px] ${
                  itemIndex === 0
                    ? "bg-[#d7e7fb] text-[#071c42]"
                    : "bg-transparent text-[#091d3e] hover:bg-[#eaf4ff]"
                }`}
              >
                {item}
              </button>
            ))}
            <div className="mt-auto grid h-[64px] place-items-center bg-[linear-gradient(135deg,#7e90bf,#c8d4ef)]">
              <div className="grid h-6 w-6 grid-cols-2 gap-[2px]">
                <span className="bg-[#f25022]" />
                <span className="bg-[#7fba00]" />
                <span className="bg-[#00a4ef]" />
                <span className="bg-[#ffb900]" />
              </div>
            </div>
          </aside>

          <main className="flex min-h-0 flex-col bg-[#111835]">
            <div className="flex min-h-0 flex-1 items-center justify-center bg-black p-4">
              {currentTrack.source === "youtube" ? (
                <iframe
                  title={currentTrack.title}
                  className="h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${getYoutubeId(currentTrack.url)}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <div className="relative h-full w-full overflow-hidden border border-[#0e0b65] bg-[#05015e]">
                  <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-end justify-center gap-[6px]">
                    {Array.from({ length: 18 }).map((_, barIndex) => {
                      const height = isPlaying
                        ? 18 + ((barIndex * 13 + progress * 31) % 118)
                        : 20 + ((barIndex * 7) % 34);
                      return (
                        <span
                          key={barIndex}
                          className="w-[7px] rounded-t-sm bg-[linear-gradient(180deg,#f7fbff,#8fb8ff_35%,#28458e)] shadow-[0_0_8px_rgba(143,184,255,0.7)]"
                          style={{ height }}
                        />
                      );
                    })}
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] font-bold text-[#dbe6ff]">
                    {isPlaying ? `${currentTrack.artist} - ${currentTrack.title}` : "Ambience : Water"}
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-[22px] shrink-0 items-center gap-1 border-t border-[#6c7fa8] bg-[#293150] px-2 text-[#dce7ff]">
              <span className="grid h-4 w-4 place-items-center border border-[#aeb9d4] bg-[#454e6b]">
                <span className="h-2 w-2 border border-white" />
              </span>
              <span className="wmp-mini-dot" />
              <span className="wmp-mini-dot" />
              <span className="ml-2 truncate">
                {currentTrack.artist} : {currentTrack.title}
              </span>
              <span className="ml-auto grid h-4 w-4 place-items-center border border-[#aeb9d4] bg-[#454e6b]">
                <span className="h-2 w-2 border border-white" />
              </span>
            </div>
          </main>

          <aside className="flex min-h-0 flex-col border-l border-[#273355] bg-[#44547c]">
            <div className="grid h-[162px] shrink-0 place-items-center border-b border-[#6f7fa7] bg-[#6678bf]">
              <div className="relative h-[108px] w-[108px] overflow-hidden bg-[#2d385f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                <Image src={currentTrack.cover} alt="" fill sizes="108px" className="object-cover opacity-85" />
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-auto border-t border-[#253051] bg-[#3e4c73]">
              {Object.entries(groupedPlaylists).map(([playlistName, playlistTracks]) => (
                <section key={playlistName}>
                  <div className="border-b border-[#7180a7] bg-[#526493] px-2 py-1 text-[10px] font-bold uppercase text-[#eef4ff]">
                    {playlistName}
                  </div>
                  {playlistTracks.map((track) => {
                    const trackIndex = tracks.findIndex((entry) => entry.id === track.id);
                    const selected = currentTrack.id === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        className={`grid w-full grid-cols-[1fr_auto] gap-2 border-b border-[#56658c] px-2 py-[7px] text-left leading-[13px] ${
                          selected
                            ? "bg-[#dce8ff] text-[#102754]"
                            : "text-[#eef4ff] hover:bg-[#5e70a1]"
                        }`}
                        onClick={() => playTrackAt(trackIndex)}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-bold">{track.title}</span>
                          <span className="block truncate opacity-85">{track.artist}</span>
                        </span>
                        <span>{track.duration}</span>
                      </button>
                    );
                  })}
                </section>
              ))}
            </div>
          </aside>
        </div>

        <div className="flex h-[70px] shrink-0 items-center gap-3 rounded-b-[26px] border-x border-b border-[#8a9fc7] bg-[linear-gradient(180deg,#f8fbff,#d5e0f3_46%,#a8bbdf_47%,#c7d6ef)] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
          <div className="flex items-center gap-2">
            <ControlButton
              label={isPlaying ? "Pause" : "Play"}
              icon={isPlaying ? "pause" : "play"}
              primary
              onClick={() => setIsPlaying((current) => !current)}
            />
            <ControlButton label="Stop" icon="stop" onClick={stopTrack} />
          </div>
          <div className="flex items-center gap-1">
            <ControlButton label="Previous" icon="previous" onClick={previousTrack} />
            <ControlButton label="Next" icon="next" onClick={nextTrack} />
          </div>
          <ControlButton label="Mute" icon="mute" onClick={() => setVolume((current) => (current > 0 ? 0 : 0.75))} />
          <label className="flex min-w-[118px] items-center gap-2" title="Volume">
            <span className="sr-only">Volume</span>
            <input
              className="wmp-volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>
          <div className="ml-auto flex min-w-[210px] flex-col gap-1">
            <div className="flex justify-between text-[10px] text-[#253b6c]">
              <span>{elapsed}</span>
              <span>{totalTime}</span>
            </div>
            <div className="h-[9px] overflow-hidden rounded-full border border-[#8fa4c9] bg-white shadow-[inset_0_1px_2px_rgba(45,65,100,0.3)]">
              <div className="h-full bg-[linear-gradient(90deg,#8dff8d,#1fc446)]" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
