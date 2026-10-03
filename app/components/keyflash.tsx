"use client";

type KeyFlashProps = {
  lastKey: string | null;
  flashId: number;
};

/**
 * Huge centered key display with scale/shake.
 * TODO: drive from last keypress + 300ms fade.
 */
export function KeyFlash({ lastKey, flashId }: KeyFlashProps) {
  if (!lastKey) return null;

  return (
    <div
      key={flashId}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      <span className="animate-key-pop font-[family-name:var(--font-display)] text-[clamp(6rem,22vw,14rem)] leading-none tracking-wide text-white/90 drop-shadow-[0_0_40px_rgba(255,70,85,0.45)]">
        {lastKey}
      </span>
    </div>
  );
}
