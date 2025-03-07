import { Timestamp } from "firebase/firestore";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export interface AboutImage {
  id: string;
  imageUrl: string;
  title: string;
  text: string;
  description: string;
  createdAt: Timestamp;
}

export interface FormData {
  title: string;
  text: string;
  description: string;
  image: File | null;
}

export interface AboutFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  loading: boolean;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  selectedImage: { imageUrl: string } | null;
  setSelectedImage: (image: null) => void;
}

export interface DeleteModalProps {
  deleteLoading: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export interface UseAboutReturn {
  // States
  images: AboutImage[];
  loading: boolean;
  isLoading: boolean;
  isEditing: boolean;
  selectedImage: AboutImage | null;
  imageToDelete: string | null;
  deleteLoading: boolean;
  formData: FormData;

  // State setters
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: Dispatch<SetStateAction<AboutImage | null>>;
  setImageToDelete: Dispatch<SetStateAction<string | null>>;
  setFormData: Dispatch<SetStateAction<FormData>>;

  // Methods
  fetchImages: () => Promise<void>;
  handleEdit: (image: AboutImage) => void;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  handleDeleteImage: (imageId: string) => void;
  confirmDelete: () => Promise<void>;
}
