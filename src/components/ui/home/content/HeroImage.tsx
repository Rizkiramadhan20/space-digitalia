import Image from 'next/image';

import { motion } from 'framer-motion';

import { HeroImageProps } from '@/components/ui/home/types/schema';

import { heroImageAnimations } from '@/components/ui/home/animation/animation';

export default function HeroImage({ image }: HeroImageProps) {
    return (
        <motion.div
            className="relative w-full aspect-square xl:aspect-[4/5] overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroImageAnimations.container}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <motion.div
                initial="hidden"
                animate="show"
                variants={heroImageAnimations.innerContent}
            />
            <Image
                fill
                src={image.imageUrl}
                alt={image.title}
                className='object-cover w-full h-full'
                priority
                sizes="(min-width: 1280px) 80vw, 100vw"
                quality={85}
                loading="eager"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,...`}
            />
        </motion.div>
    );
}