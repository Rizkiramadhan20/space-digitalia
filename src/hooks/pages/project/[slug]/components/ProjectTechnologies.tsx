import React from 'react'
import Image from "next/image"

import { ProjectType } from '@/components/ui/project/types/project'

interface ProjectTechnologiesProps {
    project: ProjectType
}

export default function ProjectTechnologies({ project }: ProjectTechnologiesProps) {
    return (
        <div className="bg-card rounded-2xl p-6 border border-border/50 
            backdrop-blur-md shadow-lg shadow-primary/5">
            <h2 className="text-xl font-semibold mb-6 text-primary">Technologies</h2>
            <div className="flex flex-wrap gap-3">
                {project.frameworks?.map((tech, index) => (
                    <div key={index}
                        className="flex items-center gap-3 px-4 py-2.5
                            bg-card hover:bg-primary/5
                            rounded-xl transition-all duration-300
                            border border-border/50 hover:border-primary/30
                            group cursor-pointer">
                        <div className="relative w-6 h-6 transform transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src={tech.imageUrl}
                                alt={tech.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-primary">
                            {tech.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}