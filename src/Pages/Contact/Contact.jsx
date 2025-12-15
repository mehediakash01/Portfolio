import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    // KEY FIX: Check if form.current exists
    if (!form.current) {
      toast.error("❌ Form reference error. Please try again.");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        "service_vbs7h9m",
        "template_7h7srkh",
        form.current, // This now correctly references the form element
        "Af503tNgEeYxAHu8j"
      )
      .then(
        () => {
          setLoading(false);
          toast.success("✅ Message sent successfully!", {
            style: {
              background: "#1E1E1E",
              color: "#fff",
              border: "1px solid #00ADB5",
            },
            iconTheme: {
              primary: "#00ADB5",
              secondary: "#fff",
            },
          });
          form.current.reset(); // Reset the form
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          toast.error("❌ Failed to send message. Please try again.", {
            style: {
              background: "#1E1E1E",
              color: "#fff",
              border: "1px solid #ff4444",
            },
          });
        }
      );
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "mehedi.akash.dev@gmail.com",
      link: "mailto:mehedi.akash.dev@gmail.com",
      color: "#00ADB5",
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: "+880 1820 192591",
      link: "tel:+8801820192591",
      color: "#007CFF",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      value: "+880 1820 192591",
      link: "https://wa.me/8801820192591",
      color: "#25D366",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Sylhet, Bangladesh",
      link: null,
      color: "#00ADB5",
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, label: "LinkedIn", link: "https://www.linkedin.com/in/mehediakash01/", color: "#0077B5" },
    { icon: <FaGithub />, label: "GitHub", link: "https://github.com/mehediakash01", color: "#FFFFFF" },
    { icon: <FaWhatsapp />, label: "WhatsApp", link: "https://wa.me/8801820192591", color: "#25D366" },
  ];

  return (
    <section className="py-20 text-white relative overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Animated Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#007CFF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 w-11/12 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text mb-4">
            <span className="inline-block mr-3">📬</span>
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg">Have a project in mind? Let's work together!</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - Left Side */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ x: 10 }}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-[#0a0a0a]/50 rounded-xl border border-[#333] hover:border-[#00ADB5]/50 transition-all">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`, color: item.color }}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                          <p className="text-gray-300 font-medium group-hover:text-[#00ADB5] transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-[#0a0a0a]/50 rounded-xl border border-[#333]">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`, color: item.color }}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                          <p className="text-gray-300 font-medium">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#333]">
                <p className="text-sm text-gray-400 mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a key={index} href={social.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-full flex items-center justify-center border border-[#333] hover:border-[#00ADB5] transition-all" style={{ color: social.color }} title={social.label}>
                      <span className="text-xl">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">24h</div>
                  <div className="text-xs text-gray-400">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text">100%</div>
                  <div className="text-xs text-gray-400">Available</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#333] rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              
              {/* KEY FIX: Use actual form element */}
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full bg-[#0a0a0a] text-white border border-[#333] pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#0a0a0a] text-white border border-[#333] pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows="6"
                    required
                    className="w-full bg-[#0a0a0a] text-white border border-[#333] px-4 py-3 rounded-xl focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all resize-none"
                  ></textarea>
                </div>

                <input type="hidden" name="to_email" value="mehedi.akash.dev@gmail.com" />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full bg-gradient-to-r from-[#00ADB5] to-[#007CFF] px-6 py-4 rounded-xl text-white font-semibold shadow-lg flex items-center justify-center gap-2 transition-all ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[#00ADB5]/50"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;