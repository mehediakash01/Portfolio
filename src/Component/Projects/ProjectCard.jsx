import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiReactrouter,
  SiDaisyui,
  SiNextdotjs,
  SiTypescript,
  SiPrisma,
  SiStripe,
} from "react-icons/si";

// Tech Icons Map
const techIcons = {
  react: { icon: <SiReact />, color: "#61DAFB" },
  nextjs: { icon: <SiNextdotjs />, color: "#FFFFFF" },
  typescript: { icon: <SiTypescript />, color: "#3178C6" },
  prisma: { icon: <SiPrisma />, color: "#2D3748" },
  sql: { icon: "🗃️", color: "#00618A" },
  reactrouter: { icon: <SiReactrouter />, color: "#F44250" },
  tailwind: { icon: <SiTailwindcss />, color: "#38BDF8" },
  mongodb: { icon: <SiMongodb />, color: "#47A248" },
  express: { icon: <SiExpress />, color: "#FFFFFF" },
  node: { icon: <SiNodedotjs />, color: "#3C873A" },
  framer: { icon: <SiFramer />, color: "#FF0055" },
  daisyui: { icon: <SiDaisyui />, color: "#5A0EF8" },
  stripe: { icon: <SiStripe />, color: "#635BFF" },
  reacthookform: { icon: "📝", color: "#EC5990" },
  tanstackreactquery: { icon: "🔄", color: "#FF4154" },
  jwt: { icon: "🔐", color: "#000000" },
  axios: { icon: "↔️", color: "#5A29E4" },
  "gemini-ai": { icon: "🤖", color: "#4285F4" },
  recharts: { icon: "📊", color: "#8884D8" },
  "next-auth": { icon: "🔑", color: "#000000" },
  jspdf: { icon: "📄", color: "#FF0000" },
};

export const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-2xl overflow-hidden border border-[#333] hover:border-[#00ADB5]/50 transition-all duration-300"
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl bg-gradient-to-r ${project.glowColor}`}
      />

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center gap-3"
        >
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#00ADB5]"
          >
            <FaGithub />
          </a>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#007CFF]"
          >
            <FaExternalLinkAlt />
          </a>

          <Link
            to={project.detailsLink}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#00ADB5] hover:to-[#007CFF]"
          >
            <FaInfoCircle />
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        <ul className="mb-4 space-y-1">
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} className="text-xs text-gray-400">
              • {f}
            </li>
          ))}
        </ul>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 6).map((tech, i) => {
            const t = techIcons[tech.toLowerCase()];
            return (
              <div
                key={i}
                title={tech}
                className="w-8 h-8 rounded-lg bg-black border border-[#333] flex items-center justify-center"
                style={{ color: t?.color || "#fff" }}
              >
                {t?.icon || "📦"}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="w-full bg-gradient-to-r from-[#00ADB5] to-[#007CFF] py-2 rounded-lg text-white">
              Live Demo
            </button>
          </a>

          <Link to={project.detailsLink} className="flex-1">
            <button className="w-full bg-white/10 border border-white/20 py-2 rounded-lg text-white">
              Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
