import Image from 'next/image';

import { TestimonialCardHeaderProps } from '@/components/ui/testimonials/types/schema';

export const TestimonialCardHeader: React.FC<TestimonialCardHeaderProps> = ({ testimonial }) => {
    return (
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
    );
};

export default TestimonialCardHeader;