import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaCertificate, FaAward } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const Education = () => {
  const educationData = [
    {
      type: "degree",
      icon: <FaUniversity />,
      title: "Bachelor of Science in Computer Science & Engineering",
      institution: "Leading University",
      location: "Sylhet, Bangladesh",
      period: "2023 - 2027",
      status: "Undergraduate Student",
      color: "#00ADB5",
      details: [
        "Focus on Software Engineering & Web Development",
        "Active in tech communities and coding clubs",
        "Building real-world projects alongside studies",
      ],
    },
    {
      type: "course",
      icon: <FaCertificate />,
      title: "Complete Web Development Course",
      institution: "Programming Hero",
      location: "Online",
      period: "2024",
      status: "Completed",
      color: "#007CFF",
      details: [
        "Full-stack MERN development from scratch",
        "Built 15+ real-world projects",
        "Learned industry best practices and modern tools",
      ],
    },
  ];

  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.h2
          className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-4"
        >
          <span className="inline-block mr-3">🎓</span>
          Education & Certifications
        </motion.h2>
        <p className="text-gray-400 text-lg">
          My academic background and learning journey
        </p>
      </motion.div>

      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00ADB5] via-[#007CFF] to-[#00ADB5] rounded-full opacity-30"></div>

          {/* Education Cards */}
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative lg:grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`group relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-2xl p-8 border border-[#333] hover:border-[#00ADB5]/50 transition-all duration-300 ${
                    index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"
                  }`}
                >
                  {/* Glowing background effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                    style={{ backgroundColor: item.color }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Title and Institution */}
                      <div className="flex-1">
                        <motion.div
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                          style={{
                            background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                            color: item.color,
                          }}
                        >
                          {item.status}
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 flex items-center gap-2">
                          <MdSchool className="text-[#00ADB5]" />
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="text-[#00ADB5]">📍</span>
                        {item.location}
                      </p>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="text-[#00ADB5]">📅</span>
                        {item.period}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="space-y-2 pt-4 border-t border-[#333]">
                      {item.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                        >
                          <span
                            className="mt-1 flex-shrink-0"
                            style={{ color: item.color }}
                          >
                            ✓
                          </span>
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </motion.div>

                {/* Timeline Node (Desktop only) */}
                <div
                  className={`hidden lg:flex justify-center ${
                    index % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="relative"
                  >
                    {/* Node circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Pulse effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <FaGraduationCap />,
              value: "CSE",
              label: "Degree Program",
              color: "#00ADB5",
            },
            {
              icon: <FaCertificate />,
              value: "1+",
              label: "Certifications",
              color: "#007CFF",
            },
            {
              icon: <FaAward />,
              value: "2027",
              label: "Expected Graduation",
              color: "#00ADB5",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] rounded-xl p-6 border border-[#333] hover:border-[#00ADB5]/50 transition-all text-center group"
            >
              <motion.div
                className="text-4xl mb-3 inline-block group-hover:scale-125 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.icon}
              </motion.div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: stat.color }}
              >
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

export default Education;