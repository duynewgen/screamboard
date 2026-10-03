"use client";

import { useEffect, useRef, useState } from "react";
import { KeyFlash } from "./keyflash";
import { useScream } from "../hooks/useScream";

/**
 * The stage: textarea + key handling.
 * TODO: printable-key scream logic + bg flash.
 */
export function ScreamZone() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { muted, toggleMute } = useScream();
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [flashId, setFlashId] = useState(0);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      className={`relative flex min-h-dvh flex-col ${flashing ? "animate-bg-flash" : ""}`}
    >
      <button
        type="button"
        onClick={toggleMute}
        className="absolute right-4 top-4 z-30 font-[family-name:var(--font-display)] text-xl tracking-widest text-muted transition-colors hover:text-foreground"
        aria-pressed={muted}
        aria-label={muted ? "Unmute screams" : "Mute screams"}
      >
        {muted ? "UNMUTE" : "MUTE"}
      </button>

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--stage-glow)_0%,transparent_55%)]" />

        <h1 className="relative z-10 mb-8 font-[family-name:var(--font-display)] text-5xl tracking-[0.2em] text-foreground sm:text-7xl">
          SCREAMBOARD
        </h1>

        <div className="relative z-10 w-full max-w-3xl">
          <textarea
            ref={textareaRef}
            aria-label="Scream zone"
            placeholder="type something. anything."
            className="min-h-[40vh] w-full resize-none bg-transparent px-2 py-6 text-center font-[family-name:var(--font-display)] text-3xl leading-relaxed tracking-wide text-foreground/90 placeholder:text-muted/50 focus:outline-none sm:text-5xl"
            // Shell input only — scream wiring comes next
            onChange={() => {
              setFlashing(false);
              requestAnimationFrame(() => setFlashing(true));
              setLastKey("…");
              setFlashId((n) => n + 1);
            }}
          />
        </div>

        <KeyFlash lastKey={lastKey} flashId={flashId} />
      </main>

      <footer className="pb-6 text-center text-xs tracking-wide text-muted">
        screamboard v0.1, built by duynewgen
      </footer>
    </div>
  );
}
