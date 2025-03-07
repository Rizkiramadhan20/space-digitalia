import { Timestamp } from "firebase/firestore";

export interface Tag {
  id: string;
  nameTags: string;
  categoryId: string;
  createdAt: Timestamp;
  category?: string;
}

export interface Category {
  id: string;
  nameTags: string;
  categoryId: string;
  createdAt: Timestamp;
  category?: string;
}

export interface CategoryListProps {
  onEdit: (category: Category) => void;
}

export interface CategoryProps {
  id: string;
  name: string;
}

export interface TagProps {
  id: string;
  nameTags: string;
  categoryId: string;
  createdAt: Timestamp;
  category?: string;
}
