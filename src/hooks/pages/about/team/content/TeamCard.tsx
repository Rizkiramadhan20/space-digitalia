import Image from 'next/image'

import { motion } from 'framer-motion'

import { TeamMemberProps } from '@/hooks/pages/about/team/lib/schema'

export function TeamCard({ member, index }: TeamMemberProps) {
    return (
        <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, margin: "-100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1
            }}
            whileHover={{ scale: 1.05 }}
            className='group'
        >
            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl shadow-lg">
                <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
            </div>

            <div className="text-center">
                <p className='text-sm font-medium text-indigo-600 uppercase tracking-wider mb-2'>{member.position}</p>
                <h3 className='text-xl font-semibold text-gray-900 hover:text-indigo-700 transition-colors duration-300'>{member.name}</h3>
            </div>
        </motion.div>
    )
}