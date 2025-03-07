import { DeleteConfirmationModalProps } from '@/hooks/dashboard/super-admins/accounts/admins/lib/admin';

export default function DeleteConfirmationModal({
    show,
    user,
    isDeleting,
    onConfirm,
    onClose
}: DeleteConfirmationModalProps) {
    if (!show || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete the {user.role} &quot;{user.displayName}&quot;? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-red-100 hover:shadow-lg flex items-center gap-2"
                        onClick={() => onConfirm(user.uid)}
                        disabled={isDeleting}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}