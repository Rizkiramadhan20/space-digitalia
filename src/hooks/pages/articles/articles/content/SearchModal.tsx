import { motion } from 'framer-motion';

import Image from 'next/image';

import { SearchModalProps } from '@/hooks/pages/articles/articles/lib/schema';

export function SearchModal({
    searchQuery,
    searchResults,
    handleSearch,
    handleSearchResultClick,
    handleModalClose
}: SearchModalProps) {
    return (
        <dialog
            id="search_modal"
            className="modal"
            onClose={handleModalClose}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="modal-box max-w-3xl bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-100"
            >
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search articles..."
                        className="w-full pl-14 pr-6 py-4 text-lg bg-gray-50/50 rounded-2xl
                                 border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20
                                 transition-all duration-300 placeholder:text-gray-400"
                        autoFocus
                    />
                    <svg className="h-6 w-6 text-gray-400 absolute left-5 top-1/2 transform -translate-y-1/2"
                        viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {searchResults.length > 0 && (
                    <div className='mt-8'>
                        <h3 className="font-medium text-gray-500 mb-4 px-2">Search Results</h3>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
                            {searchResults.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => handleSearchResultClick(article)}
                                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50/80
                                             cursor-pointer transition-all duration-300 group"
                                >
                                    <div className="relative overflow-hidden rounded-xl w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={article.thumbnail}
                                            alt={article.title}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="bg-blue-100/80 text-blue-600 px-3 py-1 rounded-full font-medium">
                                                {article.category}
                                            </span>
                                            {article.tags && article.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="bg-gray-100/80 text-gray-600 px-3 py-1 rounded-full">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            <form method="dialog" className="modal-backdrop bg-gray-900/20 backdrop-blur-sm">
                <button className="cursor-default w-full h-full">close</button>
            </form>
        </dialog>
    );
}