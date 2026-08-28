"use client";

import DesktopSidebar from "./DesktopNavbar";
import { useLogout } from "@/hooks/useLogout";

interface PrivateSidebarProps {
  userId: string;
}

export default function PrivateSidebar({ userId }: PrivateSidebarProps) {
  const { logout, isLoading } = useLogout();

  return (
    <DesktopSidebar userId={userId} onLogout={logout} isLoggingOut={isLoading} />
  );
}