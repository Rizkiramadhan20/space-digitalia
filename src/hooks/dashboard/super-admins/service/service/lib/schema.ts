import { Timestamp } from "firebase/firestore";

export interface ServiceContent {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  createdAt: Timestamp;
}

export interface ServiceFormData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: File | null;
}

export interface ServiceCardProps {
  service: ServiceContent;
  onEdit: (service: ServiceContent) => void;
  onDelete: (id: string) => void;
}
