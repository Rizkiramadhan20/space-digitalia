"use client"

import React, { useEffect, useState, useCallback } from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

import { FetchProjectDetails, FetchRelatedProject } from '@/hooks/pages/project/[slug]/lib/FetchProject'

import ProjectDetailSkelaton from '@/hooks/pages/project/[slug]/ProjectDetailSkelaton'

import { useImageZoom } from '@/hooks/pages/project/[slug]/lib/ImageZoom'

import { useImageDownload } from '@/hooks/pages/project/[slug]/lib/ImageDownload'

import { Timestamp } from 'firebase/firestore'

import { ref, onValue, increment, update, get } from 'firebase/database'

import { database } from '@/utils/firebase'

import ImagePreviewModal from '@/hooks/pages/project/[slug]/content/ImagePriviewModal'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'react-hot-toast'

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { runTransaction } from 'firebase/firestore'

import { Address } from '@/hooks/pages/project/[slug]/types/schema'

import ProjectHeader from '@/hooks/pages/project/[slug]/components/ProjectHeader'

import ProjectGallery from '@/hooks/pages/project/[slug]/components/ProjectGallery'

import ProjectDescription from '@/hooks/pages/project/[slug]/components/ProjectDescription'

import ProjectSidebar from '@/hooks/pages/project/[slug]/components/ProjectSidebar'

import FreeTransactionModal from '@/hooks/pages/project/[slug]/components/FreeTransactionModal'

import RelatedProjects from '@/hooks/pages/project/[slug]/components/RelatedProject'

export default function ProjectDetailsContent({ slug }: { slug: string }) {
    const router = useRouter()
    const { user } = useAuth()
    const [project, setProject] = useState<ProjectType[]>([])
    const [relatedProjects, setRelatedProjects] = useState<ProjectType[]>([])
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
    const [isProcessing, setIsProcessing] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)
    const [showFreeModal, setShowFreeModal] = useState(false)

    // Add state for ratings
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
        const unsubscribe = FetchRelatedProject(slug, (data) => {
            setRelatedProjects(data)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

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
            router.push('/signin')
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
            // Redirect to payment status page
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
        const midtransScriptUrl = 'https://app.midtrans.com/snap/snap.js';
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
        <section className="min-h-screen bg-background text-foreground py-10">
            <div className="container px-4 xl:px-10">
                {project.map((project) => (
                    <div key={project.id}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-8 space-y-6 md:space-y-8">
                                <ProjectHeader project={project} />
                                <ProjectGallery project={project} setSelectedImage={setSelectedImage} />
                                <ProjectDescription project={project} />
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="lg:col-span-4">
                                <ProjectSidebar
                                    project={project}
                                    viewCount={viewCount}
                                    selectedLicense={selectedLicense}
                                    deliveryMethod={deliveryMethod}
                                    defaultAddress={defaultAddress}
                                    isProcessing={isProcessing}
                                    handleLicenseSelect={handleLicenseSelect}
                                    handleDeliveryMethodSelect={handleDeliveryMethodSelect}
                                    handleTransaction={handleTransaction}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <RelatedProjects relatedProjects={relatedProjects} />
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

            <FreeTransactionModal
                showFreeModal={showFreeModal}
                setShowFreeModal={setShowFreeModal}
                selectedLicense={selectedLicense}
                deliveryMethod={deliveryMethod}
                defaultAddress={defaultAddress}
                isProcessing={isProcessing}
                handleFreeTransactionConfirm={handleFreeTransactionConfirm}
            />
        </section>
    )
}