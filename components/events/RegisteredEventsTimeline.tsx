"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UnregisterButton from './UnregisterButton';
import { cn } from '@/lib/utils';

interface RegisteredEvent {
    id: string;
    createdAt: Date | string;
    event: {
        id: string;
        title: string;
        startDate: Date | string;
        description?: string | null;
        location?: string | null;
        image?: string | null;
        categoryId: string;
    };
}

interface RegisteredEventsTimelineProps {
    events: RegisteredEvent[];
}

export default function RegisteredEventsTimeline({ events }: RegisteredEventsTimelineProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((reg) => {
                const event = reg.event;

                return (
                    <div key={reg.id} className="h-full">
                        {/* Event Card */}
                        <div className="bg-[#FF5722]/05 backdrop-blur-md rounded-[28px] overflow-hidden border border-[#FF5722]/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-[#FF5722]/40 flex flex-col h-full">
                            {/* Card Top: Image */}
                            {event.image ? (
                                <div className="relative aspect-[16/8.5] overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute top-3.5 left-3.5">
                                        <span className="px-2.5 py-1 bg-[#FF5722] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1">
                                            <CheckCircle2 className="w-2.5 h-2.5" /> Registered
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-[16/8.5] bg-black/5 flex items-center justify-center relative">
                                     <div className="absolute top-3.5 left-3.5">
                                        <span className="px-2.5 py-1 bg-[#FF5722] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1">
                                            <CheckCircle2 className="w-2.5 h-2.5" /> Registered
                                        </span>
                                    </div>
                                    <Calendar className="w-10 h-10 text-gray-200" />
                                </div>
                            )}

                            {/* Card Body: Details */}
                            <div className="p-5 md:p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                                        Joined {new Date(reg.createdAt).toLocaleDateString()}
                                    </p>
                                    <h3 className="text-lg font-oswald font-bold uppercase tracking-tight text-gray-900 leading-tight line-clamp-1">
                                        {event.title}
                                    </h3>
                                </div>

                                <div className="space-y-2.5 mb-5">
                                    <div className="flex items-center gap-2.5 text-[12px] font-bold text-gray-700">
                                        <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                                        <span>{formatDate(event.startDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-[12px] font-bold text-gray-700">
                                        <Clock className="w-3.5 h-3.5 text-[#FF5722]" />
                                        <span>{formatTime(event.startDate)}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2.5 text-[12px] font-medium text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                                            <span className="opacity-80 line-clamp-1">{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6 flex-1">
                                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 font-oswald opacity-60 text-[#FF5722]">Description</h4>
                                    <p className="text-gray-500 leading-relaxed text-[12px] font-medium line-clamp-2 italic">
                                        {event.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Card Footer: Action */}
                                <div className="pt-4 border-t border-black/5">
                                    <UnregisterButton eventId={event.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
