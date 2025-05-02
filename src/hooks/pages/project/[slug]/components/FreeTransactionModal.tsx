import React from 'react'

import { Address } from '@/hooks/pages/project/[slug]/types/schema'

interface FreeTransactionModalProps {
    showFreeModal: boolean
    setShowFreeModal: (show: boolean) => void
    selectedLicense: string
    deliveryMethod: 'download' | 'delivery' | ''
    defaultAddress: Address | null
    isProcessing: boolean
    handleFreeTransactionConfirm: () => void
}

export default function FreeTransactionModal({
    showFreeModal,
    setShowFreeModal,
    selectedLicense,
    deliveryMethod,
    defaultAddress,
    isProcessing,
    handleFreeTransactionConfirm
}: FreeTransactionModalProps) {
    if (!showFreeModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 max-w-md w-full mx-4">
                <h3 className="text-xl font-semibold mb-4">Confirm Free Download</h3>
                <div className="space-y-4">
                    <p className="text-muted-foreground">You&apos;re about to download this project for free. Please confirm your selection:</p>

                    <div className="bg-primary/5 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">License Type:</span>
                            <span className="text-sm">{selectedLicense}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Delivery Method:</span>
                            <span className="text-sm">{deliveryMethod}</span>
                        </div>
                    </div>

                    {deliveryMethod === 'delivery' && defaultAddress && (
                        <div className="bg-primary/5 p-4 rounded-xl">
                            <h4 className="text-sm font-medium mb-2">Delivery Address:</h4>
                            <p className="text-sm text-muted-foreground">
                                {defaultAddress.fullName}<br />
                                {defaultAddress.streetAddress}<br />
                                {defaultAddress.district}, {defaultAddress.city}<br />
                                {defaultAddress.province} {defaultAddress.postalCode}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setShowFreeModal(false)}
                            className="flex-1 px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 
                                border border-primary/20 hover:border-primary/30 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFreeTransactionConfirm}
                            disabled={isProcessing}
                            className="flex-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground 
                                hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                'Confirm Download'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}