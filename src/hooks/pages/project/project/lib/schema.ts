import { Timestamp } from "firebase/firestore";

export interface Framework {
  imageUrl: string;
  title: string;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  profile: {
    image: string;
    title: string;
    text: string;
  };
  author: {
    name: string;
    photoURL: string;
    role: string;
    uid: string;
  };
  statusProject: string;
  content: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  photoURL: string;
  images: string[];
  frameworks: Framework[];
  linkPreview: string;
  slug: string;
  status: string;
  typeCategory: string;
  typeTitle: string;
  userPhotoURL: string;
  lastViewed: string;
}
