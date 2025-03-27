import React from 'react'

import Link from 'next/link'

import { IoLocation } from "react-icons/io5"

import { CgMail } from "react-icons/cg";

export default function TopBar() {
    return (
        <div className="w-full sticky top-0 bg-gray-50 shadow-sm z-40">
            <div className='container mx-auto px-4 lg:px-6'>
                <div className="flex items-center justify-between py-3 text-sm">
                    <div className="group">
                        <Link href="mailto:spacedigitalia@gmail.com"
                            className='flex items-center gap-2.5 text-gray-700 group-hover:text-orange-700 underline text-xs md:text-sm font-medium transition-all duration-300'>
                            <span className="text-lg text-orange-700 no-underline">
                                <CgMail />
                            </span>
                            <span>spacedigitalia@gmail.com</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2.5 group">
                        <div className="text-lg text-orange-700">
                            <IoLocation />
                        </div>
                        <p className="text-xs md:text-sm text-gray-700">
                            Leuwiliang, Bogor
                            <Link href="#" className="ml-2 text-orange-700 hover:text-orange-800 underline transition-all duration-300">
                                Change
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}