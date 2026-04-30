import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/16 bg-[#050505]/72 text-white shadow-[0_14px_40px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/28 hover:bg-white/[0.1] focus:outline-none focus:ring-2 focus:ring-white/35 sm:bottom-8 sm:right-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <HiArrowUp className="text-xl" />
    </button>
  );
};

export default ScrollToTop;
