export interface AuthorCardProps {
  author: {
    photoURL: string;
    name: string;
    role: string;
  };
}

export interface ArticleContentProps {
  content: string;
  thumbnail: string;
  title: string;
}

export interface ArticleTagsProps {
  tags: string[];
}
