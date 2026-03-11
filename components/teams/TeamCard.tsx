"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamCard({ member, index }: { member: TeamMember, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#EBE5DB] border border-black/5 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Content Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500">
           <div className="h-1 w-12 bg-[#FF5722] mb-4 transform origin-left transition-transform duration-500 group-hover:scale-x-150" />
           <h3 className="text-white font-oswald text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight mb-2">
             {member.name}
           </h3>
           <p className="text-white/70 text-sm font-medium uppercase tracking-[0.1em] font-sans leading-relaxed">
             {member.role}
           </p>
        </div>
      </div>

      {/* Decorative Border that appears on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#FF5722] opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />
    </motion.div>
  );
}
