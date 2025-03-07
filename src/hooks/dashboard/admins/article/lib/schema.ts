import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
  description: string;
  status: "draft" | "published";
}

export interface Category {
  id: string;
  nameTags: string;
  category: string;
  createdAt: Timestamp;
}

export interface CategoryWithTags extends Omit<Category, "nameTags"> {
  nameTags: string[];
}
