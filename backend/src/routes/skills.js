import { Router } from "express";
import { prisma } from "../lib/db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const SKILL_CATEGORIES = [
  "Frontend Precision",
  "Backend & DevOps",
  "Tools & Systems",
];

const normalizeCategory = (category) => {
  const value = `${category ?? ""}`.trim();

  if (!value) {
    return "";
  }

  const shorthandMap = {
    frontend: "Frontend Precision",
    backend: "Backend & DevOps",
    tools: "Tools & Systems",
  };

  return shorthandMap[value.toLowerCase()] || value;
};

const normalizeSkillInput = (payload) => ({
  name: `${payload.name ?? ""}`.trim(),
  category: normalizeCategory(payload.category || SKILL_CATEGORIES[0]),
  detail: `${payload.detail ?? ""}`.trim(),
  tier: `${payload.tier ?? ""}`.trim(),
  iconName: `${payload.iconName ?? ""}`.trim(),
  color: `${payload.color ?? "#38BDF8"}`.trim(),
  isLearning: Boolean(payload.isLearning),
  order: Number(payload.order ?? 0),
});

router.get("/", async (req, res) => {
  const normalizedCategory = normalizeCategory(req.query.category);
  const where = normalizedCategory ? { category: normalizedCategory } : {};

  const skills = await prisma.skill.findMany({
    where,
    orderBy: [{ category: "asc" }, { order: "asc" }, { createdAt: "asc" }],
  });

  return res.json(skills);
});

router.post("/", requireAdmin, async (req, res) => {
  const input = normalizeSkillInput(req.body);

  if (!input.name) {
    return res.status(400).json({ message: "name is required" });
  }

  if (!SKILL_CATEGORIES.includes(input.category)) {
    return res.status(400).json({
      message: `category must be one of: ${SKILL_CATEGORIES.join(", ")}`,
    });
  }

  if (!input.detail) {
    return res.status(400).json({ message: "detail is required" });
  }

  if (!input.tier) {
    return res.status(400).json({ message: "tier is required" });
  }

  if (!input.iconName) {
    return res.status(400).json({ message: "iconName is required" });
  }

  if (Number.isNaN(input.order) || input.order < 0) {
    return res.status(400).json({ message: "order must be a non-negative number" });
  }

  const created = await prisma.skill.create({ data: input });
  return res.status(201).json(created);
});

router.put("/:id", requireAdmin, async (req, res) => {
  const input = normalizeSkillInput(req.body);

  const existing = await prisma.skill.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: "Skill not found" });
  }

  if (!SKILL_CATEGORIES.includes(input.category)) {
    return res.status(400).json({
      message: `category must be one of: ${SKILL_CATEGORIES.join(", ")}`,
    });
  }

  if (!input.detail) {
    return res.status(400).json({ message: "detail is required" });
  }

  if (!input.tier) {
    return res.status(400).json({ message: "tier is required" });
  }

  if (!input.iconName) {
    return res.status(400).json({ message: "iconName is required" });
  }

  if (Number.isNaN(input.order) || input.order < 0) {
    return res.status(400).json({ message: "order must be a non-negative number" });
  }

  const updated = await prisma.skill.update({
    where: { id: req.params.id },
    data: input,
  });

  return res.json(updated);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const existing = await prisma.skill.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: "Skill not found" });
  }

  await prisma.skill.delete({ where: { id: req.params.id } });
  return res.status(204).send();
});

export default router;
