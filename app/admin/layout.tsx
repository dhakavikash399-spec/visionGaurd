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
    <div className="min-h-screen bg-[#0a0e17] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1e293b] bg-[#0a0e17] hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center">
              <span className="text-sm font-bold text-[#0a0e17]">V</span>
            </div>
            <span className="text-lg font-bold text-white">VisionGuard</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                  : "text-[#64748b] hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e293b]">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center text-xs font-bold text-[#0a0e17]">
              {session?.user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{session?.user?.name}</p>
              <p className="text-[10px] text-[#475569] truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <header className="h-16 border-b border-[#1e293b] flex items-center justify-between px-8 bg-[#0a0e17]/50 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-lg font-bold text-white flex items-center gap-3">
            Admin <span className="text-[#475569]">/</span> {sidebarLinks.find(l => l.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="btn-secondary text-xs px-4 py-1.5">
              View Website ↗
            </Link>
          </div>
        </header>

        <div className="p-8 pb-16">{children}</div>
      </main>
    </div>
  );
}
