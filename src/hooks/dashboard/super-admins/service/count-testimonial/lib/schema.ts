import { Timestamp } from "firebase/firestore";

export interface CountTestimonial {
  id: string;
  number: string;
  description: string;
  createdAt: Timestamp;
}

export interface FormData {
  number: string;
  description: string;
}

export interface HeaderProps {
  onAddNew: () => void;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export interface TestimonialCardProps {
  testimonial: CountTestimonial;
  onEdit: (testimonial: CountTestimonial) => void;
  onDelete: (id: string) => void;
}

export interface TestimonialModalProps {
  isEditing: boolean;
  loading: boolean;
  formData: FormData;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: Partial<FormData>) => void;
  onClose: () => void;
}

export interface DeleteModalProps {
  deleteLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
