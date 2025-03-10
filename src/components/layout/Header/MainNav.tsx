import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

import Image from 'next/image'

import { TiThMenu } from "react-icons/ti"

import { IoPersonCircleOutline } from "react-icons/io5"

import { useAuth } from '@/utils/context/AuthContext'

import { navLink } from './data/header'

import { CiLogin } from "react-icons/ci";

import { usePathname } from 'next/navigation'

import { IoMdArrowDropdown } from "react-icons/io";

export default function MainNav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout, getDashboardUrl } = useAuth();
    const pathname = usePathname();

    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsMobileProfileOpen(false);
    };

    const handleMobileProfileToggle = () => {
        setIsMobileProfileOpen(!isMobileProfileOpen);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className='w-full sticky top-0 bg-white/80 backdrop-blur-2xl border-b border-gray-100 z-50'>
            <div className='container px-4 lg:px-8'>
                <nav className='flex items-center justify-between h-20'>
                    <Link href="/" className="font-bold text-xl text-gray-800 hover:text-primary transition-colors">
                        <svg
                            width="200"
                            height="60"
                            viewBox="0 0 240 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-auto h-12"
                        >
                            <path
                                d="M20 30C20 21.7157 26.7157 15 35 15H205C213.284 15 220 21.7157 220 30C220 38.2843 213.284 45 205 45H35C26.7157 45 20 38.2843 20 30Z"
                                fill="currentColor"
                            />
                            <text
                                x="120"
                                y="36"
                                textAnchor="middle"
                                fill="white"
                                className="text-2xl font-bold"
                            >
                                Space Digitalia
                            </text>
                        </svg>
                    </Link>

                    <ul className="hidden md:flex items-center gap-10">
                        {navLink.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`relative px-3 py-2 text-[15px] font-semibold transition-all duration-300 group
                                        ${isActiveLink(item.href)
                                            ? 'text-primary'
                                            : 'text-gray-800 hover:text-primary'}`}
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-primary transform transition-transform duration-300 ease-out -translate-x-1/2
                                        ${isActiveLink(item.href)
                                            ? 'scale-x-100'
                                            : 'scale-x-0 group-hover:scale-x-100'}`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        {!user ? (
                            <Link
                                href="/auth/signin"
                                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all text-sm font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 duration-300"
                            >
                                <CiLogin className="text-lg" />
                                Login
                            </Link>
                        ) : (
                            <>
                                {/* Desktop Profile */}
                                <div className="relative hidden md:block">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                                    >
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <IoPersonCircleOutline className="w-8 h-8 text-primary" />
                                        )}
                                        <span className="text-sm font-medium max-w-[120px] truncate text-gray-700">
                                            {user.displayName}
                                        </span>
                                        <IoMdArrowDropdown className={`transition-transform duration-200 text-gray-600 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <Link
                                                    href={getDashboardUrl(user.role)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">📊</span>
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={async () => {
                                                        await logout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">🚪</span>
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mobile Profile Button */}
                                <button
                                    className="md:hidden"
                                    onClick={handleMobileProfileToggle}
                                >
                                    {user.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <IoPersonCircleOutline className="w-10 h-10 text-primary" />
                                    )}
                                </button>
                            </>
                        )}

                        <button
                            className="md:hidden text-2xl text-gray-700 hover:text-primary transition-all hover:scale-110 duration-300"
                            onClick={handleMobileMenuToggle}
                        >
                            <TiThMenu />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {(isMobileMenuOpen || isMobileProfileOpen) && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-2xl z-50 max-h-[calc(100vh-5rem)] overflow-y-auto"
                        >
                            <ul className="flex flex-col py-4">
                                {isMobileMenuOpen && navLink.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-8 py-4 transition-all relative
                                                ${isActiveLink(item.href)
                                                    ? 'text-primary font-semibold border-l-4 border-primary bg-primary/5'
                                                    : 'text-gray-800 hover:text-primary hover:bg-gray-50 border-l-4 border-transparent'}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}

                                {isMobileProfileOpen && user && (
                                    <>
                                        <li className="px-8 py-4 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </li>
                                        <li className="pt-2">
                                            <Link
                                                href={getDashboardUrl(user.role)}
                                                className="flex items-center gap-4 px-8 py-4 text-gray-600 hover:text-primary hover:bg-gray-50/80 transition-all"
                                                onClick={() => setIsMobileProfileOpen(false)}
                                            >
                                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50">🍽️</span>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={async () => {
                                                    await logout();
                                                    setIsMobileProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-4 px-8 py-4 text-gray-600 hover:text-primary hover:bg-gray-50/80 transition-all"
                                            >
                                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50">🚪</span>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                )}

                                {!user && isMobileMenuOpen && (
                                    <li className="border-t mt-2 pt-2">
                                        <Link
                                            href="/auth/signin"
                                            className="flex items-center gap-4 px-8 py-4 text-gray-600 hover:text-primary hover:bg-gray-50/80 transition-all"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50">
                                                <CiLogin className="text-lg text-primary" />
                                            </span>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}