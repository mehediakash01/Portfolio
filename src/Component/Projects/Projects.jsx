import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { api } from "../../lib/api";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";

const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1470&auto=format&fit=crop";

const RevealText = ({ children, delay = 0 }) => {
  return (
    <div className="overflow-hidden">
      <Motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </Motion.div>
    </div>
  );
};

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeStack = (project) =>
    Array.isArray(project.tech)
      ? project.tech
      : `${project.tech ?? ""}`
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean);

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

  const ProjectCard = ({ project, index }) => {
    const techStack = normalizeStack(project);
    const imageUrl = project.image || DEFAULT_PROJECT_IMAGE;

    return (
      <Motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#0f0f0f] shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/15"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
          <img
            src={imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.24em] text-white/75 backdrop-blur-md">
            0{index + 1}
          </div>
        </div>

        <div className="flex h-full flex-col p-6 sm:p-8">
          <p className="text-[0.65rem] font-mono uppercase tracking-[0.28em] text-[#f59e0b]/80">
            {project.role || "Featured Work"}
          </p>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
            {project.summary || project.description}
          </p>

          {techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#f59e0b]"
            >
              View Details <FiArrowRight className="ml-2" />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-white/20 hover:bg-white/10"
              >
                Live Demo <FiExternalLink className="ml-2" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-white/20 hover:bg-white/10"
              >
                GitHub <FiGithub className="ml-2" />
              </a>
            )}
          </div>
        </div>
      </Motion.article>
    );
  };

  return (
    <>
      <section className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white selection:bg-[#f59e0b] selection:text-black" id="projects">
        
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
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-400 pointer-events-auto">
            A multi-card gallery of recent work, built for quick scanning on desktop and clean stacking on mobile.
          </p>
        </div>

        <div className="relative mx-auto max-w-[120rem] px-6 md:px-12 lg:px-24 pb-32 z-20">
          <div className="grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;