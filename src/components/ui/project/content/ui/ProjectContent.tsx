"use client"

import { ProjectDescriptionProps } from "@/components/ui/project/types/project";

export const ProjectContent = ({ content }: Pick<ProjectDescriptionProps, 'content'>) => {
    return (
        <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 order-2 sm:order-1">
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Details
            </h3>
            <div
                className="prose prose-invert max-w-none
                prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6
                prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-200 prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base
                prose-ol:mt-4 prose-ol:space-y-3 prose-ol:list-none prose-ol:pl-0
                prose-li:text-gray-300 prose-li:relative prose-li:pl-6
                prose-strong:font-semibold prose-strong:text-white
                [&_li_strong]:text-cyan-400 [&_h3_strong]:text-inherit
                [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 
                [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:mt-2.5
                [&_li]:before:rounded-full [&_li]:before:bg-cyan-400
                space-y-4 [&_ol]:space-y-3
                [&_li]:hover:before:scale-125 [&_li]:before:transition-transform
                [&_strong]:transition-colors [&_strong]:duration-200
                [&_li:hover_strong]:text-cyan-300 [&_li:hover]:text-white
                [&_.ql-video]:w-full [&_.ql-video]:max-w-3xl [&_.ql-video]:mx-auto [&_.ql-video]:aspect-video [&_.ql-video]:rounded-xl [&_.ql-video]:shadow-lg [&_.ql-video]:my-6 sm:[&_.ql-video]:my-8"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

ProjectContent.displayName = "ProjectContent";