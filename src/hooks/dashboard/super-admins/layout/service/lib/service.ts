export interface ServiceContent {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  profile: {
    image: string;
    title: string;
    text: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServiceFormData = Omit<
  ServiceContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: ServiceFormData = {
  title: "",
  description: "",
  imageUrl: "",
  profile: {
    image: "",
    title: "",
    text: "",
  },
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  selectedProfileImage: File | null;
  setSelectedProfileImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
