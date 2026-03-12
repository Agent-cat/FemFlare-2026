"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Settings, LogOut, Menu, X, BedDouble } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                setIsOpen(false);
                router.push("/signin");
            },
        },
    });
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Accommodation', href: '/admin/accommodation', icon: BedDouble },
    { name: 'Volunteers', href: '/admin/events-data', icon: Users },
    // { name: 'Users', href: '/admin/users', icon: Users }, // Future
    // { name: 'Settings', href: '/admin/settings', icon: Settings }, // Future
  ];

  // Render the sidebar content (reused for both desktop and mobile)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[#EBE5DB] border-r border-[#DCCEB8]">
      <div className="p-8 border-b border-[#DCCEB8]">
           <Link href="/" className="text-2xl font-oswald font-bold text-black tracking-tighter uppercase" onClick={() => setIsOpen(false)}>
              FemFlare <span className="text-[#FF5722] text-xs align-top">Admin</span>
          </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                  <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors font-oswald uppercase tracking-wide",
                          isActive
                              ? "bg-[#FF5722] text-white shadow-md"
                              : "text-gray-700 hover:bg-[#DCCEB8]/30 hover:text-black"
                      )}
                  >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500")} />
                      {item.name}
                  </Link>
              );
          })}
      </nav>

      <div className="p-4 border-t border-[#DCCEB8]">
           <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-100/50 transition-colors uppercase font-oswald tracking-wide"
           >
               <LogOut className="w-5 h-5" />
               Sign Out
           </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header - Visible only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#EBE5DB] border-b border-[#DCCEB8] z-50 px-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-xl font-oswald font-bold text-black tracking-tighter uppercase">
            FemFlare <span className="text-[#FF5722] text-xs align-top">Admin</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 hover:bg-[#DCCEB8]/50 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar - Always visible on desktop */}
      <aside className="hidden md:block fixed inset-y-0 left-0 w-64 z-40 bg-[#EBE5DB] border-r border-[#DCCEB8]">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 h-full z-50 md:hidden shadow-xl overflow-hidden"
            >
              {renderSidebarContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
