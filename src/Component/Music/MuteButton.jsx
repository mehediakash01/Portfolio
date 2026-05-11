import { useMusic } from "../../context/MusicContext";

const MuteButton = () => {
  const { hasStarted, isMuted, toggleMute } = useMusic();

  if (!hasStarted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-[90] rounded-full border border-white/14 bg-black/55 px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/28 hover:bg-black/75 hover:text-white sm:bottom-8 sm:right-8"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
};

export default MuteButton;