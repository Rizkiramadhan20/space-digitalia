"use client";

import { useAuth } from "@/utils/context/AuthContext";
import { Role } from "@/utils/context/interface/Auth";
import { useEffect, useState, Fragment } from "react";
import SuperAdminHeader from "@/components/layout/dashboard/super-admins/Header";
import AdminHeader from "@/components/layout/dashboard/admins/Header";
import UserHeader from "@/components/layout/dashboard/users/Header";
import AccessDenied from "@/components/layout/dashboard/AccessDenied";
import { useSubscribers } from "@/hooks/dashboard/super-admins/subscription/lib/useSubscriber";
import { database } from '@/utils/firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { Contacts } from '@/hooks/dashboard/super-admins/contact/lib/contacts';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Check if window exists (client-side) and set initial state based on screen width
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024; // 1024px is the 'lg' breakpoint in Tailwind
        }
        return false; // Default to closed on server-side
    });
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);
    const [showMessagesModal, setShowMessagesModal] = useState(false);
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const { subscribers, loading: subscribersLoading } = useSubscribers();
    const [contacts, setContacts] = useState<Contacts[]>([]);
    const [contactsLoading, setContactsLoading] = useState(true);
    const [unreadContactsCount, setUnreadContactsCount] = useState(0);

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
            return;
        }

        // Get current path
        const currentPath = window.location.pathname;

        // Check role priority and validate access
        if (currentPath.startsWith('/dashboard/super-admins')) {
            if (!hasRole(Role.SUPER_ADMIN)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.SUPER_ADMIN);
        } else if (currentPath.startsWith('/dashboard/admins')) {
            if (!hasRole(Role.ADMIN)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.ADMIN);
        } else if (currentPath.startsWith('/dashboard/user')) {
            if (!hasRole(Role.USER)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.USER);
        } else {
            window.location.href = '/';
            return;
        }

        setIsAuthorized(true);
        setLoading(false);
    }, [hasRole, user]);

    // Fetch contacts data
    useEffect(() => {
        if (currentRole === Role.SUPER_ADMIN || currentRole === Role.ADMIN) {
            const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS);
            const contactsQuery = query(contactsRef, orderByChild('createdAt'));

            const unsubscribe = onValue(contactsQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const contactsArray = Object.entries(data).map(([id, value]) => ({
                        id,
                        ...(value as Omit<Contacts, 'id'>)
                    })).reverse();

                    setContacts(contactsArray);

                    // Count unread messages
                    const unreadCount = contactsArray.filter(contact => contact.status === 'unread').length;
                    setUnreadContactsCount(unreadCount);
                } else {
                    setContacts([]);
                    setUnreadContactsCount(0);
                }
                setContactsLoading(false);
            }, (error) => {
                console.error('Error fetching contacts:', error);
                setContactsLoading(false);
            });

            return () => unsubscribe();
        }
    }, [currentRole]);

    // Add resize listener to handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close modals when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.modal-content') &&
                !target.closest('.modal-trigger')) {
                setShowMessagesModal(false);
                setShowNotificationsModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (loading) {
        return null;
    }

    if (!isAuthorized) {
        return <AccessDenied />;
    }

    const renderHeader = () => {
        switch (currentRole) {
            case Role.SUPER_ADMIN:
                return <SuperAdminHeader onSidebarToggle={setIsSidebarOpen} />;
            case Role.ADMIN:
                return <AdminHeader onSidebarToggle={setIsSidebarOpen} />;
            case Role.USER:
                return <UserHeader onSidebarToggle={setIsSidebarOpen} />;
            default:
                return null;
        }
    };

    const renderMessagesAndNotifications = () => {
        if (currentRole === Role.SUPER_ADMIN || currentRole === Role.ADMIN) {
            return (
                <>
                    {/* Messages for Admins */}
                    <button className="relative group modal-trigger" onClick={() => setShowMessagesModal(true)}>
                        <div className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                            <svg
                                className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            {unreadContactsCount > 0 && (
                                <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs font-bold rounded-full ring-2 ring-white">
                                    {unreadContactsCount}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* Notifications for Admins */}
                    <button className="relative group modal-trigger" onClick={() => setShowNotificationsModal(true)}>
                        <div className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                            <svg
                                className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            {!subscribersLoading && subscribers.length > 0 && (
                                <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-blue-500 text-white text-xs font-bold rounded-full ring-2 ring-white">
                                    {subscribers.length}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* Admin Messages Modal */}
                    {showMessagesModal && (
                        <div className="fixed top-16 right-2 z-50">
                            <div className="modal-content w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
                                <div className="p-4 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800">Contact Messages</h3>
                                </div>
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    {contactsLoading ? (
                                        <div className="flex justify-center items-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : contacts.length > 0 ? (
                                        <div className="space-y-4">
                                            {contacts.slice(0, 5).map((contact) => (
                                                <div key={contact.id} className={`p-3 ${contact.status === 'unread' ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg`}>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-slate-800">{contact.fullName}</p>
                                                        {contact.status === 'unread' && (
                                                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-600 mt-1">{contact.message.substring(0, 70)}...</p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <p className="text-xs text-slate-400">{new Date(contact.createdAt).toLocaleDateString()}</p>
                                                        <span className="text-xs text-blue-600">{contact.email}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-slate-500 py-4">No messages yet</p>
                                    )}
                                </div>
                                <div className="p-4 border-t border-slate-200 flex justify-between">
                                    <a href="/dashboard/super-admins/contact" className="text-sm text-blue-600 hover:text-blue-800">View all</a>
                                    <button className="text-sm text-slate-600 hover:text-slate-800" onClick={() => setShowMessagesModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Admin Notifications Modal */}
                    {showNotificationsModal && (
                        <div className="fixed top-16 right-2 z-50">
                            <div className="modal-content w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
                                <div className="p-4 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800">Recent Subscribers</h3>
                                </div>
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    {subscribersLoading ? (
                                        <div className="flex justify-center items-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : subscribers.length > 0 ? (
                                        <div className="space-y-4">
                                            {subscribers.slice(0, 5).map((subscriber, index) => (
                                                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-sm font-medium text-slate-800">New Subscriber</p>
                                                    <p className="text-xs text-slate-600 mt-1">{subscriber.email}</p>
                                                    <p className="text-xs text-slate-400 mt-2">
                                                        {('createdAt' in subscriber) ? new Date(subscriber['createdAt'] as string).toLocaleDateString() : 'Recently'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-slate-500 py-4">No subscribers yet</p>
                                    )}
                                </div>
                                <div className="p-4 border-t border-slate-200 flex justify-between">
                                    <a href="/dashboard/super-admins/subscription" className="text-sm text-blue-600 hover:text-blue-800">View all</a>
                                    <button className="text-sm text-slate-600 hover:text-slate-800" onClick={() => setShowNotificationsModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {/* Messages for Users */}
                    <button className="relative group modal-trigger" onClick={() => setShowMessagesModal(true)}>
                        <div className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                            <svg
                                className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-green-500 text-white text-xs font-bold rounded-full ring-2 ring-white">
                                3
                            </span>
                        </div>
                    </button>

                    {/* Notifications for Users */}
                    <button className="relative group modal-trigger" onClick={() => setShowNotificationsModal(true)}>
                        <div className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                            <svg
                                className="w-6 h-6 text-slate-600 group-hover:text-slate-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-green-500 text-white text-xs font-bold rounded-full ring-2 ring-white">
                                2
                            </span>
                        </div>
                    </button>

                    {/* User Messages Modal */}
                    {showMessagesModal && (
                        <div className="fixed top-16 right-2 z-50">
                            <div className="modal-content w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
                                <div className="p-4 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800">Your Messages</h3>
                                </div>
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    <div className="space-y-4">
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">Welcome to Space Digitalia!</p>
                                            <p className="text-xs text-slate-600 mt-1">Thank you for joining our platform. Let us know if you have any questions.</p>
                                            <p className="text-xs text-slate-400 mt-2">1 day ago</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">Your subscription is active</p>
                                            <p className="text-xs text-slate-600 mt-1">Your subscription has been successfully activated. Enjoy our services!</p>
                                            <p className="text-xs text-slate-400 mt-2">2 days ago</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">Complete your profile</p>
                                            <p className="text-xs text-slate-600 mt-1">Please complete your profile to unlock all features.</p>
                                            <p className="text-xs text-slate-400 mt-2">3 days ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-slate-200 flex justify-between">
                                    <button className="text-sm text-green-600 hover:text-green-800">Mark all as read</button>
                                    <button className="text-sm text-slate-600 hover:text-slate-800" onClick={() => setShowMessagesModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Notifications Modal */}
                    {showNotificationsModal && (
                        <div className="fixed top-16 right-2 z-50">
                            <div className="modal-content w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
                                <div className="p-4 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800">Your Notifications</h3>
                                </div>
                                <div className="p-4 max-h-[70vh] overflow-y-auto">
                                    <div className="space-y-4">
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">New Feature Available</p>
                                            <p className="text-xs text-slate-600 mt-1">We&apos;ve added a new feature to help you manage your projects better.</p>
                                            <p className="text-xs text-slate-400 mt-2">Just now</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">Payment Successful</p>
                                            <p className="text-xs text-slate-600 mt-1">Your monthly subscription payment was processed successfully.</p>
                                            <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <p className="text-sm font-medium text-slate-800">Account Security</p>
                                            <p className="text-xs text-slate-600 mt-1">We noticed a login from a new device. Please verify if this was you.</p>
                                            <p className="text-xs text-slate-400 mt-2">Yesterday</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-slate-200 flex justify-between">
                                    <button className="text-sm text-green-600 hover:text-green-800">Mark all as read</button>
                                    <button className="text-sm text-slate-600 hover:text-slate-800" onClick={() => setShowNotificationsModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <Fragment>
            <div className="flex h-screen bg-white overflow-hidden">
                {/* Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 lg:relative
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 transition-all duration-300 ease-in-out
                    w-72 lg:w-[280px] bg-white z-30
                    border-r border-slate-200 shadow-sm
                    flex flex-col
                `}>
                    {renderHeader()}
                </aside>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-20"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                    {/* Top Navigation Bar */}
                    <div className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 backdrop-blur-sm bg-white/80">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <svg
                                    className="w-6 h-6 text-slate-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isSidebarOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-[300px] h-10 px-4 text-sm rounded-lg bg-slate-100 border-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                                <svg
                                    className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Right side - Messages and Notifications */}
                        <div className="flex items-center gap-2">
                            {renderMessagesAndNotifications()}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 py-4">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
} 