import React, { Fragment } from 'react'

import TopBar from '@/components/layout/Header/TopBar'

import MainNav from '@/components/layout/Header/MainNav'

export default function Header() {
    return (
        <Fragment>
            <TopBar />
            <MainNav />
        </Fragment>
    )
}