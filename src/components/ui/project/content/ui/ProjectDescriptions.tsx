"use client"

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { ProjectDescriptionProps } from "@/components/ui/project/types/project";

export const ProjectDescription = forwardRef<HTMLDivElement, ProjectDescriptionProps>(
    ({ description, inView }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30"
            >
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                    {description}
                </p>
            </motion.div>
        );
    }
);

ProjectDescription.displayName = "ProjectDescription";
