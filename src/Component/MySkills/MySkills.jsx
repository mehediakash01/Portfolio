import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaFigma,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiVercel,
  SiReactrouter,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiMysql,
  SiPrisma,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { api } from "../../lib/api";

const iconMap = {
  react: <FaReact />,
  "next.js": <SiNextdotjs />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  redux: <SiRedux />,
  "tailwind css": <SiTailwindcss />,
  tailwind: <SiTailwindcss />,
  "react router": <SiReactrouter />,
  bootstrap: <FaBootstrap />,
  "node.js": <FaNodeJs />,
  node: <FaNodeJs />,
  "express.js": <SiExpress />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  mysql: <SiMysql />,
  prisma: <SiPrisma />,
  firebase: <SiFirebase />,
  git: <FaGitAlt />,
  github: <FaGithub />,
  figma: <FaFigma />,
  vercel: <SiVercel />,
  "vs code": <VscCode />,
};

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("frontend");

  const tabs = [
    { id: "frontend", label: "Frontend", icon: "🎨" },
    { id: "backend", label: "Backend", icon: "⚙️" },
    { id: "tools", label: "Tools", icon: "🛠️" },
  ];

  const groupedSkills = useMemo(
    () =>
      skills.reduce(
        (acc, skill) => {
          const category = ["frontend", "backend", "tools"].includes(skill.category)
            ? skill.category
            : "tools";
          acc[category].push(skill);
          return acc;
        },
        { frontend: [], backend: [], tools: [] }
      ),
    [skills]
  );

  useEffect(() => {
    let mounted = true;

    const loadSkills = async () => {
      try {
        const result = await api.getSkills();
        if (mounted) {
          setSkills(result);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Could not load skills");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSkills();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ADB5] rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-11/12 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] via-[#007CFF] to-[#00ADB5] bg-clip-text mb-4"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            My Skills
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Technologies and tools I use to build amazing projects
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-white"
                  : "bg-[#1E1E1E] text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        {loading && <div className="text-center text-gray-400 py-12">Loading skills...</div>}
        {!loading && error && <div className="text-center text-red-300 py-12">{error}</div>}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {!loading &&
              groupedSkills[activeTab].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-2xl p-6 border border-[#333] hover:border-[#00ADB5]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glowing background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
                  style={{ backgroundColor: skill.color }}
                />

                {/* Icon with animation */}
                <motion.div
                  className="relative z-10 mb-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl"
                      style={{ color: skill.color }}
                    >
                      {iconMap[skill.name.toLowerCase()] || <VscCode />}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Percentage badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}44)`,
                      color: skill.color,
                    }}
                  >
                    {skill.level}%
                  </motion.div>
                </motion.div>

                {/* Progress Bar */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Proficiency
                    </span>
                  </div>

                  {/* Progress background */}
                  <div className="w-full h-2.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                    {/* Animated progress fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                      }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full"
                  style={{ backgroundColor: skill.color }}
                />
              </motion.div>
            ))}

            {!loading && groupedSkills[activeTab].length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-10">
                No skills added in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              value: `${groupedSkills[activeTab].length}+`,
              label: "Technologies",
              color: "#00ADB5",
            },
            {
              value:
                groupedSkills[activeTab].length > 0
                  ? `${Math.round(
                      groupedSkills[activeTab].reduce((sum, item) => sum + item.level, 0) /
                        groupedSkills[activeTab].length
                    )}%`
                  : "0%",
              label: "Avg Proficiency",
              color: "#007CFF",
            },
            {
              value: "Always",
              label: "Learning More",
              color: "#00ADB5",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-xl p-6 border border-[#333] hover:border-[#00ADB5]/50 transition-all text-center"
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MySkills;