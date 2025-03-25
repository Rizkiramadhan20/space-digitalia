import Link from 'next/link'

import { formatSlug } from '@/base/helper/formatSlug'

type BreadcrumbProps = {
    slug: string
    tags: string[]
}

export default function Breadcrumb({ slug, tags }: BreadcrumbProps) {
    return (
        <ol className="flex flex-wrap items-center gap-2 sm:gap-0 text-xs lg:text-sm text-gray-600">
            <li className="flex items-center">
                <Link href='/' className="flex items-center hover:text-blue-600 transition-colors">
                    <FolderIcon />
                    <span>Home</span>
                </Link>
                <span className="mx-2">/</span>
            </li>

            <li className="flex items-center">
                <Link href='/articles' className="flex items-center hover:text-blue-600 transition-colors">
                    <FolderIcon />
                    <span>Articles</span>
                </Link>
                <span className="mx-2">/</span>
            </li>

            <li className="flex items-center">
                <Link href={`/articles/${formatSlug(tags[0])}`} className="flex items-center hover:text-blue-600 transition-colors">
                    <FolderIcon />
                    <span>{tags[0]}</span>
                </Link>
                <span className="mx-2">/</span>
            </li>

            <li className="flex items-center">
                <span className="flex items-center text-gray-800">
                    <DocumentIcon />
                    <span className="font-medium">{slug}</span>
                </span>
            </li>
        </ol>
    )
}

const FolderIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-4 w-4 stroke-current mr-1">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z">
        </path>
    </svg>
)

const DocumentIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-4 w-4 stroke-current mr-1">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
        </path>
    </svg>
)