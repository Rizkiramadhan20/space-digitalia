import Image from 'next/image'

import { AuthorCardProps } from "@/hooks/pages/articles/[slug]/ui/types/ArticleDetails"

export default function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className='bg-white rounded-2xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100/80'>
            <div className='flex items-center gap-5'>
                <Image
                    src={author.photoURL}
                    alt={author.name}
                    width={100}
                    height={100}
                    className='w-16 h-16 rounded-full ring-4 ring-offset-4 ring-indigo-500/80'
                />
                <div>
                    <p className='font-bold text-lg text-gray-900'>{author.name}</p>
                    <p className='text-sm text-gray-600 mt-1'>{author.role}</p>
                </div>
            </div>
        </div>
    )
}