"use client"

import React, { useState, useEffect, useCallback } from 'react';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { useAuth } from '@/utils/context/AuthContext';

import { db } from '@/utils/firebase';

import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import toast from 'react-hot-toast';

import { Address, UserAccount } from '@/hooks/dashboard/user/profile/address/lib/schema';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { divIcon } from 'leaflet';

import { renderToString } from 'react-dom/server';

import AddressSkelaton from '@/hooks/dashboard/user/profile/address/AddressSkelaton';

import { LocationResult, Coordinates, OpenCageResult } from '@/hooks/dashboard/user/profile/address/lib/schema';

// Custom marker icon menggunakan React Icons
const customIcon = divIcon({
    html: renderToString(
        <FaMapMarkerAlt
            style={{
                color: '#ef4444', // Warna merah (sesuaikan dengan theme Anda)
                fontSize: '32px'
            }}
        />
    ),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

// Komponen untuk menangani klik pada peta
function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function AddressContent() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<Address[]>((user as UserAccount)?.addresses || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        postalCode: '',
        streetAddress: '',
        details: '',
        isDefault: false,
        type: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

    // Default center (Indonesia)
    const defaultCenter: [number, number] = [-6.200000, 106.816666];

    // Add useEffect to handle body scroll
    useEffect(() => {
        if (isModalOpen || isMapModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, isMapModalOpen]);

    // Add useEffect to simulate loading
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            province: '',
            city: '',
            district: '',
            postalCode: '',
            streetAddress: '',
            details: '',
            isDefault: false,
            type: ''
        });
        setCurrentAddress(null);
        setSearchQuery('');
        setSelectedLocation(null);
        setLocationResults([]);
        setCurrentStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Ensure we have coordinates from selectedLocation
            const districtCoordinates = selectedLocation
                ? `${selectedLocation.lat},${selectedLocation.lng}`
                : "";

            // Create address data with coordinates
            const addressData: Address = {
                id: currentAddress?.id || Date.now().toString(),
                ...formData,
                district: districtCoordinates,
                // Set isDefault to true if this will be the only address
                isDefault: currentAddress ? formData.isDefault : addresses.length === 0
            };

            if (!user?.uid) return;

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);

            if (currentAddress) {
                const updatedAddresses = addresses.map(addr =>
                    addr.id === currentAddress.id ? addressData : addr
                );
                await updateDoc(userRef, { addresses: updatedAddresses });
                toast.success('Alamat berhasil diperbarui');
            } else {
                await updateDoc(userRef, {
                    addresses: arrayUnion(addressData)
                });
                toast.success('Alamat berhasil ditambahkan');
            }

            setAddresses(prev => currentAddress
                ? prev.map(addr => addr.id === currentAddress.id ? addressData : addr)
                : [...prev, addressData]
            );

            setIsModalOpen(false);
            resetForm();
        } catch {
            toast.error('Terjadi kesalahan saat menyimpan alamat');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (address: Address) => {
        setAddressToDelete(address);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!addressToDelete || !user?.uid) return;

        setIsSubmitting(true);
        try {
            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await updateDoc(userRef, {
                addresses: arrayRemove(addressToDelete)
            });

            setAddresses(prev => prev.filter(addr => addr.id !== addressToDelete.id));
            toast.success('Alamat berhasil dihapus');
            setIsDeleteModalOpen(false);
            setAddressToDelete(null);
        } catch {
            toast.error('Terjadi kesalahan saat menghapus alamat');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (address: Address) => {
        setCurrentAddress(address);

        // Parse coordinates from district string
        const [lat, lng] = address.district.split(',').map(Number);
        setSelectedLocation(lat && lng ? { lat, lng } : null);

        setFormData({
            fullName: address.fullName,
            phone: address.phone,
            province: address.province,
            city: address.city,
            district: address.district,
            postalCode: address.postalCode,
            streetAddress: address.streetAddress,
            details: address.details || '',
            isDefault: address.isDefault,
            type: address.type || 'rumah' // Default to 'rumah' if not set
        });

        // Reset search state
        setSearchQuery('');
        setLocationResults([]);

        // Set appropriate step based on data
        if (address.fullName && address.phone) {
            if (lat && lng) {
                if (address.streetAddress) {
                    setCurrentStep(3);
                } else {
                    setCurrentStep(2);
                }
            } else {
                setCurrentStep(1);
            }
        }

        setIsModalOpen(true);
    };

    const searchLocations = async (query: string) => {
        if (!query || query.length < 3) {
            setLocationResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    query
                )}&countrycode=id&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
            );
            const data = await response.json();

            if (data.results) {
                const formattedResults: LocationResult[] = data.results.map((result: OpenCageResult) => {
                    const components = result.components;
                    return {
                        formatted: result.formatted,
                        province: components.state || '',
                        city: components.city || components.county || '',
                        district: `${result.geometry.lat},${result.geometry.lng}`,
                        postalCode: components.postcode || '',
                        coordinates: {
                            lat: result.geometry.lat,
                            lng: result.geometry.lng
                        }
                    };
                });
                setLocationResults(formattedResults);
            }
        } catch {
            toast.error('Gagal mengambil data lokasi');
        } finally {
            setIsSearching(false);
        }
    };

    const handleLocationSelect = async (lat: number, lng: number) => {
        const newLocation = { lat, lng };
        setSelectedLocation(newLocation);

        const coordinatesString = `${lat},${lng}`;
        setFormData(prev => ({
            ...prev,
            district: coordinatesString
        }));

        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
            );
            const data = await response.json();

            if (data.results && data.results[0]) {
                const result = data.results[0];
                const components = result.components;

                setFormData(prev => ({
                    ...prev,
                    province: components.state || components.province || prev.province || 'Tidak diketahui',
                    city: components.city || components.county || components.municipality || prev.city || 'Tidak diketahui',
                    district: coordinatesString,
                    postalCode: components.postcode || prev.postalCode || 'Tidak diketahui',
                    streetAddress: components.road ?
                        `${components.road}${components.house_number ? `, No. ${components.house_number}` : ''}` :
                        result.formatted
                }));
            }
        } catch {
            toast.error('Gagal mendapatkan detail alamat');
        }
    };

    const handleSetDefault = async (addressId: string) => {
        try {
            if (!user?.uid) return;

            // Create new array with the selected address as default and move it to top
            const selectedAddress = addresses.find(addr => addr.id === addressId);
            if (!selectedAddress) return;

            const otherAddresses = addresses.filter(addr => addr.id !== addressId);
            const updatedAddresses = [
                { ...selectedAddress, isDefault: true },
                ...otherAddresses.map(addr => ({ ...addr, isDefault: false }))
            ];

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            await updateDoc(userRef, {
                addresses: updatedAddresses
            });

            setAddresses(updatedAddresses);
            toast.success('Alamat utama berhasil diubah');
        } catch {
            toast.error('Terjadi kesalahan saat mengubah alamat utama');
        }
    };

    // Fungsi untuk mengecek progress
    const checkProgress = useCallback(() => {
        if (formData.fullName && formData.phone) {
            if (selectedLocation) {
                if (formData.streetAddress) {
                    setCurrentStep(3);
                } else {
                    setCurrentStep(2);
                }
            } else {
                setCurrentStep(1);
            }
        }
    }, [formData.fullName, formData.phone, selectedLocation, formData.streetAddress]);

    // Tambahkan useEffect untuk memantau perubahan form
    useEffect(() => {
        checkProgress();
    }, [formData.fullName, formData.phone, selectedLocation, formData.streetAddress, checkProgress]);

    // Tambahkan fungsi untuk handle next step manual (opsional)
    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    if (loading) {
        return <AddressSkelaton />
    }

    return (
        <section className="min-h-full px-0 sm:px-4">
            {/* Header Section with improved styling */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Alamat Saya
                    </h1>
                    <p className="text-gray-500">
                        Kelola alamat pengiriman Anda
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Tambah Alamat</span>
                </button>
            </div>

            {/* Address List with improved card design */}
            <div className="grid gap-4">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 
                                  transition-all duration-300 hover:shadow-lg hover:shadow-blue-50"
                    >
                        <div className="p-5">
                            {/* Header Section */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
                                <div className="h-4 w-[1px] bg-gray-200"></div>
                                <p className="text-gray-600">{address.phone}</p>
                                {address.isDefault && (
                                    <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                        <span className="mr-1">•</span>
                                        Utama
                                    </span>
                                )}
                            </div>

                            {/* Address Details */}
                            <div className="space-y-2">
                                <p className="text-gray-800 font-medium">{address.streetAddress}</p>
                                <p className="text-gray-600 text-sm">
                                    {address.city}, {address.province}, {address.postalCode}
                                </p>
                                {address.type && (
                                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                                        <span className="text-base">
                                            {address.type === 'rumah' ? '🏠' : '🏢'}
                                        </span>
                                        <span>
                                            {address.type === 'rumah' ? 'Alamat Rumah' : 'Alamat Kantor'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm
                                             text-blue-600 hover:text-blue-700 hover:bg-blue-50 
                                             rounded-lg transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Ubah
                                </button>

                                <button
                                    onClick={() => handleDelete(address)}
                                    className="inline-flex items-center justify-center px-3 py-1.5 text-sm
                                             text-red-600 hover:text-red-700 hover:bg-red-50
                                             rounded-lg transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Hapus
                                </button>

                                {!address.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(address.id)}
                                        className="ml-auto inline-flex items-center justify-center px-3 py-1.5
                                                 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 
                                                 hover:border-gray-300 rounded-lg transition-all duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                        Atur sebagai utama
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal styling improvements */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] 
                                      overflow-y-auto custom-scrollbar">
                            {/* Header with Steps Indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {currentAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {currentAddress
                                                ? 'Perbarui informasi alamat pengiriman Anda'
                                                : 'Lengkapi informasi alamat pengiriman Anda'
                                            }
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCloseModal}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Progress Steps */}
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                            } font-medium`}>1</span>
                                        <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                                            Info Kontak
                                        </span>
                                    </div>
                                    <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                            } font-medium`}>2</span>
                                        <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                                            Lokasi
                                        </span>
                                    </div>
                                    <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                            } font-medium`}>3</span>
                                        <span className={currentStep === 3 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                                            Detail
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Contact Information Section */}
                                <div className="space-y-6">
                                    <div className="space-y-1 mb-4">
                                        <h4 className="font-medium text-gray-900">Informasi Kontak</h4>
                                        <p className="text-sm text-gray-500">Masukkan informasi penerima paket</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Nama Lengkap
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                placeholder="Contoh: John Doe"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Nomor Telepon
                                                <span className="text-red-500 ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+62</span>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    placeholder="812 3456 7890"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Section */}
                                <div className="space-y-6">
                                    <div className="space-y-1 mb-4">
                                        <h4 className="font-medium text-gray-900">Lokasi Pengiriman</h4>
                                        <p className="text-sm text-gray-500">Cari dan pilih lokasi pengiriman yang tepat</p>
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Cari Lokasi
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setSearchQuery(value);
                                                    searchLocations(value);
                                                }}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                placeholder="Ketik nama jalan, gedung, atau daerah (min. 3 karakter)"
                                            />
                                        </div>

                                        {/* Search Results */}
                                        {isSearching && (
                                            <div className="mt-2 p-4 bg-white border rounded-lg shadow-lg">
                                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    <span>Mencari lokasi...</span>
                                                </div>
                                            </div>
                                        )}

                                        {!isSearching && locationResults.length > 0 && (
                                            <div className="mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {locationResults.map((location, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                                                        onClick={() => {
                                                            if (location.coordinates) {
                                                                setFormData({
                                                                    ...formData,
                                                                    province: location.province,
                                                                    city: location.city,
                                                                    district: `${location.coordinates.lat},${location.coordinates.lng}`,
                                                                    postalCode: location.postalCode,
                                                                });
                                                                setSelectedLocation(location.coordinates);
                                                            }
                                                            setSearchQuery(location.formatted);
                                                            setLocationResults([]);
                                                        }}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-1">
                                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{location.formatted}</div>
                                                                <div className="text-sm text-gray-500">
                                                                    {location.city}, {location.province}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Map Preview */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Lokasi di Peta
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            {selectedLocation ? (
                                                <div className="space-y-4">
                                                    <div className="h-48 rounded-lg overflow-hidden">
                                                        <MapContainer
                                                            center={[selectedLocation.lat, selectedLocation.lng]}
                                                            zoom={15}
                                                            style={{ height: '100%', width: '100%' }}
                                                            dragging={false}
                                                            scrollWheelZoom={false}
                                                        >
                                                            <TileLayer
                                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            />
                                                            <Marker
                                                                position={[selectedLocation.lat, selectedLocation.lng]}
                                                                icon={customIcon}
                                                            />
                                                        </MapContainer>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm text-gray-500">
                                                            Koordinat: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsMapModalOpen(true)}
                                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                        >
                                                            Ubah Lokasi
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                                                    <button
                                                        type="button"
                                                        className="flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                        onClick={() => setIsMapModalOpen(true)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-sm font-medium">Pilih Lokasi di Peta</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Details Section */}
                                <div className="space-y-6">
                                    <div className="space-y-1 mb-4">
                                        <h4 className="font-medium text-gray-900">Detail Alamat</h4>
                                        <p className="text-sm text-gray-500">Lengkapi detail alamat pengiriman</p>
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Alamat Lengkap
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.streetAddress}
                                            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Contoh: Jl. Sudirman No. 123, RT 01/RW 02"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Detail Tambahan
                                        </label>
                                        <textarea
                                            value={formData.details}
                                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                            placeholder="Contoh: Patokan dekat Masjid, Warna pagar hitam, dll"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Label Alamat</label>
                                        <div className="flex gap-4">
                                            <label className="relative flex items-center gap-3 p-3 cursor-pointer border rounded-lg hover:border-blue-500 transition-all">
                                                <input
                                                    type="radio"
                                                    name="addressType"
                                                    value="rumah"
                                                    checked={formData.type === 'rumah'}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${formData.type === 'rumah' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                                                    {formData.type === 'rumah' && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">🏠</span>
                                                    <span className="font-medium text-gray-900">Rumah</span>
                                                </div>
                                            </label>

                                            <label className="relative flex items-center gap-3 p-3 cursor-pointer border rounded-lg hover:border-blue-500 transition-all">
                                                <input
                                                    type="radio"
                                                    name="addressType"
                                                    value="kantor"
                                                    checked={formData.type === 'kantor'}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                    className="hidden"
                                                />
                                                <span className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${formData.type === 'kantor' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                                                    {formData.type === 'kantor' && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">🏢</span>
                                                    <span className="font-medium text-gray-900">Kantor</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                                        disabled={isSubmitting}
                                    >
                                        Batal
                                    </button>
                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
                                            disabled={isSubmitting}
                                        >
                                            <span>Lanjut</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    <span>Menyimpan...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{currentAddress ? 'Perbarui Alamat' : 'Simpan Alamat'}</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Modal */}
            {isMapModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] 
                                  overflow-y-auto custom-scrollbar shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Pilih Lokasi</h3>
                            <button
                                onClick={() => setIsMapModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="h-[400px] mb-6 rounded-xl overflow-hidden">
                            <MapContainer
                                center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter}
                                zoom={13}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <MapEvents onLocationSelect={handleLocationSelect} />
                                {selectedLocation && (
                                    <Marker
                                        position={[selectedLocation.lat, selectedLocation.lng]}
                                        icon={customIcon}
                                    />
                                )}
                            </MapContainer>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsMapModalOpen(false)}
                                className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedLocation) {
                                        setIsMapModalOpen(false);
                                    } else {
                                        toast.error('Silakan pilih lokasi terlebih dahulu');
                                    }
                                }}
                                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Pilih Lokasi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Hapus Alamat
                                </h3>
                                <p className="text-gray-500">
                                    Apakah Anda yakin ingin menghapus alamat ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>

                            {addressToDelete && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium text-gray-900 mb-1">{addressToDelete.fullName}</p>
                                        <p>{addressToDelete.phone}</p>
                                        <p className="mt-1">{addressToDelete.streetAddress}</p>
                                        <p>{addressToDelete.city}, {addressToDelete.province}, {addressToDelete.postalCode}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setAddressToDelete(null);
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Menghapus...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>Hapus Alamat</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}