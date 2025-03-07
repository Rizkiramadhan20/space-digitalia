import { useState } from "react";

import { UserAccount, Role } from "@/utils/context/interface/Auth";

export function AcountControls() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState({
    uid: "",
    email: "",
    password: "",
    displayName: "",
    role: Role.ADMIN,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserAccount | null>(null);

  const handleEditClick = (admin: UserAccount) => {
    setFormData({
      uid: admin.uid,
      email: admin.email,
      password: "",
      displayName: admin.displayName,
      role: admin.role,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setFormData({
      uid: "",
      email: "",
      password: "",
      displayName: "",
      role: Role.ADMIN,
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleDeleteClick = (user: UserAccount) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return {
    showModal,
    setShowModal,
    modalMode,
    formData,
    setFormData,
    showDeleteModal,
    setShowDeleteModal,
    userToDelete,
    handleEditClick,
    handleCreateClick,
    handleDeleteClick,
    closeModals,
  };
}
