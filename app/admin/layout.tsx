"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Redirect is handled by middleware but we show loading for safety
  if (status === "loading" && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="animate-pulse-glow w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#10b981]" />
      </div>
    );
  }

  // Login page has no sidebar
  if (pathname === "/admin/login") return <>{children}</>;

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Manage Blogs", href: "/admin/blogs", icon: "📝" },
    { name: "Manage Products", href: "/admin/products", icon: "📦" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {children}
    </div>
  );
}
