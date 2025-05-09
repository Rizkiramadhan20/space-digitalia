"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import { Toaster } from "react-hot-toast";

import CookieConsent from '@/base/meta/CookieConsent';

import WhatsApp from "@/base/popup/WhatsApp"

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAdminRoute = pathname?.includes("/super-admins") ||
        pathname?.includes("/admins") ||
        pathname?.includes("/signin") ||
        pathname?.includes("/signup") ||
        pathname?.includes("/forgot-password") ||
        pathname?.includes("/payment") ||
        pathname?.includes("/download") ||
        pathname?.includes("/checkout") ||
        pathname?.includes("/dashboard") || false;

    return (
        <main>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#22c55e',
                            color: '#fff',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                            color: '#fff',
                        },
                    },
                }}
            />
            {!isAdminRoute && <Header />}
            {!isAdminRoute && <CookieConsent />}
            {!isAdminRoute && <WhatsApp />}
            {children}
            {!isAdminRoute && <Footer />}
        </main>
    );
};

export default Pathname;