import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router";
import { api } from "../../lib/api";
import { FiExternalLink, FiGithub, FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";

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

const ProjectItem = ({ project, index, setActiveProject, onOpenDetails }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProject(index);
    }
  }, [isInView, index, setActiveProject]);

  const techStack = Array.isArray(project.tech) ? project.tech : project.tech?.split(",").map(t => t.trim()) || [];
  const imageUrl = project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1470&auto=format&fit=crop";

  return (
    <motion.div 
      ref={ref} 
      layoutId={`project-container-${project.id}`}
      className="min-h-[100svh] flex flex-col justify-center py-20 sm:py-32 pr-2 lg:pr-8"
    >
      {/* Project Image */}
      <motion.div 
        layoutId={`project-image-${project.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full aspect-[4/5] sm:aspect-[16/10] relative mb-10 rounded-xl overflow-hidden bg-[#111] shadow-2xl"
      >
        <img 
          src={imageUrl} 
          alt={project.title} 
          className="object-contain object-top w-full h-full p-2" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/50 via-transparent to-[#050505]/10 pointer-events-none" />
      </motion.div>

      <div className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase mb-6 flex items-center justify-between">
        <RevealText>0{index + 1} &mdash; {project.title}</RevealText>
      </div>

      <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 text-white leading-none">
        <RevealText delay={0.1}>{project.title}</RevealText>
      </h2>
      
      {project.role && (
        <div className="mb-6">
          <RevealText delay={0.15}>
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-white/20">
              Role: {project.role}
            </span>
          </RevealText>
        </div>
      )}

      <div className="text-sm sm:text-lg lg:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed font-light line-clamp-4">
        <RevealText delay={0.2}>{project.description}</RevealText>
      </div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 max-w-2xl">
        {techStack.slice(0, 6).map((t, i) => (
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
        <Link 
          to={`/project/${project.slug}`}
          className="group relative flex items-center justify-center w-20 h-20 sm:w-32 sm:h-32 rounded-full border border-white/20 hover:bg-white hover:border-white transition-all duration-500 text-white hover:text-[#050505] font-semibold uppercase tracking-widest text-[0.6rem] sm:text-xs z-10"
        >
          <span className="z-10 group-hover:scale-110 transition-transform duration-500 flex items-center gap-2">
            Details
            <FiArrowRight className="transform group-hover:-rotate-45 transition-transform duration-500 w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
          </span>
        </Link>

        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="group relative flex items-center gap-3 py-2 text-neutral-400 hover:text-white transition-colors uppercase text-[0.65rem] sm:text-sm tracking-widest font-semibold overflow-hidden"
          >
            <span className="relative z-10 w-full h-full flex items-center gap-2">
              <FiExternalLink /> Live Wait
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800" />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

const ProjectDetailsModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const techStack = Array.isArray(project.tech) ? project.tech : project.tech?.split(",").map(t => t.trim()) || [];
  const features = Array.isArray(project.features) ? project.features : project.features?.split(",").map(f => f.trim()) || [];
  const imageUrl = project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1470&auto=format&fit=crop";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
    >
      <div className="min-h-screen relative pb-32">
        
        {/* Superior Go Back Navigation */}
        <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center pointer-events-none">
          <button 
            onClick={onClose}
            className="pointer-events-auto group px-6 py-3 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-xs hover:bg-[#f59e0b] hover:text-black transition-all duration-500 flex items-center gap-3 shadow-2xl"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          <button 
            onClick={onClose}
            className="pointer-events-auto group w-12 h-12 bg-[#1a1a1a] hover:bg-white text-white hover:text-black border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl"
          >
            <FiX size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <motion.div 
          layoutId={`project-container-${project.id}`}
          className="relative min-h-[60vh] md:min-h-[85vh] w-full bg-[#111]"
        >
          {/* Blurred Background layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src={imageUrl} 
               alt="" 
               className="w-full h-full object-cover blur-[100px] opacity-40 scale-110" 
             />
          </div>

          <motion.div 
            layoutId={`project-image-${project.id}`}
            className="absolute inset-0 z-10 flex items-center justify-center pt-24 pb-48 px-4"
          >
            <img 
              src={imageUrl}
              alt={project.title}
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-xl border border-white/10"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20 pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 max-w-[120rem] mx-auto flex flex-col items-start z-30">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase mb-4"
            >
              Case Study
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white leading-none mb-8"
            >
              {project.title}
            </motion.h1>
            {(project.liveUrl || project.githubUrl) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-xs hover:bg-[#f59e0b] transition-colors flex items-center gap-2">
                    Live Project <FiExternalLink />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    Source Code (Client) <FiGithub />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="mb-20">
              <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-[#f59e0b] mb-6">About the Project</h3>
              <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                {project.description || project.summary || "A detailed overview of the project and its core impact."}
              </p>
            </div>

            {features.length > 0 && (
              <div className="mb-20">
                <h3 className="text-sm font-mono tracking-[0.3em] uppercase text-[#f59e0b] mb-8">System Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, i) => (
                    <div key={i} className="bg-[#0f0f0f] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                      </div>
                      <p className="text-base text-neutral-300 leading-relaxed font-light">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Tech Stack Box */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-8 md:p-12">
              <h3 className="text-[#f59e0b] font-mono text-xs tracking-widest uppercase mb-8">Engineering Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-xs text-neutral-300 font-medium uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.role && (
              <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-8 md:p-12 space-y-8">
                <div>
                  <h4 className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-2">My Role</h4>
                  <p className="text-white text-lg font-light">{project.role}</p>
                </div>
                {project.duration && (
                  <div>
                    <h4 className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-2">Timeline</h4>
                    <p className="text-white text-lg font-light">{project.duration}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-2">Category</h4>
                  <p className="text-white text-lg font-light">System Architecture</p>
                </div>
              </div>
            )}
            
          </motion.div>
        </div>

        {/* Extended Details Section (Challenges & Improvements) */}
        {(project.challenges || project.improvements) && (
          <div className="max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 pb-20">
            {project.challenges && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black border border-white/5 p-10 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  </div>
                  <h3 className="text-[#f59e0b] font-mono text-sm tracking-[0.2em] uppercase">Challenges Faced</h3>
                </div>
                <p className="text-lg text-neutral-300 font-light leading-relaxed">
                  {project.challenges}
                </p>
              </motion.div>
            )}

            {project.improvements && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-black border border-white/5 p-10 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-[#f59e0b] font-mono text-sm tracking-[0.2em] uppercase">Future Improvements</h3>
                </div>
                <p className="text-lg text-neutral-300 font-light leading-relaxed">
                  {project.improvements}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    api.getProjects()
      .then(data => {
        if(isMounted && data) {
          setProjectsData(data);
          setLoading(false);
        }
      })
      .catch(e => {
        if(isMounted) setLoading(false);
        console.error("Failed to load projects", e);
      });
    return () => isMounted = false;
  }, []);

  if (loading) {
    return (
      <section className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase animate-pulse">
          Initializing Codex...
        </div>
      </section>
    );
  }

  if (projectsData.length === 0) {
    return (
      <section className="bg-[#050505] min-h-[50vh] flex items-center justify-center border-t border-white/5 text-neutral-500 font-mono">
        No projects available yet.
      </section>
    );
  }

  const itemsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);
  const displayedProjects = projectsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Safely grab the current active image or fallback
  const safeActiveIndex = activeProject >= displayedProjects.length ? displayedProjects.length - 1 : activeProject;
  const currentProject = displayedProjects[safeActiveIndex];
  const coverImage = currentProject?.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1470&auto=format&fit=crop";

  return (
    <>
      <section ref={containerRef} className="bg-[#050505] text-white relative min-h-screen selection:bg-[#f59e0b] selection:text-black overflow-x-hidden" id="projects">
        
        {/* Background ambient glow matching active project */}
        <div className="absolute inset-0 bg-[#050505] -z-10" />
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-[120px] transition-all duration-1000" 
          style={{ background: `radial-gradient(circle at 60% 50%, rgba(245, 158, 11, 0.4), transparent 60%)` }}
        />

        {/* Decorative Title Header */}
        <div className="sticky top-0 pt-24 sm:pt-32 pb-8 px-6 md:px-12 lg:px-24 mx-auto w-full z-10 pointer-events-none">
          <RevealText>
            <h1 className="text-[14vw] lg:text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase text-white/90 mix-blend-difference drop-shadow-lg">
              Selected <br className="lg:hidden" /> Works
            </h1>
          </RevealText>
        </div>

        <div className="relative mx-auto px-6 md:px-12 lg:px-24 flex flex-col max-w-[120rem] z-20 pb-32">
          
          {/* Left Side: Scrollable Details */}
          <div className="w-full lg:w-[80%] mx-auto z-20 relative">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <ProjectItem 
                  key={project.id} 
                  project={project} 
                  index={(currentPage - 1) * itemsPerPage + index} 
                  setActiveProject={setActiveProject}
                />
              ))}
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center pb-24 gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-8 py-4 border border-white/20 text-white rounded-full uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-2xl ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                  }`}
                >
                  Previous
                </button>
                <div className="flex items-center gap-2 text-white font-mono text-sm">
                  {currentPage} / {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-8 py-4 border border-white/20 text-white rounded-full uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-2xl ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;