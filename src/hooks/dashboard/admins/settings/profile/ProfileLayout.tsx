"use client"

import React, { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { useAuth } from '@/utils/context/AuthContext';

import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/utils/firebase';

import Image from 'next/image';

import imagekitInstance from '@/utils/imagekit';

import { compressImage } from '@/base/helper/ImageCompression';

import { format } from 'date-fns';

import { id } from 'date-fns/locale';

import ProfileSkelaton from '@/hooks/dashboard/admins/settings/profile/ProfileSkelaton';

import { UserAccount } from "@/utils/context/interface/Auth";

import { FiUser } from 'react-icons/fi';

import { motion } from 'framer-motion';

type TimestampType = {
    seconds: number;
    nanoseconds: number;
} | Date | null;

export default function ProfileContent() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserAccount | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user?.uid) return;

            try {
                const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setProfile(userSnap.data() as UserAccount);
                } else {
                    setError('User profile not found');
                }
            } catch {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user?.uid]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.uid || !editedProfile) return;

        setIsSaving(true);
        try {
            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            const updateData = {
                displayName: editedProfile.displayName,
                email: editedProfile.email,
                photoURL: editedProfile.photoURL,
                phoneNumber: editedProfile.phoneNumber,
                updatedAt: serverTimestamp()
            };
            await updateDoc(userRef, updateData);
            setProfile(editedProfile);
            setIsEditing(false);
            toast.success('Profil berhasil diperbarui');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            toast.error('Gagal memperbarui profil');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !user?.uid) return;

        setUploadingImage(true);
        try {
            // Compress the image first
            const compressedImage = await compressImage(e.target.files[0]);

            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedImage);

            reader.onload = async () => {
                const base64Image = reader.result as string;

                // Upload to ImageKit
                const uploadResponse = await imagekitInstance.upload({
                    file: base64Image,
                    fileName: `profile-${user.uid}-${Date.now()}`,
                    folder: '/profile-images'
                });

                // Update profile with new image URL
                const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
                await updateDoc(userRef, {
                    photoURL: uploadResponse.url
                });

                // Update local state
                setProfile(prev => prev ? { ...prev, photoURL: uploadResponse.url } : null);
                if (editedProfile) {
                    setEditedProfile({ ...editedProfile, photoURL: uploadResponse.url });
                }
                toast.success('Foto profil berhasil diperbarui');
            };
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image');
            toast.error('Gagal mengupload foto');
        } finally {
            setUploadingImage(false);
        }
    };

    const formatTimestamp = (timestamp: TimestampType) => {
        if (!timestamp) return '-';

        // Handle Firestore Timestamp
        if ('seconds' in timestamp) {
            return format(new Date(timestamp.seconds * 1000), 'dd MMMM yyyy, HH:mm:ss', { locale: id });
        }

        // Handle Date object
        if (timestamp instanceof Date) {
            return format(timestamp, 'dd MMMM yyyy, HH:mm:ss', { locale: id });
        }

        return '-';
    };

    if (loading) {
        return <ProfileSkelaton />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!profile) {
        return <div>No profile data available</div>;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-full py-0 px-0 sm:py-4 sm:px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Profil Saya
                        </h1>
                        <p className='text-gray-500'>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profil
                        </button>
                    )}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100/20 backdrop-blur-xl p-8"
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left side - Profile Image */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex flex-col items-center space-y-8 order-1 lg:order-2"
                        >
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-50 shadow-xl">
                                    {profile.photoURL ? (
                                        <Image
                                            src={profile.photoURL}
                                            alt="Profile"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full transition duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                            <FiUser className="w-16 h-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-center w-full">
                                {isEditing && (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="profile-image-upload"
                                            disabled={uploadingImage}
                                        />
                                        <label
                                            htmlFor="profile-image-upload"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 
                                                rounded-xl hover:bg-indigo-50 transition-all duration-300 font-medium 
                                                border-2 border-indigo-100 hover:border-indigo-200 shadow-sm
                                                active:scale-95"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {uploadingImage ? 'Mengupload...' : 'Ubah Foto'}
                                        </label>
                                    </>
                                )}
                                <p className="text-sm text-gray-500 mt-4">
                                    Ukuran gambar: maks. 1 MB
                                    <br />
                                    Format gambar: JPEG, PNG
                                </p>
                            </div>
                        </motion.div>

                        {/* Right side - Form Fields */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <div className="space-y-6">
                                {[
                                    {
                                        label: 'Nama',
                                        name: 'displayName',
                                        value: isEditing ? editedProfile?.displayName : profile.displayName,
                                        type: 'text'
                                    },
                                    {
                                        label: 'Email',
                                        value: profile.email,
                                        readOnly: true
                                    },
                                    {
                                        label: 'Nomor Telepon',
                                        name: 'phoneNumber',
                                        value: isEditing ? editedProfile?.phoneNumber : (profile.phoneNumber || '-'),
                                        type: 'tel'
                                    },
                                    {
                                        label: 'Status Akun',
                                        value: profile.isActive ? 'Aktif' : 'Tidak Aktif',
                                        isStatus: true
                                    },
                                    {
                                        label: 'Member Sejak',
                                        value: formatTimestamp(profile.createdAt),
                                        readOnly: true
                                    }
                                ].map((field, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="group p-6 bg-gray-50/50 rounded-2xl hover:bg-white transition duration-300 
                                            hover:shadow-lg hover:shadow-gray-100/50 border border-gray-100"
                                    >
                                        <label className="text-sm font-medium text-gray-600 block mb-2">{field.label}</label>
                                        <div className="mt-1">
                                            {field.isStatus ? (
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2.5 h-2.5 rounded-full ${profile.isActive ?
                                                        'bg-green-500' : 'bg-red-500'}`}>
                                                    </div>
                                                    <p className="text-gray-800 text-lg">{field.value}</p>
                                                </div>
                                            ) : isEditing && !field.readOnly ? (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={field.value || ''}
                                                    onChange={handleChange}
                                                    className="w-full p-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 
                                                        focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                                                        hover:border-indigo-300"
                                                    placeholder={`Masukkan ${field.label}`}
                                                />
                                            ) : (
                                                <p className="text-gray-800 text-lg">{field.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-8 flex flex-col sm:flex-row justify-end gap-4"
                                    >
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-8 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 
                                                transition-all duration-300 font-medium border-2 border-gray-200 
                                                hover:border-gray-300 active:scale-95"
                                            disabled={isSaving}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white 
                                                rounded-xl hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 
                                                font-medium shadow-lg shadow-indigo-100 hover:shadow-indigo-200 
                                                active:scale-95 disabled:opacity-70"
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Menyimpan...' : 'Simpan'}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </motion.section>
    );
}