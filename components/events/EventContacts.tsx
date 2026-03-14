"use client";

import React from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';

export default function EventContacts() {
  return (
    <div className="absolute top-0 md:top-4 right-4 md:right-8 z-20 group">
      <div className="relative">
        {/* Pulsing Aura */}
        <div className="absolute inset-0 rounded-full bg-[#FF5722]/40 animate-ping group-hover:animate-none opacity-0 group-hover:opacity-100 transition-opacity" />

        <Link
          href="/events/contacts"
          className="relative flex items-center gap-3 p-3 md:px-6 md:py-3 bg-[#1a1a1a] text-white rounded-full font-bold font-oswald uppercase tracking-widest hover:bg-[#FF5722] transition-all shadow-2xl hover:shadow-[#FF5722]/30 hover:-translate-x-1 group"
        >
          {/* Beep/Pulse Indicator */}
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF5722]"></span>
          </div>

          <Users className="w-5 h-5 text-[#FF5722] group-hover:text-white transition-colors" />
          <span className="hidden md:block">Event Help Desk</span>
        </Link>
      </div>
    </div>
  );
}
