"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/signin");
            },
        },
    });
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    // { name: 'Users', href: '/admin/users', icon: Users }, // Future
    // { name: 'Settings', href: '/admin/settings', icon: Settings }, // Future
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 overflow-y-auto hidden md:flex flex-col">
      <div className="p-8 border-b border-gray-100">
           <Link href="/" className="text-2xl font-oswald font-bold text-black tracking-tighter uppercase">
              FemFair <span className="text-[#FF5722] text-xs align-top">Admin</span>
          </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                          isActive
                              ? "bg-[#FF5722]/10 text-[#FF5722]"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                  >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-[#FF5722]" : "text-gray-400")} />
                      {item.name}
                  </Link>
              );
          })}
      </nav>

      <div className="p-4 border-t border-gray-100">
           <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
           >
               <LogOut className="w-5 h-5" />
               Sign Out
           </button>
      </div>
    </aside>
  );
}
