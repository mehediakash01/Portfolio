import React from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#121212]/60 backdrop-blur-lg border-b border-cyan-500/10 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-300 font-medium">
            <li>
              <NavLink to="/" className="hover:text-primary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/skills" className="hover:text-primary">
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className="hover:text-primary">
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Resume + Mobile Dropdown */}
        <div className="navbar-end space-x-2">
          {/* Desktop resume button */}
          <a
            href="/resume.pdf"
            download
            className="hidden lg:flex btn btn-outline btn-primary"
          >
            Resume
          </a>

          {/* Mobile menu */}
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
              className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-[#1E1E1E] rounded-box w-52 text-gray-300"
            >
              <li>
                <NavLink to="/" className="hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/skills" className="hover:text-primary">
                  Skills
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="hover:text-primary">
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-primary">
                  Contact
                </NavLink>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-outline btn-primary w-fit"
                >
                  Resume
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
