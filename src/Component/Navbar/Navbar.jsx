import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

 const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Handle scroll effects and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#121212]/95 backdrop-blur-lg border-b border-[#00ADB5]/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#00ADB5] to-[#007CFF] bg-clip-text hover:scale-105 transition-transform"
          >
           <img src="/protfolio.png" width={68} height={68} alt="portfolio-logo"/>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-[#00ADB5] scale-110"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ADB5] to-[#007CFF] animate-pulse"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Resume Button */}
          <a
            href="/MERN_dev.pdf"
            download
            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-md border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10 transition-all duration-300 hover:scale-105"
          >
            <IoMdDownload /> Resume
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#00ADB5] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#1E1E1E]/98 backdrop-blur-lg border-b border-[#00ADB5]/10 shadow-xl">
            <ul className="py-4 px-6 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "bg-[#00ADB5]/20 text-[#00ADB5] font-semibold"
                        : "text-gray-300 hover:bg-[#00ADB5]/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/MERN_dev.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10 transition-all"
                >
                  <IoMdDownload /> Download Resume
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar