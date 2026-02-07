"use client";

import React from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// import { EventItem } from './EventsTree'; // We'll need to move types or import circular. Better to move types to separate file or keeping basic import.

// To avoid circular dependency, let's redefine or import types from a shared location?
// For now, I'll copy the type definition or assume it's imported.
// Let's create a shared types file first is cleaner, but to stick to plan I'll just accept EventItem prop.


import Image from 'next/image';

export interface EventItem {
  id: string;
  title: string;
  startDate: Date | string; // Handle both for safety
  endDate?: Date | string | null;
  description?: string | null;
  location?: string | null;
  image?: string | null;
  slug: string;
  type?: string;
  categoryId: string;
}

const PASTEL_PALETTE = [
  'bg-[#FFE5D9]', // Peach
  'bg-[#F3E5F5]', // Lavender
  'bg-[#E1F5FE]', // Light Blue
  'bg-[#F0F4C3]', // Lime Mist
  'bg-[#F8BBD0]', // Pink
  'bg-[#E0F2F1]', // Teal Mist
];

import RegisterButton from './RegisterButton';

export const EventCard = ({ event, index, isRegistered = false }: { event: EventItem; index: number; isRegistered?: boolean }) => {
  const colorClass = PASTEL_PALETTE[(index + 3) % PASTEL_PALETTE.length];

  const formatDate = (date: Date | string) => {
      return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative flex flex-col h-full"
    >
      <div className={cn(
          "relative flex flex-col h-full overflow-hidden rounded-4xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
          colorClass
      )}>
        {/* Image Section */}
        {event.image && (
            <div className="h-48 w-full relative overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
        )}

        <div className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> {formatDate(event.startDate)}
                    </span>
                </div>
                {/* Registration Status Badge if registered */}
                {isRegistered && (
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" /> Registered
                    </div>
                )}
            </div>

            <div className="mt-auto">
                {event.location && (
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">
                        <MapPin className="w-3.5 h-3.5" /> {event.location}
                    </div>
                )}

                <h3 className="font-serif text-2xl text-gray-900 leading-tight mb-3">
                    {event.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                   {event.description}
                </p>

                <div className="space-y-3">

                    <RegisterButton eventId={event.id} initialIsRegistered={isRegistered} />
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};
