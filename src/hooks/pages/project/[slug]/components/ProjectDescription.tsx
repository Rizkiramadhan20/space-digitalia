import React from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

interface ProjectDescriptionProps {
    project: ProjectType
}

export default function ProjectDescription({ project }: ProjectDescriptionProps) {
    return (
        <div className="bg-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 space-y-6 border border-border/50">
            <h2 className="text-2xl font-semibold text-primary">About This Project</h2>
            <p className="text-muted-foreground leading-relaxed">
                {project.description}
            </p>

            {/* Content Section with enhanced typography and spacing */}
            <div className="pt-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">Project Content</h2>
                <div
                    className="prose prose-gray dark:prose-invert max-w-none
                        prose-headings:text-primary prose-headings:font-semibold 
                        prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:leading-tight
                        prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base 
                        prose-p:md:text-lg prose-p:mb-6
                        
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-em:text-primary/80 prose-em:not-italic
                        
                        prose-ol:mt-4 prose-ol:mb-6 prose-ol:list-none prose-ol:space-y-3
                        prose-li:text-muted-foreground prose-li:relative prose-li:pl-6
                        prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-primary/60
                        
                        [&_li[data-list='bullet']]:before:content-['•']
                        [&_li[data-list='bullet']]:before:text-lg
                        [&_li[data-list='bullet']]:before:leading-tight
                        
                        [&_.ql-video]:w-full [&_.ql-video]:aspect-video [&_.ql-video]:rounded-lg [&_.ql-video]:shadow-md [&_.ql-video]:my-4 sm:[&_.ql-video]:my-6

                        [&_li_strong]:text-foreground [&_li_strong]:font-medium
                        [&_span.ql-ui]:hidden"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                />
            </div>
        </div>
    )
} 