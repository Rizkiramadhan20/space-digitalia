"use client"

import React from 'react';

import Link from 'next/link';

import Newsletter from '@/components/layout/Footer/ui/Newsletter';

import FooterBrand from '@/components/layout/Footer/ui/FooterBrand';

import FooterLinks from '@/components/layout/Footer/ui/FooterLink';

import FooterContact from '@/components/layout/Footer/ui/FooterContent';

import FooterMap from '@/components/layout/Footer/ui/FooterMaps';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 lg:px-8">
                <Newsletter />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-10 px-6">
                    <FooterBrand />
                    <FooterLinks />
                    <FooterContact />
                    <FooterMap />
                </div>

                <div className="border-t border-gray-800 py-8 px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2024 Space Digitalia. All rights reserved.
                        </p>
                        <div className="flex gap-8 text-sm">
                            <Link href="/kebijakan-privasi" className="text-gray-400 hover:text-white transition-colors">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
