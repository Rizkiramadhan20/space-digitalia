import { DeleteModalProps } from '@/hooks/dashboard/super-admins/layout/featured/lib/featured'

export const DeleteModal = ({ onConfirm, editingId }: DeleteModalProps) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this content? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            onClick={() => {
                                const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                modal?.close()
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                            onClick={() => editingId && onConfirm(editingId)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}