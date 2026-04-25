import {
  FaBrain,
  FaCode,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaReact,
  FaShieldAlt,
} from "react-icons/fa";
import {
  SiExpress,
  SiFlutter,
  SiGo,
  SiMysql,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiStripe,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export const ICON_MAP = {
  FaBrain,
  FaCode,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaReact,
  FaShieldAlt,
  SiExpress,
  SiFlutter,
  SiGo,
  SiMysql,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiStripe,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
};

export const ICON_KEYS = Object.keys(ICON_MAP).sort((a, b) =>
  a.localeCompare(b)
);

export const resolveIconComponent = (iconName) => ICON_MAP[iconName] || FaCode;
