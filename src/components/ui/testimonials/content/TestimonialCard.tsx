import { motion } from 'framer-motion'

import { TestimonialCardProps } from '@/components/ui/testimonials/types/schema'

import TestimonialCardHeader from '@/components/ui/testimonials/content/ui/TestimonialCardHeader'

import TestimonialCardBody from '@/components/ui/testimonials/content/ui/TestimonialCardBody'

import TestimonialCardEffects from '@/components/ui/testimonials/content/ui/TestimonialEffetcs'

import {
    getInitialAnimation,
    getHoverAnimation,
    handleMouseMove,
    handleMouseLeave
} from '@/components/ui/testimonials/animation/Animation'

export default function TestimonialCard({ testimonial, index, showAll, totalDisplayed }: TestimonialCardProps) {
    const initialAnimation = getInitialAnimation(index);
    const hoverAnimation = getHoverAnimation(showAll, index, totalDisplayed);

    return (
        <motion.div
            {...initialAnimation}
            {...hoverAnimation}
            onMouseMove={(e) => handleMouseMove(e, showAll, index, totalDisplayed)}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden h-full
                      w-full
                      p-3 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl
                      bg-gradient-to-br from-white/90 via-white/80 to-white/90
                      backdrop-blur-xl
                      border border-white/30
                      hover:border-white/50
                      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                      hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                      transition-all duration-300 ease-out
                      flex flex-col cursor-pointer
                      ${index % 3 === 1 ? 'lg:translate-y-16' : ''}`}
        >
            <TestimonialCardEffects />

            <div className="relative z-10 flex flex-col h-full">
                <TestimonialCardHeader testimonial={testimonial} />
                <TestimonialCardBody testimonial={testimonial} />
            </div>
        </motion.div>
    )
}