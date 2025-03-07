"use client"

import { motion } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import toast from 'react-hot-toast';

import { ProjectModalProps } from "@/components/ui/project/lib/schema";

import { formatSlug } from '@/base/helper/formatSlug';

import { Framework } from "@/components/ui/project/lib/schema";

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(project.linkPreview);
            setIsCopied(true);
            toast.success('URL copied to clipboard!', {
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                iconTheme: {
                    primary: '#4ade80',
                    secondary: '#333',
                },
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy URL', {
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="container mx-auto min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation();
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                    {/* URL Bar */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 overflow-x-auto sm:overflow-x-hidden scrollbar-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 flex items-center px-4 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                    </svg>
                                    <span className="opacity-75 truncate">{project.linkPreview}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCopyUrl}
                                className="px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                            >
                                {isCopied ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                        {/* Hero Image */}
                        <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-6">
                            {project.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative aspect-video rounded-xl overflow-hidden group"
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.title} - ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content Section with Glass Morphism */}
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Author Info with Glass Effect */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md">
                                    <Image
                                        src={project.author.photoURL}
                                        alt={project.author.name}
                                        width={56}
                                        height={56}
                                        className="rounded-full ring-2 ring-indigo-500/30"
                                    />
                                    <div>
                                        <h3 className="text-lg text-white font-medium">{project.author.name}</h3>
                                        <p className="text-sm text-gray-400 capitalize">{project.author.role}</p>
                                    </div>
                                </div>

                                {/* Description and Details */}
                                <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Description</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Details
                                    </h3>
                                    <div
                                        className="prose prose-invert max-w-none
                                        prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6
                                        prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-200 prose-h3:mt-8 prose-h3:mb-4
                                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base
                                        prose-ol:mt-4 prose-ol:space-y-3 prose-ol:list-none prose-ol:pl-0
                                        prose-li:text-gray-300 prose-li:relative prose-li:pl-6
                                        prose-strong:font-semibold prose-strong:text-white
                                        [&_li_strong]:text-cyan-400 [&_h3_strong]:text-inherit
                                        [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 
                                        [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:mt-2.5
                                        [&_li]:before:rounded-full [&_li]:before:bg-cyan-400
                                        space-y-4 [&_ol]:space-y-3
                                        [&_li]:hover:before:scale-125 [&_li]:before:transition-transform
                                        [&_strong]:transition-colors [&_strong]:duration-200
                                        [&_li:hover_strong]:text-cyan-300 [&_li:hover]:text-white"
                                        dangerouslySetInnerHTML={{ __html: project.content }}
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Technologies */}
                                <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.frameworks?.map((fw: Framework, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700/30 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
                                            >
                                                <Image
                                                    src={fw.imageUrl}
                                                    alt={fw.title}
                                                    width={20}
                                                    height={20}
                                                    className="rounded-full"
                                                />
                                                <span className="text-gray-300 text-sm">{fw.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Downloads", value: project.downloads },
                                        { label: "Stock", value: project.stock },
                                        { label: "Sold", value: project.sold },
                                        { label: "Delivery", value: `${project.delivery}` }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300">
                                            <p className="text-gray-400">{stat.label}</p>
                                            <p className="text-xl font-semibold text-white">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Range Card */}
                                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 via-gray-800/20 to-gray-800/10 border border-gray-700/30 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300 overflow-hidden group">
                                    {/* Background Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Decorative Elements */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
                                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>

                                    <div className="relative">
                                        <h3 className="text-xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Harga Mulai dari
                                        </h3>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                            {/* Starting Price */}
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-400 mb-1">
                                                    {project.licenseDetails.length > 1 ? "Starting from" : "Price"}
                                                </span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-sm font-medium text-indigo-400">Rp</span>
                                                    <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                        {Math.min(...project.licenseDetails.map(l => l.price)).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Separator and Maximum Price - Only show if there are multiple prices */}
                                            {project.licenseDetails.length > 1 && (
                                                <>
                                                    <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-500/20 to-transparent"></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-400 mb-1">Up to</span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-sm font-medium text-cyan-400">Rp</span>
                                                            <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                                                                {Math.max(...project.licenseDetails.map(l => l.price)).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Additional Info Badge - Only show if there are multiple prices */}
                                        {project.licenseDetails.length > 1 && (
                                            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-gray-300">Harga bervariasi berdasarkan jenis lisensi</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Lihat Detail
                                    </h3>

                                    <Link href={`/project/${formatSlug(project.typeTitle)}/${project.slug}`} className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900">
                                        <span>Lihat Detail</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};