import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import { projectsData } from "./ProjectData";

const RevealText = ({ children, delay = 0 }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ProjectItem = ({ project, index, setActiveProject }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProject(index);
    }
  }, [isInView, index, setActiveProject]);

  return (
    <div ref={ref} className="min-h-[100svh] flex flex-col justify-center py-24 sm:py-32 pr-2 lg:pr-8">
      {/* Mobile Image (Hidden on desktop) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="lg:hidden w-full aspect-[4/3] sm:aspect-[16/10] relative mb-12 rounded-xl overflow-hidden bg-[#111]"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover object-top w-full h-full" 
        />
      </motion.div>

      <div className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase mb-6">
        <RevealText>0{index + 1} &mdash; {project.title}</RevealText>
      </div>

      <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 text-white leading-none">
        <RevealText delay={0.1}>{project.title}</RevealText>
      </h2>
      
      <div className="text-base sm:text-lg lg:text-xl text-neutral-400 mb-12 max-w-2xl leading-relaxed font-light">
        <RevealText delay={0.2}>{project.description}</RevealText>
      </div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 max-w-2xl">
        {project.tech.map((t, i) => (
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
             key={i} 
             className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest text-neutral-300"
           >
             {t}
           </motion.span>
        ))}
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 1, delay: 0.6 }}
         className="flex flex-wrap items-center gap-6 sm:gap-8"
      >
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noreferrer" 
          className="group relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/20 hover:bg-[#f59e0b] hover:border-[#f59e0b] transition-all duration-500 text-white hover:text-[#050505] font-semibold uppercase tracking-widest text-[0.65rem] sm:text-xs"
        >
          <span className="z-10 group-hover:scale-110 transition-transform duration-500 flex items-center gap-2">
            Visit
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-45 transition-transform duration-500 w-3 h-3 sm:w-4 sm:h-4">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noreferrer" 
          className="group relative flex items-center gap-3 py-2 text-neutral-400 hover:text-white transition-colors uppercase text-[0.7rem] sm:text-sm tracking-widest font-semibold overflow-hidden"
        >
          <span className="relative z-10 w-full h-full flex items-center gap-2">
            GitHub
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800" />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
        </a>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressHeight, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} className="bg-[#050505] text-white relative min-h-screen selection:bg-[#f59e0b] selection:text-black overflow-x-hidden" id="projects">
      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay z-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>

      {/* Decorative Title Header */}
      <div className="sticky top-0 pt-24 sm:pt-32 pb-8 px-6 md:px-12 lg:px-24 mx-auto w-full z-10 pointer-events-none">
        <RevealText>
          <h1 className="text-[14vw] lg:text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase text-white/90 mix-blend-difference drop-shadow-lg">
            Selected <br className="lg:hidden" /> Works
          </h1>
        </RevealText>
      </div>

      <div className="relative mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row max-w-[120rem] z-20">
        
        {/* Progress Bar (Desktop) */}
        <div className="hidden lg:block absolute left-12 xl:left-24 top-0 h-full w-[1px] bg-white/10 z-20">
          <motion.div 
            style={{ height: smoothProgress }}
            className="w-full bg-[#f59e0b]"
          />
        </div>

        {/* Left Side: Scrollable Details */}
        <div className="w-full lg:w-[45%] lg:pl-12 xl:pl-20 z-20 relative">
          {projectsData.map((project, index) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              setActiveProject={setActiveProject} 
            />
          ))}
        </div>

        {/* Right Side: Sticky Image Gallery (Desktop only) */}
        <div className="hidden lg:block lg:w-[55%] sticky top-0 h-screen py-24 sm:py-32 pl-8 xl:pl-16 pr-0 xl:pr-12 z-10 pointer-events-none">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0a0a0a] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProject}
                src={projectsData[activeProject].image}
                alt={projectsData[activeProject].title}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>

            <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/70 via-transparent to-[#050505]/20 pointer-events-none" />
          </div>
          
          <div className="absolute top-[50%] -left-12 xl:-left-8 text-neutral-600 text-xs font-mono origin-left -rotate-90 uppercase tracking-[0.4em] flex items-center gap-4">
            <span>&mdash;</span>
            <span>0{activeProject + 1} / 0{projectsData.length}</span>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Projects;