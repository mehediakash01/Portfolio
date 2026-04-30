import { prisma } from '../src/lib/db.js';

const projects = [
  {
    slug: "skill-bridge",
    title: "SkillBridge",
    image: "https://i.ibb.co.com/39vQfD5L/Screenshot-2026-03-12-144007.png",
    summary: "Premium tutoring marketplace.",
    description: "A premium tutoring marketplace built for trust and speed where students book expert tutors, tutors run sessions efficiently, and admins manage platform-wide growth from one elegant dashboard.",
    features: [
      "Role-based experience for STUDENT, TUTOR, and ADMIN with protected routes",
      "High-conversion booking flow with tutor discovery, availability, and session actions",
      "Admin command center with analytics, booking oversight, and user moderation",
      "Modern responsive interface with theme switching and polished motion",
      "Cloudinary media upload, instant feedback toasts, and skeleton loading states"
    ],
    tech: ["nextjs", "typescript", "tailwind", "ReactHookForm", "tanStackReactQuery", "framer", "recharts", "express", "mongodb", "node"],
    liveUrl: "https://skill-bridge-client-sage.vercel.app/",
    githubUrl: "https://github.com/mehediakash01/skillBridge-client",
    glowColor: "from-emerald-500 to-cyan-500",
    role: "Full Stack Developer",
    duration: "4 weeks",
    challenges: "Building a complex scheduling system with timezone management across different user roles. Handling concurrent session bookings was a critical performance bottleneck.",
    improvements: "Implement real-time WebRTC video classrooms within the app, add AI-based tutor recommendations, and introduce grouped tutoring sessions.",
  },
  {
    slug: "sleep-sync",
    title: "SleepSync",
    image: "https://i.ibb.co.com/RTKkx7JZ/Screenshot-2025-11-28-234132.png",
    summary: "Full Stack Sleep Tracking & AI Coaching App.",
    description: "Full Stack Sleep Tracking & AI Coaching App that helps users log sleep, visualize patterns, and receive personalized AI-driven suggestions for better wellness — built for real-time insights and interactive user engagement.",
    features: [
      "Users can log daily sleep data",
      "AI-powered instant sleep summaries",
      "Real-time dashboard with dynamic charts showing sleep quality and patterns",
      "Blog reading with comments and likes",
      "AI chat for personalized sleep improvement advice"
    ],
    tech: ["nextjs", "typescript", "prisma", "sql", "tailwind", "gemini-ai", "framer-motion", "recharts", "next-auth"],
    liveUrl: "https://sleep-sync-git-main-akashs-projects-b1d54e9d.vercel.app/",
    githubUrl: "https://github.com/mehediakash01/Sleep_Sync",
    glowColor: "from-purple-500 to-pink-500",
    role: "Full Stack Developer",
    duration: "3 weeks",
    challenges: "Integrating real-time charts while ensuring the database reads didn't slow down the UX. Managing AI-token consumption efficiently during chat responses was another complex aspect.",
    improvements: "Support multi-device synchronization (e.g., Apple Health, Google Fit), implement deeper AI coaching algorithms, and offline-first PWA mode."
  },
  {
    slug: "life-sure",
    title: "LifeSure",
    image: "https://i.ibb.co.com/1tC78Bw2/Screenshot-2025-09-29-003549.png",
    summary: "Life Insurance Management Platform.",
    description: "LifeSure is a full-featured Life Insurance Management Platform designed to streamline the entire process — from policy browsing to application, payment, and management. Built with modern technologies and designed for scalability and excellent user experience.",
    features: [
      "Role-Based Authentication",
      "Policy Management System",
      "Multi-Step Application Form with Personal, Nominee, and Health sections",
      "Stripe Payment Integration with secure checkout and payment tracking",
      "PDF Policy Download for approved policies"
    ],
    tech: ["react", "tailwind", "ReactHookForm", "tanStackReactQuery", "Stripe", "jsPDF", "Jwt", "Axios", "MongoDB", "ExpressJs", "NodeJs"],
    liveUrl: "http://life-sure.surge.sh/",
    githubUrl: "https://github.com/mehediakash01/Life-Sure-Client",
    glowColor: "from-blue-500 to-cyan-500",
    role: "Full Stack Developer",
    duration: "3 weeks",
    challenges: "Handling secure, multi-stage transaction rollbacks if Stripe payment failed or connection dropped mid-process. Also efficiently building dynamic PDFs on the client-side.",
    improvements: "Support for multi-currency, automated renewal subscriptions, and broker-portal for agents to manage clients on their behalf."
  }
];

async function main() {
  console.log('Seeding projects...');
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log('Projects seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });