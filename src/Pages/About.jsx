import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const cards = [
    {
      title: "My Journey",
      text: "My programming journey started through movie series—curiosity turned into passion, and passion into profession.",
      color: "#00ADB5",
      animation: "fade-up",
    },
    {
      title: "What I Love",
      text: "I love working with React and the entire MERN stack to build scalable, interactive, and modern web apps.",
      color: "#007CFF",
      animation: "fade-up",
    },
    {
      title: "How I Work",
      text: "Problem-solving, clean code, and user-first thinking — I approach development with focus and creativity.",
      color: "#00ADB5",
      animation: "fade-up",
    },
    {
      title: "Beyond Code",
      text: "I’m into sports, gym, and heavy lifting. Staying fit fuels my discipline — both in life and in code.",
      color: "#007CFF",
      animation: "fade-up",
    },
  ];

  return (
    <section id="about" className=" min-h-[70vh] text-white my-16">
      <div className=" w-11/12  mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Left: Cards */}
        <div className="space-y-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              data-aos={card.animation}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border-l-8"
              style={{ borderLeftColor: card.color }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: card.color }}>
                {card.title}
              </h3>
              <p className="text-gray-300">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Center Vertical Line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center h-full relative"
        >
          <div className="w-1 bg-gradient-to-b from-[#00ADB5] to-[#007CFF] rounded-full h-full" />
          <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-[#00ADB5] shadow-lg" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-[#007CFF] shadow-lg" />
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <img
            src="https://i.ibb.co/YTWzbDmz/Website-designer-amico.png"
            alt="Banner"
            
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
