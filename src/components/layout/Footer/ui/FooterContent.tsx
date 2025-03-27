import Link from 'next/link';

import { contactInfo } from '@/components/layout/Footer/data/Footer';

export default function FooterContact() {
    return (
        <div>
            <h3 className="text-white text-xl font-bold mb-8">Hubungi Kami</h3>
            <div className="space-y-4 flex flex-col">
                {contactInfo.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors"
                        style={{ lineHeight: "1.8" }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}