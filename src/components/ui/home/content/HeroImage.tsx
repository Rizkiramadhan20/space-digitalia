import Image from 'next/image';

import { HomeType } from '@/components/ui/home/lib/schema';

interface HeroImageProps {
    image: HomeType;
}

export default function HeroImage({ image }: HeroImageProps) {
    return (
        <div className="relative w-full aspect-square xl:aspect-[4/5] overflow-hidden">
            <Image
                fill
                src={image.imageUrl}
                alt={image.title}
                className='object-cover w-full h-full'
                priority
            />
        </div>
    );
}