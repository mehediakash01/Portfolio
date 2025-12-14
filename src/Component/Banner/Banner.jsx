import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="relative text-white overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] animate-gradient-shift"></div>
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></motion.div>
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-[#007CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></motion.div>
      
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      ></motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Particle Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#00ADB5] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex py-40 flex-col-reverse lg:flex-row items-center justify-between gap-20 max-w-7xl w-11/12 mx-auto">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="flex-1 space-y-4 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"
          >
            Mehedi Hasan Akash
          </motion.h1>

          <div className="text-2xl font-semibold text-[#00ADB5]">
            <TypeAnimation
              sequence={[
                "MERN Stack Developer",
                1500,
                "React Developer",
                1500,
                "Full Stack Developer",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lg text-gray-300 leading-relaxed">
            🚀 MERN Stack Developer crafting sleek, scalable apps with React,{" "}
            <br />
            Tailwind, Node.js & MongoDB — built to impress, built to perform.
          </p>

          {/* Resume Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/MERN_dev.pdf"
              download
              className="btn btn-outline btn-primary flex items-center gap-2 px-5 py-2 rounded-md border border-primary hover:bg-primary/10 transition"
            >
              <IoMdDownload /> Resume
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                activeClass="active"
                className="btn btn-primary flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-[#00ADB5] to-[#007CFF] cursor-pointer hover:scale-105 transition"
              >
                <FaBriefcase /> Hire Me
              </ScrollLink>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Glowing Ring Effect */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-[#00ADB5] via-[#007CFF] to-[#00ADB5] opacity-20 blur-2xl"
            ></motion.div>

            {/* Image Container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-[#00ADB5] to-[#007CFF] p-1 shadow-2xl"
            >
              <img
                src="https://i.ibb.co/6JB7dC6x/banner-Dppng.png"
                alt="Banner"
                className="w-full h-full object-cover rounded-full border-4 border-[#121212]"
              />
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#00ADB5] to-[#007CFF] rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">⚡</span>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">💻</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;