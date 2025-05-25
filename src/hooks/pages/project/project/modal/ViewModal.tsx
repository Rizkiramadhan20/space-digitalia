"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectType } from '@/components/ui/project/types/project'
import { formatSlug } from '@/base/helper/formatSlug'

interface ViewModalProps {
    isPreviewOpen: boolean
    selectedPreview: ProjectType | null
    handlePreviewClose: () => void
}

export default function ViewModal({
    isPreviewOpen,
    selectedPreview,
    handlePreviewClose
}: ViewModalProps) {
    if (!isPreviewOpen || !selectedPreview) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999]"
            onClick={handlePreviewClose}
            style={{ position: 'fixed' }}
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
                        handlePreviewClose();
                    }
                }}
            >
                <div className="w-full max-w-7xl bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 flex flex-col max-h-[90vh]">
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
                                    <span className="opacity-75 truncate">{selectedPreview.linkPreview}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                        {/* Hero Image */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                            <Image
                                src={selectedPreview.imageUrl}
                                alt={selectedPreview.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {selectedPreview.images.map((image, index) => (
                                <motion.div
                                    key={`image-${index}`}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative aspect-video rounded-xl overflow-hidden group"
                                >
                                    <Image
                                        src={image}
                                        alt={`${selectedPreview.title} - ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content Section with Glass Morphism */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Details
                                    </h3>
                                    <div
                                        className="prose prose-invert max-w-none
                                        /* Headings */
                                        prose-h1:text-2xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6
                                        prose-h3:text-lg prose-h3:font-semibold prose-h3:text-cyan-400 prose-h3:mt-8 prose-h3:mb-4
                                        
                                        /* Paragraphs */
                                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                        
                                        /* Strong/Bold */
                                        prose-strong:text-white prose-strong:font-semibold
                                        
                                        /* Lists */
                                        prose-ol:mt-4 prose-ol:mb-6 prose-ol:space-y-3
                                        prose-li:text-gray-300 prose-li:leading-relaxed
                                        [&_li_strong]:text-cyan-400
                                        
                                        /* List Bullets */
                                        [&_li[data-list='bullet']]:relative
                                        [&_li[data-list='bullet']]:pl-6
                                        [&_li[data-list='bullet']]:before:content-['']
                                        [&_li[data-list='bullet']]:before:absolute
                                        [&_li[data-list='bullet']]:before:left-0
                                        [&_li[data-list='bullet']]:before:top-[0.6em]
                                        [&_li[data-list='bullet']]:before:h-2
                                        [&_li[data-list='bullet']]:before:w-2
                                        [&_li[data-list='bullet']]:before:rounded-full
                                        [&_li[data-list='bullet']]:before:bg-cyan-400/60

                                        [&_.ql-video]:w-full [&_.ql-video]:aspect-video [&_.ql-video]:rounded-lg [&_.ql-video]:shadow-md [&_.ql-video]:my-4 sm:[&_.ql-video]:my-6
                                        
                                        /* Remove ql-ui elements */
                                        [&_.ql-ui]:hidden"
                                        dangerouslySetInnerHTML={{ __html: selectedPreview.content }}
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Author Info with Glass Effect */}
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md">
                                    <Image
                                        src={selectedPreview.author.photoURL}
                                        alt={selectedPreview.author.name}
                                        width={56}
                                        height={56}
                                        className="rounded-full ring-2 ring-indigo-500/30"
                                    />
                                    <div>
                                        <h3 className="text-lg text-white font-medium">{selectedPreview.author.name}</h3>
                                        <p className="text-sm text-gray-400 capitalize">{selectedPreview.author.role}</p>
                                    </div>
                                </div>

                                {/* Description and Details */}
                                <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Description
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedPreview.description}
                                    </p>
                                </div>

                                {/* Technologies */}
                                {selectedPreview.frameworks && selectedPreview.frameworks.length > 0 && (
                                    <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPreview.frameworks.map((fw, index) => (
                                                <div
                                                    key={`fw-${index}`}
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
                                )}

                                {/* View Details Button */}
                                <div className='flex gap-4'>
                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        {/* Live Preview Button */}
                                        <button
                                            onClick={() => window.open(selectedPreview.linkPreview, '_blank')}
                                            className="group relative flex items-center p-4 w-full
                                                        bg-gradient-to-br from-indigo-500/10 to-cyan-500/10
                                                        hover:from-indigo-500/20 hover:to-cyan-500/20
                                                        border border-indigo-500/20 hover:border-indigo-500/40
                                                        rounded-xl transition-all duration-300"
                                        >
                                            {/* Icon */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            {/* Text */}
                                            <div className="ml-4 text-left">
                                                <p className="text-sm font-medium text-white">Live Preview</p>
                                                <p className="text-xs text-gray-400">View the live project</p>
                                            </div>
                                        </button>

                                        {/* Details Button */}
                                        <Link
                                            href={`/project/${formatSlug(selectedPreview.typeCategory)}/${formatSlug(selectedPreview.typeTitle)}/${selectedPreview.slug}`}
                                            className="group relative flex items-center p-4 w-full
                                                        bg-gradient-to-br from-indigo-500/10 to-cyan-500/10
                                                        hover:from-indigo-500/20 hover:to-cyan-500/20
                                                        border border-indigo-500/20 hover:border-indigo-500/40
                                                        rounded-xl transition-all duration-300"
                                        >
                                            {/* Icon */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            {/* Text */}
                                            <div className="ml-4 text-left">
                                                <p className="text-sm font-medium text-white">View Details</p>
                                                <p className="text-xs text-gray-400">See full project info</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
