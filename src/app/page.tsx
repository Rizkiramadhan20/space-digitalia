import React from 'react'

import Home from '@/components/ui/home/Home'

import Featured from '@/components/ui/featured/Featured'

import Service from "@/components/ui/service/Service"

import Project from "@/components/ui/project/Project"

import Article from '@/components/ui/article/Article'

import Testimonials from '@/components/ui/testimonials/Testimonials'

export default function page() {
  return (
    <main className='overflow-hidden'>
      <Home />
      <Featured />
      <Service />
      <Project />
      <Article />
      <Testimonials />
    </main>
  )
}
