"use client"
import React, { useEffect, useState, Fragment } from 'react'

import { FetchTypeTitle } from '@/hooks/pages/project/typeTitle/lib/FetchTypeTitle'

import { ProjectType } from '@/components/ui/project/types/project'

import ProjectTypeTitleSkelaton from '@/hooks/pages/project/typeTitle/ProjectTypeTitleSkelaton'

import Image from 'next/image'

import { GiSettingsKnobs } from "react-icons/gi";

import ReactPaginate from "react-paginate"

import Link from 'next/link'

import { FaExternalLinkAlt } from 'react-icons/fa'

import { format, formatDistanceToNow, differenceInDays } from 'date-fns'

import { formatSlug } from '@/base/helper/formatSlug'

import { TbEyeShare } from "react-icons/tb";

import ViewModal from './modal/ViewModal';

export default function ProjectTypeTitleLayout({ typeTitle }: { typeTitle: string }) {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(0)

    const itemsPerPage = 9

    // Add new state for preview modal
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [selectedPreview, setSelectedPreview] = useState<ProjectType | null>(null)

    useEffect(() => {
        const unsubscribe = FetchTypeTitle(typeTitle, (data) => {
            try {
                setProjects([...data].sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                    return dateB.getTime() - dateA.getTime();
                }));
                setIsLoading(false);
            } catch (error) {
                console.error('Error sorting projects:', error);
                setProjects(data);
                setIsLoading(false);
            }
        })

        return () => unsubscribe()
    }, [typeTitle])

    // Simplified filter logic - show all projects
    const filteredProjects = projects;
    const filteredProductsCount = filteredProjects.length;

    // Add pagination logic
    const getFilteredAndSortedProjects = () => {
        const result = filteredProjects;
        const offset = currentPage * itemsPerPage;
        return result.slice(offset, offset + itemsPerPage);
    }

    // Add pagination handler
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const pageCount = Math.ceil(filteredProjects.length / itemsPerPage)

    // Add preview handlers
    const handlePreviewOpen = (project: ProjectType) => {
        setSelectedPreview(project)
        setIsPreviewOpen(true)
    }

    const handlePreviewClose = () => {
        setIsPreviewOpen(false)
        setSelectedPreview(null)
    }

    // Add effect to prevent background scroll when modal is open
    useEffect(() => {
        if (isPreviewOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isPreviewOpen])

    if (isLoading) {
        return <ProjectTypeTitleSkelaton />
    }

    return (
        <Fragment>
            <section className="min-h-full py-24 bg-gradient-to-b from-gray-50/40 via-white to-white relative">
                <div className="container px-4 xl:px-10 mx-auto max-w-[1400px]">
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
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl
                                                bg-gray-50/80 hover:bg-gray-100 active:bg-gray-200
                                                transition-all duration-300 ease-in-out">
                                            <div className="flex items-center gap-2">
                                                <GiSettingsKnobs className='text-lg text-gray-600' />
                                                <span className='text-sm font-medium text-gray-700 capitalize'>
                                                    {typeTitle.replace(/-/g, ' ')}
                                                </span>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Type Filter */}
                                    <div className="dropdown relative w-fit sm:w-auto">
                                        <button
                                            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl
                                                bg-gray-50/80 hover:bg-gray-100 active:bg-gray-200
                                                transition-all duration-300 ease-in-out">
                                            <div className="flex items-center gap-2">
                                                <GiSettingsKnobs className='text-lg text-gray-600' />
                                                <span className='text-sm font-medium text-gray-700 capitalize'>
                                                    {typeTitle.replace(/-/g, ' ')}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Products Counter Badge */}
                                <div className='text-sm font-medium text-gray-700 bg-gray-50/80 
                                        px-4 py-2.5 rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start'>
                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                    <p className='capitalize'>Showing {filteredProductsCount} Project With Type {typeTitle.replace(/-/g, ' ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5'>
                        {getFilteredAndSortedProjects().map((item) => {
                            // Add safe date handling
                            const createdDate = item.createdAt ? new Date(item.createdAt) : null;
                            const isValidDate = createdDate && !isNaN(createdDate.getTime());

                            return (
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

                                        {/* Status Badge */}
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

                                                <Link href={`/project/${formatSlug(item.typeCategory)}/${formatSlug(typeTitle)}/${item.slug}`}
                                                    className='flex items-center flex-col gap-3 hover:scale-110 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'>
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
                                        {/* Title with improved hover effect */}
                                        <h3 className='text-lg font-semibold text-gray-900 
                                            group-hover:text-blue-600 transition-all duration-300 
                                            hover:tracking-wide'>
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className='text-gray-600 text-sm line-clamp-2'>
                                            {item.description}
                                        </p>

                                        {/* Date with subtle background and error handling */}
                                        <span className='inline-block text-sm text-gray-500 
                                            bg-gray-50 px-3 py-1.5 rounded-lg'>
                                            {isValidDate ? (
                                                differenceInDays(new Date(), createdDate) < 30
                                                    ? formatDistanceToNow(createdDate, { addSuffix: true })
                                                    : format(createdDate, 'MMMM d, yyyy')
                                            ) : (
                                                'Date not available'
                                            )}
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
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 px-4 xl:px-10 justify-between items-center">
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

            {/* Add Preview Modal */}
            {isPreviewOpen && selectedPreview && (
                <ViewModal
                    isPreviewOpen={isPreviewOpen}
                    handlePreviewClose={handlePreviewClose}
                    selectedPreview={selectedPreview}
                />
            )}
        </Fragment>
    )
}