// Featured Content
export interface FeaturedContent {
  id?: string;
  title: string;
  text: string;
  imageUrl: string;
}

// Featured Grid
export interface FeaturedGridProps {
  contents: FeaturedContent[];
  onEdit: (content: FeaturedContent) => void;
  onDelete: (content: FeaturedContent) => void;
}

// Featured Header
export interface FeaturedHeaderProps {
  onCreateClick: () => void;
}

// Delete Modal
export interface DeleteModalProps {
  onConfirm: (id: string) => Promise<void>;
  editingId: string | null;
}

// Content Modal
export interface ContentModalProps {
  isEditing: boolean;
  formData: FeaturedContent;
  setFormData: (data: FeaturedContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}
