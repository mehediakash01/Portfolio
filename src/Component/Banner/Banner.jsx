import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="relative text-white overflow-hidden min-h-screen flex items-center justify-center py-20 px-4 bg-[#121212]">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-6xl w-full">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-4 text-center lg:text-left"
        >
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            Mehedi Hasan Akash
          </h1>

          <div className="text-2xl font-semibold text-[#00ADB5]">
            <TypeAnimation
              sequence={["MERN Stack Developer", 1500, "React Developer", 1500, "Full Stack Developer", 1500]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lg text-gray-300 leading-relaxed">
            🚀 MERN Stack Developer crafting sleek, scalable apps with React, <br />
            Tailwind, Node.js & MongoDB — built to impress, built to perform.
          </p>

          {/* Resume Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline btn-primary flex items-center gap-2 px-5 py-2 rounded-md border border-primary hover:bg-primary/10 transition"
            >
              <IoMdDownload /> Resume
            </a>

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
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-[#00ADB5] to-[#007CFF] p-1 shadow-xl">
            <img
              src="https://i.ibb.co/6JB7dC6x/banner-Dppng.png"
              alt="Banner"
              className="w-full h-full object-cover rounded-full border-4 border-[#121212]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
