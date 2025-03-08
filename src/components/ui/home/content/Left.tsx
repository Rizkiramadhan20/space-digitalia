import Image from 'next/image'

import vector2 from '@/base/assets/ui/home/Vector2.png'

export default function Left() {
    return (
        <div className='absolute bottom-[-10rem] left-0 opacity-20 transform hover:opacity-30 transition-opacity duration-500 animate-float-delayed'>
            <Image src={vector2} alt='vector-2' />
        </div>
    )
}
