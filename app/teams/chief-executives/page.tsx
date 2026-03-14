import { Metadata } from "next";
import TeamGrid from "@/components/teams/TeamGrid";

export const metadata: Metadata = {
  title: "Chief Executives | FemFlare 2026",
};

const chiefExecutives = [
  {
    name: "V. Meghana",
    role: "Chief Executive | 2200040156",
    image: "/chief/VMeghana.jpeg",
  },
  {
    name: "P Ankita",
    role: "Chief Executive | 2300030487",
    image: "/chief/Ankita.jpeg",
  },
  {
    name: "Saarika Iluri",
    role: "Chief Executive | 2401510007",
    image: "/chief/Saarika1.jpg",
  },
];

export default function ChiefExecutivesPage() {
  return (
    <main className="min-h-screen bg-[#fdf5f7] text-[#1a1a1a] font-sans pt-32 pb-24 relative overflow-x-hidden selection:text-white">
      <>
        {/* Premium Texture Overlay */}
        <div
          className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative Background Large Typography */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap select-none">
          <h1 className="text-[15vw] md:text-[20vw] font-black font-oswald leading-none tracking-tighter text-black opacity-[0.02] rotate-[-5deg]">
            LEAD
          </h1>
        </div>
      </>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase tracking-tighter text-[#1a1a1a] mb-4">
            Chief Executives
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#ec4899] to-[#f97316] mb-8" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            The driving force behind FemFlare 2026 — leading with vision and passion.
          </p>
        </div>

        <TeamGrid members={chiefExecutives} />
      </div>
    </main>
  );
}
