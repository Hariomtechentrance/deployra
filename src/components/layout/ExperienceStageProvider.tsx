"use client";

import { useState } from "react";
import type { ExperienceStage } from "@/types/experience";
import { ExperienceStageContext } from "@/hooks/useExperienceStage";

export function ExperienceStageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<ExperienceStage>("hero");

  return (
    <ExperienceStageContext.Provider value={{ stage, setStage }}>
      {children}
    </ExperienceStageContext.Provider>
  );
}
