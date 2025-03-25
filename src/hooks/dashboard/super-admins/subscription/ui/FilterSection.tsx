import { motion } from 'framer-motion'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FilterSectionProps } from '@/hooks/dashboard/super-admins/subscription/lib/subscriber'

export const FilterSection = ({
    showFilter,
    filterEmail,
    setFilterEmail,
    selectedDate,
    setSelectedDate
}: FilterSectionProps) => {
    if (!showFilter) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 shadow-lg"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Search Email</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={filterEmail}
                            onChange={(e) => setFilterEmail(e.target.value)}
                            placeholder="Search by email..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Filter by Date</label>
                    <div className="relative">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            maxDate={new Date()}
                            placeholderText="Select date..."
                            dateFormat="dd MMMM yyyy"
                            isClearable
                            showPopperArrow={false}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                            calendarClassName="shadow-xl rounded-xl border border-gray-100"
                            popperClassName="z-50"
                            popperPlacement="bottom-start"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}