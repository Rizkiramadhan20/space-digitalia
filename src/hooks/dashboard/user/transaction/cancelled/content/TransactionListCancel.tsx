import React from 'react';

import TransactionCard from '@/hooks/dashboard/user/transaction/cancelled/content/TransactionCard';

import { TransactionListProps } from '@/hooks/dashboard/user/transaction/cancelled/lib/schema';

export default function TransactionList({ transactions, onViewDetails, onDelete }: TransactionListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onViewDetails={onViewDetails}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}