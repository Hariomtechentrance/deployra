"use client";

import { useEffect, useState } from "react";

/**
 * Resolves once web fonts have loaded, so the hero never paints with a
 * fallback font swap after the loading screen has already faded out.
 */
export function useAssetReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
