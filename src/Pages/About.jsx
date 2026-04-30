import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.7,
    ease: [0.17, 0.67, 0.83, 0.67],
  },
};

const cellBaseClass =
  "group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:bg-white/[0.05] sm:p-8";

const metrics = "FULL STACK DEVELOPER // SCALABLE WEB APPS // CLEAN UI + ROBUST BACKEND";

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const storyY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_42%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='white' fill-opacity='0.9'%3E%3Ccircle cx='18' cy='24' r='1'/%3E%3Ccircle cx='84' cy='36' r='1'/%3E%3Ccircle cx='138' cy='18' r='1'/%3E%3Ccircle cx='42' cy='92' r='1'/%3E%3Ccircle cx='108' cy='82' r='1'/%3E%3Ccircle cx='154' cy='116' r='1'/%3E%3Ccircle cx='72' cy='146' r='1'/%3E%3Ccircle cx='24' cy='154' r='1'/%3E%3Ccircle cx='164' cy='162' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{ y: storyY, WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
        className="pointer-events-none absolute left-1/2 top-12 z-0 -translate-x-1/2 text-center font-display text-[15vw] font-black uppercase leading-none tracking-[-0.08em] text-transparent"
      >
        STORY
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          {...reveal}
          className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/45">About Me</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.4rem]">
              Full stack products built for real users.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58 sm:text-base">
            I design and build complete web applications, from polished frontend
            experiences to secure backend systems and production-ready databases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 border border-white/10 lg:grid-cols-4">
          <motion.article
            {...reveal}
            className={`${cellBaseClass} lg:col-span-2 lg:min-h-[24rem] lg:border-r-0 lg:border-b-0`}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
              Feature Cell
            </p>
            <h3 className="mt-6 max-w-lg font-display text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl">
              The Origin Story.
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              My programming journey started after being heavily inspired by the series &quot;Mr. Robot.&quot; What began as a fascination with cybersecurity and digital systems quickly evolved into a passion for building software from the ground up. Today, I ship robust full-stack solutions with React, Next.js, Node.js, and PostgreSQL.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-white/38">
              <span className="border border-white/10 px-3 py-2">UI Systems</span>
              <span className="border border-white/10 px-3 py-2">REST APIs</span>
              <span className="border border-white/10 px-3 py-2">Database Design</span>
            </div>
          </motion.article>

          <motion.article
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
            className={`${cellBaseClass} lg:min-h-[24rem] lg:border-r-0 lg:border-b-0`}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
              Logic Cell A
            </p>
            <div className="mt-16 border-t border-white/10 pt-5">
              <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
                Frontend Precision
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                Responsive, accessible interfaces with strong UX hierarchy and fast rendering.
              </p>
            </div>
          </motion.article>

          <motion.article
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.14 }}
            className={`${cellBaseClass} lg:min-h-[24rem] lg:border-b-0`}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
              Logic Cell B
            </p>
            <div className="mt-16 border-t border-white/10 pt-5">
              <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
                Backend Engineering
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                Secure APIs, authentication, business logic, and scalable data modeling.
              </p>
            </div>
          </motion.article>

          <motion.article
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.2 }}
            className={`${cellBaseClass} lg:col-span-4`}
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_2fr] lg:items-end">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/42">
                  Discipline Cell
                </p>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                  Beyond Code.
                </h3>
              </div>
              <p className="max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Consistency shaped by sport and heavy lifting. I bring the same
                powerlifting discipline to every line of code I write.
              </p>
            </div>
          </motion.article>
        </div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.24 }}
          className="mt-6 overflow-hidden border border-white/10 bg-white/[0.03]"
        >
          <div className="marquee-track flex min-w-max items-center gap-10 py-4">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="flex shrink-0 items-center gap-10 whitespace-nowrap px-6 font-editorial-mono text-xs uppercase tracking-[0.32em] text-white/62 sm:text-sm"
              >
                <span>{metrics}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
