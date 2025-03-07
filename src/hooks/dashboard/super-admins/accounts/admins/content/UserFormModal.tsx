import { Role } from '@/utils/context/interface/Auth';

import { UserFormModalProps } from '@/hooks/dashboard/super-admins/accounts/admins/lib/admin';

export default function UserFormModal({
    showModal,
    modalMode,
    formData,
    isSubmitting,
    onSubmit,
    onClose,
    setFormData
}: UserFormModalProps) {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-4 md:p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {modalMode === 'create' ? 'Add New User' : 'Edit User'}
                </h3>
                <div className="space-y-4">
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    {modalMode === 'create' && (
                        <>
                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.role}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        role: e.target.value as Role
                                    })}
                                >
                                    <option value={Role.ADMIN}>Admin</option>
                                    <option value={Role.SUPER_ADMIN}>Super Admin</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg flex items-center gap-2"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </>
                        ) : 'Save'}
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