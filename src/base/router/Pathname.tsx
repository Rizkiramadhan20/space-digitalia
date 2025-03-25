"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header/Header";

import Footer from "@/components/layout/Footer/Footer";

import { Toaster } from "react-hot-toast";

import Script from "next/script";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;

    const isAdminRoute = pathname?.includes("/super-admins") ||
        pathname?.includes("/admins") ||
        pathname?.includes("/auth") ||
        pathname?.includes("/payment") ||
        pathname?.includes("/download") ||
        pathname?.includes("/checkout") ||
        pathname?.includes("/dashboard") || false;

    return (
        <main>
            <Script
                src="https://app.midtrans.com/snap/snap.js"
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
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
            {GTM_ID && (
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
            )}
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <Footer />}
        </main>
    );
};

export default Pathname;