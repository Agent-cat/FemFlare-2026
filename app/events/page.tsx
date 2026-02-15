import React, { Suspense } from 'react';
import Image from 'next/image';
import InfiniteEventsTree from '@/components/events/InfiniteEventsTree';
import { getPaginatedEventCategories, getUserRegistrations } from '@/app/actions/events';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function EventsContent({ initialData, initialHasMore }: { initialData: any[], initialHasMore: boolean }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let registeredEventIds: string[] = [];
  if (session?.user) {
    const regResult = await getUserRegistrations(session.user.id);
    if (regResult.success && regResult.registrations) {
      registeredEventIds = regResult.registrations.map(r => r.eventId);
    }
  }

  return (
    <InfiniteEventsTree
      initialData={initialData}
      initialHasMore={initialHasMore}
      registeredEventIds={registeredEventIds}
    />
  );
}

export default async function EventsPage() {
  const result = await getPaginatedEventCategories(1, 3);
  const initialData = result.success && result.data ? result.data : [];
  const initialHasMore = result.success ? (result.hasMore || false) : false;

  return (
    <div className="relative min-h-screen bg-[#F1EBE0] text-black font-sans pt-24 md:pt-32 overflow-hidden  selection:text-white">

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 0. Background Image Layer - REMOVED per user request */}

      {/* 1. Premium Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
           }}
      />

      {/* 2. Soft Gradient Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-[#F1EBE0] via-[#e6dfd1] to-[#d8cfbd]" />

      {/* User Requested: Left Side Image */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 h-[90vh] w-[45vw] z-0 pointer-events-none opacity-20 hidden md:block">
         <Image
            src="/images/2.png"
            alt="Decorative Element"
            fill
            className="object-contain object-left"
            priority
         />
      </div>

      {/* 3. Large Typography (Fixed Background) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap select-none">
         <h1 className="text-[15vw] md:text-[20vw] font-black font-oswald leading-none tracking-tighter text-black opacity-[0.02] rotate-[-5deg]">
            FEMFLARE
         </h1>
      </div>


      {/* --- MAIN CONTENT --- */}
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

        {/* Content Section */}
        <div className="w-full max-w-screen-2xl mx-auto px-6">
            {initialData.length > 0 ? (
                <Suspense fallback={<div className="h-96 flex items-center justify-center font-oswald text-gray-400 uppercase tracking-widest animate-pulse">Loading amazing events...</div>}>
                    <EventsContent initialData={initialData as any} initialHasMore={initialHasMore} />
                </Suspense>
            ) : (
                <div className="text-center py-20 border-2 border-black/5 rounded-3xl mx-6 bg-white/30 backdrop-blur-sm">
                     <p className="text-xl text-gray-500 font-medium font-oswald uppercase tracking-wide">Coming soon. Check back later!</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
