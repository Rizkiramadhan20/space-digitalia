import { DeleteModalProps } from "@/hooks/dashboard/super-admins/service/count-testimonial/lib/schema"

export const DeleteModal = ({ deleteLoading, onConfirm, onCancel }: DeleteModalProps) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
                        <svg className="mx-auto mb-4 text-red-500 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>

                        <h3 className="mb-5 text-lg font-semibold text-gray-800">
                            Are you sure you want to delete this testimonial?
                        </h3>
                        <p className="mb-6 text-sm text-gray-500">
                            This action cannot be undone. This will permanently delete the testimonial.
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <span>Yes, Delete</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}