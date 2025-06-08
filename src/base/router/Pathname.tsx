"use client";

import React, { Fragment } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import { Toaster } from "react-hot-toast";

import WhatsApp from "@/base/popup/WhatsApp"

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAdminRoute = pathname?.includes("/super-admins") ||
        pathname?.includes("/admins") ||
        pathname?.includes("/signin") ||
        pathname?.includes("/signup") ||
        pathname?.includes("/forgot-password") ||
        pathname?.includes("/dashboard") || false;

    return (
        <Fragment>
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
            {!isAdminRoute && <WhatsApp />}
            {children}
            {!isAdminRoute && <Footer />}
        </Fragment>
    );
};

export default Pathname;