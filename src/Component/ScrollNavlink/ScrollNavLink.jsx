// src/components/ScrollNavLink.jsx

import React from "react";
import { Link } from "react-scroll";

const ScrollNavLink = ({ to, children, className = "" }) => {
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-64} // adjust if your navbar height is different
      spy={true}
      activeClass="active"
      className={`cursor-pointer hover:text-primary ${className}`}
    >
      {children}
    </Link>
  );
};

export default ScrollNavLink;
