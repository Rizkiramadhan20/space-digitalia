export interface Button {
  text: string;
  link: string;
}

export interface HomeContent {
  id?: string;
  title: string;
  description: string;
  button1: Button;
  button2: Button;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: HomeContent;
  setFormData: (data: HomeContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
