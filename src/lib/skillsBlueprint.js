export const SKILL_SECTIONS = [
  {
    title: "Frontend Precision",
    eyebrow: "Interface Layer",
    className: "lg:col-span-7",
  },
  {
    title: "Backend & DevOps",
    eyebrow: "Service Layer",
    className: "lg:col-span-5",
  },
  {
    title: "Tools & Systems",
    eyebrow: "Delivery Layer",
    className: "lg:col-span-12",
  },
];

const EMPTY_SLOT = {
  id: "empty-slot",
  empty: true,
  name: "Add New",
  detail: "System Expansion",
  tier: "Blueprint Space",
  iconName: "",
  color: "#ffffff",
  isLearning: false,
  order: Number.MAX_SAFE_INTEGER,
};

const byOrderThenName = (a, b) => {
  const orderDelta = (a.order ?? 0) - (b.order ?? 0);
  if (orderDelta !== 0) {
    return orderDelta;
  }

  return `${a.name ?? ""}`.localeCompare(`${b.name ?? ""}`);
};

export const buildSkillGroups = (skills = []) => {
  const skillsBySection = SKILL_SECTIONS.reduce((acc, section) => {
    acc[section.title] = [];
    return acc;
  }, {});

  for (const skill of skills) {
    if (!skillsBySection[skill.category]) {
      continue;
    }

    skillsBySection[skill.category].push(skill);
  }

  return SKILL_SECTIONS.map((section) => {
    const sectionSkills = [...skillsBySection[section.title]].sort(byOrderThenName);

    if (section.title === "Tools & Systems") {
      sectionSkills.push(EMPTY_SLOT);
    }

    return {
      ...section,
      skills: sectionSkills,
    };
  });
};
