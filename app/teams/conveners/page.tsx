import React from 'react';
import { Metadata } from 'next';
import TeamGrid from '@/components/teams/TeamGrid';

export const metadata: Metadata = {
  title: 'Conveners | FemFlare 2026',
};

const conveners = [
  {
    name: "Dr. D. Haritha",
    role: "HOD-BES I, KLEF",
    image: "/conveners/DR.%20D.%20HARITHA.jpg"
  },
  {
    name: "Dr. A. Priya",
    role: "HOD-Architecture, KLEF",
    image: "/conveners/Dr.%20A.%20PRIYA.jpg"
  },
  {
    name: "Dr. G. Pradeepini",
    role: "Assoc. Dean R& D, KLEF",
    image: "/conveners/DR.%20G.%20PRADEEPINI.jpg"
  },
  {
    name: "Dr. P. Lakshmi Prasanna",
    role: "Assoc. Dean-IQAC, KLEF",
    image: "/conveners/DR.%20P.%20LAKSHMI%20PRASANNA.jpg"
  },
  {
    name: "Dr. Nilu Singh",
    role: "Alternate HOD, IRD, KLEF",
    image: "/conveners/DR.%20NILU%20SINGH.jpg"
  },
  {
    name: "Dr. N. Sri Lakshmi",
    role: "Assistant Professor, Pharmacy, KLEF",
    image: "/conveners/Dr.%20N.%20Sri%20Lakshmi.jpg"
  }
];

export default function ConvenersPage() {
  return (
    <main className="min-h-screen bg-[#fdf5f7] text-[#1a1a1a] font-sans pt-32 pb-24 relative overflow-x-hidden selection:text-white">
      <>
          {/* 1. Premium Texture Overlay */}
          <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
          />

          {/* Decorative Background Large Typography */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap select-none">
              <h1 className="text-[15vw] md:text-[20vw] font-black font-oswald leading-none tracking-tighter text-black opacity-[0.02] rotate-[-5deg]">
                  CONVENERS
              </h1>
          </div>
        </>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase tracking-tighter text-[#1a1a1a] mb-4">
                Conveners
            </h1>
            <div className="h-1.5 w-24 bg-[#FF5722] mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
               The dedicated hands coordinating every detail of FemFlare 2026.
            </p>
        </div>

        <TeamGrid members={conveners} />
      </div>
    </main>
  );
}
