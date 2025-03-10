import React from 'react';

import { DeleteConfirmationModalProps } from '@/hooks/dashboard/user/transaction/canceled/lib/schema';

export default function DeleteConfirmationModal({ isDeleting, onCancel, onConfirm }: DeleteConfirmationModalProps) {
    return (
        <dialog id="delete_confirm_modal" className="modal">
            <div className="modal-box bg-white rounded-2xl shadow-xl">
                <div className="p-6">
                    {/* Warning Icon */}
                    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="mt-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Delete Transaction</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete this transaction? This action cannot be undone.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                     rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                     focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium 
                                     text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                                     disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                        >
                            {isDeleting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}