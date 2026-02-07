import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { getCategoryEvents, getUserRegistrations } from '@/app/actions/events';
import Navbar from '@/components/layout/Navbar';
import { EventCard, EventItem } from '@/components/events/EventCard';
import { auth } from '@/lib/auth'; // Import auth
import { headers } from 'next/headers'; // Import headers

export default async function CategoryDetailsPage(props: {
  params: Promise<{ categoryId: string }>;
}) {
  const params = await props.params;

  const result = await getCategoryEvents(params.categoryId);

  if (!result.success || !result.category) {
     return (
        <div className="min-h-screen bg-[#F9F7F5] flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Category Not Found</h1>
                <Link href="/events" className="text-[#FF5722] mt-4 hover:underline">Back to Events</Link>
            </div>
        </div>
     );
  }

  // Fetch session to check registrations
  const session = await auth.api.getSession({
      headers: await headers()
  });

  let registeredEventIds = new Set<string>();
  if (session?.user) {
      const regs = await getUserRegistrations(session.user.id);
      if (regs.success && regs.registrations) {
          registeredEventIds = new Set(regs.registrations.map(r => r.eventId));
      }
  }

  const category = result.category;
  const events = (result.events || []) as EventItem[];

  return (
    <div className="min-h-screen bg-[#F9F7F5] text-[#1a1a1a]">
      <Navbar />

       <main className="w-full min-h-[60vh] pt-32 pb-24 relative overflow-hidden">
         {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-[#FFF0EB] to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            {/* Back Navigation */}
             <div className="mb-12">
                 <Link href="/events" className="group inline-flex items-center gap-3 text-gray-500 hover:text-[#FF5722] transition-colors">
                     <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#FF5722] transition-colors shadow-sm">
                         <ArrowLeft className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold uppercase tracking-widest">Back to Collections</span>
                 </Link>
            </div>

            {/* Header */}
            <div className="w-full mb-16 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-6">
                    {category.title}
                </h1>
                {category.description && (
                    <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                        {category.description}
                    </p>
                )}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, idx) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        index={idx}
                        isRegistered={registeredEventIds.has(event.id)}
                    />
                ))}

                {events.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
                             <Star className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
                        <p className="text-gray-500">Check back later for updates in this collection.</p>
                    </div>
                )}
            </div>
        </div>
       </main>
    </div>
  );
}
