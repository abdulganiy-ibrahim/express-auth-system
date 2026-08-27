"use client"
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Package,
  Settings,
  LogOut 
} from "lucide-react";
import { useState } from 'react';
import { AuthLogoName } from '../brand';
import { useLogout } from '@/hooks/useLogout';

type menuButtonProps = {
  userId: string;
}

export default function MenuButton({ userId }: menuButtonProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, isLoading } = useLogout();

  type NavLink = {
    href: string,
    label: string,
    icon: React.ElementType
  }

  const links: NavLink[] = [
    { href: `/dashboard/${userId}`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/dashboard/${userId}/projects`, label: 'Projects', icon: Package },
    { href: `/dashboard/${userId}/settings`, label: 'Settings', icon: Settings },
  ]

  return (
    <div>
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className='text-primary'
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <aside 
            className={`fixed overflow-y-auto flex flex-col justify-between top-0 right-0 h-screen w-60 bg-background text-foreground p-4 z-50 transition-transform duration-300 ease-out lg:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`
          }>
            <section className='flex flex-col justify-between'>
              <div className="mb-6">
                <AuthLogoName />
              </div>

              <nav className="space-y-3">
      
                {links.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href

                  return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex flex-row items-center rounded-lg gap-4 p-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-primary/20 text-primary'
                            : 'text-foreground hover:bg-primary/20 hover:text-primary'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                  )
                })}
              </nav>
            </section>

            <section>
              <button
                onClick={logout}
                disabled={isLoading}
                className='flex items-center gap-2 p-2 rounded-md bg-red-400 text-white w-full cursor-pointer'
              >
                <LogOut size={18} />

                <span>
                  {isLoading ? 'Logging out' : 'Log Out'}
                </span>
              </button>
            </section>

          </aside>
        </>
      )}
    </div>
  )
}