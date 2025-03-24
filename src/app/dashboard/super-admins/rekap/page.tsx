import React from 'react'

import { Metadata } from 'next'

import RekapLayout from "@/hooks/dashboard/super-admins/rekap/RekapLayout"

export const metadata: Metadata = {
    title: 'Rekap | SPACE DIGITALIA',
    description: 'Rekap Page for Super Admins',
}

export default function Rekap() {
    return (
        <RekapLayout />
    )
}

