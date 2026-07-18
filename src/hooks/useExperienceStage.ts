"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { ExperienceStage } from "@/types/experience";

type ExperienceStageContextValue = {
  stage: ExperienceStage;
  setStage: Dispatch<SetStateAction<ExperienceStage>>;
};

// Defaults to "hero" (fully settled/visible) — pages with no cinematic
// intro (e.g. /services, /contact) never touch setStage, so they just read
// this default. Only the homepage's ExperienceGate calls setStage, syncing
// its own loading -> intro -> hero progression into this shared value so
// the globally-mounted Navbar knows when to fade in.
export const ExperienceStageContext = createContext<ExperienceStageContextValue>({
  stage: "hero",
  setStage: () => {},
});

export function useExperienceStage() {
  return useContext(ExperienceStageContext).stage;
}

export function useSetExperienceStage() {
  return useContext(ExperienceStageContext).setStage;
}
