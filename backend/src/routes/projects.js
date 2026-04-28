import { Router } from "express";
import { prisma } from "../lib/db.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const parseStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const slugify = (input) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeProjectInput = (payload) => {
  const title = `${payload.title ?? ""}`.trim();

  return {
    slug: slugify(payload.slug || title),
    title,
    summary: `${payload.summary ?? ""}`.trim(),
    description: `${payload.description ?? payload.summary ?? ""}`.trim(),
    image: `${payload.image ?? ""}`.trim(),
    videoPreview: `${payload.videoPreview ?? ""}`.trim() || null,
    liveUrl: `${payload.liveUrl ?? ""}`.trim(),
    githubUrl: `${payload.githubUrl ?? ""}`.trim(),
    role: `${payload.role ?? ""}`.trim() || null,
    duration: `${payload.duration ?? ""}`.trim() || null,
    glowColor: `${payload.glowColor ?? "from-cyan-500 to-blue-500"}`.trim(),
    featured: Boolean(payload.featured),
    status: payload.status === "draft" ? "draft" : "published",
    tech: parseStringArray(payload.tech),
    features: parseStringArray(payload.features),
  };
};

const toProjectResponse = (project) => ({
  ...project,
  tech: Array.isArray(project.tech) ? project.tech : [],
  features: Array.isArray(project.features) ? project.features : [],
  liveLink: project.liveUrl,
  githubLink: project.githubUrl,
  detailsLink: `/project/${project.slug}`,
});

const requireAdminForAdminScope = (request, response, next) => {
  if (`${request.query.scope ?? ""}` !== "admin") {
    return next();
  }

  return requireAdmin(request, response, next);
};

router.get("/", requireAdminForAdminScope, async (req, res) => {
  const scope = req.query.scope;
  const projects = await prisma.project.findMany({
    where: scope === "admin" ? {} : { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  res.json(projects.map(toProjectResponse));
});

router.get("/:slug", requireAdminForAdminScope, async (req, res) => {
  const scope = req.query.scope;

  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
  });

  if (!project || (scope !== "admin" && project.status !== "published")) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.json(toProjectResponse(project));
});

router.post("/", requireAdmin, async (req, res) => {
  const input = normalizeProjectInput(req.body);

  if (!input.title || !input.slug) {
    return res.status(400).json({ message: "title is required" });
  }

  const existing = await prisma.project.findUnique({ where: { slug: input.slug } });
  if (existing) {
    return res.status(409).json({ message: "Project slug already exists" });
  }

  const created = await prisma.project.create({ data: input });
  return res.status(201).json(toProjectResponse(created));
});

router.put("/:id", requireAdmin, async (req, res) => {
  const input = normalizeProjectInput(req.body);

  const existing = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: "Project not found" });
  }

  const slugConflict = await prisma.project.findFirst({
    where: {
      slug: input.slug,
      id: { not: req.params.id },
    },
  });

  if (slugConflict) {
    return res.status(409).json({ message: "Project slug already exists" });
  }

  const updated = await prisma.project.update({
    where: { id: req.params.id },
    data: input,
  });

  return res.json(toProjectResponse(updated));
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const existing = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: "Project not found" });
  }

  await prisma.project.delete({ where: { id: req.params.id } });
  return res.status(204).send();
});

export default router;
