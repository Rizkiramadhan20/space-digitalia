"use client"

import React, { useState, useEffect } from 'react'

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import imagekitInstance from '@/utils/imagekit'

import { compressImage } from '@/base/helper/ImageCompression'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import ProjectSkelaton from "@/hooks/dashboard/super-admins/project/project/ProjectSkelaton"

import RichTextEditor from '@/base/helper/TextEditor'

import { useAuth } from '@/utils/context/AuthContext'

import { useRouter } from 'next/navigation'

import { Project, ProjectType, LicenseProject, LicenseDetail, FormInputs } from '@/hooks/dashboard/super-admins/project/project/lib/schema'

import { format } from 'date-fns'

import { id } from 'date-fns/locale'

import { Pagination } from '@/base/helper/Pagination'

import { useForm } from 'react-hook-form'

export default function ProjectLayout() {
    const { user, hasRole } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to access this page')
            router.push('/')
        }
    }, [hasRole, router])

    const [projects, setProjects] = useState<Project[]>([])
    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
    const [licenseProjects, setLicenseProjects] = useState<LicenseProject[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newProject, setNewProject] = useState<Project>({
        title: '',
        description: '',
        imageUrl: '',
        images: [],
        slug: '',
        typeCategory: '',
        typeTitle: '',
        status: 'active',
        content: '',
        stock: 0,
        sold: 0,
        downloads: 0,
        delivery: 0,
        licenseTitle: '',
        licenseDetails: [],
        linkPreview: '',
        statusProject: 'development',
        author: {
            name: '',
            role: '',
            uid: '',
            photoURL: ''
        },
        frameworks: []
    })
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Add new loading states
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
    const [isSliderUploading, setIsSliderUploading] = useState(false)

    // Add new state for delete modal
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    // Add new state for view modal
    const [viewProject, setViewProject] = useState<Project | null>(null)

    // Add these new states
    const [currentPage, setCurrentPage] = useState(0)
    const [projectsPerPage] = useState(8) // Show 8 projects per page

    // Add this computed value
    const paginatedProjects = projects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    )

    // Add this handler
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
        // Scroll to top of the page when changing pages
        window.scrollTo(0, 0)
    }

    // Fetch projects and types
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    fetchProjects(),
                    fetchProjectTypes(),
                    fetchLicenseProjects(),
                    fetchFrameworks()
                ])
            } catch (error) {
                console.error('Error fetching data:', error)
                toast.error('Failed to load data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const fetchProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string))
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                downloads: doc.data().downloads || 0,
                sold: doc.data().sold || 0
            })) as Project[]

            const sortedProjects = projectsData.sort((a, b) => {
                const timestampA = a.createdAt instanceof Timestamp ? a.createdAt.toMillis() : 0
                const timestampB = b.createdAt instanceof Timestamp ? b.createdAt.toMillis() : 0
                return timestampB - timestampA
            })

            setProjects(sortedProjects)
        } catch (error) {
            throw error // Let the parent handler deal with the error
        }
    }

    const fetchProjectTypes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TYPE_PROJECT as string))
            const typesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                category: doc.data().category
            })) as ProjectType[]
            setProjectTypes(typesData)
        } catch {
            toast.error('Failed to fetch project types')
        }
    }

    const fetchLicenseProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_LICENSE_PROJECT as string))
            const licensesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
            })) as LicenseProject[]
            setLicenseProjects(licensesData)
        } catch {
            toast.error('Failed to fetch license projects')
        }
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm<FormInputs>({
        defaultValues: {
            title: '',
            description: '',
            slug: '',
            typeCategory: '',
            typeTitle: '',
            status: 'active',
            content: '',
            stock: 0,
            licenseTitle: '',
            licenseDetails: [],
            linkPreview: '',
            frameworks: [],
            statusProject: 'development'
        }
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title) {
                const slug = generateSlug(value.title);
                setValue('slug', slug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsSubmitting(true)

            const updatedProject: Project = {
                ...data,
                status: data.status as "active" | "inactive",
                imageUrl: newProject.imageUrl || '',
                images: newProject.images || [],
                sold: newProject.sold || 0,
                delivery: newProject.delivery || 0,
                downloads: newProject.downloads || 0,
                statusProject: data.statusProject as "development" | "finished",
                author: {
                    name: user?.displayName || '',
                    role: user?.role || '',
                    uid: user?.uid || '',
                    photoURL: user?.photoURL || ''
                }
            }

            if (isEditing && editingId) {
                const docRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string, editingId)
                await updateDoc(docRef, {
                    ...updatedProject,
                    updatedAt: Timestamp.fromDate(new Date())
                })
                toast.success('Project updated successfully!')
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string), {
                    ...updatedProject,
                    createdAt: Timestamp.fromDate(new Date()),
                    updatedAt: Timestamp.fromDate(new Date())
                })
                toast.success('Project created successfully!')
            }

            fetchProjects()
            closeModal()
            reset()
        } catch {
            toast.error('Failed to save project')
        } finally {
            setIsSubmitting(false)
        }
    }

    const uploadImage = async (file: File, type: 'thumbnail' | 'slider' | 'mobile') => {
        try {
            const compressedImage = await compressImage(file)
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(compressedImage)
            })

            // Generate slug and limit to first 10 words
            const folderSlug = generateSlug(newProject.title)
                .split('-')
                .slice(0, 10)
                .join('-')

            // Create folder path based on type
            const folderPath = `projects/${folderSlug}/${type === 'thumbnail' ? 'thumbnails' : type === 'slider' ? 'sliders' : 'mobile'}`

            // Generate unique filename with timestamp
            const timestamp = new Date().getTime()
            const fileName = `${timestamp}_${file.name}`

            const uploadResponse = await imagekitInstance.upload({
                file: base64 as string,
                fileName: fileName,
                folder: folderPath,
            })

            return uploadResponse.url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const handleEdit = async (project: Project) => {
        try {
            setIsEditing(true)
            setEditingId(project.id!)

            // Ensure licenseDetails is an array with proper structure
            const licenseDetails = project.licenseDetails?.map(detail => ({
                title: detail.title || '',
                price: detail.price || 0,
                downloadUrl: detail.downloadUrl || ''
            })) || [];

            setNewProject({
                ...project,
                licenseDetails
            });

            // Set form values including licenseDetails
            setValue('licenseDetails', licenseDetails);
            setValue('title', project.title || '');
            setValue('description', project.description || '');
            setValue('slug', project.slug || '');
            setValue('typeCategory', project.typeCategory || '');
            setValue('typeTitle', project.typeTitle || '');
            setValue('status', project.status || 'active');
            setValue('content', project.content || '');
            setValue('stock', project.stock || 0);
            setValue('licenseTitle', project.licenseTitle || '');
            setValue('linkPreview', project.linkPreview || '');
            setValue('frameworks', project.frameworks);
            setValue('statusProject', project.statusProject);

            const modal = document.getElementById('project_modal') as HTMLDialogElement | null
            modal?.showModal()
        } catch (error) {
            console.error('Error setting up edit mode:', error)
            toast.error('Failed to load project for editing')
        }
    }

    const handleDelete = (id: string) => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to perform this action')
            return
        }
        setProjectToDelete(id)
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
        deleteModal?.showModal()
    }

    const confirmDelete = async () => {
        if (!projectToDelete) return

        setIsDeleting(true)
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string, projectToDelete))
            toast.success('Project deleted successfully!')
            fetchProjects()
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
            deleteModal?.close()
            setProjectToDelete(null)
        } catch (error) {
            console.error('Error deleting project:', error)
            toast.error('Failed to delete project')
        } finally {
            setIsDeleting(false)
        }
    }

    const openModal = () => {
        const modal = document.getElementById('project_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const closeModal = () => {
        const modal = document.getElementById('project_modal') as HTMLDialogElement | null
        modal?.close()

        // Reset all states
        setIsEditing(false)
        setEditingId(null)
        setSelectedImages([])
        setSelectedThumbnail(null)
        setNewProject({
            title: '',
            description: '',
            imageUrl: '',
            images: [],
            slug: '',
            typeCategory: '',
            typeTitle: '',
            status: 'active',
            content: '',
            stock: 0,
            sold: 0,
            downloads: 0,
            delivery: 0,
            licenseTitle: '',
            licenseDetails: [],
            linkPreview: '',
            statusProject: 'development',
            author: {
                name: '',
                role: '',
                uid: '',
                photoURL: ''
            },
            frameworks: []
        })
        reset()
    }

    const renderAuthorField = () => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Author Information</h4>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8 items-start">
                {/* Author Image */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                        <Image
                            src={user?.photoURL || '/placeholder-avatar.png'}
                            alt={user?.displayName || 'Author'}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-300"
                        />
                    </div>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                        {user?.role || 'No role'}
                    </span>
                </div>

                {/* Author Details */}
                <div className="space-y-6">
                    <div className="form-control">
                        <label className="text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={user?.displayName || 'No name available'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">This information is pulled from your profile and cannot be edited here.</p>
                    </div>

                    <div className="form-control">
                        <label className="text-sm font-medium text-gray-700 mb-2">Access Level</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={user?.role || 'No role available'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const handleLicenseDetailChange = (index: number, field: keyof LicenseDetail, value: string | number) => {
        const updatedDetails = [...newProject.licenseDetails];
        updatedDetails[index] = {
            ...updatedDetails[index],
            [field]: value
        };
        setNewProject({ ...newProject, licenseDetails: updatedDetails });

        // Sync with React Hook Form
        setValue('licenseDetails', updatedDetails);
    }

    // Update addLicenseDetail function
    const addLicenseDetail = () => {
        const newDetail = { title: '', price: 0, downloadUrl: '' };
        const updatedDetails = [...newProject.licenseDetails, newDetail];
        setNewProject({
            ...newProject,
            licenseDetails: updatedDetails
        });

        // Sync with React Hook Form
        setValue('licenseDetails', updatedDetails);
    }

    // Update removeLicenseDetail function
    const removeLicenseDetail = (index: number) => {
        const updatedDetails = newProject.licenseDetails.filter((_, i) => i !== index);
        setNewProject({ ...newProject, licenseDetails: updatedDetails });

        // Sync with React Hook Form
        setValue('licenseDetails', updatedDetails);
    }

    // Update the formatPrice function to handle zero and empty values
    const formatPrice = (price: string | number): string => {
        // Handle empty or zero values
        if (price === '' || price === 0 || price === '0') return '0'

        // Remove any non-digit characters
        const numericValue = String(price).replace(/\D/g, '')
        // Format with thousand separator
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    // Update the parseFormattedPrice function to handle zero values
    const parseFormattedPrice = (formattedPrice: string): number => {
        // Handle empty input
        if (!formattedPrice) return 0
        // Remove thousand separators and convert to number
        return parseInt(formattedPrice.replace(/\./g, ''), 10) || 0
    }

    // Add handleView function
    const handleView = (project: Project) => {
        setViewProject(project)
        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null
        viewModal?.showModal()
    }

    // Add closeViewModal function
    const closeViewModal = () => {
        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null
        viewModal?.close()
        setViewProject(null)
    }

    // Update the view modal timestamp display
    const formatTimestamp = (timestamp: Timestamp | Date | undefined): string => {
        if (!timestamp) return ''
        const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp
        return format(date, 'PPpp', { locale: id })
    }

    // Update the image upload handlers to use uploadImage function
    const handleThumbnailUpload = async (file: File) => {
        setIsThumbnailUploading(true)
        try {
            const imageUrl = await uploadImage(file, 'thumbnail')
            setNewProject(prev => ({ ...prev, imageUrl }))
            setSelectedThumbnail(file)
        } catch (error) {
            console.error('Error uploading thumbnail:', error)
            toast.error('Failed to upload thumbnail')
        } finally {
            setIsThumbnailUploading(false)
        }
    }

    const handleSliderUpload = async (files: FileList) => {
        setIsSliderUploading(true)
        try {
            const uploadPromises = Array.from(files).map(file => uploadImage(file, 'slider'))
            const uploadedUrls = await Promise.all(uploadPromises)

            setNewProject(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }))
            setSelectedImages(prev => [...prev, ...Array.from(files)])
        } catch (error) {
            console.error('Error uploading slider images:', error)
            toast.error('Failed to upload slider images')
        } finally {
            setIsSliderUploading(false)
        }
    }

    // Add these functions near your other handlers

    const handleDragOver = (e: React.DragEvent, index?: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (index !== undefined && draggedIndex !== null && draggedIndex !== index) {
            // Handle reordering
            e.dataTransfer.dropEffect = 'move';
            moveImage(draggedIndex, index);
            setDraggedIndex(index);
        } else {
            // Handle file drops
            const dropZone = e.currentTarget as HTMLDivElement;
            dropZone.classList.add('border-green-500', 'bg-green-50');
        }
    };

    // Update the handleDragLeave for file drops only
    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const dropZone = e.currentTarget as HTMLDivElement;
        dropZone.classList.remove('border-green-500', 'bg-green-50');
    };

    // Update the handleDrop to handle both file drops and reordering
    const handleDrop = async (e: React.DragEvent, type: 'thumbnail' | 'slider') => {
        e.preventDefault();
        e.stopPropagation();

        const dropZone = e.currentTarget as HTMLDivElement;
        dropZone.classList.remove('border-green-500', 'bg-green-50');

        // Reset dragged index
        setDraggedIndex(null);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        if (type === 'thumbnail') {
            await handleThumbnailUpload(files[0]);
        } else {
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            const remainingSlots = 5 - (selectedImages.length || newProject.images.length);
            const filesToUpload = imageFiles.slice(0, remainingSlots);

            const dataTransfer = new DataTransfer();
            filesToUpload.forEach(file => {
                dataTransfer.items.add(file);
            });
            await handleSliderUpload(dataTransfer.files);
        }
    };

    // Add these new functions near your other handlers

    const moveImage = (fromIndex: number, toIndex: number) => {
        if (selectedImages.length > 0) {
            const newImages = [...selectedImages];
            const [movedItem] = newImages.splice(fromIndex, 1);
            newImages.splice(toIndex, 0, movedItem);
            setSelectedImages(newImages);
        } else {
            const newImages = [...newProject.images];
            const [movedItem] = newImages.splice(fromIndex, 1);
            newImages.splice(toIndex, 0, movedItem);
            setNewProject(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            moveImage(index, index - 1);
        } else if (e.key === 'ArrowRight' && index < (selectedImages.length || newProject.images.length) - 1) {
            moveImage(index, index + 1);
        }
    };

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    // Add new state for frameworks
    const [frameworks, setFrameworks] = useState<{ id: string; title: string; imageUrl: string; }[]>([]);

    // Add fetchFrameworks function
    const fetchFrameworks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_FRAMEWORK_PROJECT as string));
            const frameworksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                imageUrl: doc.data().imageUrl
            }));
            setFrameworks(frameworksData);
        } catch {
            toast.error('Failed to fetch frameworks');
        }
    };

    const [selectedFrameworks, setSelectedFrameworks] = useState<{ id: string; title: string; imageUrl: string; }[]>([]);

    // Add this function to handle framework selection
    const toggleFramework = (framework: { id: string; title: string; imageUrl: string; }) => {
        const isSelected = selectedFrameworks.some(f => f.id === framework.id);

        if (isSelected) {
            // Remove framework if already selected
            const updatedFrameworks = selectedFrameworks.filter(f => f.id !== framework.id);
            setSelectedFrameworks(updatedFrameworks);
            setValue('frameworks', updatedFrameworks.map(f => ({
                title: f.title,
                imageUrl: f.imageUrl
            })));
        } else {
            // Add framework if not selected
            const updatedFrameworks = [...selectedFrameworks, framework];
            setSelectedFrameworks(updatedFrameworks);
            setValue('frameworks', updatedFrameworks.map(f => ({
                title: f.title,
                imageUrl: f.imageUrl
            })));
        }
    };

    if (isLoading) {
        return <ProjectSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Projects
                        </h1>
                        <p className='text-gray-500'>Manage and organize your projects</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Project
                    </button>
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProjects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={project.imageUrl || '/placeholder.png'}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Status Badge */}
                            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                                }`}>
                                {project.status}
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-5 space-y-4">
                            {/* Title and Description */}
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                    {project.title}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100">
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-900">{project.stock}</p>
                                    <p className="text-xs text-gray-500">Stock</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-900">{project.sold}</p>
                                    <p className="text-xs text-gray-500">Sold</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-900">{project.downloads}</p>
                                    <p className="text-xs text-gray-500">Downloads</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={() => handleView(project)}
                                    className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="View details"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit project"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id!)}
                                    className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete project"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(projects.length / projectsPerPage)}
                onPageChange={handlePageChange}
            />

            {/* Project Modal */}
            <dialog id="project_modal" className="modal">
                <div className="modal-box bg-white max-w-6xl p-0 overflow-hidden">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
                        <h3 className="font-bold text-xl text-gray-900">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                        <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Basic Information</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                        <input
                                            type="text"
                                            {...register('title')}
                                            className="input input-bordered w-full bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="Enter project title"
                                        />
                                        {errors.title && (
                                            <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                                        <input
                                            type="text"
                                            {...register('slug')}
                                            readOnly
                                            className="input input-bordered w-full bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="auto-generated-from-title"
                                        />
                                        {errors.slug && (
                                            <span className="text-red-500 text-sm mt-1">{errors.slug.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                        <textarea
                                            {...register('description')}
                                            className="textarea textarea-bordered w-full h-24 bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="Enter project description"
                                        />
                                        {errors.description && (
                                            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
                                        )}
                                    </div>

                                    {/* Status Project */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Status Project</label>
                                        <select
                                            {...register('statusProject')}
                                            className="select select-bordered w-full bg-gray-50/50 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all hover:border-purple-300"
                                        >
                                            <option value="development" className="text-gray-700">Development</option>
                                            <option value="finished" className="text-gray-700">Finished</option>
                                        </select>
                                        {errors.statusProject && (
                                            <span className="text-red-500 text-sm mt-1">{errors.statusProject.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Categories & Details */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Categories & Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Category</label>
                                        <select
                                            {...register('typeCategory')}
                                            className="select select-bordered w-full bg-gray-50/50 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                        >
                                            <option value="">Select category</option>
                                            {[...new Set(projectTypes.map(type => type.category))].map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        {errors.typeCategory && (
                                            <span className="text-red-500 text-sm mt-1">{errors.typeCategory.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Type</label>
                                        <select
                                            {...register('typeTitle')}
                                            className="select select-bordered w-full bg-gray-50/50 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                        >
                                            <option value="">Select type</option>
                                            {projectTypes
                                                .filter(type => type.category === watch('typeCategory'))
                                                .map(type => (
                                                    <option key={type.id} value={type.title}>{type.title}</option>
                                                ))}
                                        </select>
                                        {errors.typeTitle && (
                                            <span className="text-red-500 text-sm mt-1">{errors.typeTitle.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Status</label>
                                        <select
                                            {...register('status')}
                                            className="select select-bordered w-full bg-gray-50/50 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Website Preview Section - Only show for website category */}
                            {watch('typeCategory') === 'website' && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-50 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-gray-900">Website Preview</h4>
                                    </div>

                                    {/* Link Preview Input */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Preview Link</label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                {...register('linkPreview')}
                                                placeholder="https://example.com"
                                                className="input input-bordered w-full bg-gray-50/50 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all pl-10"
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.linkPreview && (
                                            <span className="text-red-500 text-sm mt-1">{errors.linkPreview.message}</span>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">Enter the URL where users can preview the website</p>
                                    </div>
                                </div>
                            )}

                            {/* Mobile Image & Framework Section - Only show for website category */}
                            {watch('typeCategory') === 'website' && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-50 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-gray-900">Mobile Preview & Framework</h4>
                                    </div>
                                    <div className="w-full">
                                        {/* Framework Selection */}
                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Frameworks</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                                                {frameworks.map((framework) => {
                                                    const isSelected = selectedFrameworks.some(f => f.id === framework.id);

                                                    return (
                                                        <div
                                                            key={framework.id}
                                                            onClick={() => toggleFramework(framework)}
                                                            className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${isSelected
                                                                ? 'border-orange-500 bg-orange-50'
                                                                : 'border-gray-200 hover:border-orange-300'
                                                                }`}
                                                        >
                                                            <div className="flex flex-col items-center gap-3">
                                                                <div className="relative w-12 h-12">
                                                                    <Image
                                                                        src={framework.imageUrl}
                                                                        alt={framework.title}
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-700 text-center">
                                                                    {framework.title}
                                                                </span>
                                                            </div>

                                                            {/* Checkmark for selected frameworks */}
                                                            {isSelected && (
                                                                <div className="absolute top-2 right-2">
                                                                    <div className="bg-orange-500 rounded-full p-1">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-3 w-3 text-white"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Images & Stock */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Images & Stock</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Thumbnail Upload */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Thumbnail</label>
                                        <div className="relative">
                                            {selectedThumbnail || newProject.imageUrl ? (
                                                <div className="relative border rounded-xl overflow-hidden group">
                                                    <Image
                                                        src={selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : newProject.imageUrl}
                                                        alt="Thumbnail preview"
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-[200px] object-cover"
                                                        style={{ width: 'auto', height: '200px' }}
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <div
                                                            className="relative cursor-pointer"
                                                            onDragOver={handleDragOver}
                                                            onDragLeave={handleDragLeave}
                                                            onDrop={(e) => handleDrop(e, 'thumbnail')}
                                                        >
                                                            <input
                                                                id="thumbnail-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            />
                                                            <button className="btn btn-sm btn-circle btn-ghost text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedThumbnail(null);
                                                                setNewProject(prev => ({ ...prev, imageUrl: '' }));
                                                            }}
                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all"
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={(e) => handleDrop(e, 'thumbnail')}
                                                >
                                                    <input
                                                        id="thumbnail-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="flex flex-col items-center justify-center h-[200px] p-4">
                                                        {isThumbnailUploading ? (
                                                            <div className="flex flex-col items-center justify-center">
                                                                <span className="loading loading-spinner loading-md text-green-600"></span>
                                                                <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                <p className="text-sm text-gray-500">Add Thumbnail</p>
                                                                <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Slider Images Upload */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Slider Images</label>
                                        <div className="relative">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {selectedImages.length > 0 ?
                                                        selectedImages.map((file, index) => (
                                                            <div
                                                                key={`new-${index}`}
                                                                className="relative border rounded-xl overflow-hidden group cursor-move"
                                                                draggable
                                                                onDragStart={(e) => handleDragStart(e, index)}
                                                                onDragOver={(e) => handleDragOver(e, index)}
                                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                                tabIndex={0}
                                                                role="button"
                                                                aria-label={`Slider image ${index + 1}. Use arrow keys to reorder.`}
                                                            >
                                                                <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                                    {index + 1}
                                                                </div>
                                                                <Image
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Slider image ${index + 1}`}
                                                                    width={200}
                                                                    height={150}
                                                                    className="w-full h-[150px] object-cover"
                                                                    style={{ width: 'auto', height: '150px' }}
                                                                />
                                                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                    <div className="flex items-center gap-2">
                                                                        {index > 0 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveImage(index, index - 1)}
                                                                                className="btn btn-sm btn-circle btn-ghost text-white"
                                                                                title="Move left"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                                                            }}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Delete image"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        </button>
                                                                        {index < selectedImages.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveImage(index, index + 1)}
                                                                                className="btn btn-sm btn-circle btn-ghost text-white"
                                                                                title="Move right"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        newProject.images.map((url, index) => (
                                                            <div
                                                                key={`existing-${index}`}
                                                                className="relative border rounded-xl overflow-hidden group cursor-move"
                                                                draggable
                                                                onDragStart={(e) => handleDragStart(e, index)}
                                                                onDragOver={(e) => handleDragOver(e, index)}
                                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                                tabIndex={0}
                                                                role="button"
                                                                aria-label={`Slider image ${index + 1}. Use arrow keys to reorder.`}
                                                            >
                                                                <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                                    {index + 1}
                                                                </div>
                                                                <Image
                                                                    src={url}
                                                                    alt={`Slider image ${index + 1}`}
                                                                    width={200}
                                                                    height={150}
                                                                    className="w-full h-[150px] object-cover"
                                                                    style={{ width: 'auto', height: '150px' }}
                                                                />
                                                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                    <div className="flex items-center gap-2">
                                                                        {index > 0 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveImage(index, index - 1)}
                                                                                className="btn btn-sm btn-circle btn-ghost text-white"
                                                                                title="Move left"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setNewProject(prev => ({
                                                                                    ...prev,
                                                                                    images: prev.images.filter((_, i) => i !== index)
                                                                                }));
                                                                            }}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Delete image"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                        </button>
                                                                        {index < newProject.images.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveImage(index, index + 1)}
                                                                                className="btn btn-sm btn-circle btn-ghost text-white"
                                                                                title="Move right"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                    {/* Add Image Box */}
                                                    {(selectedImages.length || newProject.images.length) < 5 && (
                                                        <div
                                                            className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all"
                                                            onDragOver={handleDragOver}
                                                            onDragLeave={handleDragLeave}
                                                            onDrop={(e) => handleDrop(e, 'slider')}
                                                        >
                                                            <input
                                                                id="slider-upload"
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={(e) => e.target.files && handleSliderUpload(e.target.files)}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            />
                                                            <div className="flex flex-col items-center justify-center h-[150px] p-4">
                                                                {isSliderUploading ? (
                                                                    <div className="flex flex-col items-center justify-center">
                                                                        <span className="loading loading-spinner loading-md text-green-600"></span>
                                                                        <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                        </svg>
                                                                        <p className="text-sm text-gray-500">Add Image</p>
                                                                        <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stock Input */}
                                    <div className="form-control md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Stock</label>
                                        <input
                                            type="number"
                                            min="0"
                                            {...register('stock', { valueAsNumber: true })}
                                            className="input input-bordered w-full bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                            placeholder="Enter stock quantity"
                                        />
                                        {errors.stock && (
                                            <span className="text-red-500 text-sm mt-1">{errors.stock.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content & License */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Content & License</h4>
                                </div>
                                <div className="space-y-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">License Type</label>
                                        <select
                                            {...register('licenseTitle')}
                                            className="select select-bordered w-full bg-gray-50/50 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                        >
                                            <option value="">Select License Type</option>
                                            {licenseProjects.map((license) => (
                                                <option key={license.id} value={license.title}>
                                                    {license.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.licenseTitle && (
                                            <span className="text-red-500 text-sm mt-1">{errors.licenseTitle.message}</span>
                                        )}
                                    </div>

                                    {/* License Details */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-700">License Details</label>
                                            <button
                                                type="button"
                                                onClick={addLicenseDetail}
                                                className="btn btn-sm btn-ghost text-amber-600 hover:bg-amber-50"
                                            >
                                                Add Detail
                                            </button>
                                        </div>

                                        {newProject.licenseDetails.map((detail, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="form-control">
                                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                                    <input
                                                        type="text"
                                                        value={detail.title || ''}
                                                        onChange={(e) => handleLicenseDetailChange(index, 'title', e.target.value)}
                                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                                        placeholder="Enter title"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Price</label>
                                                    <input
                                                        type="text"
                                                        value={formatPrice(detail.price ?? '')}
                                                        onChange={(e) => handleLicenseDetailChange(index, 'price', parseFormattedPrice(e.target.value))}
                                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                                        placeholder="Enter price"
                                                    />
                                                </div>
                                                <div className="form-control relative">
                                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Download URL</label>
                                                    <input
                                                        type="url"
                                                        value={detail.downloadUrl || ''}
                                                        onChange={(e) => handleLicenseDetailChange(index, 'downloadUrl', e.target.value)}
                                                        className="input input-bordered w-full bg-white border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all pr-10"
                                                        placeholder="Enter download URL"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeLicenseDetail(index)}
                                                        className="absolute right-2 top-8 text-red-500 hover:text-red-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Content</label>
                                        <RichTextEditor
                                            value={watch('content')}
                                            onChange={(value) => setValue('content', value)}
                                            className="min-h-[200px] bg-gray-50/50 rounded-lg border border-gray-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all"
                                        />
                                        {errors.content && (
                                            <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Author Information */}
                            {renderAuthorField()}
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3 z-10">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-ghost hover:bg-gray-100 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="project-form"
                            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Loading...
                                </>
                            ) : isEditing ? 'Update Project' : 'Save Project'}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="modal-box max-w-md bg-white p-0 rounded-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="p-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
                                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <p className="text-gray-600">
                            Are you sure you want to delete this project? All of its data will be permanently removed from our servers forever. This action cannot be undone.
                        </p>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50">
                        <button
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200"
                            onClick={() => {
                                const modal = document.getElementById('delete_modal') as HTMLDialogElement
                                modal?.close()
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Project
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* View Modal */}
            <dialog id="view_modal" className="modal">
                <div className="modal-box max-w-5xl bg-white p-0 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    {viewProject && (
                        <>
                            {/* Hero Section with Image - Fixed at top */}
                            <div className="relative h-64 md:h-80 w-full group flex-shrink-0">
                                <Image
                                    src={viewProject.imageUrl || '/placeholder.png'}
                                    alt={viewProject.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                                    <div className="p-8 h-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className={`
                                    inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                                    backdrop-blur-md transition-all duration-300
                                    ${viewProject.status === 'active'
                                                    ? 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                                                    : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'}
                                `}>
                                                <span className={`w-2 h-2 rounded-full mr-2 ${viewProject.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                                                    }`}></span>
                                                {viewProject.status}
                                            </div>
                                            <button
                                                onClick={closeViewModal}
                                                className="btn btn-circle btn-sm bg-white/10 backdrop-blur-md border-0 hover:bg-white/20 text-white"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="text-white">
                                            <h2 className="text-3xl md:text-4xl font-bold mb-2">{viewProject.title}</h2>
                                            <p className="text-white/80 line-clamp-2">{viewProject.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="p-8 space-y-10 overflow-y-auto flex-grow">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600">Stock</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{viewProject.stock}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">Sold</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{viewProject.sold}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-purple-600">Downloads</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{viewProject.downloads}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-amber-600">Delivery</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{viewProject.delivery}</p>
                                    </div>
                                </div>

                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Project Details */}
                                        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Project Details
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-500">Category:</span>
                                                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                                        {viewProject.typeCategory}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-gray-500">Type:</span>
                                                    <span className="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                                        {viewProject.typeTitle}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* License Information */}
                                        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                License Information
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-gray-500">License Type:</span>
                                                    <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                                        {viewProject.licenseTitle}
                                                    </span>
                                                </div>
                                                <div className="space-y-4">
                                                    {viewProject.licenseDetails.map((detail, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all duration-300"
                                                        >
                                                            <div className="flex justify-between items-start mb-3">
                                                                <h4 className="font-semibold text-gray-900">{detail.title}</h4>
                                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                                    Rp {detail.price ? detail.price.toLocaleString('id-ID') : 0}
                                                                </span>
                                                            </div>
                                                            <a
                                                                href={detail.downloadUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                </svg>
                                                                Download Files
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        {viewProject.content && (
                                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Content
                                                </h3>
                                                <div
                                                    className="prose max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-h3:text-xl prose-h3:mb-4 prose-p:text-gray-600 prose-strong:text-gray-900 prose-em:text-gray-500 prose-em:italic prose-li:text-gray-600 prose-ol:space-y-2 prose-ul:space-y-2"
                                                >
                                                    <div
                                                        className="space-y-8"
                                                        dangerouslySetInnerHTML={{
                                                            __html: viewProject.content.replace(
                                                                /<ol>/g,
                                                                '<ol class="list-decimal space-y-3 pl-4">'
                                                            ).replace(
                                                                /<li data-list="ordered">/g,
                                                                '<li class="pl-2">'
                                                            ).replace(
                                                                /<h3>/g,
                                                                '<h3 class="flex items-center gap-2 pb-2 border-b border-gray-100">'
                                                            ).replace(
                                                                /<p><em>/g,
                                                                '<p class="p-4 bg-purple-50 rounded-xl italic text-purple-700 text-sm"><em>'
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Author Information */}
                                        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Author
                                            </h3>
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                <div className="relative w-16 h-16">
                                                    <Image
                                                        src={viewProject.author?.photoURL || '/placeholder-avatar.png'}
                                                        alt={viewProject.author?.name || 'Author'}
                                                        fill
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{viewProject.author?.name}</h4>
                                                    <p className="text-sm text-gray-500">{viewProject.author?.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Timeline
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Created</p>
                                                        <p className="text-sm text-gray-500">{formatTimestamp(viewProject.createdAt)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Last Updated</p>
                                                        <p className="text-sm text-gray-500">{formatTimestamp(viewProject.updatedAt)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Images */}
                                        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Project Images
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {viewProject.images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                                                    >
                                                        <Image
                                                            src={image}
                                                            alt={`Project image ${index + 1}`}
                                                            fill
                                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>
    )
}
