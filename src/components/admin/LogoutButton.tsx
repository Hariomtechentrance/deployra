"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="border-glass-border bg-glass rounded-full border px-5 py-2 text-sm text-white/70 transition-colors hover:text-white"
    >
      Sign Out
    </button>
  );
}
