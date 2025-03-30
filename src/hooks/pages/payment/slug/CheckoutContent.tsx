"use client"

import React, { useState, useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'react-hot-toast'

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

import { formatRupiah } from '@/base/helper/formatRupiah'

interface Address {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    streetAddress: string;
    details: string;
    postalCode: string;
    isDefault: boolean;
    type: string;
}

interface ProjectType {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    licenseDetails: Array<{
        title: string;
        price: number;
        description: string;
        downloadUrl?: string;
    }>;
}

export default function CheckoutContent() {
    const router = useRouter()
    const { user } = useAuth()
    const searchParams = useSearchParams()

    const [isLoading, setIsLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)
    const [project, setProject] = useState<ProjectType | null>(null)
    const [selectedLicense, setSelectedLicense] = useState<ProjectType['licenseDetails'][0] | null>(null)

    // Get query parameters
    const projectId = searchParams.get('projectId')
    const licenseType = searchParams.get('licenseType')
    const deliveryMethod = searchParams.get('deliveryMethod')

    // Debug log untuk melihat parameter
    useEffect(() => {
        console.log('Checkout Data:', {
            projectId,
            licenseType,
            deliveryMethod,
            user: user?.uid,
            defaultAddress,
            project,
            selectedLicense
        });
    }, [projectId, licenseType, deliveryMethod, user, defaultAddress, project, selectedLicense]);

    // Fetch project and address data
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Starting fetchData with:', { projectId, licenseType, deliveryMethod });

                // Validasi parameter yang diperlukan
                if (!projectId) {
                    throw new Error('Project ID is missing');
                }
                if (!licenseType) {
                    throw new Error('License type is missing');
                }
                if (!deliveryMethod) {
                    throw new Error('Delivery method is missing');
                }

                // Validasi user login
                if (!user?.uid) {
                    const currentUrl = window.location.href;
                    localStorage.setItem('redirectAfterLogin', currentUrl);
                    router.push('/auth/signin');
                    throw new Error('Please login to continue');
                }

                // Fetch project details
                console.log('Fetching project:', projectId);
                const projectsCollection = process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT;
                const accountsCollection = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS;

                if (!projectsCollection) {
                    throw new Error('Projects collection name is not configured');
                }

                const projectRef = doc(db, projectsCollection, projectId);
                const projectDoc = await getDoc(projectRef);

                if (!projectDoc.exists()) {
                    throw new Error('Project not found');
                }

                const projectData = {
                    id: projectDoc.id,
                    ...projectDoc.data()
                } as ProjectType;

                console.log('Project data:', projectData);

                // Find selected license
                const license = projectData.licenseDetails.find(l => l.title === licenseType);
                if (!license) {
                    throw new Error(`License type "${licenseType}" not found in project`);
                }

                setProject(projectData);
                setSelectedLicense(license);

                // Fetch user's default address if delivery method is selected
                if (deliveryMethod === 'delivery' && accountsCollection) {
                    console.log('Fetching address for user:', user.uid);
                    const userDoc = await getDoc(doc(db, accountsCollection, user.uid));
                    if (userDoc.exists()) {
                        const addresses: Address[] = userDoc.data().addresses || [];
                        const defaultAddr = addresses.find(addr => addr.isDefault);
                        setDefaultAddress(defaultAddr || null);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error in fetchData:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to load checkout data');
                router.push('/');
            }
        };

        if (projectId || licenseType || deliveryMethod) {
            fetchData();
        }
    }, [user?.uid, projectId, licenseType, deliveryMethod, router]);

    // Add Midtrans script when component mounts
    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY

        const scriptElement = document.createElement('script')
        scriptElement.src = midtransScriptUrl
        scriptElement.setAttribute('data-client-key', midtransClientKey || '')

        document.body.appendChild(scriptElement)

        return () => {
            document.body.removeChild(scriptElement)
        }
    }, [])

    // Handle payment process
    const handlePayment = async () => {
        try {
            // Validate user is logged in and has required fields
            if (!user || !user.uid || !user.email || !user.displayName) {
                localStorage.setItem('redirectAfterLogin', window.location.pathname);
                router.push('/auth/signin');
                toast.error('Please sign in with complete profile information');
                return;
            }

            if (!project || !selectedLicense) {
                toast.error('Invalid project or license selection');
                return;
            }

            if (deliveryMethod === 'delivery' && !defaultAddress) {
                toast.error('Please add a delivery address');
                return;
            }

            setIsProcessing(true);

            // Prepare payment data
            const paymentData = {
                // Order details
                projectId: project.id,
                projectTitle: project.title,
                imageUrl: project.imageUrl,

                // License details
                licenseType: selectedLicense.title,
                amount: selectedLicense.price,
                downloadUrl: deliveryMethod === 'download' ? selectedLicense.downloadUrl : undefined,

                // User details
                userId: user.uid,
                userEmail: user.email,
                userName: user.displayName,
                userPhotoURL: user.photoURL || null,

                // Delivery details
                deliveryMethod,
                deliveryAddress: deliveryMethod === 'delivery' ? {
                    fullName: defaultAddress?.fullName || '',
                    phone: defaultAddress?.phone || '',
                    province: defaultAddress?.province || '',
                    city: defaultAddress?.city || '',
                    district: defaultAddress?.district || '',
                    streetAddress: defaultAddress?.streetAddress || '',
                    details: defaultAddress?.details || '',
                    postalCode: defaultAddress?.postalCode || '',
                    type: defaultAddress?.type || 'home'
                } : null
            };

            console.log('Sending payment data:', paymentData); // Debug log

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Payment API error:', errorData);
                throw new Error(errorData.error || errorData.message || 'Failed to create payment');
            }

            const data = await response.json();

            // Ensure snap is loaded
            if (typeof window.snap === 'undefined') {
                throw new Error('Payment system not initialized');
            }

            // Configure Midtrans callback handlers
            window.snap.pay(data.token, {
                onSuccess: async (result) => {
                    try {
                        // Update status transaksi
                        const updateResponse = await fetch('/api/payment/update-status', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderId: data.orderId,
                                transactionId: result.transaction_id,
                                status: 'success',
                                paymentDetails: {
                                    transaction_status: result.transaction_status,
                                    status_code: result.status_code,
                                    status_message: result.status_message,
                                    transaction_id: result.transaction_id,
                                    order_id: result.order_id,
                                    payment_type: result.payment_type,
                                    transaction_time: result.transaction_time,
                                    gross_amount: result.gross_amount
                                }
                            }),
                        });

                        if (!updateResponse.ok) {
                            throw new Error('Failed to update transaction status');
                        }

                        toast.success('Payment successful!');
                        await router.replace(`/payment/status/${data.orderId}`);
                    } catch (error) {
                        console.error('Update status error:', error);
                        await router.replace(`/payment/status/${data.orderId}`);
                    }
                },
                onPending: async (result) => {
                    try {
                        const updateResponse = await fetch('/api/payment/update-status', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderId: data.orderId,
                                transactionId: result.transaction_id,
                                status: 'pending',
                                paymentDetails: {
                                    transaction_status: result.transaction_status,
                                    status_code: result.status_code,
                                    status_message: result.status_message,
                                    transaction_id: result.transaction_id,
                                    order_id: result.order_id,
                                    payment_type: result.payment_type,
                                    transaction_time: result.transaction_time,
                                    gross_amount: result.gross_amount
                                }
                            }),
                        });

                        if (!updateResponse.ok) {
                            throw new Error('Failed to update transaction status');
                        }

                        toast.loading('Payment is pending...');
                        await router.replace(`/payment/status/${data.orderId}`);
                    } catch (error) {
                        console.error('Update status error:', error);
                        await router.replace(`/payment/status/${data.orderId}`);
                    }
                },
                onError: async (result) => {
                    try {
                        const updateResponse = await fetch('/api/payment/update-status', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderId: data.orderId,
                                transactionId: result.transaction_id || data.transactionId,
                                status: 'failure',
                                paymentDetails: {
                                    transaction_status: result.transaction_status || 'error',
                                    status_code: result.status_code || '500',
                                    status_message: result.status_message || 'Payment failed',
                                    transaction_id: result.transaction_id || data.transactionId,
                                    order_id: result.order_id || data.orderId,
                                    payment_type: result.payment_type || 'unknown',
                                    transaction_time: result.transaction_time || new Date().toISOString(),
                                    gross_amount: result.gross_amount || '0'
                                }
                            }),
                        });

                        if (!updateResponse.ok) {
                            throw new Error('Failed to update transaction status');
                        }

                        toast.error('Payment failed');
                        await router.replace(`/payment/status/${data.orderId}`);
                    } catch (error) {
                        console.error('Update status error:', error);
                        await router.replace(`/payment/status/${data.orderId}`);
                    }
                },
                onClose: () => {
                    setIsProcessing(false);
                    toast.dismiss();
                },
            });

        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error instanceof Error ? error.message : 'Payment processing failed');
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Tampilkan pesan jika tidak ada project
    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-lg text-muted-foreground">No project information available</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Left Column - Billing Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Billing Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                            <div className="p-6">
                                {/* Card Header */}
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {deliveryMethod === 'delivery' ? 'Billing & Shipping' : 'Billing Details'}
                                    </h2>
                                </div>

                                {/* Shipping Address Section */}
                                {deliveryMethod === 'delivery' && (
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
                                            <button
                                                onClick={() => router.push('/account/address')}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary 
                                                             bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                Edit Address
                                            </button>
                                        </div>

                                        {/* Address Fields */}
                                        <div className="grid gap-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                                                                 text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary 
                                                                 transition-all duration-200"
                                                    value={defaultAddress?.streetAddress || 'No address provided'}
                                                    readOnly
                                                />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* City Input */}
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl"
                                                        value={defaultAddress?.city || 'Not provided'}
                                                        readOnly
                                                    />
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Postal Code Input */}
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl"
                                                        value={defaultAddress?.postalCode || 'Not provided'}
                                                        readOnly
                                                    />
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h3>
                                    <div className="grid gap-4">
                                        {/* Name Input */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl"
                                                value={user?.displayName || 'Not provided'}
                                                readOnly
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl"
                                                value={user?.email || 'Not provided'}
                                                readOnly
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}

                                {
                                    deliveryMethod === 'delivery' && (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-medium text-gray-700 mb-4">Location</h3>

                                            <div className="w-full h-[300px] rounded-xl overflow-hidden">
                                                <iframe
                                                    title="Location Map"
                                                    width="100%"
                                                    height="100%"
                                                    frameBorder="0"
                                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=106.62206172943115%2C-6.576112400000001%2C106.64206172943115%2C-6.572112400000001&layer=mapnik&marker=${defaultAddress?.district}`}
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Delivery Method Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            {deliveryMethod === 'delivery' ? (
                                <div className="flex items-center gap-4 text-blue-600">
                                    <div className="p-3 bg-blue-50 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">Estimated Delivery Time</p>
                                        <p className="text-sm text-blue-500">1-3 business days</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 text-purple-600">
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">Instant Download</p>
                                        <p className="text-sm text-purple-500">Available right after payment</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-4 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                            {selectedLicense?.title}
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full
                                                ${deliveryMethod === 'delivery'
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {deliveryMethod === 'delivery' ? 'Delivery' : 'Download'}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Details */}
                                {project && selectedLicense && (
                                    <div className="space-y-6">
                                        <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{project.title}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price Breakdown */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between py-3 border-b border-dashed">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">{formatRupiah(selectedLicense.price)}</span>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Total Payment</p>
                                                        <p className="text-2xl font-bold text-primary mt-1">
                                                            {formatRupiah(selectedLicense.price)}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        <span className="text-sm">Secure Payment</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Button */}
                                        <button
                                            onClick={handlePayment}
                                            disabled={isProcessing || (deliveryMethod === 'delivery' && !defaultAddress)}
                                            className="w-full p-4 bg-primary text-white rounded-xl font-medium
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                    hover:bg-primary/90 active:bg-primary/95 
                                                    transition-all duration-200
                                                    focus:outline-none focus:ring-2 focus:ring-primary/20
                                                    flex items-center justify-center gap-2"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Proceed to Payment</span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>

                                        {/* Error Message */}
                                        {deliveryMethod === 'delivery' && !defaultAddress && (
                                            <div className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span className="text-sm font-medium">Please add a delivery address</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}