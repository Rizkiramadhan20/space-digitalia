import React from 'react'

import ProjectCard from "@/hooks/pages/project/[slug]/components/ProjectCard"

import { ProjectType } from '@/components/ui/project/types/project'

interface RelatedProjectsProps {
    relatedProjects: ProjectType[]
}

export default function RelatedProjects({ relatedProjects }: RelatedProjectsProps) {
    return (
        <div className='mt-16'>
            <h2 className='text-xl font-medium text-gray-900 mb-4 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                Related Projects
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
                {relatedProjects.map((relatedProject) => (
                    <ProjectCard key={relatedProject.id} project={relatedProject} />
                ))}
            </div>
        </div>
    )
} 