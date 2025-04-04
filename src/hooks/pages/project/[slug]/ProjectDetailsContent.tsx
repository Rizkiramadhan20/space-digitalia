"use client"

import React, { useEffect, useState, useCallback } from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

import { FetchProjectDetails } from '@/hooks/pages/project/[slug]/lib/FetchProject'

import ProjectDetailSkelaton from '@/hooks/pages/project/[slug]/ProjectDetailSkelaton'

import Image from "next/image"

import Link from 'next/link'

import { useImageZoom } from '@/hooks/pages/project/[slug]/lib/ImageZoom'

import { useImageDownload } from '@/hooks/pages/project/[slug]/lib/ImageDownload'

import { Timestamp } from 'firebase/firestore'

import { ref, onValue, increment, update, get } from 'firebase/database';

import { database } from '@/utils/firebase';

import ImagePreviewModal from '@/hooks/pages/project/[slug]/content/ImagePriviewModal'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'react-hot-toast'

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { runTransaction } from 'firebase/firestore'

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
}

export default function ProjectDetailsContent({ slug }: { slug: string }) {
    const router = useRouter()
    const { user } = useAuth()
    const [project, setProject] = useState<ProjectType[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [viewCount, setViewCount] = useState<number>(0)
    const { handleDownload } = useImageDownload()
    const {
        zoomLevel,
        position,
        isDragging,
        handleZoomIn,
        handleZoomOut,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        resetZoom,
        setZoomLevel
    } = useImageZoom()

    // Add state for selected license
    const [selectedLicense, setSelectedLicense] = useState<string>('')
    const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'delivery' | ''>('')

    // Add new state for processing
    const [isProcessing, setIsProcessing] = useState(false)

    // Add new state for default address
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)

    // Add state for free transaction modal
    const [showFreeModal, setShowFreeModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = FetchProjectDetails(slug, setProject)

        const incrementViewCount = async (ipAddress: string) => {
            try {
                // Skip if ipAddress is a timestamp (fallback value)
                if (!isNaN(Number(ipAddress))) {
                    console.log('Skipping invalid IP address (timestamp):', ipAddress);
                    return;
                }

                const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                const locationData = await locationResponse.json();

                // Validate location data
                if (locationData.error || !locationData.city) {
                    console.log('Invalid location data:', locationData);
                    return;
                }

                const viewsRef = ref(database, `${process.env.NEXT_PUBLIC_PROJECT_VIEWS}/${slug}`);
                const ipRef = ref(database, `${process.env.NEXT_PUBLIC_PROJECT_VIEWS}/${slug}/ips/${ipAddress.replace(/\./g, '_')}`);

                const ipSnapshot = await get(ipRef);
                if (!ipSnapshot.exists()) {
                    await update(viewsRef, {
                        count: increment(1),
                        lastViewed: new Date().toISOString(),
                        [`ips/${ipAddress.replace(/\./g, '_')}`]: {
                            timestamp: new Date().toISOString(),
                            city: locationData.city,
                            region: locationData.region,
                            country: locationData.country_name,
                            latitude: locationData.latitude,
                            longitude: locationData.longitude,
                            isp: locationData.org,
                            timezone: locationData.timezone
                        }
                    });
                } else {
                    const lastViewTime = new Date(ipSnapshot.val().timestamp);
                    const currentTime = new Date();
                    const hoursDifference = (currentTime.getTime() - lastViewTime.getTime()) / (1000 * 60 * 60);

                    // Update timestamp if last view was more than 24 hours ago
                    if (hoursDifference >= 24) {
                        await update(viewsRef, {
                            count: increment(1),
                            [`ips/${ipAddress.replace(/\./g, '_')}/timestamp`]: currentTime.toISOString()
                        });
                    }
                }
            } catch (error) {
                console.error('Error processing view:', error);
                return;
            }
        };

        // Initialize view counter
        const viewsRef = ref(database, `${process.env.NEXT_PUBLIC_PROJECT_VIEWS}/${slug}`);

        // Listen to view count changes
        const viewsListener = onValue(viewsRef, (snapshot) => {
            const views = snapshot.val()?.count || 0;
            setViewCount(views);
        });

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                if (data.ip) {
                    incrementViewCount(data.ip);
                }
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
            });

        return () => {
            unsubscribe();
            viewsListener();
        }
    }, [slug])

    useEffect(() => {
        if (project.length > 0) {
            setLoading(false)
        }
    }, [project])

    useEffect(() => {
        resetZoom()
    }, [selectedImage, resetZoom])

    // Wrap closeModal in useCallback to prevent infinite re-renders
    const closeModal = useCallback(() => {
        setSelectedImage(null)
        resetZoom()
    }, [resetZoom])

    // Update useEffect with closeModal in dependencies
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedImage) {
                closeModal()
            }
        }

        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [selectedImage, closeModal])

    // Add useEffect to handle body scrolling
    useEffect(() => {
        if (selectedImage) {
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden'
        } else {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'unset'
        }

        // Cleanup function to ensure scrolling is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

    // Debug states
    useEffect(() => {
        console.log('Current State:', {
            project: project[0],
            selectedLicense,
            deliveryMethod,
            user: user?.uid,
            defaultAddress
        })
    }, [project, selectedLicense, deliveryMethod, user, defaultAddress])

    // Handle license selection
    const handleLicenseSelect = (licenseTitle: string) => {
        setSelectedLicense(licenseTitle)
    }

    // Handle delivery method selection
    const handleDeliveryMethodSelect = (method: 'download' | 'delivery') => {
        setDeliveryMethod(method)
    }

    // Handle transaction process
    const handleTransaction = async () => {
        if (!user) {
            toast.error('Please sign in to continue')
            localStorage.setItem('redirectAfterLogin', window.location.href)
            router.push('/auth/signin')
            return
        }

        if (!selectedLicense) {
            toast.error('Please select a license')
            return
        }

        if (!deliveryMethod) {
            toast.error('Please select a delivery method')
            return
        }

        if (deliveryMethod === 'delivery' && !defaultAddress) {
            toast.error('Please add a delivery address')
            return
        }

        setIsProcessing(true)

        try {
            const selectedLicenseDetails = project[0].licenseDetails.find(
                license => license.title === selectedLicense
            )

            if (!selectedLicenseDetails) {
                throw new Error('Selected license details not found')
            }

            // Check if license is free
            if (selectedLicenseDetails.price === 0) {
                // Show free transaction modal instead of redirecting
                setShowFreeModal(true)
                setIsProcessing(false)
                return
            }

            // Continue with existing paid transaction flow
            const checkoutUrl = `/checkout?` + new URLSearchParams({
                projectId: project[0].id,
                licenseType: selectedLicense,
                deliveryMethod: deliveryMethod
            }).toString()

            router.push(checkoutUrl)
        } catch (error) {
            console.error('Transaction error:', error)
            toast.error('Failed to process transaction')
        } finally {
            setIsProcessing(false)
        }
    }

    // Handle free transaction confirmation
    const handleFreeTransactionConfirm = async () => {
        setIsProcessing(true)
        try {
            // Get selected license details
            const selectedLicenseDetails = project[0].licenseDetails.find(
                license => license.title === selectedLicense
            );

            if (!selectedLicenseDetails) {
                throw new Error('Selected license details not found');
            }

            // Generate unique IDs
            const orderId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const transactionId = `${Math.random().toString(36).substr(2, 9)}`;

            // Create transaction document in Firestore
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!, orderId);
            const projectRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT!, project[0].id);

            // Prepare transaction data
            const transactionData = {
                orderId,
                transactionId,
                projectId: project[0].id,
                userId: user?.uid,
                amount: 0,
                projectTitle: project[0].title,
                licenseType: selectedLicense,
                deliveryMethod,
                paymentMethod: "free",
                downloadUrl: selectedLicenseDetails.downloadUrl || null,
                imageUrl: project[0].imageUrl,
                deliveryAddress: deliveryMethod === 'delivery' ? defaultAddress : null,
                status: "success",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                userEmail: user?.email,
                userName: user?.displayName,
                userPhotoURL: user?.photoURL ?? null,
                paymentDetails: {
                    transaction_status: "success",
                    status_message: "Free transaction completed successfully",
                    transaction_id: transactionId,
                    order_id: orderId,
                    gross_amount: "0",
                    payment_type: "free",
                    transaction_time: new Date().toISOString(),
                    status_code: "200",
                    fraud_status: "accept",
                },
                linkTransaction: `${process.env.NEXT_PUBLIC_URL}/payment/status/${orderId}`,
                isProcessing: false,
            };

            // Run transaction
            await runTransaction(db, async (transaction) => {
                // Get project data
                const projectDoc = await transaction.get(projectRef);
                if (!projectDoc.exists()) {
                    throw new Error("Project not found");
                }

                const projectData = projectDoc.data();

                // Update project stats
                const updateData = {
                    sold: (projectData.sold || 0) + 1,
                    stock: typeof projectData.stock === "number"
                        ? Math.max(0, projectData.stock - 1)
                        : projectData.stock,
                    ...(deliveryMethod === "download"
                        ? { downloads: (projectData.downloads || 0) + 1 }
                        : { delivery: (projectData.delivery || 0) + 1 }),
                };

                // Save transaction and update project
                transaction.set(transactionRef, transactionData);
                transaction.update(projectRef, updateData);
            });

            toast.success('Free download processed successfully!');
            // Langsung arahkan ke halaman status pembayaran dengan ID transaksi
            router.push(`/payment/status/${orderId}`);
        } catch (error) {
            console.error('Free transaction error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to process free transaction');
        } finally {
            setIsProcessing(false);
            setShowFreeModal(false);
        }
    }

    // Fetch default address when delivery method changes
    useEffect(() => {
        const fetchDefaultAddress = async () => {
            if (deliveryMethod === 'delivery' && user?.uid) {
                const userDoc = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS!, user.uid);
                const userSnap = await getDoc(userDoc);

                if (userSnap.exists()) {
                    const addresses: Address[] = userSnap.data().addresses || [];
                    const defaultAddr = addresses.find(addr => addr.isDefault);
                    setDefaultAddress(defaultAddr || null);
                }
            }
        };

        fetchDefaultAddress();
    }, [deliveryMethod, user?.uid]);

    // Add Midtrans script when component mounts
    useEffect(() => {
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

        const scriptElement = document.createElement('script');
        scriptElement.src = midtransScriptUrl;
        scriptElement.setAttribute('data-client-key', midtransClientKey || '');

        document.body.appendChild(scriptElement);

        return () => {
            document.body.removeChild(scriptElement);
        };
    }, []);

    if (loading) return <ProjectDetailSkelaton />

    return (
        <section className="min-h-screen bg-background text-foreground">
            <div className="container px-4 xl:px-10 py-6 sm:py-8">
                {project.map((project) => (
                    <div key={project.id}>
                        {/* Breadcrumbs - improved styling */}
                        <div className="breadcrumbs text-xs md:text-sm mb-8">
                            <ul className="flex flex-wrap items-center gap-3">
                                <li>
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                                            bg-card hover:bg-card/80
                                            border border-border/50 hover:border-border
                                            transition-all duration-200 ease-in-out"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/project/${project.typeCategory}`}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full
                                            bg-primary/5 hover:bg-primary/10 
                                            border border-primary/10 hover:border-primary/20
                                            transition-all duration-200"
                                    >
                                        {project.typeTitle}
                                    </Link>
                                </li>
                                <li>
                                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full
                                        bg-card text-primary font-medium">
                                        {project.title}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-8 space-y-6 md:space-y-8">
                                {/* Hero Image - enhanced styling */}
                                <div className='relative aspect-video rounded-2xl overflow-hidden group'>
                                    <Image
                                        src={project.imageUrl}
                                        alt={`${project.title} - Main Project Image`}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        priority
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                                        flex flex-col items-start justify-end p-8 md:p-10
                                        transform transition-all duration-500'>
                                        <div className="absolute top-6 left-6 px-4 py-2 
                                            bg-black/60 backdrop-blur-md rounded-lg 
                                            text-sm text-white/90 border border-white/20 
                                            flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Featured Image
                                        </div>
                                        <h1 className='text-white text-3xl md:text-4xl font-bold mb-4 
                                            transform transition-all duration-500'>{project.title}</h1>
                                        <p className='text-gray-200 max-w-2xl text-base md:text-lg
                                            transform transition-all duration-500'>{project.description}</p>
                                    </div>
                                </div>

                                {/* Gallery Grid - improved layout */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.images?.map((previewImage, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(previewImage)}
                                            className="relative aspect-video rounded-xl overflow-hidden group
                                                ring-1 ring-border/50 hover:ring-2 hover:ring-primary/30
                                                transition-all duration-300 ease-in-out"
                                        >
                                            <Image
                                                src={previewImage}
                                                alt={`${project.title} - Preview ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2
                                                bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm
                                                opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                                                transition-all duration-300">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                </svg>
                                                Preview {index + 1}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Description Section - improved card styling */}
                                <div className="bg-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 space-y-6 border border-border/50">
                                    <h2 className="text-2xl font-semibold text-primary">About This Project</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Content Section with enhanced typography and spacing */}
                                    <div className="pt-6">
                                        <h2 className="text-2xl font-semibold text-primary mb-4">Project Content</h2>
                                        <div
                                            className="prose prose-gray dark:prose-invert max-w-none
                                                prose-headings:text-primary prose-headings:font-semibold 
                                                prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:leading-tight
                                                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                                
                                                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base 
                                                prose-p:md:text-lg prose-p:mb-6
                                                
                                                prose-strong:text-foreground prose-strong:font-semibold
                                                prose-em:text-primary/80 prose-em:not-italic
                                                
                                                prose-ol:mt-4 prose-ol:mb-6 prose-ol:list-none prose-ol:space-y-3
                                                prose-li:text-muted-foreground prose-li:relative prose-li:pl-6
                                                prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-primary/60
                                                
                                                [&_li[data-list='bullet']]:before:content-['•']
                                                [&_li[data-list='bullet']]:before:text-lg
                                                [&_li[data-list='bullet']]:before:leading-tight
                                                
                                                [&_li_strong]:text-foreground [&_li_strong]:font-medium
                                                [&_span.ql-ui]:hidden"
                                            dangerouslySetInnerHTML={{ __html: project.content }}
                                        />
                                    </div>
                                </div>


                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-4 space-y-6">
                                    {/* Author Profile Card - Updated styling */}
                                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                                        {/* Author Info - Enhanced layout */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="relative">
                                                <div className="relative w-16 h-16 rounded-full ring-2 ring-primary/20 overflow-hidden
                                                    transition duration-300 transform hover:scale-105">
                                                    <Image
                                                        src={project.author.photoURL}
                                                        alt={project.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {/* Added online status indicator */}
                                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full 
                                                    ring-2 ring-background animate-pulse" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-1">{project.author.name}</h3>
                                                <p className="text-primary/80 text-sm font-medium">{project.author.role}</p>
                                            </div>
                                        </div>

                                        {/* Project Stats - Modernized layout */}
                                        <div className="space-y-6 mb-8">
                                            {/* Rating Card - Enhanced visual feedback */}
                                            <div className="bg-primary/5 rounded-xl p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-5 h-5 ${i < (project.rating || 0)
                                                                ? 'text-yellow-500'
                                                                : 'text-gray-300 dark:text-gray-600'}`}
                                                                fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-bold text-primary">{(project.rating || 0).toFixed(1)}</span>
                                                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Based on {project.ratingCount || 0} reviews
                                                </p>
                                            </div>

                                            {/* Project Metrics Grid - Improved interaction */}
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    {
                                                        label: 'Downloads',
                                                        value: project.downloads,
                                                        icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                                                    },
                                                    {
                                                        label: 'Views',
                                                        value: viewCount,
                                                        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                                    },
                                                    {
                                                        label: 'Stock',
                                                        value: project.stock,
                                                        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                                                    },
                                                    {
                                                        label: 'Sold',
                                                        value: project.sold,
                                                        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                    },
                                                    {
                                                        label: 'Delivery',
                                                        value: project.delivery,
                                                        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                                                    }
                                                ].map((stat) => (
                                                    <div key={stat.label}
                                                        className="group relative bg-card/50 rounded-xl p-4 
                                                            hover:bg-primary/5 transition-all duration-300
                                                            border border-border/50 hover:border-primary/20">
                                                        <div className="flex items-center gap-2 mb-2 text-primary/80">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                                            </svg>
                                                            <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                                                        </div>
                                                        <p className="text-xl font-bold text-foreground">
                                                            {stat.value?.toLocaleString() || 0}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Last Updated - Timestamp format */}
                                        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                                            <svg className="w-4 h-4 text-primary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div className="text-sm">
                                                <span className="text-muted-foreground">Last updated:</span>
                                                <time className="ml-1 font-medium text-primary">
                                                    {project.updatedAt instanceof Timestamp ?
                                                        new Date(project.updatedAt.seconds * 1000).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: true
                                                        })
                                                        : 'N/A'
                                                    }
                                                </time>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                                        {/* License Options - Dropdown Select */}
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
                                                                className={`flex flex-col items-center justify-center p-4 rounded-xl border 
                                                                    transition-all duration-200 ${deliveryMethod === 'delivery'
                                                                        ? 'bg-primary text-white border-primary'
                                                                        : 'bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30'
                                                                    }`}
                                                            >
                                                                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                                </svg>
                                                                <span className="text-sm font-medium">Delivery</span>
                                                                <span className="text-xs opacity-80 mt-1">1-3 business days</span>
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Payment Button - only enabled when delivery method is selected */}
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

                                    {/* Technologies Card - enhanced styling */}
                                    <div className="bg-card rounded-2xl p-6 border border-border/50 
                                        backdrop-blur-md shadow-lg shadow-primary/5">
                                        <h2 className="text-xl font-semibold mb-6 text-primary">Technologies</h2>
                                        <div className="flex flex-wrap gap-3">
                                            {project.frameworks?.map((tech, index) => (
                                                <div key={index}
                                                    className="flex items-center gap-3 px-4 py-2.5
                                                        bg-card hover:bg-primary/5
                                                        rounded-xl transition-all duration-300
                                                        border border-border/50 hover:border-primary/30
                                                        group cursor-pointer">
                                                    <div className="relative w-6 h-6 transform transition-transform duration-300 group-hover:scale-110">
                                                        <Image
                                                            src={tech.imageUrl}
                                                            alt={tech.title}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground/80 group-hover:text-primary">
                                                        {tech.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImagePreviewModal
                    selectedImage={selectedImage}
                    zoomLevel={zoomLevel}
                    position={position}
                    isDragging={isDragging}
                    handleMouseDown={handleMouseDown}
                    handleMouseMove={handleMouseMove}
                    handleMouseUp={handleMouseUp}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleDownload={handleDownload}
                    closeModal={closeModal}
                    setZoomLevel={setZoomLevel}
                />
            )}

            {/* Free Transaction Modal */}
            {showFreeModal && (
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
            )}
        </section>
    )
}
