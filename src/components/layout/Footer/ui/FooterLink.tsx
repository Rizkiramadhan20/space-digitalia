import Link from 'next/link';

import { footerNavLinks } from '@/components/layout/Footer/data/Footer';

export default function FooterLinks() {
    return (
        <div>
            <h3 className="text-white text-xl font-bold mb-8">Tautan Cepat</h3>
            <ul className="space-y-4">
                {footerNavLinks.map((item) => (
                    <li key={item.label}>
                        <Link href={item.href} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}