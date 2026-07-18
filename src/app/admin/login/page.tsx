"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Incorrect password.");
        setSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-bg flex min-h-svh items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="border-glass-border bg-glass w-full max-w-sm rounded-2xl border p-8 backdrop-blur-md"
      >
        <p className="text-eyebrow text-primary font-mono font-medium tracking-[0.3em] uppercase">
          Admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Sign in</h1>

        <input
          type="password"
          required
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border-glass-border bg-bg mt-6 w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 mt-5 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
