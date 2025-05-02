import React from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

import { Address } from '@/hooks/pages/project/[slug]/types/schema'

interface ProjectLicenseProps {
    project: ProjectType
    selectedLicense: string
    deliveryMethod: 'download' | 'delivery' | ''
    defaultAddress: Address | null
    isProcessing: boolean
    handleLicenseSelect: (licenseTitle: string) => void
    handleDeliveryMethodSelect: (method: 'download' | 'delivery') => void
    handleTransaction: () => void
}

export default function ProjectLicense({
    project,
    selectedLicense,
    deliveryMethod,
    defaultAddress,
    isProcessing,
    handleLicenseSelect,
    handleDeliveryMethodSelect,
    handleTransaction
}: ProjectLicenseProps) {
    return (
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-4">License Type</h2>
                    <p className="text-sm text-muted-foreground">Select the license type for this project</p>
                </div>

                <div className="relative">
                    <select
                        className="w-full appearance-none bg-primary/5 hover:bg-primary/10
                            border border-primary/20 hover:border-primary/30
                            rounded-xl p-4 pr-10 transition-all duration-300
                            text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        defaultValue=""
                        onChange={(e) => {
                            handleLicenseSelect(e.target.value);
                        }}
                    >
                        <option value="" disabled>Select License Type</option>
                        {project.licenseDetails.map((item) => (
                            <option
                                key={item.title}
                                value={item.title}
                                className="bg-background text-foreground py-2"
                            >
                                {item.title} - Rp. {item.price.toLocaleString()}
                            </option>
                        ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Selected License Details */}
                {selectedLicense && (
                    <div className="space-y-4 animate-in fade-in-50 duration-300">
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-primary">Selected License</span>
                                <span className="text-xs text-muted-foreground">#{selectedLicense}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-2xl font-bold text-foreground">
                                    Rp. {project.licenseDetails.find(item => item.title === selectedLicense)?.price.toLocaleString() || 0}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Tax included
                                </span>
                            </div>
                        </div>

                        {/* Delivery Method Selection */}
                        <div className={`grid ${project.licenseTitle.toLowerCase() === 'free' ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                            <button
                                onClick={() => handleDeliveryMethodSelect('download')}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border 
                                    transition-all duration-200 ${deliveryMethod === 'download'
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30'
                                    }`}
                            >
                                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span className="text-sm font-medium">Download</span>
                                <span className="text-xs opacity-80 mt-1">Instant access</span>
                            </button>

                            {/* Only show delivery option for paid licenses */}
                            {project.licenseTitle.toLowerCase() !== 'free' && (
                                <button
                                    onClick={() => handleDeliveryMethodSelect('delivery')}
                                    disabled={!defaultAddress}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border 
                                        transition-all duration-200 ${deliveryMethod === 'delivery'
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30'
                                        } ${!defaultAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    <span className="text-sm font-medium">Delivery</span>
                                    <span className="text-xs opacity-80 mt-1">
                                        {!defaultAddress ? 'Add delivery address first' : '1-3 business days'}
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Payment Button */}
                        <button
                            onClick={handleTransaction}
                            disabled={!selectedLicense || !deliveryMethod || isProcessing}
                            className={`w-full py-4 px-6 rounded-xl font-medium text-white
                                ${(!selectedLicense || !deliveryMethod || isProcessing)
                                    ? 'bg-primary/50 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/90 active:bg-primary/80'
                                } transition-all duration-200`}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : !selectedLicense
                                ? 'Select License Type'
                                : !deliveryMethod
                                    ? 'Select Delivery Method'
                                    : 'Proceed to Checkout'
                            }
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}