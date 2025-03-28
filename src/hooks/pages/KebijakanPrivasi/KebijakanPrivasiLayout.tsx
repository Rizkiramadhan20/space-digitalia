"use client"

import React, { useState, useEffect } from 'react'

import { kebijakanPrivasi } from "@/hooks/pages/KebijakanPrivasi/data/KebijakanPrivasi"

import Link from 'next/link';

interface ListItem {
    id: number;
    text: string;
}

interface ContentItem {
    id: number;
    title: string;
    text?: string;
    list?: ListItem[];
}

interface KebijakanItem {
    id: number;
    title: string;
    content: ContentItem[];
}

export default function KebijakanPrivasiLayout() {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = kebijakanPrivasi.flatMap(item => [
                { id: `${item.id}`, element: document.getElementById(`${item.id}`) },
                ...item.content.map(content => ({
                    id: `${item.id}-${content.id}`,
                    element: document.getElementById(`${item.id}-${content.id}`)
                }))
            ]);

            const currentSection = sections.find(section => {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className='min-h-screen relative bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden mt-[0] xl:mt-[-8rem]'>
            <div className="container mx-auto px-4 sm:px-6 xl:px-8 relative py-12 lg:py-24">
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
                    {/* Sidebar Navigation */}
                    <aside className='lg:col-span-4'>
                        <div className='sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/60 hover:scrollbar-thumb-primary scrollbar-track-gray-100 pr-2'>
                            {kebijakanPrivasi.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-3 py-2 px-4 mb-2 rounded-lg transition-all duration-300 ${activeSection === `${item.id}`
                                        ? 'bg-primary text-white font-medium'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${activeSection === `${item.id}`
                                        ? 'bg-white'
                                        : 'bg-primary'
                                        }`}></span>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {kebijakanPrivasi.map((item: KebijakanItem) => (
                            item.title && (
                                <div
                                    key={item.id}
                                    id={`${item.id}`}
                                    className="card bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100"
                                >
                                    <div className="card-body p-6 sm:p-8 space-y-6">
                                        <h3 className='card-title text-xl sm:text-2xl font-bold text-primary/90 border-b pb-4'>{item.title}</h3>
                                        {item.content.map((contentItem: ContentItem) => (
                                            <div key={contentItem.id} id={`${item.id}-${contentItem.id}`} className="space-y-4">
                                                {contentItem.title && contentItem.title.trim() !== "" && (
                                                    <h4 className='text-base sm:text-lg font-semibold text-gray-800 mt-6'>{contentItem.title}</h4>
                                                )}
                                                {contentItem.text && contentItem.text.trim() !== "" && (
                                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{contentItem.text}</p>
                                                )}
                                                {contentItem.list && contentItem.list.length > 0 && (
                                                    <ul className='space-y-3 mt-4'>
                                                        {contentItem.list.map((listItem: ListItem) => (
                                                            listItem.text && listItem.text.trim() !== "" && (
                                                                <li key={listItem.id} className='text-sm sm:text-base text-gray-600 list-disc marker:text-primary ml-5'>
                                                                    {listItem.text}
                                                                </li>
                                                            )
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
