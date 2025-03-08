import Image from 'next/image'

import { FeaturedType } from '@/components/ui/featured/lib/schema'

interface FeaturedItemProps {
    item: FeaturedType
}

export default function FeaturedItem({ item }: FeaturedItemProps) {
    return (
        <div
            className='group flex-1 min-w-[280px] flex flex-row items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4'
        >
            <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className='object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
                />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className='text-lg font-semibold text-gray-800 line-clamp-2'>{item.title}</h3>
                <p className='text-sm text-gray-600 line-clamp-3'>{item.text}</p>
            </div>
        </div>
    )
}