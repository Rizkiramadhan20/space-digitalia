export const TestimonialCardEffects: React.FC = () => (
    <>
        {/* Gradient overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br 
                  from-blue-50/50 via-transparent to-purple-50/50 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500" />

        {/* Card shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  blur-xl group-hover:animate-shine" />
    </>
);

export default TestimonialCardEffects;