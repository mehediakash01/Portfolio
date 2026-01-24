import React, { useEffect, useRef, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative text-white overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#050510]">
        {/* Animated mesh gradient effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 40% 20%, rgba(0, 173, 181, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 0%, rgba(0, 124, 255, 0.3) 0px, transparent 50%),
              radial-gradient(at 0% 50%, rgba(138, 43, 226, 0.2) 0px, transparent 50%),
              radial-gradient(at 80% 50%, rgba(255, 20, 147, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(0, 173, 181, 0.2) 0px, transparent 50%),
              radial-gradient(at 80% 100%, rgba(0, 124, 255, 0.2) 0px, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Interactive Light Effect - follows mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(0, 173, 181, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating Orbs with Mouse Interaction */}
      {[
        { size: 300, color: '#00ADB5', opacity: 0.15, duration: 20, delay: 0 },
        { size: 250, color: '#007CFF', opacity: 0.12, duration: 25, delay: 5 },
        { size: 350, color: '#8A2BE2', opacity: 0.08, duration: 30, delay: 10 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full filter blur-3xl mix-blend-screen"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: orb.opacity,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Grid Pattern with Perspective */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 173, 181, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 173, 181, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ADB5] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 173, 181, 0.05), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex py-20 flex-col-reverse lg:flex-row items-center justify-between gap-20 max-w-7xl w-11/12 mx-auto">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-6 text-center lg:text-left"
        >
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00ADB5]/20 to-[#007CFF]/20 border border-[#00ADB5]/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-[#00ADB5]">👋 Welcome to my portfolio</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ADB5] via-[#007CFF] to-[#00ADB5] animate-gradient">
              Mehedi Hasan Akash
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-semibold"
          >
            <span className="text-gray-400">I'm a </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ADB5] to-[#007CFF]">
              <TypeAnimation
                sequence={[
                  "MERN Stack Developer",
                  2000,
                  "React Specialist",
                  2000,
                  "Full Stack Engineer",
                  2000,
                  "Problem Solver",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 leading-relaxed max-w-2xl"
          >
            Crafting beautiful, performant web applications with modern technologies. 
            Specializing in React, Node.js, and everything in between.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start"
          >
            <motion.a
              href="/MERN.pdf"
              download
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 173, 181, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#00ADB5] to-[#007CFF] font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#007CFF] to-[#00ADB5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <IoMdDownload className="text-xl" />
                Download Resume
              </span>
            </motion.a>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border-2 border-[#00ADB5] text-[#00ADB5] font-semibold hover:bg-[#00ADB5]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaBriefcase />
              Let's Work Together
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 pt-8 justify-center lg:justify-start"
          >
            {[
              { value: "5+", label: "Projects" },
              { value: "3+", label: "Years Exp" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ADB5] to-[#007CFF]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00ADB5, #007CFF, #8A2BE2, #00ADB5)',
                opacity: 0.3,
                filter: 'blur(30px)',
              }}
            />

            {/* Pulsing rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-[#00ADB5]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Main image container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative lg:w-80 lg:h-80 w-60 h-60 rounded-full overflow-hidden border-4 border-[#00ADB5] shadow-2xl shadow-[#00ADB5]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/20 to-[#007CFF]/20 "></div>
              <img
                src="/Seven.jpeg"
                alt="Mehedi Hasan Akash"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating tech icons */}
            {[
              { icon: "⚛️", position: "-top-4 -right-4", delay: 0 },
              { icon: "💻", position: "-bottom-4 -left-4", delay: 0.5 },
              { icon: "🚀", position: "top-1/2 -left-8", delay: 1 },
              { icon: "⚡", position: "top-1/2 -right-8", delay: 1.5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.position} w-16 hidden h-16 rounded-full bg-gradient-to-br from-[#00ADB5] to-[#007CFF] lg:flex items-center justify-center text-2xl shadow-lg`}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;