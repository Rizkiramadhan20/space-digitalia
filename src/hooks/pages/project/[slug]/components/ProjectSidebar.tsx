import React from 'react'

import Image from "next/image"

import { ProjectType } from '@/components/ui/project/types/project'

import { Timestamp } from 'firebase/firestore'

import ProjectMetrics from './ProjectMetrics'

import ProjectTechnologies from './ProjectTechnologies'

import ProjectLicense from './ProjectLicense'

import { Address } from '@/hooks/pages/project/[slug]/types/schema'

interface ProjectSidebarProps {
    project: ProjectType
    viewCount: number
    selectedLicense: string
    deliveryMethod: 'download' | 'delivery' | ''
    defaultAddress: Address | null
    isProcessing: boolean
    handleLicenseSelect: (licenseTitle: string) => void
    handleDeliveryMethodSelect: (method: 'download' | 'delivery') => void
    handleTransaction: () => void
}

export default function ProjectSidebar({
    project,
    viewCount,
    selectedLicense,
    deliveryMethod,
    defaultAddress,
    isProcessing,
    handleLicenseSelect,
    handleDeliveryMethodSelect,
    handleTransaction
}: ProjectSidebarProps) {
    return (
        <div className="sticky top-4 space-y-6">
            {/* Author Profile Card */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                        <div className="relative w-16 h-16 rounded-full ring-2 ring-primary/20 overflow-hidden
                            transition duration-300 transform hover:scale-105">
                            <Image
                                src={project.author.photoURL}
                                alt={project.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Online status indicator */}
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full 
                            ring-2 ring-background animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">{project.author.name}</h3>
                        <p className="text-primary/80 text-sm font-medium">{project.author.role}</p>
                    </div>
                </div>

                {/* Project Stats */}
                <ProjectMetrics project={project} viewCount={viewCount} />

                {/* Last Updated */}
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <svg className="w-4 h-4 text-primary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                        <span className="text-muted-foreground">Last updated:</span>
                        <time className="ml-1 font-medium text-primary">
                            {project.updatedAt instanceof Timestamp ?
                                new Date(project.updatedAt.seconds * 1000).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: true
                                })
                                : 'N/A'
                            }
                        </time>
                    </div>
                </div>
            </div>

            {/* Technologies Card */}
            <ProjectTechnologies project={project} />

            {/* License Card */}
            <ProjectLicense
                project={project}
                selectedLicense={selectedLicense}
                deliveryMethod={deliveryMethod}
                defaultAddress={defaultAddress}
                isProcessing={isProcessing}
                handleLicenseSelect={handleLicenseSelect}
                handleDeliveryMethodSelect={handleDeliveryMethodSelect}
                handleTransaction={handleTransaction}
            />
        </div>
    )
}