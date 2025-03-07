import { motion } from 'framer-motion';

import { CategoryFilterProps } from '@/hooks/pages/articles/articles/lib/schema';

export function CategoryFilter({ articles, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
    const categories = ['all', ...new Set(articles.map(article => article.category))];

    return (
        <div className='category-filter flex flex-wrap gap-4'>
            {categories.map((category) => (
                <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn-category relative overflow-hidden capitalize ${selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white ring-2 ring-blue-500/20'
                        : 'bg-gray-50/80 text-gray-700 hover:bg-gray-100/80'
                        } px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                    text-sm font-medium backdrop-blur-sm`}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    );
}