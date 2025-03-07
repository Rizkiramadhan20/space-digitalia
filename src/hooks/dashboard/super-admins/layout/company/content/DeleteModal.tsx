import { motion } from 'framer-motion';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/layout/company/lib/company';

export default function DeleteModal({ onDelete, deleteId }: DeleteModalProps) {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
                >
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Confirm Deletion</h3>
                    <p className="text-sm text-slate-600 mb-8">
                        Are you sure you want to delete this image? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300 font-medium"
                            onClick={() => {
                                const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                deleteModal?.close();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-medium"
                            onClick={() => deleteId && onDelete(deleteId)}
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </div>
        </dialog>
    );
}