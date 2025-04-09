import { Metadata } from 'next'

import ContactUsLayout from '@/hooks/pages/contact/ContactUsLayout'

export const metadata: Metadata = {
    title: "Contact Us | SPACE DIGITALIA",
    description: "Contact Us",
}

export default function ContactUsPage() {
    return (
        <ContactUsLayout />
    )
}
