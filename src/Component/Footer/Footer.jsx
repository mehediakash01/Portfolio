import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaHeart,
  FaCode,
} from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/mehediakash01",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mehediakash1/",
      icon: <FaLinkedinIn />,
    },
    {
      name: "Email",
      url: "mailto:mehedi.akash.dev@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      name: "Twitter",
      url: "https://x.com/mh_sky_69",
      icon: <FaTwitter />,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/concentration369",
      icon: <FaFacebookF />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mh_sky_69/",
      icon: <FaInstagram />,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-t from-[#0a0a0a] to-[#050505] text-white overflow-hidden py-safe border-t border-white/5">
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-[120px] transition-all duration-1000" 
        style={{ background: `radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.15), transparent 70%)` }}
      />
      
      <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-16 sm:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20 lg:mb-24">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-12 lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-4">
              <img src="/portfolioLogo.png" alt="portfolio-logo" className="w-14 h-14 object-contain" />
              
            </div>
            <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-xl">
              Software Engineer building digital experiences that blend aesthetic excellence 
              with robust engineering.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b] uppercase py-2">
              <FaCode className="text-[10px]" />
              <span>Crafted with passion</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-2 lg:col-start-8"
          >
            <h4 className="text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase mb-8">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="group flex flex-col text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="w-0 h-[1px] bg-[#f59e0b] group-hover:w-full transition-all duration-300 mt-1"></span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-3 space-y-6"
          >
            <h4 className="text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase mb-8">Say Hello</h4>
            <div className="space-y-4">
              <a href="mailto:mehedi.akash.dev@gmail.com" className="group block w-fit">
                <span className="text-sm font-mono text-neutral-300 group-hover:text-white transition-colors block mb-1">
                  Email
                </span>
                <span className="text-sm md:text-base text-neutral-400 group-hover:text-[#f59e0b] transition-colors relative">
                  mehedi.akash.dev@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#f59e0b] group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <div className="space-y-1">
                <span className="text-sm font-mono text-neutral-300 block">Location</span>
                <span className="text-sm md:text-base text-neutral-400 block font-light">Sylhet, Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Bottom Bar Container */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-4 relative mt-12">
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 font-mono text-[0.65rem] tracking-widest uppercase text-center md:text-left"
          >
            © {new Date().getFullYear()} Mehedi Hasan. All Rights Reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 sm:gap-4"
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 bg-[#0f0f0f] flex items-center justify-center text-neutral-400 hover:text-black hover:bg-white hover:border-white transition-all duration-300"
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3 text-neutral-500 hover:text-[#f59e0b] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white/5 bg-[#0f0f0f] flex items-center justify-center group-hover:border-[#f59e0b]/50 group-hover:bg-[#f59e0b]/10 transition-all duration-500">
                <FiArrowUp className="transform group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.2em] font-semibold">Back to Top</span>
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;