import Image from 'next/image'

import vector1 from '@/base/assets/ui/home/Vector1.png'

export default function Right() {
    return (
        <div className='absolute bottom-0 right-0 opacity-20 transform hover:opacity-30 transition-opacity duration-500 animate-float'>
            <Image src={vector1} alt='vector-1' />
        </div>
    )
}