"use cache";
import HeroSection from "@/components/home/HeroSection";
import WomenOfTodaySection from "@/components/home/WomenOfTodaySection";

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#F1EBE0]">
      <HeroSection />
      <WomenOfTodaySection />
    </main>
  );
}
