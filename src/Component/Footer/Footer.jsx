import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaArrowUp,
  FaHeart,
  FaCode,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/mehediakash01",
      icon: <FaGithub />,
      color: "#FFFFFF",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mehediakash1/",
      icon: <FaLinkedinIn />,
      color: "#0077B5",
    },
    {
      name: "Email",
      url: "mailto:mehedi.akash.dev@gmail.com",
      icon: <FaEnvelope />,
      color: "#00ADB5",
    },
    {
      name: "Twitter",
      url: "https://x.com/mh_sky_69",
      icon: <FaTwitter />,
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/concentration369",
      icon: <FaFacebookF />,
      color: "#1877F2",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mh_sky_69/",
      icon: <FaInstagram />,
      color: "#E4405F",
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
    <footer className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#007CFF]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
              Mehedi Hasan Akash
            </h3>
            <p className="text-gray-400 leading-relaxed">
              MERN Stack Developer passionate about building modern, scalable web applications. Let's create something amazing together!
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>and</span>
              <FaCode className="text-[#00ADB5]" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href.slice(1))}
                    className="text-gray-400 hover:text-[#00ADB5] transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-[#00ADB5]">▸</span>
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold mb-4">Connect With Me</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>📧 mehedi.akash.dev@gmail.com</p>
              <p>📍 Sylhet, Bangladesh</p>
              <p>🌐 Available for freelance work</p>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-[#333] hover:border-[#00ADB5] flex items-center justify-center transition-all duration-300"
                    style={{ color: link.color }}
                    title={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm text-center md:text-left"
          >
            © {new Date().getFullYear()} Mehedi Hasan Akash. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 text-sm text-gray-400"
          >
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#00ADB5] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#00ADB5] transition-colors"
            >
              Terms of Service
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#00ADB5]/50 transition-all duration-300"
        title="Scroll to top"
      >
        <FaArrowUp className="text-white" />
      </motion.button>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;