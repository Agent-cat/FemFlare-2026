import React from 'react';
import { Phone, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const eventStaffData = [
  {
    category: "TECHNICAL EVENTS",
    events: [
      {
        name: "Debug&Win",
        volunteers: "Swaroopa",
        contact: "91825 36279",
        faculty: "Dr. I. Govardhani",
        facultyContact: "9573548993"
      },
      {
        name: "Code Queens–Competitive Coding",
        volunteers: "Sujana",
        contact: "63055 33476",
        faculty: "Dr. Ch. Nagamani",
        facultyContact: "9493485523"
      },
      {
        name: "App-It-Up–App Idea Pitch",
        volunteers: "Ambica",
        contact: "85208 22009",
        faculty: "Dr. P. Ramya",
        facultyContact: "6300103003"
      },
    ]
  },
  {
    category: "NON-TECH EVENTS",
    events: [
      {
        name: "WESTERN- SOLO & GROUP",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "U. Kanaka Prasad",
        facultyContact: "8297525793"
      },
      {
        name: "Fashion Show",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "Dr. V. Lakshmi Lalitha",
        facultyContact: "—"
      },
      {
        name: "Art & Painting",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "Dr. R. Subhakar Raju",
        facultyContact: "9912311170"
      },
      {
        name: "Reel Queens – Reels CONTEST",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "Dr. V. Lakshmi Lalitha",
        facultyContact: "—"
      },
      {
        name: "Singing (VOCAL - SOLO)",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "Danam Cary Rayapati",
        facultyContact: "7330872419"
      },
      {
        name: "IdeateHer",
        volunteers: "Sreehita",
        contact: "93472 86823",
        faculty: "Dr. T. Santhi Sri",
        facultyContact: "9441085806"
      },
      {
        name: "Rapid Rangoli",
        volunteers: "Mahita",
        contact: "99663 39550",
        faculty: "Vijay Ratnam",
        facultyContact: "8106079479"
      },
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
      { name: "AI Workshop", volunteers: "Sreehita", contact: "93472 86823", },
      { name: "Face Painting", volunteers: "Sreehita", contact: "93472 86823", },
      { name: "Vision Board", volunteers: "Sreehita", contact: "93472 86823", },
      { name: "Nail workshop", volunteers: "Sreehita", contact: "93472 86823", },
      { name: "POTTERY", volunteers: "Sreehita", contact: "93472 86823", },
    ]
  },
  {
    category: "LITERATURE EVENTS",
    events: [
      {
        name: "Debate Diva",
        volunteers: "Geethika",
        contact: "96421 80999",
        faculty: "Dr. Ch. Neelima",
        facultyContact: "9052535399"
      },
      {
        name: "Blackout Poetry",
        volunteers: "Geethika",
        contact: "96421 80999",
        faculty: "Mrs. Sireesha",
        facultyContact: "9704567827"
      },
      {
        name: "Turn the Page – Story Writing",
        volunteers: "Geethika",
        contact: "96421 80999",
        faculty: "Mrs. Sankari",
        facultyContact: "7995847871"
      },
    ]
  },
  {
    category: "OTHERS",
    events: [
      { name: "INFLUENCER MEET", volunteers: "Sreehita", contact: "93472 86823" },
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
                            <div className="col-span-6 text-right">Event Coordinators</div>
                        </div>

                        {section.events.map((event: any, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 sm:grid-cols-12 items-center px-6 sm:px-8 py-5 rounded-2xl bg-white border border-gray-100 hover:border-[#FF5722]/30 hover:shadow-md transition-all group relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF5722]/0 group-hover:bg-[#FF5722] transition-all" />

                                <div className="col-span-1 sm:col-span-6 mb-4 sm:mb-0">
                                    <span className="font-bold text-lg text-[#1a1a1a] block group-hover:text-[#FF5722] transition-colors leading-tight">
                                        {event.name}
                                    </span>
                                </div>

                                <div className="col-span-1 sm:col-span-6 flex flex-col gap-2">
                                    {/* Faculty Coordinator */}
                                    {event.faculty && (
                                        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FF5722]/5 rounded-xl border border-[#FF5722]/10 group/fac">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black bg-[#FF5722] text-white px-2 py-0.5 rounded uppercase tracking-tighter">Faculty</span>
                                                <span className="font-bold text-gray-800 text-sm">{event.faculty}</span>
                                            </div>
                                            {event.facultyContact && event.facultyContact !== "—" && event.facultyContact !== "-" && (
                                                <a
                                                    href={`tel:${event.facultyContact.replace(/\s+/g, '')}`}
                                                    className="flex items-center gap-2 text-[10px] font-black font-oswald text-[#FF5722] bg-white px-3 py-1.5 rounded-full border border-[#FF5722]/10 hover:bg-[#FF5722] hover:text-white transition-all shadow-sm"
                                                >
                                                    <Phone className="w-3 h-3" />
                                                    {event.facultyContact}
                                                </a>
                                            )}
                                        </div>
                                    )}

                                    {/* Student Volunteer */}
                                    {event.volunteers && event.volunteers !== "-" && (
                                        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black bg-gray-400 text-white px-2 py-0.5 rounded uppercase tracking-tighter">Student</span>
                                                <span className="font-semibold text-gray-600 text-sm">{event.volunteers}</span>
                                            </div>
                                            {event.contact && event.contact !== "-" && (
                                                <a
                                                    href={`tel:${event.contact.replace(/\s+/g, '')}`}
                                                    className="flex items-center gap-2 text-[10px] font-black font-oswald text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-all shadow-sm"
                                                >
                                                    <Phone className="w-3 h-3" />
                                                    {event.contact}
                                                </a>
                                            )}
                                        </div>
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
