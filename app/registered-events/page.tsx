import React from 'react';
import Image from 'next/image';
import EventsBackground from '@/components/events/EventsBackground';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserRegistrations } from '@/app/actions/events';
import RegisteredEventsTimeline from '@/components/events/RegisteredEventsTimeline';

export default async function RegisteredEventsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect('/signin');
    }

    const { registrations } = await getUserRegistrations(session.user.id);
    const events = registrations || [];

    return (
        <div className="relative min-h-screen bg-[#fdf5f7] text-black font-sans pt-24 md:pt-32 overflow-hidden selection:text-white">

            {/* Background Components (Static Shell) */}
            <EventsBackground />

            <main className="w-full pb-24 relative overflow-hidden z-10">
                <div className="w-full max-w-screen-2xl mx-auto px-6 relative z-10">

                    {/* Back Link */}
                    <div className="mb-8">
                         <Link href="/events" className="group inline-flex items-center gap-3 text-gray-500 hover:text-[#FF5722] transition-colors">
                             <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#FF5722] transition-colors shadow-sm">
                                 <ArrowLeft className="w-5 h-5" />
                             </div>
                             <span className="text-sm font-bold uppercase tracking-widest">All Events</span>
                         </Link>
                    </div>

                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center">
                        <h1 className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-6 leading-none font-oswald mb-10">
                            <span className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#1a1a1a] uppercase drop-shadow-sm">
                                REGISTERED
                            </span>
                            <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-[#FF5722] uppercase drop-shadow-sm">
                                EVENTS
                            </span>
                        </h1>


                    </div>


                    {events.length > 0 ? (
                        <RegisteredEventsTimeline events={events as any} />
                    ) : (
                        <div className="py-24 text-center mt-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
                                <Calendar className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="font-oswald text-3xl font-bold uppercase tracking-tight text-gray-900 drop-shadow-sm mb-3">No registered events yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-10 text-base font-medium">
                                Discover amazing events and join the community. Your registrations will appear here.
                            </p>
                            <Link href="/events" className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#FF5722] px-10 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#F4511E] shadow-xl shadow-orange-500/20">
                                Explore Events
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
