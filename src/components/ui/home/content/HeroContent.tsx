import Link from 'next/link';

import { HomeType } from '@/components/ui/home/lib/schema';

interface HeroContentProps {
    item: HomeType;
}

export default function HeroContent({ item }: HeroContentProps) {
    return (
        <div className='flex flex-col gap-8 lg:gap-10 items-center text-center lg:text-start lg:items-start transform transition-all duration-500 hover:translate-y-[-5px]'>
            <h1
                className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent'
                style={{ lineHeight: '1.2' }}
            >
                {item.title}
            </h1>

            <p className='text-lg md:text-xl text-gray-600/90 leading-relaxed max-w-2xl'>
                {item.description}
            </p>

            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto'>
                <Link
                    href={item.button1.link}
                    className='group relative px-8 py-4 rounded-full bg-blue-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 w-full sm:w-fit'
                >
                    <span className='relative z-10'>{item.button1.text}</span>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
                </Link>

                <Link
                    href={item.button2.link}
                    className='group px-8 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50/80 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 backdrop-blur-sm w-full sm:w-fit'
                >
                    {item.button2.text}
                </Link>
            </div>
        </div>
    );
}