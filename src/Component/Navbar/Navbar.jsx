import React from "react";
import Logo from "../Logo/Logo";
import ScrollNavLink from "../ScrollNavlink/ScrollNavLink";
import { IoMdDownload } from "react-icons/io";


const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full z-50 bg-[#121212]/60 backdrop-blur-lg border-b border-cyan-500/10 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-300 font-medium gap-2">
            <li>
              <ScrollNavLink to="home">Home</ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink to="about">About</ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink to="skills">Skills</ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink to="projects">Projects</ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink to="contact">Contact</ScrollNavLink>
            </li>
          </ul>
        </div>

        {/* Resume + Mobile Dropdown */}
        <div className="navbar-end space-x-2">
          {/* Resume Button */}
          <a
            href="/resume.pdf"
            download
            className="hidden lg:flex btn btn-outline btn-primary items-center"
          >
          <IoMdDownload />  Resume
          </a>

          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-[#1E1E1E] rounded-box w-52 text-gray-300 gap-1"
            >
              <li>
                <ScrollNavLink to="home">Home</ScrollNavLink>
              </li>
              <li>
                <ScrollNavLink to="about">About</ScrollNavLink>
              </li>
              <li>
                <ScrollNavLink to="skills">Skills</ScrollNavLink>
              </li>
              <li>
                <ScrollNavLink to="projects">Projects</ScrollNavLink>
              </li>
              <li>
                <ScrollNavLink to="contact">Contact</ScrollNavLink>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-outline btn-primary w-fit flex items-center"
                >
                  <IoMdDownload /> Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
