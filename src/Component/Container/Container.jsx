import React from "react";
import { IoMdDownload } from "react-icons/io";
import { FaBriefcase } from "react-icons/fa";


const  Container = ({ children, id, className = "" }) => {
  return (
    <section
      id={id}
      className={`relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden ${className}`}
    >
      {/* Animated Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#00ADB5] opacity-20 blur-3xl rounded-full animate-float"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-[#007CFF] opacity-20 blur-3xl rounded-full animate-float-delayed"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Container;