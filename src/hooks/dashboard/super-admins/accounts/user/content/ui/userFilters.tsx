import React from 'react'

interface UserFiltersProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    statusFilter: 'all' | 'active' | 'inactive'
    onStatusFilterChange: (value: 'all' | 'active' | 'inactive') => void
}

export function UserFilters({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange
}: UserFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="w-full md:w-48">
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
    )
}