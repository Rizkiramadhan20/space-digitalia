import { ViewRatingModalProps, RatingModalProps } from '@/hooks/dashboard/user/transaction/completed/lib/schema'

import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';

export const ViewRatingModal: React.FC<ViewRatingModalProps> = ({
    isOpen,
    onClose,
    rating,
    review,
    projectTitle,
    setIsRatingModalOpen,
    setViewingRating
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl w-[90%] max-w-md p-6 shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Rating</h2>
                            <p className="text-gray-500 mt-1">{projectTitle}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-center gap-3 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                                    >
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50">
                                <p className="text-gray-700">{review || 'No review provided'}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => {
                                    onClose();
                                    setIsRatingModalOpen(true);
                                }}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                Edit Rating
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    setViewingRating(null);
                                }}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, projectTitle, initialRating = 0, initialReview = '' }) => {
    const [rating, setRating] = useState(initialRating);
    const [review, setReview] = useState(initialReview);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRating(initialRating);
            setReview(initialReview);
        }
    }, [isOpen, initialRating, initialReview]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onSubmit(rating, review);
        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl w-[90%] max-w-md p-8 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {/* Header with modern gradient */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                                How was your experience?
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm">
                                Rate your experience with {projectTitle}
                            </p>
                        </div>

                        {/* Rating Stars with animation */}
                        <div className="mb-8">
                            <div className="flex justify-center gap-4 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className={`transition-colors duration-200 ${star <= rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                    >
                                        <svg className="w-10 h-10 filter drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </motion.button>
                                ))}
                            </div>
                            <p className="text-center text-sm text-gray-500">
                                {rating === 0 ? 'Select your rating' : `You rated ${rating} star${rating !== 1 ? 's' : ''}`}
                            </p>
                        </div>

                        {/* Modern textarea with focus effects */}
                        <div className="mb-8">
                            <textarea
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 
                                    focus:border-indigo-300 resize-none transition-all duration-200 
                                    placeholder:text-gray-400 text-gray-700 bg-gray-50/50"
                                placeholder="Share your thoughts about the project..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows={4}
                            />
                        </div>

                        {/* Modern action buttons with animations */}
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl
                                    hover:bg-gray-100 hover:shadow-md transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50
                                    disabled:hover:shadow-none font-medium"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={rating === 0 || isSubmitting}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-500
                                    text-white rounded-xl transition-all duration-200
                                    hover:shadow-lg hover:from-indigo-500 hover:to-violet-400
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                                    font-medium flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};