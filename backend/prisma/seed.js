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
      videoPreview: null,
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
      videoPreview: null,
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
    {
      name: "React",
      category: "Frontend Precision",
      detail: "Architecture",
      tier: "Primary Stack",
      iconName: "FaReact",
      color: "#61dafb",
      isLearning: false,
      order: 0,
    },
    {
      name: "Next.js",
      category: "Frontend Precision",
      detail: "SSR/ISR",
      tier: "Primary Stack",
      iconName: "SiNextdotjs",
      color: "#ffffff",
      isLearning: false,
      order: 1,
    },
    {
      name: "TypeScript",
      category: "Frontend Precision",
      detail: "Strict Mode",
      tier: "Core Standard",
      iconName: "SiTypescript",
      color: "#3178c6",
      isLearning: false,
      order: 2,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend Precision",
      detail: "Design Systems",
      tier: "UI Foundation",
      iconName: "SiTailwindcss",
      color: "#38bdf8",
      isLearning: false,
      order: 3,
    },
    {
      name: "shadcn/ui",
      category: "Frontend Precision",
      detail: "Reusable Components",
      tier: "UI Foundation",
      iconName: "SiShadcnui",
      color: "#ffffff",
      isLearning: false,
      order: 4,
    },
    {
      name: "React Native",
      category: "Frontend Precision",
      detail: "Mobile Interfaces",
      tier: "Core Standard",
      iconName: "SiReact",
      color: "#61dafb",
      isLearning: false,
      order: 5,
    },
    {
      name: "Flutter",
      category: "Frontend Precision",
      detail: "Cross-Platform UI",
      tier: "Core Standard",
      iconName: "SiFlutter",
      color: "#47c5fb",
      isLearning: false,
      order: 6,
    },
    {
      name: "Node.js",
      category: "Backend & DevOps",
      detail: "Scalable APIs",
      tier: "Runtime",
      iconName: "FaNodeJs",
      color: "#68a063",
      isLearning: false,
      order: 0,
    },
    {
      name: "Express",
      category: "Backend & DevOps",
      detail: "REST Routing",
      tier: "API Layer",
      iconName: "SiExpress",
      color: "#f4f4f5",
      isLearning: false,
      order: 1,
    },
    {
      name: "Prisma",
      category: "Backend & DevOps",
      detail: "ORM",
      tier: "Data Access",
      iconName: "SiPrisma",
      color: "#60a5fa",
      isLearning: false,
      order: 2,
    },
    {
      name: "PostgreSQL",
      category: "Backend & DevOps",
      detail: "Relational Data",
      tier: "Data Layer",
      iconName: "SiPostgresql",
      color: "#336791",
      isLearning: false,
      order: 3,
    },
    {
      name: "Stripe",
      category: "Backend & DevOps",
      detail: "Payment Flows",
      tier: "API Layer",
      iconName: "SiStripe",
      color: "#635bff",
      isLearning: false,
      order: 4,
    },
    {
      name: "AI Integration",
      category: "Backend & DevOps",
      detail: "LLM Workflows",
      tier: "Core Standard",
      iconName: "FaBrain",
      color: "#a78bfa",
      isLearning: false,
      order: 5,
    },
    {
      name: "MySQL",
      category: "Backend & DevOps",
      detail: "Relational Data",
      tier: "Data Layer",
      iconName: "SiMysql",
      color: "#00758f",
      isLearning: false,
      order: 6,
    },
    {
      name: "Better Auth",
      category: "Backend & DevOps",
      detail: "Identity & Sessions",
      tier: "API Layer",
      iconName: "FaShieldAlt",
      color: "#22d3ee",
      isLearning: false,
      order: 7,
    },
    {
      name: "Firebase",
      category: "Backend & DevOps",
      detail: "Realtime Platform",
      tier: "Rapid Systems",
      iconName: "SiFirebase",
      color: "#ffca28",
      isLearning: false,
      order: 8,
    },
    {
      name: "Go",
      category: "Backend & DevOps",
      detail: "Concurrency Patterns",
      tier: "Active Learning",
      iconName: "SiGo",
      color: "#00add8",
      isLearning: true,
      order: 9,
    },
    {
      name: "Git",
      category: "Tools & Systems",
      detail: "Version Control",
      tier: "Daily Driver",
      iconName: "FaGitAlt",
      color: "#f05032",
      isLearning: false,
      order: 0,
    },
    {
      name: "Docker",
      category: "Tools & Systems",
      detail: "Containers",
      tier: "Deployment Ops",
      iconName: "FaDocker",
      color: "#2496ed",
      isLearning: false,
      order: 1,
    },
    {
      name: "Supabase",
      category: "Tools & Systems",
      detail: "Backend Platform",
      tier: "Rapid Systems",
      iconName: "SiSupabase",
      color: "#3ecf8e",
      isLearning: false,
      order: 2,
    },
    {
      name: "Vercel / DO",
      category: "Tools & Systems",
      detail: "Cloud Delivery",
      tier: "Production Hosting",
      iconName: "SiVercel",
      color: "#ffffff",
      isLearning: false,
      order: 3,
    },
    {
      name: "Rust",
      category: "Tools & Systems",
      detail: "Currently Mastering",
      tier: "Active Learning",
      iconName: "SiRust",
      color: "#f59e0b",
      isLearning: true,
      order: 4,
    },
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
    await pool.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
