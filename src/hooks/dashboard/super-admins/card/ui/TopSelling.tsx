import React from 'react';

import Image from 'next/image';

import { TopSellingSectionProps } from "@/hooks/dashboard/super-admins/card/types/dashboard"

const DEFAULT_IMAGE = '/placeholder-image.jpg';

export default function TopSellingSection({ topSellingItems }: TopSellingSectionProps) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pembelian Terakhir</h2>
            <div className="flex flex-wrap gap-4">
                {topSellingItems.map((item) => (
                    <div key={`top-selling-${item.id}`} className="flex-1 min-w-[300px] flex items-center justify-between p-3 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name || 'Product image'}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 64px) 100vw, 64px"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = DEFAULT_IMAGE;
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={DEFAULT_IMAGE}
                                        alt="Placeholder image"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 64px) 100vw, 64px"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-gray-800">{item.name || 'Untitled Product'}</p>
                                <p className="text-sm text-gray-500 mt-1">{item.sales} item</p>
                            </div>
                        </div>
                        <span className="text-green-500 text-sm font-semibold">{item.trend}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}