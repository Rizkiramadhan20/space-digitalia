export interface CompanyContent {
  id?: string;
  imageUrl: string;
}

export interface UploadModalProps {
  isEditMode: boolean;
  imagePreview: string | null;
  isSubmitting: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export interface DeleteModalProps {
  onDelete: (id: string) => Promise<void>;
  deleteId: string | null;
}

export interface CompanyTableProps {
  contents: CompanyContent[];
  onEdit: (content: CompanyContent) => void;
  onDelete: (id: string) => void;
}
