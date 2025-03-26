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
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  delivery: number;
  downloads: number;
  photoURL: string;
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
  userPhotoURL: string;
  lastViewed: string;
}

export interface LicenseDetail {
  title: string;
  price: number;
  licenseTitle: string;
  downloadUrl: string;
  delivery?: string;
  stock?: string;
  sold?: string;
  deliveryDays?: string;
}

// Add new interface for Address
export interface Address {
  city: string;
  details: string;
  district: string;
  fullName: string;
  id: string;
  isDefault: boolean;
  phone: string;
  postalCode: string;
  province: string;
  streetAddress: string;
  type: string;
}

// Update PaymentData interface to include address
export interface PaymentData {
  projectId: string;
  userId: string;
  amount: number;
  projectTitle: string;
  licenseType: string;
  deliveryMethod: "download" | "delivery";
  userEmail: string;
  userName: string;
  userPhotoURL: string | null;
  downloadUrl?: string;
  imageUrl?: string;
  // Add address fields
  deliveryAddress?: {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    streetAddress: string;
    details: string;
    postalCode: string;
  };
}
