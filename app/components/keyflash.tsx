"use client";

type KeyFlashProps = {
  lastKey: string | null;
  flashId: number;
};

export function KeyFlash({ lastKey, flashId }: KeyFlashProps) {
  if (!lastKey) return null;

  return (
    <div
      key={flashId}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      <span className="animate-key-pop font-[family-name:var(--font-display)] text-[clamp(6rem,22vw,14rem)] leading-none tracking-wide text-accent">
        {lastKey}
      </span>
    </div>
  );
}
