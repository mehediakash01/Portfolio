import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const audioBufferRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const initAudioContext = async () => {
    if (audioContextRef.current) {
      return audioContextRef.current;
    }

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.connect(audioContext.destination);
      gainNodeRef.current = gainNode;

      if (!audioBufferRef.current) {
        const response = await fetch("/portfolio.mp3");
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferRef.current = decodedBuffer;
      }

      return audioContext;
    } catch (error) {
      console.error("Failed to initialize Web Audio API:", error);
      return null;
    }
  };

  const startMusic = async () => {
    if (isInitializing || hasStarted) {
      return;
    }

    setIsInitializing(true);

    try {
      const audioContext = await initAudioContext();

      if (!audioContext || !audioBufferRef.current || !gainNodeRef.current) {
        return;
      }

      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // Source already stopped
        }
      }

      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBufferRef.current;
      sourceNode.loop = true;
      sourceNode.connect(gainNodeRef.current);
      sourceNode.start(0);

      sourceNodeRef.current = sourceNode;
      setIsPlaying(true);
      setHasStarted(true);
      setIsMuted(false);

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    } catch (error) {
      console.error("Failed to start music:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  const toggleMute = async () => {
    if (!audioContextRef.current) {
      return;
    }

    const audioContext = audioContextRef.current;
    const nextMuted = !isMuted;

    try {
      if (nextMuted) {
        await audioContext.suspend();
      } else {
        await audioContext.resume();
      }
      setIsMuted(nextMuted);
    } catch (error) {
      console.error("Failed to toggle mute:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // Source already stopped
        }
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      isMuted,
      hasStarted,
      startMusic,
      toggleMute,
    }),
    [hasStarted, isMuted, isPlaying]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }

  return context;
};