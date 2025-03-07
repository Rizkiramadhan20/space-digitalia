import { motion } from 'framer-motion'

import Image from 'next/image'

import { TestimonialCardProps } from '@/components/ui/testimonials/lib/schema'

export default function TestimonialCard({ testimonial, index, showAll, totalDisplayed }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.1
            }}
            whileHover={
                (!showAll && index >= totalDisplayed - 3) ? {} : {
                    scale: 1.02,
                    y: -5,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }
                }
            }
            onMouseMove={(e) => {
                if (!showAll && index >= totalDisplayed - 3) return;

                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = (y - rect.height / 2) / 30;
                const rotateY = -(x - rect.width / 2) / 30;

                e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                e.currentTarget.style.transform = `
                    perspective(1000px)
                    scale(1.1)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

                const parent = e.currentTarget.parentElement;
                if (parent) {
                    Array.from(parent.children).forEach((child) => {
                        if (child !== e.currentTarget) {
                            (child as HTMLElement).style.opacity = '0.4';
                            (child as HTMLElement).style.transform = 'scale(0.9)';
                            (child as HTMLElement).style.filter = 'blur(3px)';
                        }
                    });
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                e.currentTarget.style.transform = `
                    perspective(1000px)
                    scale(1)
                    rotateX(0deg)
                    rotateY(0deg)
                `;

                const parent = e.currentTarget.parentElement;
                if (parent) {
                    Array.from(parent.children).forEach((child) => {
                        (child as HTMLElement).style.opacity = '1';
                        (child as HTMLElement).style.transform = 'scale(1)';
                        (child as HTMLElement).style.filter = 'blur(0px)';
                    });
                }
            }}
            className={`group relative overflow-hidden h-full
                      w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-1rem)]
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
            {/* Gradient overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br 
                          from-blue-50/50 via-transparent to-purple-50/50 
                          opacity-0 group-hover:opacity-100 
                          transition-opacity duration-500" />

            {/* Card shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                          bg-gradient-to-r from-transparent via-white/30 to-transparent
                          blur-xl group-hover:animate-shine" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start gap-2 sm:gap-5 mb-3 sm:mb-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                        <Image
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            fill
                            className="rounded-lg sm:rounded-xl object-cover 
                                     ring-2 ring-white 
                                     shadow-[0_2px_8px_rgb(0,0,0,0.08)]"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                            {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium truncate">
                            {testimonial.role} · {testimonial.company}
                        </p>
                    </div>
                </div>

                <div className="relative flex-1">
                    <svg className="absolute -top-2 -left-1 w-4 h-4 sm:w-6 sm:h-6 text-blue-400/20"
                        fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 leading-relaxed pl-3 sm:pl-4 text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                        {testimonial.message}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}