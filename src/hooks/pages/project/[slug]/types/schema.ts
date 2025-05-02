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
  createdAt: Timestamp;
  updatedAt: Timestamp;
  delivery: number;
  downloads: number;
  images: string[];
  frameworks: Framework[];
  licenseDetails: {
    downloadUrl: string;
    price: number;
    title: string;
    licenseTitle: string;
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
  lastViewed: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface ImageModalProps {
  selectedImage: string;
  zoomLevel: number;
  position: Position;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleDownload: (url: string) => void;
  closeModal: () => void;
  setZoomLevel: (zoom: number) => void;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragStart {
  x: number;
  y: number;
}

export interface Address {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  streetAddress: string;
  details: string;
  postalCode: string;
  isDefault: boolean;
}
