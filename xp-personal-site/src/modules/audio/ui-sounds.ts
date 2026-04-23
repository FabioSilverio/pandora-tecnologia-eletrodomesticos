"use client";

type UiSound = "open" | "close" | "minimize" | "startup" | "click" | "nudge";

const soundProfiles: Record<
  UiSound,
  { frequencies: number[]; duration: number; type: OscillatorType }
> = {
  open: { frequencies: [784, 988], duration: 0.08, type: "square" },
  close: { frequencies: [880, 659], duration: 0.07, type: "triangle" },
  minimize: { frequencies: [720, 540], duration: 0.07, type: "triangle" },
  startup: { frequencies: [392, 523, 659, 784], duration: 0.12, type: "sine" },
  click: { frequencies: [660], duration: 0.04, type: "square" },
  nudge: { frequencies: [980, 1240, 980], duration: 0.05, type: "square" },
};

let context: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!context) {
    const AudioContextCtor =
      window.AudioContext ||
      // @ts-expect-error legacy webkit prefix
      window.webkitAudioContext;
    context = AudioContextCtor ? new AudioContextCtor() : null;
  }

  return context;
}

export async function playUiSound(kind: UiSound, enabled: boolean) {
  if (!enabled) {
    return;
  }

  const audioContext = getContext();
  if (!audioContext) {
    return;
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const profile = soundProfiles[kind];
  const now = audioContext.currentTime;

  profile.frequencies.forEach((frequency, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = profile.type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + index * profile.duration);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + index * profile.duration + profile.duration,
    );

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now + index * profile.duration);
    osc.stop(now + index * profile.duration + profile.duration + 0.02);
  });
}
