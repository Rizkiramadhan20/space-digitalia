"use client"

import React, { useEffect, useState, useCallback } from 'react'

import { ProjectType } from '@/components/ui/project/types/project'

import { FetchProjectDetails, FetchRelatedProject } from '@/hooks/pages/project/[slug]/lib/FetchProject'

import ProjectDetailSkelaton from '@/hooks/pages/project/[slug]/ProjectDetailSkelaton'

import { useImageZoom } from '@/hooks/pages/project/[slug]/lib/ImageZoom'

import { useImageDownload } from '@/hooks/pages/project/[slug]/lib/ImageDownload'

import { ref, onValue, increment, update, get } from 'firebase/database'

import { database } from '@/utils/firebase'

import ImagePreviewModal from '@/hooks/pages/project/[slug]/content/ImagePriviewModal'

import ProjectHeader from '@/hooks/pages/project/[slug]/components/ProjectHeader'

import ProjectGallery from '@/hooks/pages/project/[slug]/components/ProjectGallery'

import ProjectDescription from '@/hooks/pages/project/[slug]/components/ProjectDescription'

import ProjectSidebar from '@/hooks/pages/project/[slug]/components/ProjectSidebar'

import RelatedProjects from '@/hooks/pages/project/[slug]/components/RelatedProject'

export default function ProjectDetailsContent({ slug }: { slug: string }) {
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

    useEffect(() => {
        setLoading(true)
        const unsubscribe = FetchProjectDetails(slug, setProject)

        const incrementViewCount = async (ipAddress: string) => {
            try {
                if (!isNaN(Number(ipAddress))) {
                    console.log('Skipping invalid IP address (timestamp):', ipAddress);
                    return;
                }

                const locationResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                const locationData = await locationResponse.json();

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

        const viewsRef = ref(database, `${process.env.NEXT_PUBLIC_PROJECT_VIEWS}/${slug}`);

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

    const closeModal = useCallback(() => {
        setSelectedImage(null)
        resetZoom()
    }, [resetZoom])

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedImage) {
                closeModal()
            }
        }

        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [selectedImage, closeModal])

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

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
        </section>
    )
}