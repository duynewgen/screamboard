"use client";

import { useEffect, useRef, useState } from "react";
import { KeyFlash } from "./keyflash";
import { useScream } from "../hooks/useScream";

function resolveScream(key: string): { speak: string; display: string } | null {
  if (key === " ") return { speak: "space!", display: "SPACE" };
  if (key === "Enter") return { speak: "enter!", display: "ENTER" };
  if (key.length === 1 && key >= " ") {
    return { speak: key, display: key };
  }
  return null;
}

export function ScreamZone() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { muted, toggleMute, speak } = useScream();
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [flashId, setFlashId] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const resolved = resolveScream(event.key);
      if (!resolved) return;

      speak(resolved.speak);

      setLastKey(resolved.display);
      setFlashId((n) => n + 1);

      setFlashing(false);
      requestAnimationFrame(() => setFlashing(true));

      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        setLastKey(null);
        setFlashing(false);
      }, 300);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, [speak]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink-soft) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="animate-sun-drift pointer-events-none absolute -left-24 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,var(--sun)_0%,transparent_70%)] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-[-5%] h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_70%)]"
      />

      <div
        className={`absolute inset-0 ${flashing ? "animate-bg-flash" : ""}`}
        aria-hidden
      />

      <button
        type="button"
        onClick={toggleMute}
        className="absolute right-4 top-4 z-30 font-[family-name:var(--font-display)] text-xl tracking-widest text-muted transition-colors hover:text-accent"
        aria-pressed={muted}
        aria-label={muted ? "Unmute screams" : "Mute screams"}
      >
        {muted ? "UNMUTE" : "MUTE"}
      </button>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20">
        <h1 className="animate-brand-wiggle mb-3 font-[family-name:var(--font-display)] text-6xl tracking-[0.12em] text-foreground sm:text-8xl">
          SCREAMBOARD
        </h1>
        <p className="mb-10 max-w-md text-center text-base text-muted sm:text-lg">
          Hit a key. It screams. That&apos;s it.
        </p>

        <div className="relative w-full max-w-3xl">
          <textarea
            ref={textareaRef}
            aria-label="Scream zone"
            placeholder="go on. type."
            className="min-h-[36vh] w-full resize-none bg-transparent px-2 py-6 text-center font-[family-name:var(--font-display)] text-3xl leading-relaxed tracking-wide text-foreground placeholder:text-muted/45 focus:outline-none sm:text-5xl"
          />
        </div>

        <KeyFlash lastKey={lastKey} flashId={flashId} />
      </main>

      <footer className="relative z-10 pb-6 text-center text-xs tracking-wide text-muted">
        screamboard v0.1, built by duynewgen
      </footer>
    </div>
  );
}
