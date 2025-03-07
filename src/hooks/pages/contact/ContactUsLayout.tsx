"use client"

import React, { Fragment } from 'react'

import ContactHero from '@/hooks/pages/contact/ContactHero'

import ContactCards from '@/hooks/pages/contact/ContactCards'

import ContactForm from '@/hooks/pages/contact/ContactForm'

export default function ContactUsLayout() {
    return (
        <Fragment>
            <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="container mx-auto px-4 xl:px-10 py-8 lg:py-20">
                    <ContactHero />
                    <ContactCards />
                </div>
            </section>

            <ContactForm />
        </Fragment>
    )
}

