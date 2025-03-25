"use client"

import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { useSubscribers } from '@/hooks/dashboard/super-admins/subscription/lib/useSubscriber'

import { FilterSection } from '@/hooks/dashboard/super-admins/subscription/ui/FilterSection'

import { SubscriberHeader } from '@/hooks/dashboard/super-admins/subscription/ui/SubscriberHeader'

import { SubscriberGrid } from '@/hooks/dashboard/super-admins/subscription/ui/SubscriberGrid'

import { Pagination } from '@/base/helper/Pagination'

import SubscriptionSkelaton from '@/hooks/dashboard/super-admins/subscription/SubscriptionSkelaton'

export default function SubscriptionLayout() {
    const { subscribers, loading } = useSubscribers();
    const [currentPage, setCurrentPage] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [filterEmail, setFilterEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const itemsPerPage = 9;

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const filteredSubscribers = subscribers.filter(subscriber => {
        const matchesEmail = subscriber.email.toLowerCase().includes(filterEmail.toLowerCase());
        if (selectedDate) {
            const subscriberDate = new Date(subscriber.timestamp);
            const isMatchingDate =
                subscriberDate.getDate() === selectedDate.getDate() &&
                subscriberDate.getMonth() === selectedDate.getMonth() &&
                subscriberDate.getFullYear() === selectedDate.getFullYear();
            return matchesEmail && isMatchingDate;
        }
        return matchesEmail;
    });

    const paginatedSubscribers = filteredSubscribers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    if (loading) return <SubscriptionSkelaton />;

    return (
        <section className='min-h-full px-0'>
            <SubscriberHeader showFilter={showFilter} setShowFilter={setShowFilter} />

            <FilterSection
                showFilter={showFilter}
                filterEmail={filterEmail}
                setFilterEmail={setFilterEmail}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

            <SubscriberGrid subscribers={paginatedSubscribers} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredSubscribers.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </motion.div>
        </section>
    )
}
