import React from 'react';

import { motion } from 'framer-motion';

import Image from 'next/image';

import Link from 'next/link';

import { ProjectType } from '@/components/ui/project/types/project';

import { formatSlug } from '@/base/helper/formatSlug';

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPreview: ProjectType;
}

export default function ViewModal({
    isOpen,
    onClose,
    selectedPreview,
}: ViewModalProps) {

    if (!isOpen || !selectedPreview) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999] scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
            onClick={onClose}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span className="opacity-75 truncate">{selectedPreview.linkPreview}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                        {/* Hero Image */}
                        <div className="relative aspect-video w-full overflow-hidden">
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-6">
                            {selectedPreview.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative aspect-video rounded-xl overflow-hidden group"
                                >
                                    <Image
                                        src={image}
                                        alt={`${selectedPreview.title} - ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                                {/* Technologies */}
                                <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPreview.frameworks?.map((fw, index) => (
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
                                        { label: "Downloads", value: selectedPreview.downloads },
                                        { label: "Stock", value: selectedPreview.stock },
                                        { label: "Sold", value: selectedPreview.sold }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300">
                                            <p className="text-sm text-gray-400">{stat.label}</p>
                                            <p className="text-xl font-semibold text-white">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

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
                                            <div className="absolute left-4 p-2 rounded-lg 
                                                bg-gradient-to-r from-indigo-500 to-cyan-500
                                                group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>

                                            {/* Text Content */}
                                            <div className="ml-12">
                                                <p className="text-white font-medium">Live Preview</p>
                                                <p className="text-sm text-gray-400">View demo</p>
                                            </div>
                                        </button>

                                        {/* View Details Button */}
                                        <Link
                                            href={`/project/${formatSlug(selectedPreview.typeCategory)}/${formatSlug(selectedPreview.typeTitle)}/${selectedPreview.slug}`}
                                            className="group relative flex items-center p-4 w-full
                                                    bg-gradient-to-br from-indigo-500/10 to-cyan-500/10
                                                    hover:from-indigo-500/20 hover:to-cyan-500/20
                                                    border border-indigo-500/20 hover:border-indigo-500/40
                                                    rounded-xl transition-all duration-300"
                                        >
                                            {/* Icon */}
                                            <div className="absolute left-4 p-2 rounded-lg 
                                                bg-gradient-to-r from-indigo-500 to-cyan-500
                                                group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>

                                            {/* Text Content */}
                                            <div className="ml-12">
                                                <p className="text-white font-medium">View Details</p>
                                                <p className="text-sm text-gray-400">Full information</p>
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
