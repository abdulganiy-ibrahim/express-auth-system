"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Package,
  Settings,
} from "lucide-react";
import { AuthLogoName } from "../brand";

interface DesktopSidebarProps {
  userId: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
}

type NavLink = {
  href: string;
  label: string;
  icon: ElementType;
};

function isLinkActive(
  href: string,
  pathname: string | null,
  isRoot: boolean
): boolean {
  if (!pathname) return false;
  if (pathname === href) return true;
  if (isRoot) return false;
  return pathname.startsWith(`${href}/`);
}

export default function DesktopSidebar({ userId, onLogout, isLoggingOut }: DesktopSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links: NavLink[] = [
    { href: `/dashboard/${userId}`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/dashboard/${userId}/projects`, label: "Projects", icon: Package },
    { href: `/dashboard/${userId}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border/20 bg-background-card transition-[width] duration-200 lg:flex ${
        collapsed ? "w-20" : "w-66"
      }`}
    >
      {collapsed ? (
        <div className="flex flex-col items-center gap-2 border-b border-border/20 px-2 py-4">
          <AuthLogoName collapsed />
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/5 hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-border/20 px-4 py-4">
          <AuthLogoName />
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/5 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isRoot = index === 0;
          const isActive = isLinkActive(link.href, pathname, isRoot);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-foreground hover:bg-primary/20 hover:text-primary"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="font-medium">{link.label}</span>}

              {collapsed && (
                <span className="pointer-events-none absolute left-full z-50 ml-2 scale-95 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border/20 p-3">
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          aria-label="Logout"
          className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" strokeWidth={2} />
          {!collapsed && (isLoggingOut ? "Logging out…" : "Logout")}

          {collapsed && (
            <span className="pointer-events-none absolute left-full z-50 ml-2 scale-95 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}