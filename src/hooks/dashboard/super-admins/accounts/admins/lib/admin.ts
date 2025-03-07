import { Role, UserAccount } from "@/utils/context/interface/Auth";

export interface UserFormData {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  role: Role;
}

export interface FilterOptions {
  searchTerm: string;
  selectedRole: string;
}

// User Table Props

export interface UserTableProps {
  users: UserAccount[];
  onEdit: (user: UserAccount) => void;
  onDelete: (user: UserAccount) => void;
  deletingId: string | null;
}

// Filter Controls Props

export interface FilterControlsProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

// User Form Modal Props

export interface UserFormModalProps {
  showModal: boolean;
  modalMode: "create" | "edit";
  formData: UserFormData;
  isSubmitting: boolean;
  onSubmit: () => void;
  onClose: () => void;
  setFormData: (data: UserFormData) => void;
}

// Delete Confirmation Modal Props

export interface DeleteConfirmationModalProps {
  show: boolean;
  user: UserAccount | null;
  isDeleting: boolean;
  onConfirm: (uid: string) => void;
  onClose: () => void;
}
