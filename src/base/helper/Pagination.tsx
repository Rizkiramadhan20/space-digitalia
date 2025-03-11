import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="py-6 px-4 mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                        Page {currentPage + 1}
                    </span>
                    <span className="text-gray-600">
                        of {Math.max(1, totalPages)}
                    </span>
                </div>

                <ReactPaginate
                    previousLabel={
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="hidden sm:inline">Previous</span>
                        </div>
                    }
                    nextLabel={
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="hidden sm:inline">Next</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    }
                    breakLabel={
                        <span className="flex items-center justify-center w-9 h-9 text-gray-400">
                            •••
                        </span>
                    }
                    pageCount={Math.max(1, totalPages)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={onPageChange}
                    forcePage={currentPage}
                    containerClassName={'flex items-center gap-1 sm:gap-2'}
                    pageClassName={'flex'}
                    pageLinkClassName={`
                        flex items-center justify-center w-9 h-9 rounded-lg
                        text-sm font-medium text-gray-700
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    previousClassName={'flex'}
                    previousLinkClassName={`
                        flex items-center px-3 h-9 rounded-lg
                        text-gray-700 font-medium
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    nextClassName={'flex'}
                    nextLinkClassName={`
                        flex items-center px-3 h-9 rounded-lg
                        text-gray-700 font-medium
                        hover:bg-gray-50 hover:text-indigo-600
                        transition-colors duration-200
                    `}
                    breakClassName={'flex'}
                    breakLinkClassName={'flex items-center justify-center'}
                    activeClassName={`
                        !bg-indigo-50 !text-indigo-600
                        ring-2 ring-indigo-600/20
                    `}
                    disabledClassName={`
                        opacity-50 cursor-not-allowed
                        hover:bg-transparent hover:text-gray-700
                    `}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};