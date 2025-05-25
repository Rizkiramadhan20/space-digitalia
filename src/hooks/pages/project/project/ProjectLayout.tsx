"use client"

import React, { Fragment, useState, useEffect } from 'react'

import { ProjectType } from '@/components/ui/project/types/project';

import { FetchProject } from '@/hooks/pages/project/project/lib/FetchProject';

import ProjectSkeleton from '@/hooks/pages/project/project/ProjectSkelaton';

import Image from 'next/image';

import { TbEyeShare } from "react-icons/tb";

import { FaExternalLinkAlt } from "react-icons/fa";

import { parseISO, compareDesc, format, formatDistanceToNow, differenceInDays } from 'date-fns';

import { GiSettingsKnobs } from "react-icons/gi";

import Link from 'next/link';

import { formatSlug } from '@/base/helper/formatSlug';

import ReactPaginate from 'react-paginate';

import ViewModal from './modal/ViewModal';

export default function ProjectLayout() {
    const [project, setProject] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

    // Modal states
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState<ProjectType | null>(null);

    // Filter projects with null checks
    const filteredProjects = project.filter(item => {
        const categoryMatch = selectedCategory === 'all' ||
            (item.typeCategory && item.typeCategory.toLowerCase() === selectedCategory.toLowerCase());

        const typeMatch = selectedType === 'all' ||
            (item.typeTitle && item.typeTitle.toLowerCase() === selectedType.toLowerCase());

        return categoryMatch && typeMatch;
    });

    const filteredProductsCount = filteredProjects.length;

    // Fetch projects
    useEffect(() => {
        const unsubscribe = FetchProject(newProject => {
            setProject([...newProject].sort((a, b) =>
                compareDesc(
                    parseISO(a.createdAt as unknown as string),
                    parseISO(b.createdAt as unknown as string)
                )
            ));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Get filtered and sorted projects with pagination
    const getFilteredAndSortedProjects = () => {
        const result = filteredProjects;
        const offset = currentPage * itemsPerPage;
        return result.slice(offset, offset + itemsPerPage);
    };

    // Get categories and types with null checks
    const categories = Array.from(new Set(project
        .filter(item => item.typeCategory)
        .map(item => item.typeCategory)
    ));

    const types = Array.from(new Set(project
        .filter(item =>
            item.typeTitle &&
            (selectedCategory === 'all' ||
                (item.typeCategory && item.typeCategory.toLowerCase() === selectedCategory.toLowerCase()))
        )
        .map(item => item.typeTitle)
    ));

    // Reset selected type when category changes
    useEffect(() => {
        setSelectedType('all');
    }, [selectedCategory]);

    // Add new state for managing dropdown visibility
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as Element).closest('.dropdown')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const itemsPerPage = 9;

    // Add pagination handler
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        // Scroll to top smoothly when changing page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate total pages
    const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);

    // Modal handlers
    const handlePreviewOpen = (project: ProjectType) => {
        setSelectedPreview(project);
        setIsPreviewOpen(true);
    };

    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
        setSelectedPreview(null);
    };

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isPreviewOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isPreviewOpen]);

    if (loading) {
        return <ProjectSkeleton />;
    }
    return (
        <Fragment>
            <section className='min-h-full py-24 bg-gradient-to-b from-gray-50/40 via-white to-white relative'>
                <div className='container px-4 xl:px-10'>
                    {/* Modern Filter Bar */}
                    <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl 
                        py-6 md:py-8 px-4 md:px-8 
                        bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/50 
                        transform -translate-y-1/2 z-10'>
                        <div className="flex flex-col items-start justify-start w-full gap-4 md:gap-6">
                            {/* Filter Buttons Group */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full flex-wrap">
                                {/* Filter Group */}
                                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-3">
                                    {/* Category Filter */}
                                    <div className="dropdown relative w-fit sm:w-auto">
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl
                                            bg-gray-50/80 hover:bg-gray-100 active:bg-gray-200
                                            transition-all duration-300 ease-in-out">
                                            <div className="flex items-center gap-2">
                                                <GiSettingsKnobs className='text-lg text-gray-600' />
                                                <span className='text-sm font-medium text-gray-700'>
                                                    {selectedCategory === 'all'
                                                        ? 'All Categories'
                                                        : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                                                </span>
                                            </div>
                                        </button>

                                        <div className={`dropdown-content absolute z-50 mt-2 bg-white/95 backdrop-blur-md 
                                            rounded-xl shadow-xl border border-gray-100/50 p-2 
                                            w-full sm:w-[260px]
                                            transform origin-top transition-all duration-300
                                            ${openDropdown === 'category' ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                                            <button
                                                onClick={() => setSelectedCategory('all')}
                                                className={`flex items-center gap-2 w-full text-left px-4 py-3 text-sm 
                                                    rounded-xl transition-all duration-300 
                                                    ${selectedCategory === 'all'
                                                        ? 'bg-blue-600 text-white font-medium shadow-md'
                                                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                                                    }`}
                                            >
                                                All Categories
                                            </button>

                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`flex items-center gap-2 w-full text-left px-4 py-3 text-sm 
                                                        rounded-xl transition-all duration-300 capitalize
                                                        ${selectedCategory === category
                                                            ? 'bg-blue-600 text-white font-medium shadow-md'
                                                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                                                        }`}
                                                >
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Type Filter */}
                                    <div className="dropdown relative w-fit sm:w-auto">
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl
                                            bg-gray-50/80 hover:bg-gray-100 active:bg-gray-200
                                            transition-all duration-300 ease-in-out">
                                            <div className="flex items-center gap-2">
                                                <GiSettingsKnobs className='text-lg text-gray-600' />
                                                <span className='text-sm font-medium text-gray-700 capitalize'>
                                                    {selectedType === 'all' ? 'All Types' : selectedType}
                                                </span>
                                            </div>
                                        </button>

                                        <div className={`dropdown-content absolute z-50 mt-2 bg-white/95 backdrop-blur-md 
                                            rounded-xl shadow-xl border border-gray-100/50 p-2 
                                            w-full sm:w-[260px]
                                            transform origin-top transition-all duration-300
                                            ${openDropdown === 'type' ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                                            <button
                                                onClick={() => setSelectedType('all')}
                                                className={`flex items-center gap-2 w-full text-left px-4 py-3 text-sm 
                                                    rounded-xl transition-all duration-300 
                                                    ${selectedType === 'all'
                                                        ? 'bg-blue-600 text-white font-medium shadow-md'
                                                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                                                    }`}
                                            >
                                                All Types
                                            </button>
                                            {types.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setSelectedType(type)}
                                                    className={`flex items-center gap-2 w-full text-left px-4 py-3 text-sm 
                                                        rounded-xl transition-all duration-300 capitalize
                                                        ${selectedType === type
                                                            ? 'bg-blue-600 text-white font-medium shadow-md'
                                                            : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Products Counter Badge */}
                                <div className='text-sm font-medium text-gray-700 bg-gray-50/80 
                                    px-4 py-2.5 rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start'>
                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                    <p>Showing {filteredProductsCount} Project</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modern Grid Layout */}
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5'>
                        {getFilteredAndSortedProjects().map((item) => (
                            <div key={item.id} className='group bg-white rounded-3xl shadow-sm 
                                hover:shadow-xl overflow-hidden transition-all duration-500 
                                border border-gray-100/50 hover:border-gray-200
                                hover:-translate-y-1 hover:scale-[1.02]'>
                                <div className='relative aspect-[16/10] overflow-hidden'>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className='object-cover w-full h-full transform 
                                            group-hover:scale-110 transition-transform duration-700 ease-out'
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-4 py-2 
                                        bg-white/90 backdrop-blur-md text-gray-800 
                                        capitalize rounded-xl text-sm font-medium 
                                        shadow-sm border border-gray-100/50
                                        hover:bg-white hover:shadow-md transition-all duration-300">
                                        {item.typeCategory}
                                    </div>

                                    <div className={`absolute top-4 right-4 px-4 py-2 
                                        ${item.statusProject === 'development'
                                            ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                                            : 'bg-green-500/20 text-green-600 border-green-500/30'} 
                                        backdrop-blur-md capitalize rounded-xl text-sm font-medium 
                                        shadow-sm border transition-all duration-300
                                        hover:shadow-md flex items-center gap-2`}>
                                        {item.statusProject === 'development' ? (
                                            <>
                                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                                Development
                                            </>
                                        ) : (
                                            <>
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                Finished
                                            </>
                                        )}
                                    </div>

                                    {/* Modern Overlay with Glassmorphism */}
                                    <div className="overlay absolute inset-0 
                                        bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                                        flex items-center justify-center opacity-0 
                                        group-hover:opacity-100 transition-all duration-500">
                                        <div className="flex items-center gap-8">
                                            <button
                                                onClick={() => handlePreviewOpen(item)}
                                                className='flex items-center flex-col gap-3 hover:scale-110 transition-all duration-300 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                                            >
                                                <span className='p-4 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/40 transition-colors duration-300 shadow-lg'>
                                                    <TbEyeShare className='text-2xl text-white' />
                                                </span>
                                                <p className='text-sm text-white font-medium tracking-wide'>Preview</p>
                                            </button>

                                            <Link href={`/project/${formatSlug(item.typeCategory)}/${formatSlug(item.typeTitle)}/${item.slug}`} className='flex items-center flex-col gap-3 hover:scale-110 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'>
                                                <span className='p-4 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/40 transition-colors duration-300 shadow-lg'>
                                                    <FaExternalLinkAlt className='text-xl text-white' />
                                                </span>
                                                <p className='text-sm text-white font-medium tracking-wide'>Details</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 space-y-4">
                                    {/* Rating Display */}
                                    <div className='flex items-center gap-2'>
                                        <div className='inline-flex items-center gap-1 text-sm text-gray-500 
                                            bg-gray-50 px-3 py-1.5 rounded-lg'>
                                            <span>{(item.averageRating || 0).toFixed(1)}</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-3 h-3 ${i < Math.round(item.averageRating || 0) ? 'text-yellow-500' : 'text-gray-400'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <span className='inline-block text-sm text-gray-500 
                                            bg-gray-50 px-3 py-1.5 rounded-lg'>
                                            ({item.ratingCount || 0} ratings)
                                        </span>
                                    </div>

                                    {/* Title with improved hover effect */}
                                    <h3 className='text-lg font-semibold text-gray-900 
                                        group-hover:text-blue-600 transition-all duration-300 
                                        hover:tracking-wide'>
                                        {item.title}
                                    </h3>

                                    {/* Date with subtle background */}
                                    <span className='inline-block text-sm text-gray-500 
                                        bg-gray-50 px-3 py-1.5 rounded-lg'>
                                        {differenceInDays(new Date(), parseISO(item.createdAt as unknown as string)) < 30
                                            ? formatDistanceToNow(parseISO(item.createdAt as unknown as string), { addSuffix: true })
                                            : format(parseISO(item.createdAt as unknown as string), 'MMMM d, yyyy')}
                                    </span>

                                    {/* Modernized Author Info Card */}
                                    <div className='flex items-center gap-4 
                                        bg-gradient-to-r from-gray-50/80 to-gray-50/40
                                        backdrop-blur-sm rounded-2xl p-4 
                                        border border-gray-100/80
                                        hover:border-blue-100/80
                                        hover:from-blue-50/40 hover:to-white
                                        transition-all duration-300 ease-in-out
                                        shadow-sm hover:shadow-md'>
                                        <div className='relative w-12 h-12 rounded-full overflow-hidden 
                                            ring-2 ring-white/80 ring-offset-2 ring-offset-gray-50/40
                                            shadow-sm transform 
                                            group-hover:scale-105 transition-all duration-300'>
                                            <Image
                                                src={item.author.photoURL}
                                                alt={item.author.name}
                                                fill
                                                className='object-cover'
                                            />
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <h3 className='text-sm font-semibold text-gray-900 
                                                group-hover:text-blue-700 transition-colors duration-300'>
                                                {item.author.name}
                                            </h3>
                                            <p className='text-xs text-gray-500 group-hover:text-gray-600'>
                                                {item.author.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {pageCount > 1 && (
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
                            {/* Page indicator */}
                            <div className="text-sm font-medium text-gray-600">
                                Page {currentPage + 1} of {pageCount}
                            </div>

                            <ReactPaginate
                                previousLabel={
                                    <span className="flex items-center gap-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </span>
                                }
                                nextLabel={
                                    <span className="flex items-center gap-1">
                                        Next
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                }
                                breakLabel="..."
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                containerClassName="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-gray-100/50"
                                pageClassName="rounded-xl overflow-hidden"
                                pageLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                previousClassName="rounded-xl overflow-hidden"
                                previousLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center"
                                nextClassName="rounded-xl overflow-hidden"
                                nextLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center"
                                breakClassName="px-4 py-2 text-sm font-medium text-gray-700"
                                activeClassName="bg-blue-600 text-white hover:bg-blue-700"
                                activeLinkClassName="!text-white hover:!text-white hover:!bg-transparent"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Preview Modal */}
            <ViewModal
                isPreviewOpen={isPreviewOpen}
                selectedPreview={selectedPreview}
                handlePreviewClose={handlePreviewClose}
            />
        </Fragment>
    )
}