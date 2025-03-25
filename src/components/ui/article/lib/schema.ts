export interface ArticleType {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  status: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
}


// Top Article
export interface TopArticleProps {
  article: ArticleType;
}

// Article Card
export interface ArticleCardProps {
  article: ArticleType;
}