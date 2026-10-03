"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useScream() {
  const [muted, setMuted] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

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
    (text: string) => {
      if (mutedRef.current) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 2;
      utterance.rate = 1.2;
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }

      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m) cancel();
      return !m;
    });
  }, [cancel]);

  return { muted, toggleMute, speak, cancel, voicesReady };
}
