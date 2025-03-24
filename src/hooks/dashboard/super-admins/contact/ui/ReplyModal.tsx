import { HiX } from 'react-icons/hi'

import { ReplyModalProps } from '@/hooks/dashboard/super-admins/contact/lib/contacts'

export default function ReplyModal({
    isOpen,
    selectedMessage,
    replyMessage,
    isSending,
    onReplyChange,
    onClose,
    onSend
}: ReplyModalProps) {
    if (!selectedMessage) return null;

    return (
        <dialog id="reply_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box bg-white rounded-3xl shadow-2xl max-w-2xl w-11/12 p-0 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h3 className="font-bold text-2xl md:text-3xl tracking-tight">
                            Reply to {selectedMessage.fullName}
                        </h3>
                        <p className="text-blue-100 text-sm mt-2">
                            Replying to: {selectedMessage.email}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 btn btn-circle btn-sm bg-white/10 border-0 hover:bg-white/20 text-white"
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Original Message:</p>
                        <p className="text-gray-700 text-sm">{selectedMessage.message}</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Your Reply</label>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => onReplyChange(e.target.value)}
                            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Type your reply here..."
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-colors duration-200"
                        disabled={isSending}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSend}
                        disabled={!replyMessage.trim() || isSending}
                        className={`px-6 py-2.5 rounded-xl font-medium text-white transition-colors duration-200 flex items-center gap-2
                            ${replyMessage.trim() && !isSending
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-400 cursor-not-allowed'}`}
                    >
                        {isSending ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Reply'
                        )}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={onClose}>
                <button>close</button>
            </div>
        </dialog>
    )
}