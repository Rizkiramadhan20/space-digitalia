import { motion } from 'framer-motion'

export const FetchHero = {
    title: 'Our Team',
}

export function TeamHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='flex flex-col gap-6 w-full mb-16'
        >
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 leading-tight'>
                {FetchHero.title}
            </h1>
        </motion.div>
    )
}