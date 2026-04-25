import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { api } from "../../lib/api";
import { resolveIconComponent } from "../../lib/iconMap";
import { buildSkillGroups } from "../../lib/skillsBlueprint";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.17, 0.67, 0.83, 0.67] },
};

const skillCellClass =
  "group/cell relative min-h-[10.5rem] overflow-hidden border border-white/10 bg-[#050505] p-5 transition-colors duration-500 hover:bg-white/[0.035] sm:p-6";

const COLLAPSED_VISIBLE_COUNT = 4;

const StatusDot = memo(({ active = false }) => (
  <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
    <Motion.span
      className={`h-px w-px rounded-full ${active ? "bg-[#f59e0b]" : "bg-white/70"}`}
      animate={{ opacity: [0.35, 1, 0.35], scale: [1, 4.2, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        boxShadow: active
          ? "0 0 16px rgba(245,158,11,0.9)"
          : "0 0 12px rgba(255,255,255,0.5)",
      }}
    />
  </span>
));

const EmptyCell = memo(() => (
  <Link
    to="/dashboard/skills/new"
    className="block transition-transform duration-300 hover:-translate-y-0.5"
    aria-label="Add a new skill"
  >
    <div className={`${skillCellClass} min-h-[8rem] border-dashed bg-transparent`}>
      <div className="absolute right-4 top-4 h-4 w-4 text-white/20">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      </div>
      <p className="font-editorial-mono text-[0.58rem] uppercase tracking-[0.24em] text-white/22">
        Blueprint Reserve
      </p>
      <p className="mt-3 font-editorial-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
        Add New // Blueprint Space
      </p>
    </div>
  </Link>
));

const SkillCard = memo(({ skill, active, onEnter, onLeave }) => {
  if (skill.empty) {
    return (
      <Motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        <EmptyCell />
      </Motion.div>
    );
  }

  const Icon = resolveIconComponent(skill.iconName);
  const learning = Boolean(skill.isLearning);

  return (
    <Motion.article
      layout
      className={`${skillCellClass} ${learning ? "border-[#f59e0b]/35" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {active && (
        <Motion.div
          layoutId="skill-liquid-glass"
          className="absolute inset-x-4 top-8 h-20 rounded-full bg-[#f59e0b]/10 blur-xl"
          transition={{ type: "spring", bounce: 0.16, duration: 0.72 }}
        />
      )}

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.03] text-lg"
            style={{ color: skill.color || "#ffffff" }}
          >
            <Icon />
          </div>
          <StatusDot active={learning} />
        </div>

        <div>
          <p className="font-editorial-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-white/38">
            {skill.detail}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
            {skill.name}
          </h3>
          <p
            className={`mt-4 font-editorial-mono text-[0.62rem] uppercase tracking-[0.2em] ${
              learning ? "text-[#f59e0b]" : "text-white/45"
            }`}
          >
            {skill.name} // {skill.tier}
          </p>
        </div>
      </div>
    </Motion.article>
  );
});

const SkillGroup = memo(
  ({ group, groupIndex, hoveredSkill, setHoveredSkill, expanded, onToggle }) => {
    const contentSkills = group.skills.filter((skill) => !skill.empty);
    const hiddenCount = Math.max(contentSkills.length - COLLAPSED_VISIBLE_COUNT, 0);

    const visibleSkills = expanded
      ? group.skills
      : contentSkills.slice(0, COLLAPSED_VISIBLE_COUNT);

    return (
      <Motion.section
        layout
        {...reveal}
        transition={{ ...reveal.transition, delay: groupIndex * 0.08 }}
        className={`relative border border-white/10 ${group.className}`}
      >
        <div className="flex min-h-28 flex-col justify-between gap-6 border-b border-white/10 bg-white/[0.015] p-5 sm:flex-row sm:items-end sm:p-6">
          <div>
            <p className="font-editorial-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/35">
              {group.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
              {group.title}
            </h3>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="font-editorial-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/28">
              {String(contentSkills.length).padStart(2, "0")} Skills
            </p>

            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => onToggle(group.title)}
                className="font-editorial-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#f59e0b] transition-opacity hover:opacity-80"
              >
                {expanded ? "Show Less" : `Show More (+${hiddenCount})`}
              </button>
            )}
          </div>
        </div>

        <Motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {visibleSkills.map((skill) => {
            const key = skill.id || `${group.title}-${skill.name}-${skill.order ?? 0}`;

            return (
              <SkillCard
                key={key}
                skill={skill}
                active={hoveredSkill === key}
                onEnter={() => setHoveredSkill(key)}
                onLeave={() => setHoveredSkill(null)}
              />
            );
          })}
        </Motion.div>
      </Motion.section>
    );
  }
);

const MySkills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skills, setSkills] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadSkills = async () => {
      try {
        const data = await api.getSkills();
        if (!mounted) {
          return;
        }

        setSkills(Array.isArray(data) ? data : []);
        setLoadError("");
      } catch (error) {
        if (!mounted) {
          return;
        }

        setSkills([]);
        setLoadError(error.message || "Failed to load skills");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSkills();

    return () => {
      mounted = false;
    };
  }, []);

  const groups = useMemo(() => buildSkillGroups(skills), [skills]);
  const toggleGroup = useCallback((title) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(245,158,11,0.09),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(255,255,255,0.04),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Motion.div
          {...reveal}
          className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-editorial-mono text-[0.68rem] uppercase tracking-[0.32em] text-[#f59e0b]/75">
              System Analysis
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-[4rem]">
              Skills & Technologies
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/58 sm:text-base">
            A working stack mapped as a developer blueprint: core frameworks,
            production systems, and one active learning track.
          </p>
        </Motion.div>

        <div className="relative overflow-hidden border border-white/10">
          <Motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/70 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 24px rgba(245,158,11,0.28)" }}
          />

          {loading && (
            <div className="border-b border-white/10 px-6 py-4 font-editorial-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
              Syncing Skill Matrix...
            </div>
          )}

          {loadError && (
            <div className="border-b border-red-500/40 bg-red-500/10 px-6 py-4 font-editorial-mono text-[0.62rem] uppercase tracking-[0.2em] text-red-200">
              {loadError}
            </div>
          )}

          <Motion.div layout className="grid gap-0 lg:grid-cols-12">
            {groups.map((group, index) => (
              <SkillGroup
                key={group.title}
                group={group}
                groupIndex={index}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                expanded={Boolean(expandedGroups[group.title])}
                onToggle={toggleGroup}
              />
            ))}
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
