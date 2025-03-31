import { TransactionFilterProps } from "@/hooks/dashboard/super-admins/transaction/paid/lib/paid"

export default function TransactionFilter({
    isFilterVisible,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus
}: TransactionFilterProps) {
    return (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterVisible ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-6 border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Status Filter */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Delivery Method
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'download', icon: '⬇️', label: 'Download' },
                                { id: 'delivery', icon: '🚚', label: 'Delivery' }
                            ].map(({ id, icon, label }) => (
                                <div
                                    key={id}
                                    onClick={() => setSelectedStatus(selectedStatus === id ? 'all' : id)}
                                    className={`cursor-pointer px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 flex-1 min-w-[120px]
                                        ${selectedStatus === id
                                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 shadow-sm shadow-indigo-100'
                                            : 'bg-white/50 border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50/50'
                                        }`}
                                >
                                    <span className="text-xl">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Date Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl p-2 transition-all duration-300">
                                <input
                                    type="date"
                                    value={dateRange.startDate}
                                    onChange={(e) => setDateRange({
                                        ...dateRange,
                                        startDate: e.target.value
                                    })}
                                    className="w-full px-2 py-1 bg-transparent focus:outline-none"
                                />
                            </div>
                            <div className="bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl p-2 transition-all duration-300">
                                <input
                                    type="date"
                                    value={dateRange.endDate}
                                    onChange={(e) => setDateRange({
                                        ...dateRange,
                                        endDate: e.target.value
                                    })}
                                    className="w-full px-2 py-1 bg-transparent focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Search
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by project title or order ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500/20 focus:bg-indigo-50/30 transition-all duration-300"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setDateRange({ startDate: '', endDate: '' });
                            setSelectedStatus('all');
                        }}
                        className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reset Filter
                    </button>
                </div>
            </div>
        </div>
    );
}