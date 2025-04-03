import React from 'react';

import { format } from 'date-fns';

import { CategoryContent } from '@/hooks/dashboard/super-admins/project/category/lib/schema';
import { Pagination } from '@/base/helper/Pagination';

interface CategoryTableProps {
    categories: CategoryContent[];
    onEdit: (category: CategoryContent) => void;
    onDelete: (id: string) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
    categories,
    onEdit,
    onDelete
}) => {
    // Add pagination state
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 10; // You can adjust this number

    // Calculate pagination values
    const offset = currentPage * itemsPerPage;
    const currentCategories = categories.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(categories.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ditambahkan
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {currentCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center'>
                                        {category.createdAt && format(category.createdAt.toDate(), 'PPpp')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center capitalize">
                                        {category.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex justify-center">
                                        <button
                                            onClick={() => onEdit(category)}
                                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg mr-2 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(category.id!)}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Pagination */}
            {categories.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};