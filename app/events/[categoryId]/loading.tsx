import { Star } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F9F7F5] flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-6"></div>
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
