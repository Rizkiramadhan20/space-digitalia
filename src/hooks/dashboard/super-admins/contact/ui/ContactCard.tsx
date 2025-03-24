import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { HiOutlineMailOpen, HiOutlineClock } from 'react-icons/hi'

import { ContactCardProps } from '@/hooks/dashboard/super-admins/contact/lib/contacts'

export default function ContactCard({ message, onViewMessage, repliedMessages }: ContactCardProps) {
    return (
        <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-16 -translate-y-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                {message.fullName}
                            </h3>

                            {message.status === 'unread' && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                            <HiOutlineMailOpen className="w-4 h-4" />
                            <p className="text-sm">{message.email}</p>
                        </div>
                    </div>
                    <button
                        className={`p-2 rounded-xl transition-colors ${message.status === 'unread'
                            ? 'text-red-500 hover:bg-red-50'
                            : 'text-gray-500 hover:bg-blue-50 group-hover:text-blue-600'
                            }`}
                        title={message.status === 'read' ? 'View message' : 'New message'}
                        onClick={() => onViewMessage(message)}
                    >
                        {message.status === 'read'
                            ? <AiOutlineEyeInvisible className="w-5 h-5" />
                            : <AiOutlineEye className="w-5 h-5" />
                        }
                    </button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                            ${repliedMessages.has(message.id)
                                ? 'bg-green-100 text-green-800'
                                : message.status === 'read'
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'bg-red-50 text-red-700'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${repliedMessages.has(message.id)
                                ? 'bg-green-500'
                                : message.status === 'read'
                                    ? 'bg-blue-500'
                                    : 'bg-red-500 animate-pulse'
                                }`}
                            />
                            {repliedMessages.has(message.id)
                                ? 'Replied'
                                : message.status === 'read'
                                    ? 'Read'
                                    : 'Unread'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <HiOutlineClock className="w-4 h-4" />
                        <span>
                            {new Date(message.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}