import React, { Suspense } from 'react';
import EventsBackground from '@/components/events/EventsBackground';
import EventsList from '@/components/events/EventsList';
import EventContacts from '@/components/events/EventContacts';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Upcoming Events | FemFlare 2026',
  description: 'Discover and register for upcoming events at FemFlare 2026.',
};

// Next.js 16 Caching Strategy
// While the page is dynamic due to user session checks,
// the underlying data fetches are cached via 'use cache' and 'unstable_cache'.
// Using Suspense boundaries allows for streaming the shell immediately.

export default function EventsPage() {
  return (
    <div className="relative min-h-screen bg-[#fdf5f7] text-black font-sans pt-24 md:pt-32 overflow-hidden selection:text-white">

      {/* Background Components (Static Shell) */}
      <EventsBackground />

      {/* Main Content */}
      <main className="relative w-full pb-24 z-10">

        {/* Header Section */}
        <div className="w-full flex justify-center text-center mb-16 px-4">
            <h1 className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 leading-none font-oswald relative">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#1a1a1a] uppercase drop-shadow-sm">
                    UPCOMING
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-[#FF5722] uppercase drop-shadow-sm">
                    EVENTS
                </span>
            </h1>
        </div>

        <EventContacts />

        {/* Dynamic Content Section */}
        <div className="w-full max-w-screen-2xl mx-auto px-6">
            <Suspense fallback={
                <div className="h-96 flex flex-col items-center justify-center gap-4 animate-pulse">
                    <div className="w-12 h-12 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-oswald text-gray-400 uppercase tracking-widest text-sm">Loading amazing events...</p>
                </div>
            }>
                <EventsList />
            </Suspense>
        </div>
      </main>
    </div>
  );
}
