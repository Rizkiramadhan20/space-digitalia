import { Timestamp } from "firebase/firestore";

export interface TypeContent {
  id?: string;
  title: string;
  category: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TypeFormData {
  title: string;
  category: string;
}

// Delete Modal

export interface DeleteModalProps {
  isDeleting: boolean;
  onDelete: () => void;
  onClose: () => void;
}

// Type Form Modal

export interface TypeFormModalProps {
  isEditing: boolean;
  isSubmitting: boolean;
  formData: TypeContent;
  categories: CategoryContent[];
  setFormData: (data: TypeContent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

export interface CategoryContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
