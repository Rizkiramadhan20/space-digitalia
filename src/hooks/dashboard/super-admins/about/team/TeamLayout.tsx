"use client"

import React, { useState, useEffect } from 'react'

import { motion } from "framer-motion"

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import imagekitInstance from '@/utils/imagekit'

import { compressImage } from "@/base/helper/ImageCompression"

import { toast } from "react-hot-toast"

import Image from 'next/image'

import { Timestamp } from 'firebase/firestore'

import AboutSkeleton from "@/hooks/dashboard/super-admins/about/about/AboutSkelaton"

import { Pagination } from "@/base/helper/Pagination"

interface TeamMember {
    id: string;
    imageUrl: string;
    name: string;
    position: string;
    createdAt: Timestamp;
}

// Add these variants near the top of the component
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export default function TeamLayout() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const itemsPerPage = 6;
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        image: null as File | null
    });
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Get unique positions for filter dropdown
    const uniquePositions = React.useMemo(() => {
        const positions = members.map(member => member.position);
        return [...new Set(positions)].sort();
    }, [members]);

    // Fetch team members from Firebase
    const fetchMembers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TEAM!));
            const memberList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TeamMember[];
            setMembers(memberList);
        } catch (error) {
            console.error("Error fetching team members:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // Calculate pagination
    const pageCount = Math.ceil(filteredMembers.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentMembers = filteredMembers.slice(offset, offset + itemsPerPage);

    // Handle search and filter
    useEffect(() => {
        let result = [...members];

        // Apply search
        if (searchQuery) {
            result = result.filter(member =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.position.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply position filter
        if (positionFilter) {
            result = result.filter(member =>
                member.position.toLowerCase().includes(positionFilter.toLowerCase())
            );
        }

        setFilteredMembers(result);
        setCurrentPage(0); // Reset to first page when filters change
    }, [members, searchQuery, positionFilter]);

    // Handle page change
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleEdit = (member: TeamMember) => {
        setIsEditing(true);
        setSelectedMember(member);
        setFormData({
            name: member.name,
            position: member.position,
            image: null
        });
        (document.getElementById('team_modal') as HTMLDialogElement)?.showModal();
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.position) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = selectedMember?.imageUrl;

            if (formData.image) {
                // Upload new image if provided
                const compressedFile = await compressImage(formData.image);
                const reader = new FileReader();

                const base64Promise = new Promise<string>((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(compressedFile);
                });

                const base64 = await base64Promise;

                const uploadResponse = await imagekitInstance.upload({
                    file: base64,
                    fileName: `team-${Date.now()}`,
                    folder: "/team"
                });

                imageUrl = uploadResponse.url;
            }

            if (isEditing && selectedMember) {
                // Update existing document
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TEAM!, selectedMember.id), {
                    imageUrl,
                    name: formData.name,
                    position: formData.position,
                    updatedAt: new Date()
                });
                toast.success("Team member updated successfully!");
            } else {
                // Create new document
                if (!imageUrl) {
                    toast.error("Please upload an image");
                    setLoading(false);
                    return;
                }
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TEAM!), {
                    imageUrl,
                    name: formData.name,
                    position: formData.position,
                    createdAt: new Date()
                });
                toast.success("Team member added successfully!");
            }

            await fetchMembers();
            resetForm();
        } catch {
            toast.error("Failed to save team member");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', position: '', image: null });
        setIsEditing(false);
        setSelectedMember(null);
        (document.getElementById('team_modal') as HTMLDialogElement)?.close();
    };

    // Modify handleDeleteImage to open modal instead of direct confirmation
    const handleDeleteImage = (memberId: string) => {
        setMemberToDelete(memberId);
        (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
    };

    // New function to handle actual deletion
    const confirmDelete = async () => {
        if (!memberToDelete) return;

        setDeleteLoading(true);
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TEAM!, memberToDelete));
            toast.success("Team member deleted successfully!");
            await fetchMembers();
        } catch {
            toast.error("Failed to delete team member");
        } finally {
            setDeleteLoading(false);
            setMemberToDelete(null);
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
        }
    };

    if (isLoading) {
        return <AboutSkeleton />;
    }

    return (
        <motion.section
            className='min-h-full py-0 px-0 sm:py-4 sm:px-4'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header section */}
            <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                <motion.div className="space-y-1">
                    <motion.h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                        Team Members
                    </motion.h1>
                    <motion.p className='text-gray-500'>
                        Manage your team members
                    </motion.p>
                </motion.div>

                <motion.button
                    onClick={() => {
                        setIsEditing(false);
                        setSelectedMember(null);
                        setFormData({ name: '', position: '', image: null });
                        (document.getElementById('team_modal') as HTMLDialogElement)?.showModal();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Add Team Member</span>
                </motion.button>
            </motion.div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or position..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Position Filter */}
                    <div className="relative">
                        <select
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                        >
                            <option value="">All Positions</option>
                            {uniquePositions.map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Team members grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-6 border border-gray-100"
                    >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                            <Image
                                src={member.imageUrl}
                                alt={member.name}
                                className="object-cover"
                                fill
                                priority
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600 mt-1">{member.position}</p>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleEdit(member)}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteImage(member.id)}
                                className="flex-1 px-4 py-2 border border-red-200 text-red-600 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {filteredMembers.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Show message when no results */}
            {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No team members found matching your criteria.</p>
                </div>
            )}

            {/* Add the modal */}
            <dialog id="team_modal" className="modal">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Add New Team Member
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Fill in the information below to create your team member
                                    </p>
                                </div>

                                <button
                                    onClick={() => (document.getElementById('team_modal') as HTMLDialogElement)?.close()}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column - Basic Information */}
                                    <div className="space-y-8">
                                        <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                            <div className="space-y-5">
                                                <div className="form-control">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                        placeholder="Enter name"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                                                    <textarea
                                                        value={formData.position}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] transition-all duration-200 resize-none"
                                                        placeholder="Enter position..."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Image Upload */}
                                    <div className="space-y-8">
                                        {formData.image ? (
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                                                <Image
                                                    src={URL.createObjectURL(formData.image)}
                                                    alt="Content preview"
                                                    className="object-cover w-full h-full"
                                                    width={500}
                                                    height={500}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : selectedMember?.imageUrl ? (
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 group">
                                                <Image
                                                    src={selectedMember.imageUrl}
                                                    alt="Current content"
                                                    className="object-cover w-full h-full"
                                                    width={500}
                                                    height={500}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedMember(null)}
                                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-full">
                                                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-xl border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
                                                        accept="image/*"
                                                        required={!isEditing}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                        disabled={loading}
                                        onClick={() => (document.getElementById('team_modal') as HTMLDialogElement)?.close()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span>Saving Changes...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Create</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* Add Delete Confirmation Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
                            <svg className="mx-auto mb-4 text-red-500 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>

                            <h3 className="mb-5 text-lg font-semibold text-gray-800">
                                Are you sure you want to delete this team member?
                            </h3>
                            <p className="mb-6 text-sm text-gray-500">
                                This action cannot be undone. This will permanently delete the team member.
                            </p>

                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMemberToDelete(null);
                                        (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
                                    }}
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2"
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <span>Yes, Delete</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </motion.section>
    )
}
