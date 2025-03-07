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

export interface SearchModalProps {
  searchQuery: string;
  searchResults: ArticleType[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchResultClick: (article: ArticleType) => void;
  handleModalClose: () => void;
}

export interface CategoryFilterProps {
  articles: ArticleType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export interface ArticleCardProps {
  article: ArticleType;
}

export interface TopArticleProps {
  article: ArticleType;
}
