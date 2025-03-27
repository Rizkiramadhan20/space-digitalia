import Image from 'next/image';

import Link from 'next/link';

import logo from "@/base/assets/logo/logo.jpg";

import { footerSocialLinks } from '@/components/layout/Footer/data/Footer';

export default function FooterBrand() {
    return (
        <div>
            <Image
                src={logo}
                alt="logo"
                width={120}
                height={120}
                className="mb-8 rounded-lg"
            />
            <p className="text-gray-400 mb-8 leading-relaxed">
                Space Digitalia – Inovasi Digital, Solusi Tanpa Batas! 🚀
            </p>
            <div className="flex gap-8">
                {footerSocialLinks.map((social) => (
                    <Link
                        key={social.href}
                        href={social.href}
                        className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Space Digitalia on ${social.name}`}
                    >
                        <social.icon className="text-2xl" />
                    </Link>
                ))}
            </div>
        </div>
    );
}