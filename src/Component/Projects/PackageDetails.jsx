import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiReactrouter,
  SiDaisyui,
  SiJavascript,
} from "react-icons/si";
import { projectsData } from "./ProjectData";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";

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

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const project = projectsData.find((pro) => pro.id === id);

  if (!project) {
    // Optional: Handle case if project not found
    return (
      <section className="bg-[#121212] text-white px-6 py-20 text-center">
        <p>Project not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.9)] hover:scale-110 transition-transform duration-300"
        >
          ← Go Back
        </button>
      </section>
    );
  }

  return (
    <>
  
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-50 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg
                   animate-pulse
                   hover:shadow-[0_0_20px_rgba(0,255,255,0.9)]
                   hover:scale-110
                   transition-transform duration-300"
        aria-label="Go Back"
      >
        ← Go Back
      </button>

      <section className="bg-[#121212] text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              {project.title}
            </h1>
            <p className="text-gray-400 text-lg">
              your hustle get Erase with {project.title}
            </p>
            <div className="mt-8 shadow-xl rounded-xl overflow-hidden border border-gray-800">
              <img
                src={project.image}
                alt="Tour Package Hero"
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-300 text-md leading-7 mb-8 max-w-3xl mx-auto text-center"
          >
            {project.description}
          </motion.p>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6 mb-10"
          >
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] border border-gray-800/70 shadow-[0_0_10px_rgba(0,255,255,0.1)] p-4 rounded-xl transition hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:border-cyan-400/40"
              >
                {/* Glowing icon as bullet */}
                <div className="mt-1 flex-shrink-0">
                  <span className="block w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,255,255,0.6)]"></span>
                </div>
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {project.tech.map((key, i) => (
              <div
                key={i}
                className="bg-[#1E1E1E] p-3 rounded-lg shadow border border-gray-700 hover:shadow-md hover:scale-105 transition"
              >
                {techIcons[key]}
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-5 py-2.5 rounded-md text-white text-sm shadow hover:scale-105 transition"
            >
              <FaExternalLinkAlt className="inline mr-2" /> Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 bg-white/10 px-5 py-2.5 rounded-md text-white text-sm hover:scale-105 transition"
            >
              <FaGithub className="inline mr-2" /> GitHub Repo
            </a>
       
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center text-gray-400 text-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              What I Learned
            </h3>
            <p>
              This project was more than just building a MERN-based application —
              it was a deep dive into real-world development. I tackled countless
              bugs, sleepless nights debugging async issues, and learned how to
              properly structure protected routes, user roles, and multi-dashboard
              logic for both users and guides.
              <br />
              <br />
              Working through late-night problem-solving helped me sharpen my
              ability to debug under pressure and gain confidence in solving
              complex client-server communication issues. I also became more
              comfortable handling MongoDB queries, conditional rendering,
              role-based access control, and responsive UI handling.
              <br />
              <br />
              Overall, this project strengthened my full-stack thinking, boosted
              my patience, and taught me how to stay persistent through
              frustrating errors — ultimately shaping me into a more resilient and
              confident developer.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
