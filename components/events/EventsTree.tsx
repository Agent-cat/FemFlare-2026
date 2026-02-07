"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import RegisterButton from './RegisterButton';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface EventItem {
  id: string;
  title: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  description?: string | null;
  location?: string | null;
  image?: string | null;
  slug: string;
  categoryId: string;
  termsAndConditions?: string | null;
}

export interface Category {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  events?: EventItem[];
}

const ORANGE_ACCENT = '#FF5722';

interface EventsTreeProps {
  data: Category[];
  registeredEventIds?: string[];
}

export const EventsTree: React.FC<EventsTreeProps> = ({ data, registeredEventIds = [] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-10">
      {data.map((category) => (
        <div key={category.id} className="mb-12 last:mb-0">
          {/* Category Header */}
          <div className="relative mb-6">
            <h2 className="text-2xl md:text-3xl font-oswald font-black uppercase tracking-tighter text-[#1a1a1a] mb-2">
                {category.title}
            </h2>
            <div
                className="h-1 w-20 bg-[#FF5722]"
            ></div>
          </div>

          <div
            className="relative pl-8 md:pl-16 border-l border-[#FF5722]/20 space-y-6"
          >            {category.events && category.events.length > 0 ? (
                category.events.map((event, eventIndex) => (
                <div key={event.id} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[32.5px] md:-left-[64.5px] top-5">
                        <div
                            className="w-2.5 h-2.5 rounded-full relative z-10 bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.4)]"
                        >
                            <div
                                className="absolute w-2.5 h-2.5 rounded-full animate-ping opacity-40 bg-[#FF5722]"
                            ></div>
                        </div>
                    </div>

                    {/* Event Card */}
                    <motion.div
                        layout
                        initial={false}
                        className={cn(
                            "transition-all duration-500 rounded-3xl overflow-hidden cursor-pointer backdrop-blur-md border",
                            expandedId === event.id
                                ? "shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-[#FF5722]/30 bg-black/5"
                                : "shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-[#FF5722]/20 bg-[#FF5722]/05 hover:bg-[#FF5722]/08 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-[#FF5722]/40"
                        )}
                        onClick={() => toggleExpand(event.id)}
                    >
                        {/* Summary Header */}
                        <div className="p-4 md:p-5 flex justify-between items-center group">
                            <div className="flex-1">
                                <h3
                                    className={cn(
                                        "text-lg md:text-xl font-oswald font-bold transition-colors uppercase tracking-tight",
                                        expandedId === event.id ? "text-[#FF5722]" : "text-gray-900"
                                    )}
                                >
                                    {event.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-1 text-[13px] text-gray-500 font-medium">
                                    <span className="flex items-center gap-1.5 font-semibold">
                                        <Calendar className="w-3.5 h-3.5" /> {formatDate(event.startDate)}
                                    </span>
                                    {event.location && (
                                        <span className="flex items-center gap-1.5 opacity-80">
                                            <MapPin className="w-3.5 h-3.5" /> {event.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedId === event.id ? 180 : 0 }}
                                className="ml-4 text-[#FF5722]"
                            >
                                <ChevronDown className="w-6 h-6" />
                            </motion.div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {expandedId === event.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-gray-100 pt-6">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Left side: Image */}
                                            {event.image && (
                                                <div className="w-full md:w-2/5 shrink-0">
                                                    <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-md">
                                                        <Image
                                                            src={event.image}
                                                            alt={event.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Right side: Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-oswald opacity-60 text-[#FF5722]">
                                                            Description
                                                        </h4>
                                                        <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
                                                            {event.description || "No description provided for this event."}
                                                        </p>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="bg-black/5 p-4 rounded-xl border border-black/5">
                                                            <h5 className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">Venue</h5>
                                                            <p className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                                                                <MapPin className="w-3.5 h-3.5 text-[#FF5722]" /> {event.location || "TBA"}
                                                            </p>
                                                        </div>
                                                        <div className="bg-black/5 p-4 rounded-xl border border-black/5">
                                                            <h5 className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">Time</h5>
                                                            <p className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                                                                <Clock className="w-3.5 h-3.5 text-[#FF5722]" /> {formatTime(event.startDate)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                                                    <div className="flex-1 w-full">
                                                        <RegisterButton
                                                            eventId={event.id}
                                                            initialIsRegistered={registeredEventIds.includes(event.id)}
                                                            termsAndConditions={event.termsAndConditions}
                                                        />
                                                    </div>
                                                    <Link
                                                        href={`/events/${event.categoryId}/${event.id}`}
                                                        className="px-8 py-3 bg-black/5 hover:bg-black/10 transition-all rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shrink-0 h-[46px]"
                                                    >
                                                        Details <ChevronDown className="-rotate-90 w-3.5 h-3.5 text-[#FF5722]" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                ))
            ) : (
                <div className="text-gray-400 italic py-4">No events scheduled in this category yet.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsTree;
