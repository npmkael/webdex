import { useRef, useEffect } from "react";

export const usePokemonCry = (audioSource: string) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioSource) return;

    soundRef.current = new Audio(audioSource);

    // Cleanup function to stop and remove the audio element
    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current = null;
      }
    };
  }, [audioSource]);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  return {
    playSound,
  };
};
