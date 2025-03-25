import React from 'react'

import { Metadata } from 'next'

import SubscriptionLayout from "@/hooks/dashboard/super-admins/subscription/SubscriptionLayout"

export const metadata: Metadata = {
    title: 'Subscription | SPACE DIGITALIA',
    description: 'Subscription Page for Super Admin',
}

export default function Subscription() {
    return (
        <SubscriptionLayout />
    )
}
