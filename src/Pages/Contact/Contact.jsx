import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_vbs7h9m",
        "template_7h7srkh",
        form.current,
        "Af503tNgEeYxAHu8j"
      )
      .then(
        () => {
          setLoading(false);
          toast.success("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          toast.error("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="bg-[#121212] text-white px-6 py-20">
      {/* React Hot Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          📬 Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-[#00ADB5] text-lg" />
              <span>mehedi.akash.dev@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <FaPhoneAlt className="text-[#00ADB5] text-lg" />
              <span>+8801820192591</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <FaWhatsapp className="text-[#00ADB5] text-lg" />
              <span>+8801820192591</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <FaMapMarkerAlt className="text-[#00ADB5] text-lg" />
              <span>Sylhet, Bangladesh</span>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/mehediakash01/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-xl hover:text-[#00ADB5] transition" />
              </a>
              <a
                href="https://github.com/mehediakash01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-xl hover:text-[#00ADB5] transition" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4"
          >
            <div>
              <label className="block text-sm mb-1" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full bg-[#2A2A2A] text-white border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-[#2A2A2A] text-white border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows="5"
                required
                className="w-full bg-[#2A2A2A] text-white border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              ></textarea>
            </div>

            {/* Hidden input to specify recipient email for EmailJS */}
            <input
              type="hidden"
              name="to_email"
              value="mehedi.akash.dev@gmail.com"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-6 py-2 rounded-md text-white shadow hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
