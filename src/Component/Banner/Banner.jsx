import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { IoMdDownload } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";
import LiquidEtherBackground from "./LiquidEtherBackground";

const fluidPalette = {
  base: "#050816",
  deep: "#09101d",
  primary: "#00ADB5",
  secondary: "#007CFF",
  surface: "#16213e",
};

const expertise = ["React 19", "Node.js", "Tailwind", "Prisma"];

const stats = [
  { value: "05+", label: "Shipped projects" },
  { value: "03+", label: "Years refining products" },
  { value: "24h", label: "Typical response time" },
];

const Banner = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const offset = 80;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  };

  return (
    <div className="relative isolate overflow-hidden text-white">
      <LiquidEtherBackground palette={fluidPalette} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-[#00ADB5]/10 blur-3xl" />
        <div className="absolute right-[12%] top-[12%] h-56 w-56 rounded-full bg-[#007CFF]/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#16213e]/35 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 pb-24 pt-32">
        <div className="w-full max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/80 backdrop-blur-md"
          >
            <HiSparkles className="text-[#00ADB5]" />
            Interactive, high-performance interfaces with premium motion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white/95">Mehedi Hasan Akash</span>
            <span className="mt-3 block bg-gradient-to-r from-[#00ADB5] via-[#8cecff] to-[#007CFF] bg-clip-text text-transparent">
              crafting fluid digital experiences that feel alive
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            className="mt-8 text-xl font-medium text-white/80 sm:text-2xl"
          >
            <span className="text-white/55">Building as a </span>
            <span className="bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "MERN Stack Developer",
                  2000,
                  "React UI Engineer",
                  2000,
                  "Full Stack Problem Solver",
                  2000,
                  "Interactive Product Builder",
                  2000,
                ]}
                wrapper="span"
                speed={52}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/68 sm:text-lg"
          >
            I design and build polished web products with strong frontend craft, clean
            backend architecture, and a sharp eye for motion, clarity, and perceived
            quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-7 py-4 font-semibold text-white shadow-[0_16px_50px_rgba(0,124,255,0.26)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,173,181,0.34)]"
            >
              View Projects
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="/MERN.pdf"
              download
              className="inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-[#08111d]/55 px-7 py-4 font-semibold text-white/88 backdrop-blur-xl transition-all duration-300 hover:border-[#00ADB5]/40 hover:bg-[#0d1725]/72"
            >
              <IoMdDownload className="text-lg text-[#00ADB5]" />
              Download Resume
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-white/82 backdrop-blur-xl transition-all duration-300 hover:border-[#007CFF]/45 hover:text-white"
            >
              <FaBriefcase className="text-[#007CFF]" />
              Let&apos;s Work Together
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {expertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/72 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
            className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-[#09111d]/42 px-6 py-6 backdrop-blur-xl"
              >
                <div className="bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text text-3xl font-bold text-transparent">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
