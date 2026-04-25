-- Alter Skill model for editorial dynamic blueprint support
ALTER TABLE "Skill"
ADD COLUMN "detail" TEXT NOT NULL DEFAULT 'Core Skill',
ADD COLUMN "tier" TEXT NOT NULL DEFAULT 'Primary Stack',
ADD COLUMN "iconName" TEXT NOT NULL DEFAULT 'FaReact',
ADD COLUMN "isLearning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY level DESC, name ASC) - 1 AS position
  FROM "Skill"
)
UPDATE "Skill" s
SET "order" = ranked.position
FROM ranked
WHERE s.id = ranked.id;

UPDATE "Skill"
SET
  "category" = CASE
    WHEN category = 'frontend' THEN 'Frontend Precision'
    WHEN category = 'backend' THEN 'Backend & DevOps'
    WHEN category = 'tools' THEN 'Tools & Systems'
    ELSE category
  END,
  "detail" = CASE
    WHEN name = 'React' THEN 'Architecture'
    WHEN name = 'Next.js' THEN 'SSR/ISR'
    WHEN name = 'TypeScript' THEN 'Strict Mode'
    WHEN name = 'Tailwind CSS' THEN 'Design Systems'
    WHEN name = 'Node.js' THEN 'Scalable APIs'
    WHEN name = 'Express' THEN 'REST Routing'
    WHEN name = 'MongoDB' THEN 'Schema Design'
    WHEN name = 'Prisma' THEN 'ORM'
    WHEN name = 'PostgreSQL' THEN 'Relational Data'
    WHEN name = 'Git' THEN 'Version Control'
    WHEN name = 'Docker' THEN 'Containers'
    WHEN name = 'Supabase' THEN 'Backend Platform'
    WHEN name = 'Vercel / DO' THEN 'Cloud Delivery'
    WHEN name = 'Rust' THEN 'Currently Mastering'
    ELSE 'Core Skill'
  END,
  "tier" = CASE
    WHEN category = 'frontend' THEN 'Primary Stack'
    WHEN category = 'backend' THEN 'Core Standard'
    WHEN category = 'tools' THEN 'Daily Driver'
    ELSE 'Primary Stack'
  END,
  "iconName" = CASE
    WHEN name = 'React' THEN 'FaReact'
    WHEN name = 'Next.js' THEN 'SiNextdotjs'
    WHEN name = 'TypeScript' THEN 'SiTypescript'
    WHEN name = 'Tailwind CSS' THEN 'SiTailwindcss'
    WHEN name = 'Node.js' THEN 'FaNodeJs'
    WHEN name = 'Express' THEN 'SiExpress'
    WHEN name = 'MongoDB' THEN 'SiMongodb'
    WHEN name = 'Prisma' THEN 'SiPrisma'
    WHEN name = 'PostgreSQL' THEN 'SiPostgresql'
    WHEN name = 'Git' THEN 'FaGitAlt'
    WHEN name = 'Docker' THEN 'FaDocker'
    WHEN name = 'Supabase' THEN 'SiSupabase'
    WHEN name = 'Vercel / DO' THEN 'SiVercel'
    WHEN name = 'Figma' THEN 'FaFigma'
    WHEN name = 'Rust' THEN 'SiRust'
    ELSE 'FaCode'
  END,
  "isLearning" = CASE
    WHEN name = 'Rust' THEN true
    ELSE false
  END;

ALTER TABLE "Skill"
DROP COLUMN "level",
DROP COLUMN "updatedAt";

ALTER TABLE "Skill"
ALTER COLUMN "detail" DROP DEFAULT,
ALTER COLUMN "tier" DROP DEFAULT,
ALTER COLUMN "iconName" DROP DEFAULT;

DROP INDEX IF EXISTS "Skill_category_idx";
CREATE INDEX "Skill_category_order_idx" ON "Skill"("category", "order");
