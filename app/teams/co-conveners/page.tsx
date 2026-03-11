import React from 'react';
import { Metadata } from 'next';
import TeamGrid from '@/components/teams/TeamGrid';

export const metadata: Metadata = {
  title: 'Co-Conveners | FemFlare 2026',
};

const coConveners = [
  {
    name: "Dr. K. Sony",
    role: "Assistant Director-Alumni Relations & Co-Convener Women Development Cell, KLEF",
    image: "/co-conveners/DR.%20K.%20SONY.jpg"
  },
  {
    name: "Dr. Megha Ojha",
    role: "Associate Prof, College of Law",
    image: "/co-conveners/DR.%20MEGHA%20OJHA.jpg"
  },
  {
    name: "Dr. Pellakuri Vidyullatha",
    role: "Professor, CSE-3",
    image: "/co-conveners/DR.%20PELLAKURI%20VIDYULLATHA.jpg"
  },
  {
    name: "Dr. P.S.G. Aruna Sri",
    role: "Professor-IOT, KLEF",
    image: "/co-conveners/Dr.%20P.S.G.%20Aruna%20Sri.jpg"
  },
  {
    name: "Dr. Mahamuda Shaik",
    role: "RPAC, Dept. of Physics, KLEF",
    image: "/co-conveners/Dr.%20Mahamuda%20Shaik.jpg"
  },
  {
    name: "Dr. Y. Usha Devi",
    role: "Assoc. Prof, ECE, KLEF",
    image: "/co-conveners/Dr.%20Y.%20Usha%20Devi.jpg"
  }
];

export default function CoConvenersPage() {
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
                  SUPPORT
              </h1>
          </div>
        </>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase tracking-tighter text-[#1a1a1a] mb-4">
                Co-Conveners
            </h1>
            <div className="h-1.5 w-24 bg-[#FF5722] mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
               Supporting the seamless execution and success of FemFlare 2026.
            </p>
        </div>

        <TeamGrid members={coConveners} />
      </div>
    </main>
  );
}
