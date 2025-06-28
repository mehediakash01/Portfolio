import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const cards = [
    {
      title: "My Journey",
      text: "My programming journey started through movie series—curiosity turned into passion, and passion into profession.",
      color: "primary",
      animation: "fade-up",
    },
    {
      title: "What I Love",
      text: "I love working with React and the entire MERN stack to build scalable, interactive, and modern web apps.",
      color: "secondary",
      animation: "fade-up",
    },
    {
      title: "How I Work",
      text: "Problem-solving, clean code, and user-first thinking — I approach development with focus and creativity.",
      color: "primary",
      animation: "fade-up",
    },
    {
      title: "Beyond Code",
      text: "I’m into sports, gym, and heavy lifting. Staying fit fuels my discipline — both in life and in code.",
      color: "secondary",
      animation: "fade-up",
    },
  ];

  return (
    <div className="relative bg-[#1E1E1E] text-white px-6 py-20 overflow-hidden shadow-lg">
      {/* Glow Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-primary opacity-20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-secondary opacity-20 blur-3xl rounded-full z-0"></div>

      {/* 3 Columns Layout */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left: Animated Cards */}
        <div className="space-y-8">
          {cards.map((card, index) => (
            <div
              key={index}
              data-aos={card.animation}
              className={`border-l-4 border-${card.color} pl-6 pr-4 py-4 rounded-lg shadow-md bg-[#252525] hover:scale-[1.02] transition duration-300`}
            >
              <h3 className={`text-xl font-bold text-${card.color} mb-2`}>
                {card.title}
              </h3>
              <p className="text-gray-300">{card.text}</p>
            </div>
          ))}
        </div>
        <div className="h-full flex justify-center items-stretch">
          <div className="w-1 bg-gradient-to-b from-primary to-secondary rounded-full shadow-lg" data-aos="zoom-in"></div>
        </div>

        {/* Right: Image or Placeholder */}
        <div className="flex items-center justify-center" data-aos="zoom-in">
          <p className="text-4xl font-bold text-gray-400">Image Here</p>
        </div>
      </div>
    </div>
  );
};

export default About;
