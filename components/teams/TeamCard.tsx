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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group w-full max-w-[280px] mx-auto"
    >
      <div className="relative flex flex-col overflow-hidden rounded-[1.5rem] border-[3px] border-[#f97316] bg-white shadow-[0_10px_25px_rgba(249,115,22,0.08)] transition-all duration-500 hover:shadow-[0_15px_35px_rgba(249,115,22,0.15)] hover:-translate-y-1">
        {/* Image Section */}
        <div className="p-2 pb-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-gray-100">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-w-768px) 100vw, 300px"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 pb-5 text-center flex flex-col items-center justify-center min-h-[110px]">
           <h3 className="text-[#1a1a1a] font-mono text-lg md:text-xl font-bold tracking-tight mb-1.5 leading-tight"
               style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
             {member.name}
           </h3>
           <p className="text-[#f97316] font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] leading-tight max-w-[95%]"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
             {member.role}
           </p>
        </div>
      </div>
    </motion.div>
  );
}
