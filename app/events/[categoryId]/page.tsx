import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { getCategoryEvents, getUserRegistrations } from '@/app/actions/events';
import Navbar from '@/components/layout/Navbar';
import { EventItem } from '@/components/events/EventCard';
import InfiniteCategoryEvents from '@/components/events/InfiniteCategoryEvents';
import { auth } from '@/lib/auth'; // Import auth
import { headers } from 'next/headers'; // Import headers

export default async function CategoryDetailsPage(props: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { categoryId } = await props.params;
    const result = await getCategoryEvents(categoryId, 1, 9);

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

            {/* Infinite Events Grid */}
            <InfiniteCategoryEvents
                categoryId={categoryId}
                initialEvents={events}
                initialHasMore={result.hasMore || false}
                registeredEventIds={Array.from(registeredEventIds)}
            />
        </div>
       </main>
    </div>
  );
}
