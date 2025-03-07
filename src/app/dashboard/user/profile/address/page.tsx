import React from 'react'

import { Metadata } from 'next'

import AddressLayout from '@/hooks/dashboard/user/profile/address/AddressLayout'

export const metadata: Metadata = {
    title: "Alamat | SPACE DIGITALIA",
    description: "Alamat",
}

export default function page() {
    return (
        <AddressLayout />
    )
}
