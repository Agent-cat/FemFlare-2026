import React, { Suspense } from 'react';
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
    <div className="min-h-screen bg-[#F1EBE0] text-black font-sans pt-24 md:pt-32">
      <main className="w-full pb-24 relative overflow-hidden">

        {/* Header Section */}
        <div className="w-full flex justify-center text-center mb-16 px-6">
            <h1 className="flex flex-row items-center gap-3 md:gap-6 leading-none font-oswald">
                <span className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#1a1a1a] uppercase">
                    UPCOMING
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-transparent stroke-text uppercase">
                    EVENTS
                </span>
            </h1>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-screen-2xl mx-auto px-6 relative z-10">
            {initialData.length > 0 ? (
                <Suspense fallback={<div className="h-96 flex items-center justify-center font-oswald text-gray-400 uppercase tracking-widest animate-pulse">Loading amazing events...</div>}>
                    <EventsContent initialData={initialData as any} initialHasMore={initialHasMore} />
                </Suspense>
            ) : (
                <div className="text-center py-20 border-2 border-black/5 rounded-3xl mx-6">
                     <p className="text-xl text-gray-500 font-medium font-oswald uppercase tracking-wide">Coming soon. Check back later!</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
