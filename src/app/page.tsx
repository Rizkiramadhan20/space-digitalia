import React, { Fragment } from 'react'

import Home from '@/components/ui/home/Home'

import Featured from '@/components/ui/featured/Featured'

import Service from "@/components/ui/service/Service"

import Project from "@/components/ui/project/Project"

import Company from '@/components/ui/company/Company'

import Article from '@/components/ui/article/Article'

import Testimonials from '@/components/ui/testimonials/Testimonials'

import NotificationWrapper from '@/components/NotificationWrapper'

export default function page() {
  return (
    <Fragment>
      <main className='overflow-hidden'>
        <NotificationWrapper>
          <Home />
          <Featured />
          <Service />
          <Project />
          <Article />
          <Company />
          <Testimonials />
        </NotificationWrapper>
      </main>
    </Fragment>
  )
}
