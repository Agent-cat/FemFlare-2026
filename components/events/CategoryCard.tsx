"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EventItem } from './EventCard';

export interface Category {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  slug?: string;
  events?: EventItem[];
  subCategories?: Category[];
}

const PASTEL_PALETTE = [
  'bg-[#FFE5D9]', // Peach
  'bg-[#F3E5F5]', // Lavender
  'bg-[#E1F5FE]', // Light Blue
  'bg-[#F0F4C3]', // Lime Mist
  'bg-[#F8BBD0]', // Pink
  'bg-[#E0F2F1]', // Teal Mist
];

const CARD_SHAPES = [
  'rounded-t-[3rem] rounded-b-2xl', // Arch Top
  'rounded-b-[3rem] rounded-t-2xl', // Arch Bottom
  'rounded-[2rem]',                 // Super Rounded
];

// Helper to count events recursively
const countEvents = (category: Category): number => {
    let count = category.events?.length || 0;
    if (category.subCategories) {
        category.subCategories.forEach(sub => {
            count += countEvents(sub);
        });
    }
    return count;
};

export const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const colorClass = PASTEL_PALETTE[index % PASTEL_PALETTE.length];
  const shapeClass = CARD_SHAPES[index % CARD_SHAPES.length];
  const eventCount = countEvents(category);

  return (
    <Link href={`/events/${category.id}`} className="block h-full">
        <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: index * 0.05, duration: 0.5, type: "spring" }}
        className="group relative flex flex-col h-full cursor-pointer"
        >
        <div className={cn(
            "relative flex flex-col h-full overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2 border border-white/50",
            colorClass,
            shapeClass
        )}>
            {/* Decorative Top Area / Image */}
            <div className="h-40 w-full relative overflow-hidden flex items-center justify-center">
                {category.image ? (
                     <div className="w-full h-full relative">
                        <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity", colorClass)} />
                     </div>
                ) : (
                    <>
                        {/* Abstract Shapes */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150" />
                        <div className="absolute -left-4 bottom-0 w-24 h-24 bg-white/30 rounded-full blur-xl" />
                    </>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs py-1 px-3 rounded-full shadow-xs text-xs font-bold uppercase tracking-wider text-gray-800 z-10">
                    {eventCount} Events
                </div>
            </div>

            {/* Content */}
            <div className="p-8 pt-4 flex flex-col flex-1 relative z-10 text-center">
                <h3 className="font-serif text-3xl md:text-4xl text-gray-900 leading-none mb-4">
                    {category.title}
                </h3>

                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                    {category.description || "Browse our exclusive collection."}
                </p>

                <div className="mt-auto pt-4 border-t border-black/5 w-full flex justify-center">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-800 group-hover:underline underline-offset-4 decoration-1">
                        Explore Collection <ArrowUpRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </div>
        </motion.div>
    </Link>
  );
};

