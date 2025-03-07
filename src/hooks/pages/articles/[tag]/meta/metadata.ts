import { Metadata } from "next";

import { fetchArticlesByTag } from "@/hooks/pages/articles/[tag]/lib/FetchTags";

import { ArticleType } from "@/hooks/pages/articles/articles/lib/schema";

async function getArticleTag(tag: string): Promise<ArticleType | null> {
  try {
    const articles = await fetchArticlesByTag(tag);
    return articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata(tag: string): Promise<Metadata> {
  const article = await getArticleTag(tag);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `Article - ${capitalizedTag}`,
    description: article?.description || `Article description not available`,
    openGraph: {
      title: `Article - ${capitalizedTag}`,
      description: article?.description || `Artikel dengan tag ${tag}`,
      images: article?.thumbnail ? [article.thumbnail] : [],
    },
  };
}
