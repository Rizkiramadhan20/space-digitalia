import React from 'react'

import { Metadata } from 'next'

import ContactLayout from "@/hooks/dashboard/super-admins/contact/ContactLayout"

export const metadata: Metadata = {
    title: 'Contact | SPACE DIGITALIA',
    description: 'Contact Page for Super Admins',
}

export default function Contact() {
    return (
        <ContactLayout />
    )
}

