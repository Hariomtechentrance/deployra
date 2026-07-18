import type { IconType } from "react-icons";
import {
  LuHeartPulse,
  LuGraduationCap,
  LuLandmark,
  LuBuilding,
  LuFactory,
  LuShoppingCart,
  LuRocket,
} from "react-icons/lu";

export const INDUSTRIES: { Icon: IconType; label: string }[] = [
  { Icon: LuHeartPulse, label: "Healthcare" },
  { Icon: LuGraduationCap, label: "Education" },
  { Icon: LuLandmark, label: "Finance" },
  { Icon: LuBuilding, label: "Real Estate" },
  { Icon: LuFactory, label: "Manufacturing" },
  { Icon: LuShoppingCart, label: "Retail" },
  { Icon: LuRocket, label: "Startups" },
];
