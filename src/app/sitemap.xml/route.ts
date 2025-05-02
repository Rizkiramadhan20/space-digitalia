import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { formatSlug } from "@/base/helper/formatSlug";

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

interface UrlEntry {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

async function getArticleSlugs() {
  try {
    const articlesRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
    );
    const articlesQuery = query(
      articlesRef,
      where("status", "==", "published")
    );
    const querySnapshot = await getDocs(articlesQuery);
    return querySnapshot.docs.map((doc) => ({
      slug: doc.data().slug,
      tags: doc.data().tags || [],
      createdAt:
        doc.data().createdAt?.toDate?.().toISOString() ||
        new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching article slugs:", error);
    return [];
  }
}

async function getProjectCategories() {
  try {
    const projectsRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string
    );
    const projectsQuery = query(projectsRef, where("createdAt", "!=", ""));
    const querySnapshot = await getDocs(projectsQuery);
    const projects = querySnapshot.docs.map((doc) => ({
      typeCategory: doc.data().typeCategory,
      typeTitle: doc.data().typeTitle,
      slug: doc.data().slug,
      createdAt:
        doc.data().createdAt?.toDate?.().toISOString() ||
        new Date().toISOString(),
    }));
    return projects;
  } catch (error) {
    console.error("Error fetching project categories:", error);
    return [];
  }
}

async function generateSitemap() {
  const articles = await getArticleSlugs();
  const projects = await getProjectCategories();

  // Get unique tags from articles
  const tags = new Set<string>();
  articles.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag) => tags.add(tag));
    }
  });

  const staticUrls: UrlEntry[] = [
    { url: "", priority: 1, changefreq: "daily" },
    { url: "/about", priority: 0.8, changefreq: "monthly" },
    { url: "/articles", priority: 0.9, changefreq: "daily" },
    { url: "/contact", priority: 0.7, changefreq: "monthly" },
    { url: "/project", priority: 0.8, changefreq: "weekly" },
    { url: "/services", priority: 0.8, changefreq: "monthly" },
    { url: "/signin", priority: 0.5, changefreq: "monthly" },
    { url: "/signup", priority: 0.5, changefreq: "monthly" },
    { url: "/forgot-password", priority: 0.3, changefreq: "monthly" },
  ];

  const dynamicUrls: UrlEntry[] = [
    // Article routes
    ...articles.map((article) => ({
      url: `/articles/${formatSlug(article.tags?.[0] || "")}/${article.slug}`,
      priority: 0.8,
      changefreq: "daily",
      lastmod: article.createdAt,
    })),
    // Tag routes
    ...Array.from(tags).map((tag) => ({
      url: `/articles/${formatSlug(tag)}`,
      priority: 0.7,
      changefreq: "daily",
      lastmod: new Date().toISOString(),
    })),
    // Project routes
    ...projects.map((project) => ({
      url: `/project/${formatSlug(project.typeCategory)}/${formatSlug(
        project.typeTitle
      )}/${project.slug}`,
      priority: 0.7,
      changefreq: "weekly",
      lastmod: project.createdAt,
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...dynamicUrls]
  .map(({ url, priority, changefreq, lastmod }) => {
    return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return sitemapXml;
}

export async function GET() {
  const body = await generateSitemap();

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
