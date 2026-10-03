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
        <span className="text-lg font-bold tracking-tight text-foreground">
          Screamboard
        </span>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleMute}
            className="text-sm font-semibold text-muted transition-colors hover:text-accent"
            aria-pressed={muted}
            aria-label={muted ? "Unmute screams" : "Mute screams"}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          <a
            href="#desktop"
            className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            Get the app
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-5xl flex-col items-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-16">
          <h1 className="animate-fade-up text-[clamp(3rem,12vw,6.5rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
            Screamboard
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-lg text-lg font-medium text-muted sm:text-xl">
            Hit a key. It screams. That&apos;s it. That&apos;s the demo.
          </p>

          <div className="animate-fade-up-delay-2 mt-12 flex w-full flex-col items-center">
            <p className="mb-3 text-sm font-bold tracking-wide text-accent">
              Try it
            </p>
            <ScreamZone speak={speak} />
          </div>
        </section>

        <section
          id="desktop"
          className="relative border-t border-foreground/10 bg-surface"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8">
            <p className="text-sm font-bold tracking-wide text-accent">
              The real thing
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              Want this in every app?
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-muted sm:text-lg">
              The desktop app listens while you work — Slack, docs, games, all of
              it. Drop in your own sounds. One-time $5. Mac, Windows, and Linux.
            </p>
            <button
              type="button"
              disabled
              className="mt-10 cursor-not-allowed bg-foreground px-8 py-3 text-lg font-bold text-background opacity-90"
            >
              Coming soon — $5
            </button>
            <p className="mt-4 text-sm font-medium text-muted">
              Download drops here. Browser demo stays free forever.
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-foreground/10 px-5 py-8 text-center text-xs font-medium tracking-wide text-muted">
        screamboard v0.1, built by duynewgen
      </footer>
    </div>
  );
}
