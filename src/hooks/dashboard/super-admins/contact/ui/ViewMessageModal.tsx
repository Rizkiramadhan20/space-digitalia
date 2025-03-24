import { HiX, HiMail, HiPhone, HiChatAlt2, HiCalendar } from 'react-icons/hi'

import { ViewMessageModalProps } from '@/hooks/dashboard/super-admins/contact/lib/contacts'

export default function ViewMessageModal({ selectedMessage, repliedMessages, onReply }: ViewMessageModalProps) {
    if (!selectedMessage) return null;

    return (
        <dialog id="contact_modal" className="modal">
            <div className="modal-box bg-white rounded-3xl shadow-2xl max-w-2xl w-11/12 p-0 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-2xl md:text-3xl tracking-tight">
                            {selectedMessage.fullName}
                        </h3>
                        <p className="text-blue-100 text-sm mt-2 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${selectedMessage.status === 'read'
                                ? 'bg-green-400'
                                : 'bg-yellow-400'
                                }`}></span>
                            {selectedMessage.status === 'read' ? 'Read message' : 'New message'}
                        </p>
                    </div>
                    <form method="dialog" className="absolute right-4 top-4">
                        <button className="btn btn-circle btn-sm bg-white/10 border-0 hover:bg-white/20 text-white">
                            <HiX className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <HiMail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="text-gray-900 font-medium mt-1">{selectedMessage.email}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <HiPhone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                <p className="text-gray-900 font-medium mt-1">{selectedMessage.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/80 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <HiChatAlt2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Message</p>
                            </div>
                        </div>
                        <p className="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed pl-[56px]">
                            {selectedMessage.message}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 px-2">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <HiCalendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Sent on</p>
                            <p className="text-gray-900 font-medium mt-1">
                                {new Date(selectedMessage.createdAt).toLocaleString('id-ID', {
                                    dateStyle: 'full',
                                    timeStyle: 'short'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-2">
                    {!repliedMessages.has(selectedMessage.id) && (
                        <button
                            onClick={onReply}
                            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            Reply
                        </button>
                    )}
                    <form method="dialog">
                        <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors duration-200">
                            Close
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/40 backdrop-blur-sm">
                <button>close</button>
            </form>
        </dialog>
    )
}