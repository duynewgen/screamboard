"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { KeyFlash } from "./keyflash";

type ScreamZoneProps = {
  speak: (text: string) => void;
};

function resolveScream(key: string): { speak: string; display: string } | null {
  if (key === " ") return { speak: "space!", display: "SPACE" };
  if (key === "Enter") return { speak: "enter!", display: "ENTER" };
  if (key.length === 1 && key >= " ") {
    return { speak: key, display: key };
  }
  return null;
}

export function ScreamZone({ speak }: ScreamZoneProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [flashId, setFlashId] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className={`absolute inset-0 rounded-sm ${flashing ? "animate-bg-flash" : ""}`}
        aria-hidden
      />
      <KeyFlash lastKey={lastKey} flashId={flashId} />
      <textarea
        ref={textareaRef}
        aria-label="Try Screamboard"
        placeholder="click here. type anything."
        onKeyDown={handleKeyDown}
        className="relative z-10 min-h-[28vh] w-full resize-none bg-transparent px-3 py-8 text-center text-3xl font-bold leading-relaxed tracking-tight text-foreground placeholder:text-muted/40 focus:outline-none sm:min-h-[32vh] sm:text-5xl"
      />
    </div>
  );
}
