"use client";

import { LuStar } from "react-icons/lu";
import { cn } from "@/lib/utils/cn";

/** Read-only star display, e.g. on a testimonial card. */
export function StarRating({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <LuStar
          key={i}
          size={size}
          className={i <= rating ? "fill-primary text-primary" : "text-white/20"}
        />
      ))}
    </div>
  );
}

/** Interactive star picker for the feedback form. */
export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onClick={() => onChange(i)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <LuStar
            size={22}
            className={cn(
              i <= value ? "fill-primary text-primary" : "text-white/25",
            )}
          />
        </button>
      ))}
    </div>
  );
}
