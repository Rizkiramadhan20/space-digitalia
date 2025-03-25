import { Timestamp } from "firebase/firestore";
import { Role } from "@/utils/context/interface/Auth";

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL?: string;
  isActive: boolean;
  role: Role;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface NewUser {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

//========== Modal Props ============//

export interface AddUserModalProps {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  newUser: {
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
  };
  setNewUser: (user: {
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
  }) => void;
  isCreating: boolean;
  handleCreateUser: (e: React.FormEvent) => Promise<void>;
}

export interface DeleteModalProps {
  userToDelete: string | null;
  setUserToDelete: (uid: string | null) => void;
  handleDeleteUser: (uid: string) => Promise<void>;
  deletingUsers: string[];
}

export interface StatusModalProps {
  showStatusModal: boolean;
  setShowStatusModal: (show: boolean) => void;
  selectedUser: UserAccount | null;
  setSelectedUser: (user: UserAccount | null) => void;
  updateUserStatus: (uid: string, currentStatus: boolean) => Promise<void>;
  updatingStatus: string[];
}
