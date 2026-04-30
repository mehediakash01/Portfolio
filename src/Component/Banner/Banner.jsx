import { motion } from "framer-motion";
import { HiArrowUpRight, HiArrowDownTray } from "react-icons/hi2";
import Marquee from "react-fast-marquee";
import {
  SiAib,
  SiBetterstack,
  SiDocker,
  SiExpress,
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiStrapi,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const techStack = [
  { label: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { label: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { label: "Typescript", icon: SiTypescript, color: "text-blue-500" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { label: "Prisma", icon: SiPrisma, color: "text-white" },
  { label: "Docker", icon: SiDocker, color: "text-blue-500" },
  { label: "shadcn ui", icon: SiShadcnui, color: "text-white" },
  { label: "Node", icon: SiNodedotjs, color: "text-[#83CD29]" },
  { label: "Express", icon: SiExpress, color: "text-white" },
  { label: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { label: "Tailwind", icon: SiTailwindcss, color: "text-[#38BDF8]" },
  { label: "Framer", icon: SiFramer, color: "text-[#F5F5F5]" },
  { label: "Stripe", icon: SiStrapi, color: "text-blue-500" },
  { label: "Ai", icon: SiAib, color: "text-white" },
  { label: "better-auth", icon: SiBetterstack, color: "text-yellow" },
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
    <div className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(245,158,11,0.24),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%)]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[34%] h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[#f59e0b]/18 blur-3xl sm:h-[28rem] sm:w-[28rem] lg:h-[34rem] lg:w-[34rem]" />
        <div className="absolute left-1/2 top-[38%] h-[14rem] w-[14rem] -translate-x-1/2 rounded-full border border-white/8 sm:h-[18rem] sm:w-[18rem] lg:h-[22rem] lg:w-[22rem]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 md:pt-32 lg:px-10">


        <div className="relative mt-6 min-h-[34rem] sm:mt-8 sm:min-h-[38rem] md:min-h-[40rem] lg:mt-10 lg:min-h-[42rem] lg:block">
          <div className="grid gap-1 sm:gap-2 md:gap-3 lg:grid-cols-3 lg:gap-8 xl:gap-20 ">
            <motion.h1
              initial={{ opacity: 0, x: -96 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-xl text-center text-[2.2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[3.4rem] md:text-[4.3rem] md:ml-20  lg:text-left lg:text-[4.8rem] xl:text-[7.5rem]"
            >
              Mehedi 
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -96 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-xl text-center text-[2.2rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[3.4rem] md:text-[4.3rem] md:ml-20 lg:text-left lg:text-[4.8rem] xl:text-[7.5rem]"
            >
              Hasan 
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, x: 96 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-center text-[2.1rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-[3.2rem] md:text-[4rem] lg:justify-self-end lg:pt-2 lg:text-right lg:text-[4.6rem] xl:text-[7rem] "
            >
              Akash
            </motion.h1>
          </div>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:mt-4 sm:gap-3 lg:mt-0 lg:flex-row lg:items-center lg:justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -96 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-xl text-center text-[1rem] font-black uppercase tracking-[0.2em] text-white/70 sm:text-[1.5rem] sm:tracking-[0.3em] md:text-[2.1rem] md:tracking-[0.35em] lg:ml-6 lg:pt-10 lg:text-[2.7rem] xl:ml-12 xl:pt-14 xl:text-[3rem]"
            >
              FullStack  
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -96 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display max-w-xl text-center text-[1rem] font-black uppercase tracking-[0.2em] text-white/70 sm:text-[1.5rem] sm:tracking-[0.3em] md:text-[2.1rem] md:tracking-[0.35em] lg:mr-6 lg:pt-10 lg:text-[2.7rem] xl:mr-12 xl:pt-14 xl:text-[3rem]"
            >
              Developer 
            </motion.h1>

          
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative z-20 mx-auto mt-4 w-[12rem] sm:mt-6 sm:w-[16rem] md:w-[20rem] lg:absolute lg:left-1/2 lg:top-1/2 lg:ml-6 lg:w-[21rem] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:w-[29rem]"
          >
            <div className="absolute inset-x-8 bottom-5 h-10 rounded-full bg-black/65 blur-2xl" />
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/10 via-transparent to-transparent blur-xl" />
            <img
              src="/portfolio_Hero.png"
              alt="Portrait of Mehedi Hasan Akash"
              className="relative z-10 w-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
            />
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative z-30 mx-auto mt-6 max-w-3xl pt-2 text-center sm:pt-4 md:pt-6 lg:mx-0 lg:mt-2 lg:pt-16 lg:text-left"
        >
                  <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto inline-flex w-fit items-center gap-3 self-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/68 backdrop-blur-md lg:mx-0 lg:self-start"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/55" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          Open for work
        </motion.div>
      
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base lg:mx-0">
            Building premium web products with deliberate <br className="hidden sm:block" /> frontend detail, clean backend
            systems, and <br className="hidden sm:block" /> motion that adds depth instead of noise.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#050505] transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              Schedule Call
              <HiArrowUpRight className="text-base" />
            </button>
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="inline-flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] sm:w-auto"
            >
              Download Resume
              <HiArrowDownTray className="text-base" />
            </a>
          </div>
        </motion.div>

        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
          className="relative z-30 mt-8 w-full sm:mt-10 md:mt-12 lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:w-max lg:-translate-x-1/2"
        >
          <div className="mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] px-3 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-6 sm:py-4 lg:max-w-none">
           

           
           <Marquee pauseOnHover={true} speed={100} > {techStack.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/8 bg-black/20 px-3 py-2 text-sm text-white/78"
              >
                <Icon className={`text-base ${color}`} />
                <span>{label}</span>
              </div>
            ))}</Marquee> 
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
