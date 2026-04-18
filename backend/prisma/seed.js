import "dotenv/config";
import process from "node:process";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = [
    {
      slug: "skill-bridge",
      title: "SkillBridge",
      summary:
        "A premium tutoring marketplace with role-based dashboards and booking flows.",
      description:
        "A premium tutoring marketplace built for trust and speed where students book expert tutors, tutors run sessions efficiently, and admins manage platform-wide growth from one elegant dashboard.",
      image: "https://i.ibb.co.com/39vQfD5L/Screenshot-2026-03-12-144007.png",
      liveUrl: "https://skill-bridge-client-sage.vercel.app/",
      githubUrl: "https://github.com/mehediakash01/skillBridge-client",
      glowColor: "from-emerald-500 to-cyan-500",
      featured: true,
      status: "published",
      tech: [
        "nextjs",
        "typescript",
        "tailwind",
        "ReactHookForm",
        "tanStackReactQuery",
        "framer",
        "recharts",
        "express",
        "postgres",
        "node",
      ],
      features: [
        "Role-based experience for STUDENT, TUTOR, and ADMIN with protected routes",
        "High-conversion booking flow with tutor discovery, availability, and session actions",
        "Admin command center with analytics, booking oversight, and user moderation",
      ],
    },
    {
      slug: "sleep-sync",
      title: "SleepSync",
      summary:
        "Sleep tracking and AI coaching app with dynamic charts and personalized summaries.",
      description:
        "Full Stack Sleep Tracking and AI Coaching App that helps users log sleep, visualize patterns, and receive personalized AI-driven suggestions for better wellness.",
      image: "https://i.ibb.co.com/RTKkx7JZ/Screenshot-2025-11-28-234132.png",
      liveUrl: "https://sleep-sync-git-main-akashs-projects-b1d54e9d.vercel.app/",
      githubUrl: "https://github.com/mehediakash01/Sleep_Sync",
      glowColor: "from-purple-500 to-pink-500",
      featured: true,
      status: "published",
      tech: [
        "nextjs",
        "typescript",
        "prisma",
        "postgres",
        "tailwind",
        "recharts",
        "next-auth",
      ],
      features: [
        "Users can log daily sleep data",
        "AI-powered instant sleep summaries",
        "Real-time dashboard with dynamic charts",
      ],
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: project,
      update: project,
    });
  }

  const skills = [
    { name: "React", category: "frontend", level: 90, color: "#61DAFB" },
    { name: "Next.js", category: "frontend", level: 82, color: "#FFFFFF" },
    { name: "TypeScript", category: "frontend", level: 78, color: "#3178C6" },
    { name: "Node.js", category: "backend", level: 80, color: "#3C873A" },
    { name: "Express", category: "backend", level: 82, color: "#FFFFFF" },
    { name: "PostgreSQL", category: "backend", level: 75, color: "#336791" },
    { name: "Git", category: "tools", level: 88, color: "#F05032" },
    { name: "Figma", category: "tools", level: 70, color: "#A259FF" },
  ];

  for (const skill of skills) {
    const existing = await prisma.skill.findFirst({
      where: { name: skill.name, category: skill.category },
    });

    if (existing) {
      await prisma.skill.update({
        where: { id: existing.id },
        data: skill,
      });
      continue;
    }

    await prisma.skill.create({ data: skill });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
