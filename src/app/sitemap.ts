import { MetadataRoute } from 'next'

import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/utils/firebase"

import { formatSlug } from "@/base/helper/formatSlug"

interface Article {
    id: string
    slug: string
    tags?: string[]
    createdAt: string
}

interface Project {
    id: string
    slug: string
    typeCategory: string
    typeTitle: string
    createdAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://spacedigitalia.my.id'

    // Fetch articles
    const articlesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string)
    const articlesQuery = query(articlesRef, where("status", "==", "published"))
    const articlesSnapshot = await getDocs(articlesQuery)
    const articles = articlesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
    })) as Article[]

    // Fetch projects
    const projectsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string)
    const projectsQuery = query(projectsRef, where("createdAt", "!=", ""))
    const projectsSnapshot = await getDocs(projectsQuery)
    const projects = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
    })) as Project[]

    // Get unique tags from articles
    const tags = new Set<string>()
    articles.forEach(article => {
        if (article.tags && Array.isArray(article.tags)) {
            article.tags.forEach(tag => tags.add(tag))
        }
    })

    // Static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/project`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/signin`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/forgot-password`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
    ]

    // Article routes
    const articleRoutes = articles.map(article => ({
        url: `${baseUrl}/articles/${formatSlug(article.tags?.[0] || "")}/${article.slug}`,
        lastModified: new Date(article.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    // Tag routes
    const tagRoutes = Array.from(tags).map(tag => ({
        url: `${baseUrl}/articles/${formatSlug(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }))

    // Project routes
    const projectRoutes = projects.map(project => ({
        url: `${baseUrl}/project/${formatSlug(project.typeCategory)}/${formatSlug(project.typeTitle)}/${project.slug}`,
        lastModified: new Date(project.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...articleRoutes, ...tagRoutes, ...projectRoutes]
} 