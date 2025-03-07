"use client"

import React from 'react';

import { Pagination } from '@/base/helper/Pagination';

import ArticleSkeleton from '@/hooks/pages/articles/articles/ArticlesSkelaton';

import { motion, AnimatePresence } from 'framer-motion';

import { SearchModal } from '@/hooks/pages/articles/articles/content/SearchModal';

import { TopArticle } from '@/hooks/pages/articles/articles/content/TopArticle';

import { CategoryFilter } from '@/hooks/pages/articles/articles/content/CategoryFilter';

import { ArticleCard } from '@/hooks/pages/articles/articles/content/ArticleCard';

import { useManagementArticle } from '@/hooks/pages/articles/articles/lib/useManagementArticle';

export default function ArticleLayout() {

    const {
        articles,
        loading,
        selectedCategory,
        searchQuery,
        searchResults,
        currentPage,
        topArticle,
        paginatedArticles,
        totalPages,
        setSelectedCategory,
        handleSearch,
        handleSearchResultClick,
        handlePageChange,
        handleModalOpen,
        handleModalClose,
    } = useManagementArticle();

    if (loading) {
        return <ArticleSkeleton />;
    }
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-full bg-gradient-to-b from-gray-50 to-white'
        >
            <div className="container mx-auto px-4 xl:px-10 py-2 lg:py-10">
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-8'>
                    <CategoryFilter
                        articles={articles}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    <div className='search-filter w-full sm:w-auto'>
                        <button
                            onClick={handleModalOpen}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-full 
                                     flex items-center gap-3 hover:border-blue-500 hover:shadow-md transition-all duration-300
                                     bg-white text-gray-400"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Search articles...</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    <SearchModal
                        searchQuery={searchQuery}
                        searchResults={searchResults}
                        handleSearch={handleSearch}
                        handleSearchResultClick={handleSearchResultClick}
                        handleModalClose={handleModalClose}
                    />
                </AnimatePresence>

                {topArticle && <TopArticle article={topArticle} />}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {paginatedArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className='mt-12'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </motion.section>
    );
}