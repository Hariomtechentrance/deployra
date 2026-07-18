import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";
import { LuDatabase, LuCloud, LuTerminal, LuCpu, LuGitBranch } from "react-icons/lu";

export const TECH_ICONS: { Icon: IconType; label: string }[] = [
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: LuDatabase, label: "Database" },
  { Icon: LuCloud, label: "Cloud" },
  { Icon: LuTerminal, label: "Terminal" },
  { Icon: LuCpu, label: "AI / Compute" },
  { Icon: LuGitBranch, label: "Git" },
];
