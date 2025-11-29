import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projectsData } from "./ProjectData";

// 👇 Use string keys instead of JSX in the data


const Projects = () => {
  return (
    <section id="projects" className="py-12 bg-[#121212] text-white">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-12 text-center"
      >
        ✨ Featured Projects
      </motion.h2>

      <div className="w-11/12 mx-auto max-w-7xl">
        {projectsData.map((proj) => (
          <ProjectCard project={proj} key={proj.id} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
