import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectType } from '@/components/ui/project/types/project';
import { formatSlug } from '@/base/helper/formatSlug';
import { LicenseDetail, Address } from '@/hooks/pages/project/project/lib/schema';

interface License {
    title: string;
    price: number;
    licenseTitle: string;
    downloadUrl: string;
    delivery?: string;
    stock?: string;
    sold?: string;
    deliveryDays?: string;
    licenseDetails?: LicenseDetail[];
}

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPreview: ProjectType | null;
    selectedLicense: License | null;
    deliveryMethod: 'download' | 'delivery' | '';
    defaultAddress: Address | null;
    isProcessing: boolean;
    onDeliveryMethodChange: (method: 'download' | 'delivery') => void;
    onLicenseSelect: (license: License | null) => void;
    onTransaction: () => void;
}

export default function ViewModal({
    isOpen,
    onClose,
    selectedPreview,
    selectedLicense,
    deliveryMethod,
    defaultAddress,
    isProcessing,
    onDeliveryMethodChange,
    onLicenseSelect,
    onTransaction
}: ViewModalProps) {
    const router = useRouter();

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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
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
                                        { label: "Sold", value: selectedPreview.sold },
                                        { label: "Delivery", value: `${selectedPreview.delivery}` }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300">
                                            <p className="text-gray-400">{stat.label}</p>
                                            <p className="text-xl font-semibold text-white">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* License Options */}
                                <div className="space-y-6">
                                    {/* License Selection Header */}
                                    <div className="bg-gradient-to-r from-gray-800/40 to-gray-800/20 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/30">
                                        <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                                            License Type
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">Choose the perfect license for your needs</p>
                                    </div>

                                    {/* License Selector */}
                                    <div className="relative group">
                                        <select
                                            className="w-full appearance-none bg-gray-800/30 backdrop-blur-md
                                                border-2 border-gray-700/30 group-hover:border-indigo-500/50
                                                rounded-2xl p-5 pr-12 transition-all duration-300 ease-out
                                                text-gray-300 font-medium
                                                focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                                                cursor-pointer"
                                            defaultValue=""
                                            onChange={(e) => {
                                                const selected = selectedPreview.licenseDetails.find(
                                                    item => item.title === e.target.value
                                                );
                                                if (selected) {
                                                    onLicenseSelect({
                                                        title: selected.title,
                                                        price: selected.price,
                                                        licenseTitle: selected.title,
                                                        downloadUrl: selected.downloadUrl
                                                    });
                                                } else {
                                                    onLicenseSelect(null);
                                                }
                                            }}
                                        >
                                            <option value="" disabled className="text-gray-500">Select License Type</option>
                                            {selectedPreview.licenseDetails.map((item) => (
                                                <option
                                                    key={item.title}
                                                    value={item.title}
                                                    className="bg-gray-900 text-gray-300 py-2"
                                                >
                                                    {item.title} - Rp. {item.price.toLocaleString()}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Animated dropdown arrow */}
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 group-hover:from-cyan-500/30 group-hover:to-indigo-500/30 transition-all duration-300">
                                                <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Selected License Details */}
                                    {selectedLicense && (
                                        <div className="space-y-6 animate-in fade-in-50 duration-500">
                                            {/* License Card */}
                                            <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/20 backdrop-blur-xl 
                                                rounded-2xl p-6 border-2 border-gray-700/30 hover:border-indigo-500/30 
                                                transition-all duration-300 group">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20">
                                                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-cyan-400">Selected License</span>
                                                    </div>
                                                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                                                        #{selectedLicense.title}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-baseline">
                                                    <div className="space-y-1">
                                                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                                                            Rp. {selectedLicense.price.toLocaleString()}
                                                        </span>
                                                        <p className="text-xs text-gray-400">Includes all applicable taxes</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 
                                                        group-hover:from-cyan-500/20 group-hover:to-indigo-500/20 transition-all duration-300">
                                                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Method Selection */}
                                            <div className={`grid ${selectedPreview.licenseTitle.toLowerCase() === 'free' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                                                <button
                                                    onClick={() => onDeliveryMethodChange('download')}
                                                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300
                                                        ${deliveryMethod === 'download'
                                                            ? 'bg-gradient-to-br from-cyan-500 to-indigo-500 border-transparent shadow-lg shadow-cyan-500/20'
                                                            : 'bg-gray-800/30 border-gray-700/30 hover:border-indigo-500/50'
                                                        }`}
                                                >
                                                    <div className="relative z-10 p-5">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className={`p-3 rounded-xl ${deliveryMethod === 'download'
                                                                ? 'bg-white/20'
                                                                : 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 group-hover:from-cyan-500/30 group-hover:to-indigo-500/30'
                                                                } transition-all duration-300`}>
                                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className={`text-sm font-medium ${deliveryMethod === 'download' ? 'text-white' : 'text-gray-300'}`}>
                                                                    Download
                                                                </p>
                                                                <p className={`text-xs mt-1 ${deliveryMethod === 'download' ? 'text-white/80' : 'text-gray-400'}`}>
                                                                    Instant access
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 
                                                        opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                </button>

                                                {selectedPreview.licenseTitle.toLowerCase() !== 'free' && (
                                                    <button
                                                        onClick={() => onDeliveryMethodChange('delivery')}
                                                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300
                                                            ${deliveryMethod === 'delivery'
                                                                ? 'bg-gradient-to-br from-cyan-500 to-indigo-500 border-transparent shadow-lg shadow-cyan-500/20'
                                                                : 'bg-gray-800/30 border-gray-700/30 hover:border-indigo-500/50'
                                                            }`}
                                                    >
                                                        <div className="relative z-10 p-5">
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className={`p-3 rounded-xl ${deliveryMethod === 'delivery'
                                                                    ? 'bg-white/20'
                                                                    : 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 group-hover:from-cyan-500/30 group-hover:to-indigo-500/30'
                                                                    } transition-all duration-300`}>
                                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                                                    </svg>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className={`text-sm font-medium ${deliveryMethod === 'delivery' ? 'text-white' : 'text-gray-300'}`}>
                                                                        Delivery
                                                                    </p>
                                                                    <p className={`text-xs mt-1 ${deliveryMethod === 'delivery' ? 'text-white/80' : 'text-gray-400'}`}>
                                                                        {selectedLicense?.deliveryDays || '3-5'} days delivery
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 
                                                            opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Add Delivery Address Section */}
                                            {deliveryMethod === 'delivery' && (
                                                <div className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 backdrop-blur-xl 
                                                    border-2 border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20">
                                                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm font-medium text-cyan-400">Delivery Address</span>
                                                        </div>
                                                        {defaultAddress && (
                                                            <Link
                                                                href="/account/address"
                                                                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                                                            >
                                                                <span>Change</span>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                    </div>

                                                    {defaultAddress ? (
                                                        <div className="mt-6 space-y-4">
                                                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                                                                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10">
                                                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-white font-medium">{defaultAddress.fullName}</h4>
                                                                    <p className="text-gray-400 text-sm">{defaultAddress.phone}</p>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 space-y-2">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10">
                                                                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex-1 space-y-1">
                                                                        <p className="text-gray-300">{defaultAddress.streetAddress}</p>
                                                                        <p className="text-gray-300">{defaultAddress.district}, {defaultAddress.city}</p>
                                                                        <p className="text-gray-300">{defaultAddress.province}, {defaultAddress.postalCode}</p>
                                                                        {defaultAddress.details && (
                                                                            <p className="text-gray-400 text-sm mt-2 pt-2 border-t border-gray-700/30">
                                                                                {defaultAddress.details}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center py-8">
                                                            <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 mb-4">
                                                                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-400 mb-6">No default address found</p>
                                                            <Link
                                                                href="/account/address"
                                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                                                                    bg-gradient-to-r from-cyan-500 to-indigo-500 
                                                                    hover:from-cyan-600 hover:to-indigo-600
                                                                    text-white font-medium transition-all duration-300
                                                                    shadow-lg shadow-cyan-500/20"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                    />
                                                                </svg>
                                                                Add Delivery Address
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Payment Button */}
                                            <button
                                                onClick={onTransaction}
                                                disabled={isProcessing || !deliveryMethod || (deliveryMethod === 'delivery' && !defaultAddress)}
                                                className={`relative w-full overflow-hidden rounded-2xl transition-all duration-300
                                                    ${isProcessing || !deliveryMethod || (deliveryMethod === 'delivery' && !defaultAddress)
                                                        ? 'bg-gray-800/40 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600'
                                                    }`}
                                            >
                                                <div className="relative z-10 px-6 py-4 flex items-center justify-center gap-3">
                                                    {isProcessing ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                            <span className="text-white font-medium">Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span className="text-white font-medium">
                                                                {deliveryMethod ? 'Proceed to Payment' : 'Select Delivery Method'}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
                                                    opacity-0 hover:opacity-20 transition-opacity duration-300" />
                                            </button>
                                        </div>
                                    )}
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
                                            <div className="flex flex-col ml-11 text-left">
                                                <span className="text-sm font-medium text-white">Live Preview</span>
                                                <span className="text-xs text-gray-400">View live demo</span>
                                            </div>

                                            {/* Arrow Icon */}
                                            <svg className="absolute right-4 w-4 h-4 text-gray-400 
                                                group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Project Details Button */}
                                        <button
                                            onClick={() => router.push(`/project/${formatSlug(selectedPreview.typeCategory)}/${formatSlug(selectedPreview.typeTitle)}/${selectedPreview.slug}`)}
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
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex flex-col ml-11 text-left">
                                                <span className="text-sm font-medium text-white">Project Details</span>
                                                <span className="text-xs text-gray-400">View full information</span>
                                            </div>

                                            {/* Arrow Icon */}
                                            <svg className="absolute right-4 w-4 h-4 text-gray-400 
                                                group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
