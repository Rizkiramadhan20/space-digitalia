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
  content: string;
  createdAt: string;
  updatedAt: Timestamp;
  delivery: number;
  downloads: number;
  images: string[];
  frameworks: Framework[];
  licenseDetails: {
    downloadUrl: string;
    price: number;
    title: string;
  }[];
  licenseUrl: string;
  licenseTitle: string;
  linkPreview: string;
  slug: string;
  sold: number;
  status: string;
  stock: number;
  typeCategory: string;
  typeTitle: string;
  rating: number;
  ratingCount: number;
}

export interface ProjectCardProps {
  project: ProjectType;
  leftTimeline: gsap.core.Timeline | null;
  rightTimeline: gsap.core.Timeline | null;
}

export interface ProjectModalProps {
  project: ProjectType;
  isOpen: boolean;
  onClose: () => void;
}

export interface GalleryProps {
  images: string[];
  title: string;
  inView: boolean;
}

export interface Author {
  name: string;
  role: string;
  photoURL: string;
}

export interface AuthorCardProps {
  author: Author;
  inView: boolean;
}

export interface StatsGridProps {
  downloads: number;
  stock: number;
  sold: number;
  delivery: string | number;
}

export interface LicenseDetail {
  price: number;
}

export interface PriceCardProps {
  licenseDetails: LicenseDetail[];
}

export interface TechnologiesCardProps {
  frameworks: Framework[];
}

export interface DetailButtonProps {
  typeCategory: string;
  typeTitle: string;
  slug: string;
}

export interface UrlBarProps {
  linkPreview: string;
}

export interface ProjectDescriptionProps {
  description: string;
  content: string;
  inView: boolean;
}
