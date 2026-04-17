import { Router } from "express";
import { prisma } from "../lib/db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const normalizeSkillInput = (payload) => ({
  name: `${payload.name ?? ""}`.trim(),
  category: `${payload.category ?? "frontend"}`.trim().toLowerCase(),
  level: Number(payload.level ?? 50),
  color: `${payload.color ?? "#38BDF8"}`.trim(),
});

router.get("/", async (req, res) => {
  const where = req.query.category
    ? { category: `${req.query.category}`.toLowerCase() }
    : {};

  const skills = await prisma.skill.findMany({
    where,
    orderBy: [{ category: "asc" }, { level: "desc" }, { name: "asc" }],
  });

  return res.json(skills);
});

router.post("/", requireAdmin, async (req, res) => {
  const input = normalizeSkillInput(req.body);

  if (!input.name) {
    return res.status(400).json({ message: "name is required" });
  }

  if (!["frontend", "backend", "tools"].includes(input.category)) {
    return res.status(400).json({ message: "category must be frontend, backend, or tools" });
  }

  if (Number.isNaN(input.level) || input.level < 0 || input.level > 100) {
    return res.status(400).json({ message: "level must be between 0 and 100" });
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

  if (!["frontend", "backend", "tools"].includes(input.category)) {
    return res.status(400).json({ message: "category must be frontend, backend, or tools" });
  }

  if (Number.isNaN(input.level) || input.level < 0 || input.level > 100) {
    return res.status(400).json({ message: "level must be between 0 and 100" });
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
