import { useState, useMemo } from "react";

import { UserAccount } from "@/utils/context/interface/Auth";

export function useUserFilters(users: UserAccount[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    currentPage,
    setCurrentPage,
    pageCount,
    paginatedUsers,
    itemsPerPage,
    filteredUsers,
  };
}
