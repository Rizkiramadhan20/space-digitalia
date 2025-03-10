export default function Header() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                        Canceled Transaction
                    </h1>
                    <p className='text-gray-500'>Manage and organize your canceled transaction</p>
                </div>
            </div>
        </div>
    )
}