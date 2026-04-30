import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import { api } from "../../lib/api";

const RevealText = ({ children, delay = 0 }) => {
    
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProjectBySlug(slug)
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase animate-pulse">
          Loading Project Data...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
        <div className="text-white font-mono uppercase tracking-widest">Project Not Found</div>
        <Link to="/" className="px-6 py-3 bg-white/10 hover:bg-white hover:text-black border border-white/20 rounded-full text-white text-xs uppercase tracking-widest transition-all">
          Return Home
        </Link>
      </div>
    );
  }

  const techStack = Array.isArray(project.tech) ? project.tech : project.tech?.split(",").map(t => t.trim()) || [];
  const features = Array.isArray(project.features) ? project.features : project.features?.split(",").map(f => f.trim()) || [];
  const imageUrl = project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1470&auto=format&fit=crop";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#050505] w-full"
    >
      <div className="min-h-screen relative pb-32">
        {/* Superior Go Back Navigation */}
        <div className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-start items-center pointer-events-none mt-[80px] lg:mt-0 lg:pt-8">
          <Link 
            to="/#projects"
            className="pointer-events-auto group px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold rounded-full uppercase tracking-widest text-[0.65rem] sm:text-xs hover:bg-[#f59e0b] hover:border-[#f59e0b] hover:text-black transition-all duration-500 flex items-center gap-2 sm:gap-3 shadow-2xl"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative min-h-[50vh] md:min-h-[85vh] w-full bg-[#111]">
          {/* Blurred Background layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src={imageUrl} 
               alt="" 
               className="w-full h-full object-cover blur-[100px] opacity-30 scale-110" 
             />
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center pt-32 pb-48 lg:pt-24 lg:pb-0 px-4 md:px-12">
            <img 
              src={imageUrl}
              alt={project.title}
              className="w-full sm:max-w-4xl lg:max-w-6xl max-h-[40vh] sm:max-h-[60vh] lg:max-h-full object-contain drop-shadow-2xl rounded-xl border border-white/10 mt-10 md:mt-0"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20 pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:p-24 max-w-[120rem] mx-auto flex flex-col items-start z-30">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#f59e0b] font-mono text-xs sm:text-sm tracking-widest uppercase mb-4"
            >
              Case Study
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white leading-none mb-8"
            >
              {project.title}
            </motion.h1>
            {(project.liveUrl || project.githubUrl) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-full uppercase tracking-widest text-[0.65rem] sm:text-xs hover:bg-[#f59e0b] transition-colors flex items-center gap-2">
                    Live Project <FiExternalLink />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 uppercase tracking-widest text-[0.65rem] sm:text-xs hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    Source Code (Client) <FiGithub />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="mb-16 sm:mb-20">
              <h3 className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#f59e0b] mb-6">About the Project</h3>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 font-light leading-relaxed">
                {project.description || project.summary || "A detailed overview of the project and its core impact."}
              </p>
            </div>

            {features.length > 0 && (
              <div className="mb-16 sm:mb-20">
                <h3 className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#f59e0b] mb-6 sm:mb-8">System Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {features.map((feature, i) => (
                    <div key={i} className="bg-[#0f0f0f] border border-white/5 p-5 sm:p-6 rounded-2xl hover:border-white/20 transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                      </div>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">{feature}</p>
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
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-6 md:p-8 lg:p-12">
              <h3 className="text-[#f59e0b] font-mono text-[0.65rem] sm:text-xs tracking-widest uppercase mb-6 sm:mb-8">Engineering Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <span key={i} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-[0.65rem] sm:text-xs text-neutral-300 font-medium uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.role && (
              <div className="bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-6 md:p-8 lg:p-12 space-y-6 lg:space-y-8">
                <div>
                  <h4 className="text-neutral-500 font-mono text-[0.65rem] sm:text-xs tracking-widest uppercase mb-2">My Role</h4>
                  <p className="text-neutral-200 text-base sm:text-lg font-light">{project.role}</p>
                </div>
                {project.duration && (
                  <div>
                    <h4 className="text-neutral-500 font-mono text-[0.65rem] sm:text-xs tracking-widest uppercase mb-2">Timeline</h4>
                    <p className="text-neutral-200 text-base sm:text-lg font-light">{project.duration}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-neutral-500 font-mono text-[0.65rem] sm:text-xs tracking-widest uppercase mb-2">Category</h4>
                  <p className="text-neutral-200 text-base sm:text-lg font-light">System Architecture</p>
                </div>
              </div>
            )}
            
          </motion.div>
        </div>

        {/* Extended Details Section (Challenges & Improvements) */}
        {(project.challenges || project.improvements) && (
          <div className="max-w-[120rem] mx-auto px-6 sm:px-12 lg:px-24 mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 pb-12 sm:pb-20">
            {project.challenges && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black/50 backdrop-blur-md border border-white/5 p-6 sm:p-10 rounded-3xl"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  </div>
                  <h3 className="text-[#f59e0b] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">Challenges Faced</h3>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
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
                className="bg-black/50 backdrop-blur-md border border-white/5 p-6 sm:p-10 rounded-3xl"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-[#f59e0b] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">Future Improvements</h3>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
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

export default ProjectDetails;