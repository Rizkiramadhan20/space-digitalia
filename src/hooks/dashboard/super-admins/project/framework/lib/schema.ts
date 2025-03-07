import { Timestamp } from "firebase/firestore";

export interface CategoryProject {
  id: string;
  title: string;
  createdAt?: Timestamp;
  categoryTitle: string;
}

export interface FrameworkContent {
  id?: string;
  title: string;
  categoryId: string;
  categoryTitle: string;
  imageUrl: string;
  image?: File;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
