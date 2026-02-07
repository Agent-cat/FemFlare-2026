import Image from 'next/image';

const WomenOfTodaySection = () => {
  return (
    <section className="relative w-full bg-[#F1EBE0] py-16 md:py-32 overflow-hidden text-black font-sans">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">

        {/* Left Text Content */}
        <div className="w-full md:w-1/2 flex flex-col relative z-10 mb-12 md:mb-0">

          {/* Main Title */}
          <h2 className="flex flex-col font-oswald mb-8">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#1a1a1a] uppercase">
              WOMEN
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-normal text-transparent stroke-text uppercase">
            OF TODAY
            </span>
          </h2>

          <p className="max-w-md text-gray-700 text-sm text-justify md:text-base leading-relaxed mb-12 font-medium">
           Women of today are leaders, innovators, and changemakers shaping every corner of the world.
They balance strength with compassion, turning challenges into opportunities for growth.
From classrooms to boardrooms, their voices inspire progress and equality.
They break barriers, redefine traditions, and create space for future generations.
Empowered women don’t just follow change—they lead it forward.
          </p>

          <div className="flex flex-col items-start relative">
             <div className="text-[#FF5722] text-5xl md:text-6xl font-bold tracking-tighter">
                FEMFLARE
             </div>
             <div className="h-1.5 w-48 bg-[#FF5722] mt-2 mb-4"></div>
             <h3 className="uppercase font-bold text-sm tracking-widest">
                2026
             </h3>

             {/* Graphic Number Element */}
             <div className="absolute right-0 bottom-0 md:-right-12 md:bottom-2 text-[#FF5722] font-black text-6xl opacity-100">
                #1
             </div>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
             <div className="relative w-full aspect-square md:aspect-4/5 max-w-lg">
                <Image
                    src="/images/women_of_today.png"
                    alt="Women of Today Illustration"
                    fill
                    className="object-contain"
                />
             </div>
        </div>
      </div>



    </section>
  );
};

export default WomenOfTodaySection;
