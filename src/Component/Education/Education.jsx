import { useState } from "react";
import { motion as Motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.17, 0.67, 0.83, 0.67] },
};

const academicPoints = [
  "Focus: Software Architecture & Advanced Systems.",
  "Contribution: Active Tech Community Leadership.",
  "Goal: Engineering scalable real-world solutions.",
];

const milestones = [
  {
    title: "Programming Hero Black Belt",
    meta: "Oct 2025",
    tag: "[ STATUS: ACHIEVED ]",
    detail:
      "Recognized for advanced full-stack execution, delivery discipline, and high-standard project completion.",
    accent: true,
  },
  {
    title: "HackFusion 2026",
    meta: "IEEE CS LU SB",
    tag: "[ MILESTONE: FINALIST ]",
    detail:
      "Successfully delivered a functional solution for the Advanced Systems track.",
    supporting:
      "Competed as a finalist in a high-pressure engineering environment. Executed complex problem-solving under a 24-hour development cycle.",
  },
  {
    title: "Complete Web Development Course",
    meta: "Programming Hero, 2024",
    tag: "[ FOUNDATION: COMPLETED ]",
    detail: "MERN Stack mastery and industry-standard best practices.",
  },
];

const cellClass =
  "group/cell relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:bg-white/[0.04] sm:p-7";

const PulseDot = ({ amber = false }) => (
  <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
    <Motion.span
      className={`h-px w-px rounded-full ${amber ? "bg-[#f59e0b]" : "bg-white/70"}`}
      animate={{ opacity: [0.35, 1, 0.35], scale: [1, 4.2, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        boxShadow: amber
          ? "0 0 16px rgba(245,158,11,0.95)"
          : "0 0 10px rgba(255,255,255,0.55)",
      }}
    />
  </span>
);

const HoverGlass = ({ active, warm = false }) =>
  active ? (
    <Motion.div
      layoutId="education-liquid-glass"
      className={`absolute inset-x-5 top-8 h-24 rounded-full blur-xl ${
        warm ? "bg-[#f59e0b]/12" : "bg-white/[0.08]"
      }`}
      transition={{ type: "spring", bounce: 0.16, duration: 0.72 }}
    />
  ) : null;

const Education = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <section className="relative isolate overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(245,158,11,0.08),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.035),transparent_30%)]" />

      <Motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.05 }}
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
        className="pointer-events-none absolute left-1/2 top-8 z-0 -translate-x-1/2 text-center font-display text-[16vw] font-black uppercase leading-none tracking-[-0.08em] text-transparent"
      >
        TIMELINE
      </Motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Motion.div
          {...reveal}
          className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-editorial-mono text-[0.68rem] uppercase tracking-[0.32em] text-[#f59e0b]/75">
              Academic & Engineering Ledger
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4rem]">
              Education & Credentials
            </h2>
          </div>
          
        </Motion.div>

        <div className="grid border border-white/10 lg:grid-cols-[1.05fr_0.95fr]">
          <Motion.article
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.06 }}
            className={`${cellClass} min-h-[32rem] lg:border-r-0`}
            onMouseEnter={() => setHoveredCell("academic")}
            onMouseLeave={() => setHoveredCell(null)}
          >
            <HoverGlass active={hoveredCell === "academic"} warm={false} />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <p className="font-editorial-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/36">
                    Academic Foundation
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-5xl">
                    Leading University
                  </h3>
                  <p className="mt-4 font-editorial-mono text-[0.72rem] uppercase tracking-[0.24em] text-white/46">
                    B.Sc in CSE // 2023 - 2027
                  </p>
                </div>

                <PulseDot amber />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="border border-[#f59e0b]/30 bg-[#f59e0b]/8 px-3 py-2 font-editorial-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#f6bf63]">
                  [ ACADEMIC_IN_PROGRESS ]
                </span>
              </div>

              <div className="mt-10 grid gap-5">
                {academicPoints.map((point, index) => (
                  <Motion.div
                    key={point}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, delay: 0.16 + index * 0.09 }}
                    className="flex items-start gap-4 border-t border-white/10 pt-5"
                  >
                    <span className="mt-1 h-px w-6 bg-white/24" />
                    <p className="font-editorial-mono text-[0.74rem] uppercase leading-7 tracking-[0.18em] text-white/70">
                      {point}
                    </p>
                  </Motion.div>
                ))}
              </div>

              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-auto pt-10"
              >
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <p className="font-editorial-mono text-[0.58rem] uppercase tracking-[0.24em] text-white/32">
                    Current Studies
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/62">
                    Academic work is centered on systems thinking, software design,
                    and converting theory into deployable engineering outcomes.
                  </p>
                </div>
              </Motion.div>
            </div>
          </Motion.article>

          <div className="grid">
            {milestones.map((item, index) => {
              const key = `milestone-${index}`;
              const isActive = hoveredCell === key;

              return (
                <Motion.article
                  key={item.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: 0.12 + index * 0.1 }}
                  className={`${cellClass} ${index < milestones.length - 1 ? "border-b-0" : ""} ${
                    item.accent ? "hover:border-[#f59e0b]/35" : ""
                  }`}
                  onMouseEnter={() => setHoveredCell(key)}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <HoverGlass active={isActive} warm={item.accent} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-editorial-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/34">
                          {item.meta}
                        </p>
                        <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
                          {item.title}
                        </h3>
                      </div>

                      <PulseDot amber={item.accent} />
                    </div>

                    <div className="mt-5">
                      <span
                        className={`inline-flex border px-3 py-2 font-editorial-mono text-[0.58rem] uppercase tracking-[0.2em] ${
                          item.accent
                            ? "border-[#f59e0b]/30 bg-[#f59e0b]/8 text-[#f6bf63]"
                            : "border-white/10 bg-white/[0.03] text-white/46"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-[0.98rem]">
                      {item.detail}
                    </p>

                    {item.supporting ? (
                      <p className="mt-4 border-t border-white/10 pt-4 font-editorial-mono text-[0.67rem] uppercase leading-7 tracking-[0.18em] text-white/44">
                        {item.supporting}
                      </p>
                    ) : null}
                  </div>
                </Motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
