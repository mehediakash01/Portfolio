import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  const socialLinksTop = [
    { name: "GitHub", url: "https://github.com/mehediakash01", icon: <FaGithub /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mehediakash1/", icon: <FaLinkedinIn /> },
    { name: "Email", url: "mehedi.akash.dev@gmail.com", icon: <FaEnvelope /> },
  ];

  const socialLinksBottom = [
    { name: "Twitter", url: "https://x.com/mh_sky_69", icon: <FaTwitter /> },
    { name: "Facebook", url: "https://www.facebook.com/concentration369", icon: <FaFacebookF /> },
    { name: "Instagram", url: "https://www.instagram.com/mh_sky_69/", icon: <FaInstagram /> },
  ];

  return (
    <footer className="relative bg-gray-950 text-gray-400 py-16 px-4 md:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-30"></div>

      {/* Keyframe styles */}
      <style>
        {`
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 6px rgba(0,255,255,0.4); }
            50% { box-shadow: 0 0 16px rgba(0,255,255,0.9); }
            100% { box-shadow: 0 0 6px rgba(0,255,255,0.4); }
          }
          @keyframes glowLine {
            0%, 100% { box-shadow: 0 0 8px rgba(0,255,255,0.3); }
            50% { box-shadow: 0 0 18px rgba(0,255,255,0.8); }
          }
        `}
      </style>

      <div className="w-11/12 mx-auto  grid grid-cols-1 gap-8 relative z-10">

        {/* Top Social Icons */}
        <div className="flex justify-center items-center space-x-6 ">
          {socialLinksTop.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-400 transition duration-300 transform hover:scale-110 p-2 rounded-full border border-gray-700 hover:border-teal-400 flex items-center justify-center w-10 h-10"
              style={{ animation: "pulseGlow 2s infinite" }}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

      
        {/* <div className="absolute top-24 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div> */}

        {/* Developer Title and Lines */}
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center text-3xl font-bold text-white ">
            <span className="mr-3 text-teal-400 text-3xl">Mehedi Hasan Akash</span>
        
          </div>
         
        </div>

      
      
    
        {/* Bottom Social Icons */}
        <div className="flex justify-center items-center space-x-6 ">
          {socialLinksBottom.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-secondary transition duration-300 transform hover:scale-110 p-2 rounded-full border border-gray-700 hover:border-secondary flex items-center justify-center w-10 h-10"
              style={{ animation: "pulseGlow 2s infinite" }}
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer Copyright */}
        <div className="flex justify-center items-center text-sm text-gray-500  ">
          &copy; {new Date().getFullYear()} <span className="mx-4"> <Logo></Logo></span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
