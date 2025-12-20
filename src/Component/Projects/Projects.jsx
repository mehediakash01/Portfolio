import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projectsData } from "./ProjectData";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  // Determine project category based on tech stack
  const getCategoryFromTech = (techArray) => {
    const hasFrontend = techArray.some((t) =>
      ["react", "nextjs", "tailwind", "typescript"].includes(t.toLowerCase())
    );
    const hasBackend = techArray.some((t) =>
      ["node", "nodejs", "express", "expressjs", "mongodb", "prisma", "sql"].includes(
        t.toLowerCase()
      )
    );

    if (hasFrontend && hasBackend) return "fullstack";
    if (hasBackend) return "backend";
    if (hasFrontend) return "frontend";
    return "fullstack";
  };

  const categorizedProjects = projectsData.map((p) => ({
    ...p,
    category: getCategoryFromTech(p.tech),
  }));

  const categories = [
    "all",
    ...new Set(categorizedProjects.map((p) => p.category)),
  ];

  const categoryMap = {
    all: "All Projects",
    fullstack: "Full Stack",
    frontend: "Frontend",
    backend: "Backend",
  };

  const filteredProjects =
    filter === "all"
      ? categorizedProjects
      : categorizedProjects.filter((p) => p.category === filter);

  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#007CFF]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-4">
            <span className="inline-block mr-3">✨</span>
            Featured Projects
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Explore my latest work and side projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap px-4"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-[#00ADB5] to-[#007CFF] text-white shadow-lg"
                  : "bg-[#1E1E1E] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-[#333]"
              }`}
            >
              {categoryMap[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="w-11/12 mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">
                No projects found in this category
              </p>
            </motion.div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-11/12 mx-auto max-w-5xl mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              value: `20+`,
              label: "Projects Completed",
              icon: "🚀",
            },
            { value: "100%", label: "Client Satisfaction", icon: "⭐" },
            { value: "15K+", label: "Lines of Code", icon: "💻" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-xl p-6 border border-[#333] hover:border-[#00ADB5]/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

