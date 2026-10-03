"use client";

import { ScreamZone } from "./screamzone";
import { useScream } from "../hooks/useScream";

export function Landing() {
  const { muted, toggleMute, speak } = useScream();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink-soft) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="animate-sun-drift pointer-events-none absolute -left-28 top-[-12%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,var(--sun)_0%,transparent_70%)] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-[30%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_70%)]"
      />

      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] text-foreground">
          SCREAMBOARD
        </span>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleMute}
            className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-muted transition-colors hover:text-accent"
            aria-pressed={muted}
            aria-label={muted ? "Unmute screams" : "Mute screams"}
          >
            {muted ? "UNMUTE" : "MUTE"}
          </button>
          <a
            href="#desktop"
            className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          >
            GET THE APP
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-5xl flex-col items-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-16">
          <h1 className="animate-fade-up font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,7.5rem)] leading-[0.9] tracking-[0.08em] text-foreground">
            SCREAMBOARD
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-lg text-muted sm:text-xl">
            Hit a key. It screams. That&apos;s it. That&apos;s the demo.
          </p>

          <div className="animate-fade-up-delay-2 mt-12 flex w-full flex-col items-center">
            <p className="mb-3 font-[family-name:var(--font-display)] text-sm tracking-[0.25em] text-accent">
              TRY IT
            </p>
            <ScreamZone speak={speak} />
          </div>
        </section>

        <section
          id="desktop"
          className="relative border-t border-foreground/10 bg-surface"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8">
            <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.25em] text-accent">
              THE REAL THING
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-foreground sm:text-6xl">
              Want this in every app?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              The desktop app listens while you work — Slack, docs, games, all of
              it. Drop in your own sounds. One-time $5. Mac, Windows, and Linux.
            </p>
            <button
              type="button"
              disabled
              className="mt-10 cursor-not-allowed bg-foreground px-8 py-3 font-[family-name:var(--font-display)] text-lg tracking-[0.18em] text-background opacity-90"
            >
              COMING SOON — $5
            </button>
            <p className="mt-4 text-sm text-muted">
              Download drops here. Browser demo stays free forever.
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-foreground/10 px-5 py-8 text-center text-xs tracking-wide text-muted">
        screamboard v0.1, built by duynewgen
      </footer>
    </div>
  );
}
