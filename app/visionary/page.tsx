import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Visionary | FemFlare 2026',
  description: 'Learn about Smt Koneru Siva Kanchana Latha, an Indian educationalist, social entrepreneur, and philanthropist.',
};

export default function VisionaryPage() {
  return (
    <div className="relative min-h-screen bg-[#fdf5f7] text-[#333] font-mono pt-32 pb-24 selection:bg-[#d819e6]/20 overflow-x-hidden">
      {/* 1. Premium Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
           }}
      />

      {/* 2. Large Typography (Fixed Background) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none whitespace-nowrap select-none">
         <h1 className="text-[15vw] md:text-[20vw] font-black font-oswald leading-none tracking-tighter text-black opacity-[0.02] rotate-[-5deg]">
            FEMFLARE
         </h1>
      </div>

      <main className="w-full max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="/chief%20patrons/Smt.%20KONERU%20SIVA%20KANCHANA%20LATHA.jpg"
                        alt="Smt. Koneru Siva Kanchana Latha"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </div>

        {/* Header Box */}
        <div className="flex justify-center mb-16">
          <div className="border-[3px] border-[#d819e6] bg-white rounded-2xl px-12 py-8 text-center shadow-sm max-w-4xl w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-4 tracking-tight font-sans">
              Smt Koneru Siva Kanchana Latha
            </h1>
            <h2 className="text-[#d819e6] font-bold text-xs md:text-sm tracking-[0.2em] uppercase font-mono">
              Honourable Secretary, KLEF
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[15px] md:text-[18px] leading-loose text-[#444] text-justify md:text-left">
          <p>
            <span className="text-[#d819e6] font-bold text-3xl md:text-4xl float-left mr-1.5 leading-[0.8] mt-1 font-sans">S</span>
            mt Koneru Siva Kanchana Latha is an Indian educationalist, social entrepreneur, and philanthropist who is dedicated to empowering women in society. Born in 1961 in Vijayawada, Andhra Pradesh, India, Kanchana Latha was raised in a family that valued education and social responsibility. Her parents, K. Nagalingeswara Rao and K. Rajeswari, instilled in her the importance of giving back to the community and using her education to make a positive impact on society.
          </p>

          <p>
            Smt Koneru Siva Kanchana Latha is a renowned Indian educationalist, social entrepreneur, and philanthropist, who is well-known for her work in promoting women's education and empowerment. She is married to Koneru Satyanarayana, who is the President of KLEF, a leading educational institution, as well as a prominent movie producer, philanthropist, and industrialist.
          </p>

          <p>
            Rose Society member born in Vijayawada, Andhra Pradesh, India, completed her Bachelor's degree in Home Science from St. Theresa Women’s College, Andhra Pradesh. She has been an active participant in the field of education and has worked in various educational institutions in leadership positions. She has also founded several non-profit organizations, which focuses on empowering women through education and vocational training.
          </p>

          <p>
            Koneru Satyanarayana, Kanchana Latha's husband, is also a prominent figure in the field of education and philanthropy. He is the President of KLEF, which has several institutions in India that offer a range of courses in engineering, management, law, and pharmacy. He is also a successful movie producer, having produced several critically acclaimed films in Telugu cinema.
          </p>

          <p>
            Kanchana Latha and Satyanarayana's shared commitment to education, philanthropy, and social welfare has earned them several accolades and recognition. They have both received numerous awards for their contributions to society, including the Rashtra Vibhushan Award, the Rajiv Gandhi Shiromani Award, and the Mahila Shiromani Award, among others.
          </p>

          <p>
            In conclusion, Kanchana Latha and Satyanarayana are a power couple in the field of education and philanthropy in Andhra Pradesh, India. Their shared vision and dedication to empowering women and promoting education have made a significant impact on society, and their children have followed in their footsteps, pursuing higher education and making a name for themselves in their respective fields.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Contributions at KLEF</h3>

          <p>
            Kanchana Latha's role as the Secretary of Koneru Lakshmaiah Education Foundation (KLEF) is a prominent member of the foundation's leadership team. KLEF is a pioneering educational institution with campuses in Andhra Pradesh and Telangana, offering a range of courses in sciences, engineering, technology, architecture, pharmacy, agriculture, arts, commerce, management, hotel management, law, and other fields.
          </p>

          <p>
            KLEF was established as the Koneru Lakshmaiah College of Engineering in 1980, and since then, it has grown to become a deemed-to-be university and a recognized Category 1 institution by the Ministry of Education in India. As the Secretary of KLEF, Kanchana Latha has played a significant role in the institution's growth and development, ensuring that it continues to provide quality education to students from all walks of life.
          </p>

          <p>
            Kanchana Latha's work in the field of education and social welfare has earned her several accolades, including the Mahila Shiromani Award and the Women Achiever's Award, among others. Her dedication to promoting education and empowering women has inspired many, and she continues to be a beacon of hope for those seeking to make a positive impact on society.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Leadership Responsibilities</h3>

          <p>
            As the Secretary of KLEF, this individual plays a critical role in managing the operations of the foundation. She oversees a range of administrative functions, and guides the teams to develop and implement strategies for the long-term growth and success of the institution. Under Kanchana Latha's leadership, KLEF has also expanded its focus on social responsibility and community development, through various initiatives such as providing education and vocational training to underprivileged women, supporting rural development projects, and promoting environmental sustainability.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Foreign Visits</h3>

          <p>
            Smt Kanchana Latha is a well-travelled individual with a keen interest in exploring different cultures, educational systems, and environmental conservation practices. She has visited more than 50 countries around the world, including the United States, the United Kingdom, Australia, Singapore, and Malaysia, among others. During her travels, she has explored the prevailing cultures, educational reforms, and lifestyles of women in these countries, and has gained valuable insights into their social and economic systems.
          </p>

          <p>
            In addition to her travels, Kanchana Latha has also participated in various national and international conferences related to a wide range of topics, including Crafts, Culture, urban gardening, women empowerment, and women’s health. Her commitment to promoting women's empowerment is particularly noteworthy, as she has dedicated significant time and resources to supporting women's health and participating in initiatives and events that promote gender equality and empowerment.
          </p>

          <p>
            Kanchana Latha is a respected personality in the fields of education, social entrepreneurship, and philanthropy, and her work has made a significant impact on society. Her dedication to promoting education, social welfare, and environmental conservation has earned her numerous accolades and awards, and she continues to inspire others with her work.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Social Memberships</h3>

          <p>
            Kanchana Latha's commitment to promoting social welfare and empowering women is reflected in her membership of various organizations. She is a member of Association of Lady Entrepreneurs of Andhra Pradesh [ALEAP] and also member of many NGO organisations in combined Andhra Pradesh. She is very well-known for her philanthropic work in various fields though these organisations. She also participates in Women Empowerment Clubs, which focus on promoting gender equality and empowerment, and has been associated with the Crafts Council of Andhra Pradesh, which works towards preserving traditional handicrafts and promoting the livelihoods of artisans. She is also holding a position as Honourable Vice President in Rose Society.
          </p>

          <p>
            Through her involvement in these organizations, Kanchana Latha has been able to make a significant impact on society and inspire others to contribute towards social welfare and empowerment. Her work in promoting women's empowerment and preserving traditional handicrafts is particularly noteworthy, and she continues to be an active participant in various events and initiatives related to these fields.
          </p>

          <p>
            Apart from her role at KLEF, the Secretary is also an active member of the AP Craft Council, she supports, promote and preserve traditional arts and crafts in Andhra Pradesh. As a member of this council, she is passionate about preserving and promoting the rich cultural heritage of the state. She believes in developing strong relationships, compassion and empathy for her members and she has a passion and commitment in broadening and diversifying the audience for craft and concentrates on reviving, creating, and maintaining quality craft.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Key Contributor of Women Technology Park</h3>

          <p>
            As a part of Women Technology Park supported by Ministry of Science and Technology, Government of India (2016-2021) she supported the local women in skill development to work for Kondapalli toys and Etikkopaka toys which results in increased production quantities manifold after her design intervention. She personally supported in conducting training programs for women on rope making using coir, food processing, development of bio-feed, bio-fertilizer, cotton weaving cluster with dyeing and printing, and in making handloom sarees. The centre is self-sustained now benefitting local local women with enhanced livelihoods.
          </p>

          <p>
            Mrs. Kanchana Latha Koneru is a remarkable individual who has made a significant impact in the fields of design and education. Her design intervention in Kondapalli and Etikkopaka has resulted in a manifold increase in production quantities, which is a testament to her creativity and vision. As a result of her efforts, local artisans have been able to expand their businesses and improve their livelihoods.
          </p>

          <p>
            Mrs. Kanchana Latha Koneru's contributions to the empowerment of women in the Guntur district of Andhra Pradesh, India, are truly remarkable. Her efforts have led to the establishment of the Women Technology Park at Vaddeswaram, which provides local women with training and opportunities to develop skills in a variety of industries.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Village Revolution – Remarkable Outcomes</h3>

          <p>
            Mrs. Kanchana Latha Koneru's contributions to the development of rural communities in Andhra Pradesh are truly remarkable. Her efforts to initiate the Smart Village Revolution as part of the Corporate Social Responsibility (CSR) program of KLEF have led to the transformation of about 90 villages into smart villages.
          </p>

          <p>
            Under her leadership, these villages have been able to overcome poverty and underdevelopment by adopting innovative solutions in the areas of healthcare, education, sanitation, and technology. In addition to providing hygienic drinking water to these villages, Mrs. Koneru has also facilitated the provision of computer systems and training to Village Panchayat officers, enabling them to speed up their work and deliver better services to the community.
          </p>

          <p>
            Mrs. Koneru's vision and leadership have been instrumental in driving the Smart Village Revolution program and transforming these villages into models of development. Her commitment to rural communities and her efforts to empower them with the tools and resources they need to thrive are truly inspiring.
          </p>

          <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mt-16 mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Charity - Village Adoption and Social Service</h3>

          <p>
            She adopted 8 villages and was instrumental in converting them as smart villages. She supported installation of drip irrigation projects to conserve the water, installation of solar pump sets, and providing solar invertors to avoid unprecedented power cuts, establishing common computer training centres for village students’ education, aid towards of hygienic drinking water and not limited too. She is feeding daily 200 old aged and needy people at her house for last 7 years.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200 mt-12">
            <div>
              <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Awards & Honors</h3>
              <ul className="space-y-3 list-none p-0 mt-4">
                <li>• Bharat Jyothi Award from International Integrity Peace & Friendship in 1999</li>
                <li>• Uttama Mahila Award from Sri Devi Samskruthika Sankhshma Sangam in 2021</li>
                <li>• Received Award from Shri Nara Chandra Babu Naidu, CM of AP for Green Initiatives</li>
                <li>• Felicitation by KL Alumni Groups in Silver Jubilee Functions (2008-date)</li>
                <li>• Trekked NATU LA at 14150 feet above sea level on Old Silk Route</li>
                <li>• Received Award from Shri R. Subrahmanyam, Secretary, Dept of Higher Education</li>
                <li>• MHRD Award for Swachata Rankings in 2017, 2018, 2019</li>
                <li>• AICTE Chairman Award for Clean and Green Campus</li>
              </ul>
            </div>

            <div>
              <h3 className="relative inline-block text-[#d819e6] font-bold uppercase tracking-widest mb-6 font-sans text-xl md:text-2xl pb-3 border-b border-gray-200 after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[3px] after:bg-[#d819e6] after:rounded-full">Corporate Presence</h3>
              <ul className="space-y-3 list-none p-0 mt-4">
                <li>• Director of Ind Aqua Ltd</li>
                <li>• Raja Harin Estates Pvt. Ltd</li>
                <li>• Surya Havish Estates Pvt. Ltd</li>
                <li>• Nikhila Estates Pvt. Ltd</li>
                <li>• Harniks Park Pvt. Ltd</li>
                <li>• Hyper Clinresea Pvt Ltd</li>
                <li>• Havish Transport Pvt. Ltd</li>
                <li>• ACIC - KL Startups Foundation</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
