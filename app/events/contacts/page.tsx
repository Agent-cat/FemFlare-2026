import React from 'react';
import { Phone, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const eventStaffData = [
  {
    category: "TECHNICAL EVENTS",
    events: [
      { name: "Debug&Win", volunteers: "Swaroopa", contact: "91825 36279" },
      { name: "Code Queens–Competitive Coding", volunteers: "Sujana", contact: "63055 33476" },
      { name: "App-It-Up–App Idea Pitch", volunteers: "Ambica", contact: "85208 22009" },
    ]
  },
  {
    category: "NON-TECH EVENTS",
    events: [
      { name: "Classical Dance & WESTERN- SOLO & GROUP", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Fashion Show", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Art & Painting", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Reel Queens – Reels CONTEST", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Singing (VOCAL - SOLO)", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "IdeateHer", volunteers: "Sreehita", contact: "93472 86823" },
    ]
  },
  {
    category: "SPOT EVENTS",
    events: [
      { name: "Balloon Blast Game", volunteers: "Deepika", contact: "99082 94861" },
      { name: "Blind Art Challenge", volunteers: "Deepika", contact: "99082 94861" },
      { name: "Meme Recreate Challenge", volunteers: "Deepika", contact: "99082 94861" },
      { name: "Headphone Guess Game", volunteers: "Amukta", contact: "81850 95430" },
      { name: "Bead Bracelet Making", volunteers: "Amukta", contact: "81850 95430" },
      { name: "SheQuest – Treasure Hunt", volunteers: "Mahita", contact: "99663 39550" },
      { name: "Mehendi", volunteers: "Amukta", contact: "81850 95430" },
      { name: "Theme Photography", volunteers: "Pravalika", contact: "73586 56704" },
      { name: "Tongue Twisters Battle", volunteers: "Pravalika", contact: "73586 56704" },
      { name: "Logo Guess", volunteers: "Pravalika", contact: "73586 56704" },
      { name: "Paper Dress Challenge", volunteers: "Mahita", contact: "99663 39550" },
      { name: "Dumb Charades", volunteers: "Amukta", contact: "81850 95430" },
      { name: "Rapid Rangoli", volunteers: "Mahita", contact: "99663 39550" },
    ]
  },
  {
    category: "EXPO'S",
    events: [
      { name: "SheScience Expo", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Women Product Expo", volunteers: "Sreehita", contact: "93472 86823" },
    ]
  },
  {
    category: "WORKSHOPS",
    events: [
      { name: "AI Workshop", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "Face Painting", volunteers: "-", contact: "-" },
      { name: "Vision Board", volunteers: "-", contact: "-" },
      { name: "Nail workshop", volunteers: "-", contact: "-" },
      { name: "POTTERY", volunteers: "-", contact: "-" },
    ]
  },
  {
    category: "LITERATURE EVENTS",
    events: [
      { name: "Debate Diva", volunteers: "Geethika", contact: "96421 80999" },
      { name: "Blackout Poetry", volunteers: "Geethika", contact: "96421 80999" },
      { name: "Turn the Page – Story Writing", volunteers: "Geethika", contact: "96421 80999" },
    ]
  },
  {
    category: "OTHERS",
    events: [
      { name: "INFLUENCER MEET", volunteers: "Sreehita", contact: "93472 86823" },
      { name: "CLASSICAL DANCE EVENT", volunteers: "-", contact: "-" },
    ]
  }
];

export default function EventContactsPage() {
  return (
    <div className="min-h-screen bg-[#fdf5f7] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-6">
                 <Link
                    href="/events"
                    className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF5722] hover:border-[#FF5722] transition-all shadow-sm group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black font-oswald text-[#1a1a1a] uppercase tracking-tighter">Event <span className="text-[#FF5722]">Staff Contacts</span></h1>
                    <p className="text-gray-500 font-medium italic mt-1">Help desk, volunteers, and logistics for FemFlare 2026 events.</p>
                </div>
            </div>
            <div className="hidden md:flex w-16 h-16 bg-[#FF5722]/10 rounded-2xl items-center justify-center mr-4">
                <Users className="w-8 h-8 text-[#FF5722]" />
            </div>
        </div>

        <div className="grid gap-12">
            {eventStaffData.map((section) => (
                <div key={section.category} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black font-oswald text-[#FF5722] uppercase tracking-widest bg-white px-6 py-2 rounded-xl border border-[#FF5722]/10 shadow-sm">
                            {section.category}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#FF5722]/20 to-transparent" />
                    </div>

                    <div className="grid gap-4">
                        <div className="hidden sm:grid grid-cols-12 px-8 py-2 text-[10px] font-black font-oswald text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <div className="col-span-6">Event Name</div>
                            <div className="col-span-3 text-center">Volunteers</div>
                            <div className="col-span-3 text-right">Direct Contact</div>
                        </div>

                        {section.events.map((event, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 sm:grid-cols-12 items-center px-6 sm:px-8 py-5 rounded-2xl bg-white border border-gray-100 hover:border-[#FF5722]/30 hover:shadow-md transition-all group relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5722]/0 group-hover:bg-[#FF5722] transition-all" />

                                <div className="col-span-1 sm:col-span-6 mb-3 sm:mb-0">
                                    <span className="font-bold text-lg text-[#1a1a1a] block group-hover:text-[#FF5722] transition-colors">
                                        {event.name}
                                    </span>
                                </div>
                                <div className="col-span-1 sm:col-span-3 sm:text-center mb-3 sm:mb-0">
                                    <span className="text-sm sm:text-base text-gray-600 font-semibold bg-gray-50 px-3 py-1 rounded-lg">
                                        {event.volunteers}
                                    </span>
                                </div>
                                <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-end">
                                    {event.contact !== "-" ? (
                                        <a
                                            href={`tel:${event.contact.replace(/\s+/g, '')}`}
                                            className="flex items-center gap-3 text-sm font-black font-oswald text-[#FF5722] hover:scale-105 transition-transform bg-[#FF5722]/5 px-5 py-2 rounded-full border border-[#FF5722]/10 group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722]"
                                        >
                                            <Phone className="w-3.5 h-3.5" />
                                            {event.contact}
                                        </a>
                                    ) : (
                                        <span className="text-gray-300 font-mono">-</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-[#1a1a1a] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#FF5722]/20 transition-all duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold font-oswald uppercase mb-2">Need General Assistance?</h3>
                    <p className="text-gray-400 font-medium">Our central help desk is available throughout the event.</p>
                </div>
                <Link
                    href="/events"
                    className="px-8 py-4 bg-[#FF5722] text-white rounded-full font-bold font-oswald uppercase tracking-widest hover:bg-[#F4511E] transition-all shadow-xl shadow-[#FF5722]/20"
                >
                    Back to All Events
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
