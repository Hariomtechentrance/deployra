"use client";

import { useEffect, useState } from "react";
import type { DeviceCapability } from "@/types/experience";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function computeCapability(): DeviceCapability {
  if (!detectWebGLSupport()) return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return "static";

  const nav = navigator as NavigatorWithMemory;
  const lowCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (lowCores || lowMemory || coarsePointer) return "reduced";
  return "full";
}

/**
 * Computed once on mount. Consumers should only branch on this after the
 * opaque loading screen has covered the viewport, so there's no visible
 * flash between the default and the detected value.
 */
export function useDeviceCapability(): DeviceCapability | null {
  const [capability, setCapability] = useState<DeviceCapability | null>(null);

  useEffect(() => {
    // Reads window/navigator, so it must run client-only after mount;
    // the resulting branch (3D vs. static hero) requires a re-render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapability(computeCapability());
  }, []);

  return capability;
}
