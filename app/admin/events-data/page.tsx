"use client";

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { getAllUsers } from '@/app/actions/user';
import { downloadExcel } from '@/lib/excel';
import { toast } from 'sonner';

const eventsData = [
  {
    category: "TECHNICAL EVENTS",
    events: [
      { name: "Debug&Win", volunteers: "Swaroopa", contact: "91825 36279" },
      { name: "Code Queens–Competitive Coding", volunteers: "Sujana", contact: "63055 33476" },
      { name: "App-It-Up–App Idea Pitch", volunteers: "Ambica", contact: "85208 22009" },
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
      category: "OTHERS",
      events: [
          { name: "INFLUENCER MEET", volunteers: "Sreehita", contact: "93472 86823" },
          { name: "CLASSICAL DANCE EVENT", volunteers: "-", contact: "-" },
      ]
  }
];

export default function EventsDataPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    const toastId = toast.loading("Preparing report...");

    const res = await getAllUsers();

    if (res.success && res.users) {
        const data = res.users.map(user => ({
            "Name": user.name,
            "Email": user.email,
            "Phone Number": user.phoneNumber || "N/A",
            "College": user.college || "N/A",
            "Student ID": user.studentId || "N/A",
            "Department": user.department || "N/A",
            "Accommodation": user.needsAccommodation ? "Yes" : "No",
            "Events Registered": (user as any).registrations.map((r: any) => r.event.title).join(", ") || "No Events",
            "Joined At": new Date(user.createdAt).toLocaleString(),
        }));

        await downloadExcel(data, `FemFlare_Event_Registrations_${new Date().toISOString().split('T')[0]}`);
        toast.success("Report downloaded successfully!", { id: toastId });
    } else {
        toast.error("Failed to fetch registration data", { id: toastId });
    }
    setIsDownloading(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-oswald font-bold text-gray-900 uppercase tracking-tight">
            Events Data & Registrations
          </h1>
          <p className="text-gray-500 font-medium italic">
            Comprehensive list of events, assigned volunteers, and participant reports.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5722] text-white font-bold font-oswald uppercase tracking-wide rounded-xl hover:bg-[#E64A19] transition-all shadow-lg hover:shadow-[#FF5722]/20 active:scale-95 disabled:opacity-70"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          Download Registration Report
        </button>
      </div>

      <div className="grid gap-12">
        {eventsData.map((section) => (
          <div key={section.category} className="space-y-4">
             <div className="flex items-center gap-4">
                <h2 className="text-xl font-oswald font-bold text-[#FF5722] uppercase tracking-wider">
                  {section.category}
                </h2>
                <div className="flex-1 h-px bg-[#FF5722]/20" />
             </div>

            <div className="overflow-hidden rounded-2xl border border-[#DCCEB8] bg-white shadow-sm transition-all hover:shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F5F0] border-b border-[#DCCEB8]">
                    <th className="px-6 py-4 text-xs font-oswald font-bold uppercase tracking-widest text-gray-500">Event Name</th>
                    <th className="px-6 py-4 text-xs font-oswald font-bold uppercase tracking-widest text-gray-500">Volunteers</th>
                    <th className="px-6 py-4 text-xs font-oswald font-bold uppercase tracking-widest text-gray-500">Contacts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCCEB8]/50">
                  {section.events.map((event, idx) => (
                    <tr key={idx} className="group hover:bg-[#FF5722]/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-sans font-bold text-[#1a1a1a] block">
                            {event.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-sans text-gray-600 font-medium">
                            {event.volunteers}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-[#FF5722] font-black tracking-tight bg-[#FF5722]/5 px-3 py-1 rounded-full border border-[#FF5722]/10">
                            {event.contact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
