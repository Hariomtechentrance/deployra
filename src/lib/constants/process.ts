import type { IconType } from "react-icons";
import {
  LuSearch,
  LuClipboardList,
  LuPenTool,
  LuCode,
  LuTestTube,
  LuRocket,
  LuHeadset,
} from "react-icons/lu";

export const PROCESS_STEPS: { Icon: IconType; title: string; description: string }[] = [
  { Icon: LuSearch, title: "Discover", description: "Understand your goals, users, and constraints." },
  { Icon: LuClipboardList, title: "Research", description: "Map the technical and business landscape." },
  { Icon: LuPenTool, title: "Design", description: "Design the product experience and system architecture." },
  { Icon: LuCode, title: "Development", description: "Build in focused, shippable increments." },
  { Icon: LuTestTube, title: "Testing", description: "Verify correctness, performance, and edge cases." },
  { Icon: LuRocket, title: "Deployment", description: "Ship to production with confidence." },
  { Icon: LuHeadset, title: "Support", description: "Monitor, maintain, and iterate after launch." },
];
