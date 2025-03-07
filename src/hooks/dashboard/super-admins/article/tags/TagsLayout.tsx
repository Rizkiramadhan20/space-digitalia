"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion';

import TagsModal from '@/hooks/dashboard/super-admins/article/tags/TagsModal';

import TagsList from '@/hooks/dashboard/super-admins/article/tags/TagsList';

import { Tag } from '@/hooks/dashboard/super-admins/article/tags/lib/schema';

import TagsSkeleton from '@/hooks/dashboard/super-admins/article/tags/TagsSkelaton';

import { db } from '@/utils/firebase';

import { collection, onSnapshot } from 'firebase/firestore';

export default function TagsLayout() {
    const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const handleEdit = (tag: Tag) => {
        setSelectedTag(tag);
        const modal = document.getElementById('tags_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handleCloseModal = () => {
        setSelectedTag(undefined);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TAGS_ARTICLE as string), () => {
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <TagsSkeleton />;
    }

    return (
        <section className='min-h-full py-0 px-0 sm:py-4 sm:px-4'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                    >
                        Tags
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className='text-gray-500'
                    >
                        Manage and showcase your article tags
                    </motion.p>
                </motion.div>

                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                        const modal = document.getElementById('tags_modal') as HTMLDialogElement | null;
                        modal?.showModal();
                    }}
                >
                    <motion.svg
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </motion.svg>
                    Add Tag
                </motion.button>
            </motion.div>

            <TagsModal selectedTag={selectedTag} onClose={handleCloseModal} />
            <TagsList onEdit={handleEdit} />
        </section>
    )
}
