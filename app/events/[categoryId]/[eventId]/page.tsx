import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Share2, Heart } from 'lucide-react';
import { getEvent } from '@/app/actions/events';
import Navbar from '@/components/layout/Navbar';
import { redirect } from 'next/navigation';
import { EventActions } from '@/components/events/EventActions';

export default async function EventPage(props: {
  params: Promise<{ categoryId: string; eventId: string }>;
}) {
  const params = await props.params;

  const result = await getEvent(params.eventId);

  if (!result.success || !result.event) {
    return (
       <div className="min-h-screen bg-[#F9F7F5] flex flex-col">
           <Navbar />
           <div className="flex-1 flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold">Event Not Found</h1>
               <Link href={`/events/${params.categoryId}`} className="text-[#FF5722] mt-4 hover:underline">Back to Category</Link>
           </div>
       </div>
    );
  }

  const event = result.event;

  return (
    <div className="min-h-screen bg-[#F9F7F5] text-[#1a1a1a]">
      <Navbar />

       <main className="w-full min-h-[60vh] pt-32 pb-24 relative overflow-hidden">
         {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-[#FFF0EB] to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
            {/* Back Navigation */}
             <div className="mb-8">
                 <Link href={`/events/${params.categoryId}`} className="group inline-flex items-center gap-3 text-gray-500 hover:text-[#FF5722] transition-colors">
                     <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#FF5722] transition-colors shadow-sm">
                         <ArrowLeft className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-bold uppercase tracking-widest">Back to {event.category.title}</span>
                 </Link>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-white/50">
                 {/* Hero Section of Card */}
                <div className="relative h-64 md:h-96 bg-[#FF5722]/5 flex items-center justify-center overflow-hidden">
                    {event.image ? (
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                         <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/10 via-transparent to-[#FFD700]/10" />
                    )}

                    <div className="absolute inset-0 bg-black/20" /> {/* Scrim */}

                    <div className="text-center relative z-10 px-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm mb-6">
                            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">{event.category.title}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight drop-shadow-md">
                            {event.title}
                        </h1>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row gap-12">
                       {/* Left Content */}
                       <div className="flex-1">
                           <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-gray-900 border-b border-gray-100 pb-2">About Event</h2>
                           <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                               {event.description ? (
                                   <p>{event.description}</p>
                               ) : (
                                   <p className="italic text-gray-400">No description provided.</p>
                               )}
                           </div>
                       </div>

                       {/* Right Sidebar / Details */}
                       <EventActions event={event} />
                   </div>
                </div>
            </div>

        </div>
       </main>
    </div>
  );
}
