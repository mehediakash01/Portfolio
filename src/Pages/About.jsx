import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const cards = [
    {
      title: "My Journey",
      text: "My programming journey started through movie series—curiosity turned into passion, and passion into profession.",
      color: "#00ADB5",
      icon: "🚀",
      delay: 0,
    },
    {
      title: "What I Love",
      text: "I love working with React and the entire MERN stack to build scalable, interactive, and modern web apps.",
      color: "#007CFF",
      icon: "💻",
      delay: 0.1,
    },
    {
      title: "How I Work",
      text: "Problem-solving, clean code, and user-first thinking — I approach development with focus and creativity.",
      color: "#00ADB5",
      icon: "⚡",
      delay: 0.2,
    },
    {
      title: "Beyond Code",
      text: "I'm into sports, gym, and heavy lifting. Staying fit fuels my discipline — both in life and in code.",
      color: "#007CFF",
      icon: "💪",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-4">
          About Me
        </h2>
        <p className="text-gray-400 text-lg">Get to know who I am and what drives me</p>
      </motion.div>

      <div className="max-w-7xl w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Cards */}
        <div className="space-y-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ scale: 1.03, x: 10 }}
              className="group relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] p-6 rounded-xl shadow-lg border border-[#333] hover:border-[#00ADB5]/50 transition-all duration-300"
            >
              {/* Glowing border effect on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${card.color}22, transparent)`,
                }}
              ></div>

              {/* Card content */}
              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}88)`,
                  }}
                >
                  {card.icon}
                </motion.div>

                {/* Text */}
                <div>
                  <h3
                    className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{card.text}</p>
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                style={{ background: card.color }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Image with effects */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center items-center"
        >
          {/* Glowing background circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-96 h-96 bg-gradient-to-r from-[#00ADB5]/20 to-[#007CFF]/20 rounded-full blur-3xl"
          ></motion.div>

          {/* Image container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-3xl opacity-20 blur-xl"></div>
            
            {/* Main image */}
            <div className="relative bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] p-6 rounded-3xl border border-[#333] shadow-2xl">
              <img
                src="https://i.ibb.co/YTWzbDmz/Website-designer-amico.png"
                alt="About Me Illustration"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-white font-semibold text-sm">✨ Creative</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#007CFF] to-[#00ADB5] px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-white font-semibold text-sm">🎯 Focused</span>
            </motion.div>
          </motion.div>

          {/* Decorative dots */}
          <div className="absolute top-10 right-10 grid grid-cols-3 gap-2 opacity-30">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-2 h-2 bg-[#00ADB5] rounded-full"
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-5xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { number: "50+", label: "Projects Completed", icon: "📦" },
          { number: "1+", label: "Years Experience", icon: "⏱️" },
          { number: "100%", label: "Client Satisfaction", icon: "⭐" },
          { number: "24/7", label: "Available Support", icon: "🚀" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] p-6 rounded-xl border border-[#333] hover:border-[#00ADB5]/50 transition-all duration-300 text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-1">
              {stat.number}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;