export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F1EBE0] text-[#1a1a1a] font-sans pt-24 md:pt-32">
      <div className="w-full max-w-screen-2xl mx-auto px-6 relative z-10">

        {/* Skeleton Header Section */}
        <div className="flex flex-col items-center text-center mb-20 animate-pulse">
            <div className="h-20 md:h-28 lg:h-36 w-3/4 max-w-4xl bg-black/5 rounded-3xl mb-12"></div>

        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[450px] bg-black/5 rounded-[28px] border border-black/5 flex flex-col overflow-hidden">
                    {/* Image Skeleton */}
                    <div className="aspect-[16/8.5] bg-black/5"></div>

                    {/* Content Skeleton */}
                    <div className="p-6 flex flex-col flex-1 space-y-4">
                        <div className="space-y-2">
                             <div className="h-3 w-20 bg-black/5 rounded"></div>
                             <div className="h-6 w-full bg-black/5 rounded-lg"></div>
                        </div>

                        <div className="space-y-3 pt-2">
                             <div className="h-4 w-32 bg-black/5 rounded"></div>
                             <div className="h-4 w-28 bg-black/5 rounded"></div>
                             <div className="h-4 w-40 bg-black/5 rounded"></div>
                        </div>

                        <div className="pt-6 mt-auto border-t border-black/5">
                             <div className="h-12 w-full bg-black/5 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
