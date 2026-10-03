"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Speech synthesis for screamboard.
 * TODO: wire speak / cancel / voice selection in the next pass.
 */
export function useScream() {
  const [muted, setMuted] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      const english =
        voices.find((v) => v.lang.startsWith("en") && v.default) ??
        voices.find((v) => v.lang.startsWith("en")) ??
        voices[0];

      voiceRef.current = english;
      setVoicesReady(true);
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (_text: string) => {
      // TODO: cancel + SpeechSynthesisUtterance (pitch 2, rate 1.2)
      void _text;
      void muted;
      void voicesReady;
    },
    [muted, voicesReady],
  );

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m) cancel();
      return !m;
    });
  }, [cancel]);

  return { muted, toggleMute, speak, cancel, voicesReady };
}
