import { useEffect, useState } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

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
          ? "border-b border-white/10 bg-[#050505]/88 shadow-[0_20px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("home")}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 transition-transform hover:scale-[1.02]"
          >
            <img src="/protfolio.png" width={68} height={68} alt="portfolio-logo" />
          </button>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "scale-105 text-white"
                      : "text-white/62 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/80"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/MERN.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/84 backdrop-blur-md transition-all duration-300 hover:border-white/26 hover:bg-white/[0.08] hover:text-white"
            >
              View Resume
              <HiOutlineArrowUpRight className="text-base" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-white/75 transition-colors"
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

        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-20 border-b border-white/10 bg-[#050505]/96 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:hidden">
            <ul className="py-4 px-6 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? "bg-white/[0.08] font-semibold text-white"
                        : "text-white/68 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/MERN.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-4 py-3 text-white/84 transition-all hover:bg-white/[0.08] hover:text-white"
                >
                  View Resume
                  <HiOutlineArrowUpRight className="text-base" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
