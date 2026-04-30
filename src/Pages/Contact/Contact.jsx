import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaUser,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const RevealText = ({ children, delay = 0 }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatusMsg(null);
    
    if (!form.current) {
      toast.error("Form reference error. Please try again.");
      return;
    }

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
          setStatusMsg("success");
          toast.success("Message sent successfully!", {
            style: {
              background: "#050505",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            iconTheme: {
              primary: "#f59e0b",
              secondary: "#050505",
            },
          });
          form.current.reset();
          setTimeout(() => setStatusMsg(null), 5000);
        },
        (error) => {
          setLoading(false);
          setStatusMsg("error");
          console.error("EmailJS error:", error);
          toast.error("Failed to send message. Please try again.", {
            style: {
              background: "#050505",
              color: "#fff",
              border: "1px solid #ef4444",
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
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: "+880 1820 192591",
      link: "tel:+8801820192591",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      value: "+880 1820 192591",
      link: "https://wa.me/8801820192591",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Sylhet, Bangladesh",
      link: null,
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, label: "LinkedIn", link: "https://www.linkedin.com/in/mehediakash01/" },
    { icon: <FaGithub />, label: "GitHub", link: "https://github.com/mehediakash01" },
    { icon: <FaWhatsapp />, label: "WhatsApp", link: "https://wa.me/8801820192591" },
  ];

  return (
    <section className="bg-[#050505] text-white relative min-h-screen py-20 sm:py-32 selection:bg-[#f59e0b] selection:text-black overflow-x-hidden" id="contact">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative Title Header */}
      <div className="pt-12 sm:pt-24 pb-8 px-6 md:px-12 lg:px-24 mx-auto w-full max-w-[120rem] z-10">
        <RevealText>
          <div className="text-[#f59e0b] font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#f59e0b]"></span>
            Contact
          </div>
        </RevealText>
        <RevealText delay={0.1}>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 text-white leading-none">
            Get In Touch
          </h2>
        </RevealText>
        <RevealText delay={0.2}>
          <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Have a project in mind, looking for a developer, or just want to connect? Let's talk.
          </p>
        </RevealText>
      </div>

      <div className="relative mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 max-w-[120rem] z-20 pb-32 mt-16">
        
        {/* Contact Info - Left Side */}
        <div className="w-full lg:w-1/3">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b] group-hover:scale-110 group-hover:bg-[#f59e0b] group-hover:text-black transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg text-neutral-200 font-light group-hover:text-white transition-colors">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#f59e0b] group-hover:scale-110 group-hover:bg-[#f59e0b] group-hover:text-black transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg text-neutral-200 font-light group-hover:text-white transition-colors">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="mt-8">
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">Social Profiles</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-[#0f0f0f] border border-white/5 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-white hover:border-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form - Right Side */}
        <div className="w-full lg:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-10 tracking-tighter">Send a Message</h3>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-4">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full bg-[#1a1a1a] text-white border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-all font-light"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-4">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-[#1a1a1a] text-white border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest ml-4">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="6"
                  required
                  className="w-full bg-[#1a1a1a] text-white border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-all font-light resize-none"
                ></textarea>
              </div>

              <input type="hidden" name="to_email" value="mehedi.akash.dev@gmail.com" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full uppercase tracking-widest text-xs hover:bg-[#f59e0b] hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 overflow-hidden"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        Send Message
                        <FiArrowRight className="transform group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-500" />
                      </span>
                    </>
                  )}
                </button>

                {statusMsg === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-500 text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Message sent successfully!
                  </motion.div>
                )}
                {statusMsg === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-sm font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Failed to send message.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;