import { Metadata } from "next";

import { metadata as baseMetadata } from "@/base/meta/Metadata";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export interface Article {
  title: string;
  description: string;
  imageUrl: string[];
  slug: string;
  publishedDate?: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const articleRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
    );
    const q = query(articleRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const articleData = querySnapshot.docs[0].data() as Article;
    return articleData;
  } catch (error) {
    console.error("Error fetching Article:", error);
    return null;
  }
}

type MetadataProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = params;
  const url = `${process.env.NEXT_PUBLIC_URL}/articles/${slug}`;

  // Get the article data
  const article = await getArticle(slug);

  // Use article data if available, otherwise fallback to generic metadata
  const title = article?.title || `${slug} | Space Digitalia`;
  const description =
    article?.description || `Baca artikel ${slug} di Space Digitalia`;
  const imageUrl = article?.imageUrl?.[0] || "/icon.png";

  // Add script to push data to dataLayer
  const script = {
    type: "application/ld+json",
    json: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: imageUrl,
      url: url,
      datePublished: article?.publishedDate || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: "Rizki Ramadhan",
      },
    },
  };

  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
    alternates: {
      canonical: url,
    },

    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      title,
      description,
      url: url,
      siteName: "Space Digitalia",
      locale: "id_ID",
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },

    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      creator: "@rizki_ramadhan",
      site: "@rizki_ramadhan",
      images: [imageUrl],
    },
    other: {
      "google-tag-manager": "GTM-YOUR-ID",
      "json-ld": JSON.stringify(script.json),
    },
  };
}
