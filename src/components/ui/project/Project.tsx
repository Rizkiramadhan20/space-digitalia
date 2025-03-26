"use client"

import { useRef } from "react";
import ProjectSkelaton from "@/components/ui/project/ProjectSkelaton";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/ui/project/content/ProjectCard";
import { useResponsive, useProjectData, useProjectAnimation, getProjectColumns } from "@/components/ui/project/lib/UseManagement";
import { motion } from "framer-motion";

// Konfigurasi animasi
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Portfolio() {
    const router = useRouter();
    const leftColumnRef = useRef<HTMLDivElement>(null!);
    const rightColumnRef = useRef<HTMLDivElement>(null!);
    const leftTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const rightTimelineRef = useRef<gsap.core.Timeline | null>(null);

    const isMobile = useResponsive();
    const { projects, loading } = useProjectData();
    const { handleMouseEnter, handleMouseLeave } = useProjectAnimation(
        leftColumnRef,
        rightColumnRef,
        leftTimelineRef,
        rightTimelineRef,
        projects,
        isMobile
    );

    if (loading) {
        return <ProjectSkelaton />;
    }

    const { firstProjects, secondProjects } = getProjectColumns(projects, isMobile);

    const handleSeeMore = () => {
        router.push("/project");
    }

    return (
        <section className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="text-left lg:order-2 space-y-8">
                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 tracking-tight leading-tight"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                        >
                            Teknologi, Efisiensi, dan Inovasi dalam Satu Solusi
                        </motion.h2>
                        <motion.p
                            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                        >
                            Kami menghadirkan sebuah proyek yang menggabungkan teknologi canggih, desain modern, dan kemudahan akses dalam satu solusi. Dibangun dengan standar tinggi dan diciptakan untuk memberikan pengalaman yang seamless.
                        </motion.p>
                        <motion.button
                            onClick={handleSeeMore}
                            className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Lihat lebih banyak</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.button>
                    </div>

                    <div className="lg:order-1">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {/* Left Column */}
                            <div
                                className="flex flex-col overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(100,100,255,0.15)] backdrop-blur-sm bg-gradient-to-b from-gray-900/60 to-black/60 border border-gray-800/50"
                                style={{
                                    height: isMobile ? "400px" : "600px",
                                    maxHeight: isMobile ? "50vh" : "70vh"
                                }}
                                onMouseEnter={() => handleMouseEnter(leftTimelineRef.current)}
                                onMouseLeave={() => handleMouseLeave(leftTimelineRef.current)}
                            >
                                <div
                                    ref={leftColumnRef}
                                    className="flex flex-col gap-4 sm:gap-8 p-3 sm:p-4"
                                >
                                    {secondProjects.map((project, index) => (
                                        <ProjectCard
                                            key={`down-${project.title}-${index}`}
                                            project={project}
                                            leftTimeline={leftTimelineRef.current}
                                            rightTimeline={rightTimelineRef.current}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div
                                className="flex flex-col overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(100,100,255,0.15)] backdrop-blur-sm bg-gradient-to-b from-gray-900/60 to-black/60 border border-gray-800/50"
                                style={{
                                    height: isMobile ? "400px" : "600px",
                                    maxHeight: isMobile ? "50vh" : "70vh"
                                }}
                                onMouseEnter={() => handleMouseEnter(rightTimelineRef.current)}
                                onMouseLeave={() => handleMouseLeave(rightTimelineRef.current)}
                            >
                                <div
                                    ref={rightColumnRef}
                                    className="flex flex-col gap-4 sm:gap-8 p-3 sm:p-4"
                                >
                                    {firstProjects.map((project, index) => (
                                        <ProjectCard
                                            key={`up-${project.title}-${index}`}
                                            project={project}
                                            leftTimeline={leftTimelineRef.current}
                                            rightTimeline={rightTimelineRef.current}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}