import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaDumbbell, FaLayerGroup } from "react-icons/fa";

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

  const orbitHighlights = [
    {
      title: "Frontend Precision",
      text: "Motion-led UI with clean visual hierarchy.",
      icon: FaLayerGroup,
      color: "#00ADB5",
      className: "left-0 top-12 sm:-left-3 sm:top-16",
      delay: 0.15,
    },
    {
      title: "MERN Craft",
      text: "Scalable builds with thoughtful structure.",
      icon: FaCode,
      color: "#007CFF",
      className: "right-0 top-10 sm:-right-6 sm:top-20",
      delay: 0.25,
    },
    {
      title: "Disciplined Mindset",
      text: "Consistency shaped by sport and training.",
      icon: FaDumbbell,
      color: "#00ADB5",
      className: "bottom-8 left-6 sm:-left-2 sm:bottom-12",
      delay: 0.35,
    },
  ];

  const orbitDots = Array.from({ length: 14 }, (_, index) => {
    const angle = (index / 14) * Math.PI * 2;

    return {
      id: index,
      left: `${50 + Math.cos(angle) * 43}%`,
      top: `${50 + Math.sin(angle) * 43}%`,
      size: index % 3 === 0 ? 10 : 6,
      color: index % 2 === 0 ? "#00ADB5" : "#007CFF",
      opacity: index % 3 === 0 ? 0.85 : 0.45,
    };
  });

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

      <div className="max-w-7xl w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
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

        {/* Right Side: Circular portrait composition */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex min-h-[430px] items-center justify-center sm:min-h-[520px]"
        >
          <div className="absolute h-[320px] w-[320px] rounded-full bg-[#00ADB5]/18 blur-3xl sm:h-[420px] sm:w-[420px]"></div>
          <div className="absolute right-12 top-10 h-24 w-24 rounded-full bg-[#007CFF]/10 blur-2xl sm:h-28 sm:w-28"></div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[360px] w-[360px] rounded-full border border-white/10 sm:h-[470px] sm:w-[470px]"
          >
            {orbitDots.map((dot) => (
              <span
                key={dot.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  opacity: dot.opacity,
                  background: dot.color,
                  boxShadow: `0 0 18px ${dot.color}66`,
                }}
              ></span>
            ))}
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-[#00ADB5]/20 sm:h-[400px] sm:w-[400px]"
          ></motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]"
          >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#00ADB5]/30 via-transparent to-[#007CFF]/25 blur-2xl"></div>

            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00ADB5] via-[#09101d] to-[#007CFF] p-[10px]"
              style={{ boxShadow: "0 30px 90px rgba(0, 124, 255, 0.24)" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#07131f]">
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 42%)",
                  }}
                ></div>
                <img
                  src="/Seven.jpeg"
                  alt="Portrait of Mehedi Hasan Akash"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/78 via-transparent to-[#08111d]/20"></div>

                <div className="absolute hidden lg:block inset-x-5 bottom-5 z-20 rounded-full border border-white/10 bg-[#08111d]/72 px-5 py-3 text-center backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#00ADB5]/90">
                    Design x Development
                  </p>
                  <p className="mt-1 text-sm text-white/78">
                    Crafting clean interfaces with strong engineering discipline.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {orbitHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.45, delay: item.delay },
                  scale: { duration: 0.45, delay: item.delay },
                  y: {
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                  },
                }}
                className={`absolute z-20 w-[180px] hidden lg:block rounded-2xl border border-white/10 bg-[#08111d]/80 px-4 py-3 backdrop-blur-xl ${item.className}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}55)`,
                    }}
                  >
                    <Icon className="text-sm text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/62">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
