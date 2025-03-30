import { Fragment } from 'react'

import CheckoutContent from '@/hooks/pages/payment/slug/CheckoutContent'

import HeroCheckout from '@/hooks/pages/payment/slug/HeroCheckout'

export const metadata = {
    title: 'Checkout | Space Digitalia',
    description: 'Halaman checkout space digitalia',
}

export default function CheckoutPage() {
    return (
        <Fragment>
            <HeroCheckout />
            <CheckoutContent />
        </Fragment>
    )
} 