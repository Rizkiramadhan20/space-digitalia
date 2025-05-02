import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { ProjectType } from '@/components/ui/project/types/project'

import { formatSlug } from '@/base/helper/formatSlug'

import { differenceInDays, format, formatDistanceToNow } from 'date-fns'

interface ProjectCardProps {
    project: ProjectType
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const createdDate = project.createdAt ? new Date(project.createdAt) : null
    const isValidDate = createdDate && !isNaN(createdDate.getTime())

    return (
        <Link href={`/project/${formatSlug(project.typeCategory)}/${formatSlug(project.typeTitle)}/${project.slug}`} key={project.id} className='group bg-white rounded-3xl shadow-sm 
        hover:shadow-xl overflow-hidden transition-all duration-500 
        border border-gray-100/50 hover:border-gray-200
        hover:-translate-y-1 hover:scale-[1.02]'>
            <div className='relative aspect-[16/10] overflow-hidden'>
                <Image
                    src={project.imageUrl}
                    alt={project.title}
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
                    {project.typeCategory}
                </div>

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-4 py-2 
                ${project.statusProject === 'development'
                        ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                        : 'bg-green-500/20 text-green-600 border-green-500/30'} 
                backdrop-blur-md capitalize rounded-xl text-sm font-medium 
                shadow-sm border transition-all duration-300
                hover:shadow-md flex items-center gap-2`}>
                    {project.statusProject === 'development' ? (
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
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
                {/* Title with improved hover effect */}
                <h3 className='text-lg font-semibold text-gray-900 
                group-hover:text-blue-600 transition-all duration-300 
                hover:tracking-wide line-clamp-1'>
                    {project.title}
                </h3>

                {/* Description */}
                <p className='text-gray-600 text-sm line-clamp-2'>
                    {project.description}
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
                            src={project.author.photoURL}
                            alt={project.author.name}
                            fill
                            className='object-cover'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h3 className='text-sm font-semibold text-gray-900 
                        group-hover:text-blue-700 transition-colors duration-300'>
                            {project.author.name}
                        </h3>
                        <p className='text-xs text-gray-500 group-hover:text-gray-600'>
                            {project.author.role}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
} 