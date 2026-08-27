"use client";

import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import type { Testimonial } from "@/lib/submissions";
import { StarRating } from "@/components/testimonials/StarRating";

export function AdminTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [items, setItems] = useState(testimonials);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this testimonial from the live site?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete.");
        return;
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <p className="border-glass-border bg-glass rounded-xl border px-4 py-6 text-center text-sm text-white/50">
        No testimonials yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-white/40">
        These go live on the homepage instantly on submission — remove
        anything spammy or inappropriate here.
      </p>
      {items.map((item) => (
        <div
          key={item.id}
          className="border-glass-border bg-glass rounded-2xl border p-6 backdrop-blur-md"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-base font-semibold text-white">
                {item.name}
                {item.role && (
                  <span className="ml-2 font-normal text-white/50">
                    — {item.role}
                  </span>
                )}
              </p>
              <div className="mt-1">
                <StarRating rating={item.rating} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-xs text-white/40">
                {new Date(item.created_at).toLocaleString()}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                aria-label="Delete testimonial"
                className="text-white/40 transition-colors hover:text-red-400 disabled:opacity-40"
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          </div>
          {item.email && (
            <a
              href={`mailto:${item.email}`}
              className="text-accent mt-1 inline-block text-sm hover:text-white"
            >
              {item.email}
            </a>
          )}
          <p className="mt-3 text-sm whitespace-pre-wrap text-white/75">
            {item.quote}
          </p>
        </div>
      ))}
    </div>
  );
}
