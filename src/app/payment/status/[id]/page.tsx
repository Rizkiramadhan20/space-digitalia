import type { Metadata } from 'next'

import PaymentStatusContent from '@/hooks/pages/payment/status/PaymentStatusContent'

import { generateMetadata as getPaymentMetadata } from '@/hooks/pages/payment/helper/metadata'

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getPaymentMetadata({ params: { transactionId: resolvedParams.id } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <PaymentStatusContent transactionId={resolvedParams.id} />
} 