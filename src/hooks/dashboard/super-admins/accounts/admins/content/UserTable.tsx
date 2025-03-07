import { UserTableProps } from '@/hooks/dashboard/super-admins/accounts/admins/lib/admin';

import { Role } from '@/utils/context/interface/Auth';

export default function UserTable({ users, onEdit, onDelete, deletingId }: UserTableProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/50">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-50/50 transition-colors duration-200">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.displayName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === Role.SUPER_ADMIN
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'bg-emerald-50 text-emerald-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            className="px-3.5 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
                                            onClick={() => onEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(user)}
                                            className="px-3.5 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
                                            disabled={deletingId === user.uid}
                                        >
                                            {deletingId === user.uid ? (
                                                <div className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Deleting...
                                                </div>
                                            ) : (
                                                'Delete'
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}