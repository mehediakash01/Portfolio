import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  return (
    <section id="education" className="bg-[#121212] text-white px-6 py-12">
      <div className="w-11/12 max-w-7xl  mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          🎓 Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-xl text-center"
        >
          <div className="flex items-center gap-4 mb-4 justify-center">
            <FaGraduationCap className="text-2xl text-[#00ADB5]" />
            <div>
              <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science & Engineering</h3>
              <p className="text-sm text-gray-400">Leading University, Sylhet</p>
            </div>
          </div>

          <div className="text-sm text-gray-300">
            <p>🎓 Status: Undergraduate Student</p>
            <p>📅 Expected Graduation: 2027</p>
            <p>📍 Location: Sylhet, Bangladesh</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
