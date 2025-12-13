import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheckCircle, FaLightbulb, FaExclamationTriangle } from "react-icons/fa";
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
import { projectsData } from "./ProjectData";
import { useLocation, useNavigate } from "react-router";

const techIcons = {
  react: { icon: <SiReact />, color: "#61DAFB" },
  nextjs: { icon: <SiNextdotjs />, color: "#FFFFFF" },
  typescript: { icon: <SiTypescript />, color: "#3178C6" },
  prisma: { icon: <SiPrisma />, color: "#2D3748" },
  sql: { icon: "🗃️", color: "#00618A" },
  reactrouter: { icon: <SiReactrouter />, color: "#F44250" },
  tailwind: { icon: <SiTailwindcss />, color: "#38BDF8" },
  mongodb: { icon: <SiMongodb />, color: "#47A248" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  express: { icon: <SiExpress />, color: "#FFFFFF" },
  ExpressJs: { icon: <SiExpress />, color: "#FFFFFF" },
  node: { icon: <SiNodedotjs />, color: "#3C873A" },
  NodeJs: { icon: <SiNodedotjs />, color: "#3C873A" },
  framer: { icon: <SiFramer />, color: "#FF0055" },
  "framer-motion": { icon: <SiFramer />, color: "#FF0055" },
  daisyui: { icon: <SiDaisyui />, color: "#5A0EF8" },
  Stripe: { icon: <SiStripe />, color: "#635BFF" },
  ReactHookForm: { icon: "📝", color: "#EC5990" },
  "ReactHookForm,": { icon: "📝", color: "#EC5990" },
  tanStackReactQuery: { icon: "🔄", color: "#FF4154" },
  Jwt: { icon: "🔐", color: "#000000" },
  Axios: { icon: "↔️", color: "#5A29E4" },
  "gemini-ai": { icon: "🤖", color: "#4285F4" },
  recharts: { icon: "📊", color: "#8884D8" },
  "next-auth": { icon: "🔑", color: "#000000" },
  jsPDF: { icon: "📄", color: "#FF0000" },
};

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const project = projectsData.find((pro) => pro.id === id);

  if (!project) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-lg font-semibold"
          >
            <FaArrowLeft className="inline mr-2" /> Go Back
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00ADB5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#007CFF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-6 z-50 px-5 py-3 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-lg font-semibold shadow-lg backdrop-blur-md border border-white/10 flex items-center gap-2"
      >
        <FaArrowLeft /> Back
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-4"
          >
            {project.title}
          </motion.h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Your hustle gets erased with {project.title}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-lg font-semibold shadow-lg flex items-center gap-2"
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-semibold flex items-center gap-2"
            >
              <FaGithub /> GitHub Repo
            </motion.a>
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
          <img
            src={project.image}
            alt={project.title}
            className="relative w-full rounded-2xl border border-[#333] shadow-2xl"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
            About This Project
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
            <FaCheckCircle className="inline mr-3 text-[#00ADB5]" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] hover:border-[#00ADB5]/50 rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#00ADB5] mt-2 animate-pulse shadow-[0_0_10px_rgba(0,173,181,0.6)]"></div>
                  <p className="text-gray-300 leading-relaxed">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
            🛠️ Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {project.tech.map((tech, i) => {
              const techData = techIcons[tech.toLowerCase()] || techIcons[tech];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="group relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] hover:border-[#00ADB5]/50 rounded-xl p-4 transition-all"
                  style={{ color: techData?.color || "#FFFFFF" }}
                >
                  <div className="text-3xl mb-2 flex justify-center">
                    {techData?.icon || "📦"}
                  </div>
                  <div className="text-xs text-gray-400 text-center">{tech}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* What I Learned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text flex items-center gap-3">
              <FaLightbulb className="text-[#00ADB5]" />
              What I Learned
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                This project was more than just building a MERN-based application — it was a deep dive into real-world development. I tackled countless bugs, sleepless nights debugging async issues, and learned how to properly structure protected routes, user roles, and multi-dashboard logic for both users and guides.
              </p>
              <p>
                Working through late-night problem-solving helped me sharpen my ability to debug under pressure and gain confidence in solving complex client-server communication issues. I also became more comfortable handling MongoDB queries, conditional rendering, role-based access control, and responsive UI handling.
              </p>
              <p>
                Overall, this project strengthened my full-stack thinking, boosted my patience, and taught me how to stay persistent through frustrating errors — ultimately shaping me into a more resilient and confident developer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text flex items-center gap-3">
              <FaExclamationTriangle className="text-[#00ADB5]" />
              Challenges Faced
            </h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-4 p-4 bg-[#0a0a0a]/50 rounded-xl border border-[#333]"
              >
                <span className="text-[#00ADB5] text-2xl flex-shrink-0">•</span>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">JWT Authentication Complexity</h3>
                  <p className="text-gray-400">
                    Implementing secure JWT authentication required careful handling of token expiration, refresh mechanisms, and role-based access, ensuring both security and a smooth user experience.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-4 bg-[#0a0a0a]/50 rounded-xl border border-[#333]"
              >
                <span className="text-[#00ADB5] text-2xl flex-shrink-0">•</span>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">Payment Gateway Integration</h3>
                  <p className="text-gray-400">
                    Integrating the payment gateway posed challenges with API inconsistencies, asynchronous responses, and ensuring transaction reliability, which required thorough testing and robust error handling.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to see it in action?</h2>
          <p className="text-gray-400 mb-8">Check out the live demo or explore the code on GitHub</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-lg font-semibold shadow-lg text-lg"
            >
              <FaExternalLinkAlt className="inline mr-2" /> Visit Live Site
            </motion.a>
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-lg"
            >
              <FaGithub className="inline mr-2" /> View Code
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;