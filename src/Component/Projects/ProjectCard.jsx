import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiReactrouter,
  SiFramer,
  SiDaisyui,
} from "react-icons/si";
import { Link } from "react-router";


const techIcons = {
  react: <SiReact title="React" />,
  reactrouter: <SiReactrouter title="React Router" />,
  tailwind: <SiTailwindcss title="Tailwind CSS" />,
  mongodb: <SiMongodb title="MongoDB" />,
  express: <SiExpress title="Express.js" />,
  node: <SiNodedotjs title="Node.js" />,
  framer: <SiFramer title="Framer Motion" />,
  daisyui: <SiDaisyui title="DaisyUI" />,
  javascript: <SiJavascript title="JavaScript" />,
};

export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1E1E1E] rounded-2xl border border-gray-800 p-6 mb-6 backdrop-blur-xl relative shadow-xl shadow-black/20"
    >
      <div
        className={`absolute inset-0 rounded-2xl z-0 bg-gradient-to-r ${project.glowColor} opacity-30 blur-2xl`}
      ></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Column 1: Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain rounded-xl border border-gray-700 bg-black/20 p-2"
          />
        </div>

        {/* Column 2: Title + Description */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm">{project.description}</p>
        </div>

        {/* Column 3: Features + Tech + Buttons */}
        <div>
          <ul className="list-disc list-inside text-gray-300 text-sm mb-3">
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm text-white flex-wrap mb-3">
            {project.tech.map((key, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md"
              >
                {techIcons[key]}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              <button className="bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-3 py-1.5 rounded-md text-white text-sm shadow hover:scale-105 transition">
                <FaExternalLinkAlt className="inline mr-1" />{" "}
                {project.buttons[0]}
              </button>
            </a>

            <a href={project.githubLink} target="_blank" rel="noreferrer">
              <button className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-md text-white text-sm hover:scale-105 transition">
                <FaGithub className="inline mr-1" /> {project.buttons[1]}
              </button>
            </a>

            <Link to={`${project.detailsLink}`}>
              <button className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-md text-white text-sm hover:scale-105 transition">
                {project.buttons[2]}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
