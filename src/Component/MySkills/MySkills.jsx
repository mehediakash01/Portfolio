import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaJs,
  FaGithub,
  FaBootstrap,
  FaFigma,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiVercel,
  SiReactrouter,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import Container from "../Container/Container";

const skillCategories = {
  frontend: [
    { name: "React", icon: <FaReact />, color: "#61DAFB", level: 400 },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      color: "#38BDF8",
      level: 400,
    },
    {
      name: "React Router",
      icon: <SiReactrouter />,
      color: "#F44250",
      level: 350,
    },
    { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3", level: 350 },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs />, color: "#3C873A", level: 250 },
    { name: "Express.js", icon: <SiExpress />, color: "#F7DF1E", level: 450 },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", level: 350 },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFA611", level: 350 },
  ],
  tools: [
    { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: 400 },
    { name: "GitHub", icon: <FaGithub />, color: "#FFFFFF", level: 350 },
    { name: "Figma", icon: <FaFigma />, color: "#A259FF", level: 300 },
    { name: "Vercel", icon: <SiVercel />, color: "#ffffff", level: 350 },
    { name: "VS Code", icon: <VscCode />, color: "#007ACC", level: 400 },
  ],
};

const MySkills = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const tabs = ["frontend", "backend", "tools"];

  return (
    <div>
      <div className="relative z-10 max-w-7xl mx-auto text-center py-15">
        <motion.h2
          animate={{
            color: [
              "#61DAFB",
              "#38BDF8",
              "#F44250",
              "#7952B3",
              "#3C873A",
              "#F7DF1E",
              "#47A248",
              "#FFA611",
              "#F05032",
              "#FFFFFF",
              "#A259FF",
              "#007ACC",
            ],
            transition: { duration: 10, repeat: Infinity },
          }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-10"
        >
          My Skills
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-6 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "bg-[#252525] text-gray-300 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Skill Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories[activeTab].map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#ffffff0a] backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-start space-y-4 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <div className="flex items-center space-x-3">
                <span style={{ color: skill.color }}>{skill.icon}</span>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>

              {/* Strength Bar */}
              <div className="w-full">
                <p className="text-sm text-gray-400 mb-1">STRENGTH</p>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(skill.level / 500) * 100}%`,
                      backgroundColor: skill.color,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-right text-gray-400 mt-1">
                  {skill.level}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MySkills;
