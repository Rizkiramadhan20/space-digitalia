import { TestimonialCardBodyProps } from '@/components/ui/testimonials/types/schema';

export const TestimonialCardBody: React.FC<TestimonialCardBodyProps> = ({ testimonial }) => {
    return (
        <div className="relative flex-1">
            <svg className="absolute -top-2 -left-1 w-4 h-4 sm:w-6 sm:h-6 text-blue-400/20"
                fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-gray-600 leading-relaxed pl-3 sm:pl-4 text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                {testimonial.message}
            </p>
        </div>
    );
};

export default TestimonialCardBody;