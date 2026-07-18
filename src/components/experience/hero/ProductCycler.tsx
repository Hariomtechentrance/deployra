"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRODUCTS } from "@/lib/constants/products";

export function ProductCycler({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % PRODUCTS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="border-glass-border bg-glass flex h-11 w-52 items-center justify-center overflow-hidden rounded-full border backdrop-blur-md">
      <AnimatePresence mode="wait">
        <motion.span
          key={PRODUCTS[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-accent text-sm font-medium tracking-wide"
        >
          {PRODUCTS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
