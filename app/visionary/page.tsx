"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';


const VisionaryPage = () => {
    return (
        <div className="min-h-screen bg-[#fdf2f8] text-black pt-16 md:pt-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-32 relative z-10">
                {/* Header with Decorative Lines */}
                <div className="flex items-center justify-center gap-6 mb-4 md:mb-16 px-4">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-[#f97316] opacity-40"></div>
                    <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent uppercase tracking-[0.15em] whitespace-nowrap drop-shadow-sm">
                        Our Visionary
                    </h1>
                    <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-[#f97316] opacity-40"></div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full max-w-[400px] aspect-[1/1] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] mb-6 md:mb-8 border-4 border-[#f97316] group"
                    >
                        <Image
                            src="/chief patrons/Smt. KONERU SIVA KANCHANA LATHA.jpg"
                            alt="Smt Koneru Siva Kanchana Latha"
                            fill
                            className="object-cover transition-transform duration-1000"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white px-10 py-6 rounded-2xl text-center shadow-lg shadow-gray-200/50 border-4 border-[#f97316]"
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
                            Smt Koneru Siva Kanchana Latha
                        </h2>
                        <p className="text-[#f97316] font-bold tracking-widest uppercase text-xs md:text-sm">
                            Honourable Secretary, KLEF
                        </p>
                    </motion.div>
                </div>

                {/* Biography Content */}
                <div className="space-y-16 text-gray-700 leading-relaxed text-justify px-2">
                    {/* Initial Bio */}
                    <div className="space-y-8 text-lg font-medium">
                        <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#f97316] first-letter:mr-3 first-letter:float-left">
                            <strong>Smt Koneru Siva Kanchana Latha</strong> is an Indian educationalist, social entrepreneur, and philanthropist who is dedicated to empowering women in society. Born in 1961 in Vijayawada, Andhra Pradesh, India, Kanchana Latha was raised in a family that valued education and social responsibility. Her parents, K. Nagalingeswara Rao and K. Rajeswari, instilled in her the importance of giving back to the community and using her education to make a positive impact on society.
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
                    </div>

                    {/* CONTRIBUTIONS AT KLEF */}
                    <section className="group">
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>CONTRIBUTIONS AT KLEF</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="space-y-6 text-gray-600 font-medium">
                            <p>
                                Kanchana Latha's role as the Secretary of Koneru Lakshmaiah Education Foundation (KLEF) is a prominent member of the foundation's leadership team. KLEF is a pioneering educational institution with campuses in Andhra Pradesh and Telangana, offering a range of courses in sciences, engineering, technology, architecture, pharmacy, agriculture, arts, commerce, management, hotel management, law, and other fields.
                            </p>
                            <p>
                                KLEF was established as the Koneru Lakshmaiah College of Engineering in 1980, and since then, it has grown to become a deemed-to-be university and a recognized Category 1 institution by the Ministry of Education in India. As the Secretary of KLEF, Kanchana Latha has played a significant role in the institution's growth and development, ensuring that it continues to provide quality education to students from all walks of life.
                            </p>
                            <p>
                                Kanchana Latha's work in the field of education and social welfare has earned her several accolades, including the Mahila Shiromani Award and the Women Achiever's Award, among others. Her dedication to promoting education and empowering women has inspired many, and she continues to be a beacon of hope for those seeking to make a positive impact on society.
                            </p>
                        </div>
                    </section>

                    {/* LEADERSHIP RESPONSIBILITIES */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>LEADERSHIP RESPONSIBILITIES</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <p className="text-gray-600 font-medium">
                            As the Secretary of KLEF, this individual plays a critical role in managing the operations of the foundation. She oversee a range of administrative functions, and guide the teams to develop and implement strategies for the long-term growth and success of the institution. Under Kanchana Latha's leadership, KLEF has also expanded its focus on social responsibility and community development, through various initiatives such as providing education and vocational training to underprivileged women, supporting rural development projects, and promoting environmental sustainability.
                        </p>
                    </section>

                    {/* FOREIGN VISITS */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>FOREIGN VISITS</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="space-y-6 text-gray-600 font-medium">
                            <p>
                                Smt Kanchana Latha is a well-travelled individual with a keen interest in exploring different cultures, educational systems, and environmental conservation practices. She has visited more than 50 countries around the world, including the United States, the United Kingdom, Australia, Singapore, and Malaysia, among others. During her travels, she has explored the prevailing cultures, educational reforms, and lifestyles of women in these countries, and has gained valuable insights into their social and economic systems.
                            </p>
                            <p>
                                In addition to her travels, Kanchana Latha has also participated in various national and international conferences related to a wide range of topics, including Crafts, Culture, urban gardening, women empowerment, and women’s health. Her commitment to promoting women's empowerment is particularly noteworthy, as she has dedicated significant time and resources to supporting women's health and participating in initiatives and events that promote gender equality and empowerment.
                            </p>
                            <p>
                                Kanchana Latha is a respected personality in the fields of education, social entrepreneurship, and philanthropy, and her work has made a significant impact on society. Her dedication to promoting education, social welfare, and environmental conservation has earned her numerous accolades and awards, and she continues to inspire others with her work.
                            </p>
                        </div>
                    </section>

                    {/* SOCIAL MEMBERSHIPS */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>SOCIAL MEMBERSHIPS</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="space-y-6 text-gray-600 font-medium">
                            <p>
                                Kanchana Latha's commitment to promoting social welfare and empowering women is reflected in her membership of various organizations. She is a member of Association of Lady Entrepreneurs of Andhra Pradesh [ALEAP] and also member of many NGO organisations in combined Andhra Pradesh. She is very well-known for her philanthropic work in various fields though these organisations. She also participates in Women Empowerment Clubs, which focus on promoting gender equality and empowerment, and has been associated with the Crafts Council of Andhra Pradesh, which works towards preserving traditional handicrafts and promoting the livelihoods of artisans. She is also holding a position as Honourable Vice President in Rose Society.
                            </p>
                            <p>
                                Through her involvement in these organizations, Kanchana Latha has been able to make a significant impact on society and inspire others to contribute towards social welfare and empowerment. Her work in promoting women's empowerment and preserving traditional handicrafts is particularly noteworthy, and she continues to be an active participant in various events and initiatives related to these fields.
                            </p>
                            <p>
                                Apart from her role at KLEF, the Secretary is also an active member of the AP Craft Council, she supports, promote and preserve traditional arts and crafts in Andhra Pradesh. As a member of this council, she is passionate about preserving and promoting the rich cultural heritage of the state. She believes in developing strong relationships, compassion and empathy for her members and she has a passion and commitment in broadening and diversifying the audience for craft and concentrates on reviving, creating, and maintaining quality craft.
                            </p>
                        </div>
                    </section>

                    {/* KEY CONTRIBUTOR OF WOMEN TECHNOLOGY PARK */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>KEY CONTRIBUTOR OF WOMEN TECHNOLOGY PARK</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="space-y-6 text-gray-600 font-medium">
                            <p>
                                As a part of Women Technology Park supported by Ministry of Science and Technology, Government of India (2016-2021) she supported the local women in skill development to work for Kondapalli toys and Etikkopaka toys which results in increased production quantities manifold after her design intervention. She personally supported in conducting training programs for women on rope making using coir, food processing, development of bio-feed, bio-fertilizer, cotton weaving cluster with dyeing and printing, and in making handloom sarees. The centre is self-sustained now benefitting local women with enhanced livelihoods.
                            </p>
                            <p>
                                Mrs. Kanchana Latha Koneru is a remarkable individual who has made a significant impact in the fields of design and education. Her design intervention in Kondapalli and Etikkopaka has resulted in a manifold increase in production quantities, which is a testament to her creativity and vision. As a result of her efforts, local artisans have been able to expand their businesses and improve their livelihoods.
                            </p>
                            <p>
                                Mrs. Kanchana Latha Koneru's contributions to the empowerment of women in the Guntur district of Andhra Pradesh, India, are truly remarkable. Her efforts have led to the establishment of the Women Technology Park at Vaddeswaram, which provides local women with training and opportunities to develop skills in a variety of industries.
                            </p>
                        </div>
                    </section>

                    {/* VILLAGE REVOLUTION */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>VILLAGE REVOLUTION – REMARKABLE OUTCOMES</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="space-y-6 text-gray-600 font-medium">
                            <p>
                                Mrs. Kanchana Latha Koneru's contributions to the development of rural communities in Andhra Pradesh are truly remarkable. Her efforts to initiate the Smart Village Revolution as part of the Corporate Social Responsibility (CSR) program of KLEF have led to the transformation of about 90 villages into smart villages.
                            </p>
                            <p>
                                Under her leadership, these villages have been able to overcome poverty and underdevelopment by adopting innovative solutions in the areas of healthcare, education, sanitation, and technology. In addition to providing hygienic drinking water to these villages, Mrs. Koneru has also facilitated the provision of computer systems and training to Village Panchayat officers, enabling them to speed up their work and deliver better services to the community.
                            </p>
                            <p>
                                Mrs. Koneru's vision and leadership have been instrumental in driving the Smart Village Revolution program and transforming these villages into models of development. Her commitment to rural communities and her efforts to empower them with the tools and resources they need to thrive are truly inspiring.
                            </p>
                        </div>
                    </section>

                    {/* AWARDS AND HONORS */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>AWARDS AND HONORS</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "Bharat Jyothi Award from International Integrity Peace & Friendship in 1999",
                                "Uttama Mahila Award from Sri Devi Samskruthika Sankhshma Sangam in 2021",
                                "Received Award from Shri Nara Chandra Babu Naidu, Chief Minister of Andhra Pradesh under Individual Category for supporting the Green Initiatives",
                                "Felicitation by KL Alumni Groups in Silver Jubilee Functions of batches (from 2008 onwards till date)",
                                "She trekked NATU LA at 14150 feet above sea level on Old Silk Route from India to China",
                                "Received Award from Shri R. Subrahmanyam, Secretary, Department of Higher Education, at the AICTE Auditorium, New Delhi",
                                "Represented KLEF and received award from Ministry of Human Resources Development (MHRD), Government of India for Swachata Rankings in 2017, 2018, 2019",
                                "Received an award from Chairman, AICTE for Clean and Green Campus under educational institutions category"
                            ].map((award, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 bg-white p-4 rounded-xl border-l-4 border-[#f97316] shadow-sm"
                                >
                                    <ChevronRight className="w-5 h-5 text-[#f97316] mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 font-bold text-sm md:text-base">{award}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* CHARITY */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>CHARITY - VILLAGE ADOPTION AND SOCIAL SERVICE</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <p className="text-gray-600 font-medium">
                            She adopted 8 villages and was instrumental in converting them as smart villages. She supported installation of drip irrigation projects to conserve the water, installation of solar pump sets, and providing solar invertors to avoid unprecedented power cuts, establishing common computer training centres for village students’ education, aid towards of hygienic drinking water and not limited too. She is feeding daily 200 old aged and needy people at her house for last 7 years.
                        </p>
                    </section>

                    {/* CORPORATE PRESENCE */}
                    <section>
                        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent mb-8 uppercase tracking-widest flex items-center gap-4">
                            <span>CORPORATE PRESENCE</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[#f97316]/30 to-transparent"></div>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                "Director of Ind Aqua Ltd",
                                "Raja Harin Estates Pvt. Ltd",
                                "Surya Havish Estates Pvt. Ltd",
                                "Nikhila Estates Pvt. Ltd",
                                "Harniks Park Pvt. Ltd",
                                "Hyper Clinresea Pvt Ltd",
                                "Havish Transport Pvt. Ltd",
                                "ACIC - KL Startups Foundation"
                            ].map((corp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 bg-white p-4 rounded-xl text-[#f97316] border border-gray-100 shadow-sm"
                                >
                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-black text-xs md:text-sm uppercase tracking-tight">{corp}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default VisionaryPage;
