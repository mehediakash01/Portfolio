import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

import { Link as ScrollLink } from "react-scroll";


const Banner = () => {
  return (
    <div className="relative bg-[#1E1E1E] text-white overflow-hidden min-h-[90vh] flex items-center justify-center px-6 py-10  shadow-lg ">
      {/* Background Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-primary rounded-full mix-blend-screen opacity-30 blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-secondary rounded-full mix-blend-screen opacity-30 blur-3xl animate-pulse delay-200 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-6xl w-full">
        {/* Text Section */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            Mehedi Hasan Akash
          </h1>
          <p className="font-semibold text-2xl">MERN Stack Developer</p>
          <p className="text-lg text-gray-300 leading-relaxed">
            🚀 MERN Stack Developer crafting sleek, scalable apps with React,{" "}
            <br />
            Tailwind, Node.js & MongoDB — built to impress, built to perform.
          </p>

          {/* Resume Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {/* Resume Download */}
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline btn-primary flex items-center"
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
              className="btn btn-primary flex items-center cursor-pointer"
            >
              <FaBriefcase /> Hire Me
            </ScrollLink>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://i.ibb.co/fYVrgpFL/bannerBg.png"
            alt="Banner"
            className="w-60 max-w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
