import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../context/MusicContext";

const WelcomeOverlay = () => {
  const { hasStarted, startMusic } = useMusic();
  const [isLeaving, setIsLeaving] = useState(false);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        window.clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  if (hasStarted && !isLeaving) {
    return null;
  }

  const handleEnter = () => {
    if (isLeaving) {
      return;
    }

    setIsLeaving(true);
    void startMusic();

    leaveTimerRef.current = window.setTimeout(() => {
      setIsLeaving(false);
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#02040a] transition-opacity duration-[1500ms] ease-out ${
        isLeaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isLeaving}
    >
      <div className="enter-overlay absolute inset-0" />
      <div className="enter-overlay-grid absolute inset-0" />

      <div className="absolute inset-0 opacity-70">
        <span className="enter-trace enter-trace-one" />
        <span className="enter-trace enter-trace-two" />
        <span className="enter-trace enter-trace-three" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <p className="font-editorial-mono text-[10px] uppercase tracking-[0.45em] text-white/45">
            Data-led digital portfolio
          </p>
          <h1 className="mt-8 text-center font-display text-3xl font-semibold uppercase tracking-[0.38em] text-white sm:text-5xl lg:text-6xl">
            MEHEDI HASAN AKASH
          </h1>

          <button
            onClick={handleEnter}
            className="enter-cta mt-10 inline-flex items-center justify-center rounded-none border border-[#4aa8ff]/80 bg-[#07111f]/72 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-white/90 shadow-[0_0_0_1px_rgba(74,168,255,0.22),0_0_45px_rgba(74,168,255,0.28)] transition-all duration-300 hover:border-[#7bc2ff] hover:bg-[#0b1730] hover:text-white hover:shadow-[0_0_0_1px_rgba(123,194,255,0.35),0_0_60px_rgba(74,168,255,0.45)]"
          >
            Enter Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;