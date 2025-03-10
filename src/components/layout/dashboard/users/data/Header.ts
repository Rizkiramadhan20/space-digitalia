import { FiHome, FiSettings } from "react-icons/fi";

import { GrTransaction } from "react-icons/gr";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/user",
  },

  {
    icon: GrTransaction,
    label: "Transaksi",
    href: "/dashboard/user/transaction",
    subItems: [
      { label: "Daftar Transaksi", href: "/dashboard/user/transaction" },
      { label: "Transaksi Gratis", href: "/dashboard/user/transaction/free" },
      { label: "Transaksi Berbayar", href: "/dashboard/user/transaction/paid" },
      { label: "Belum Dibayar", href: "/dashboard/user/transaction/unpaid" },
      { label: "Dikirim", href: "/dashboard/user/transaction/shipped" },
      { label: "Dibatalkan", href: "/dashboard/user/transaction/cancelled" },
      { label: "Selesai", href: "/dashboard/user/transaction/completed" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/user/profile",
    subItems: [
      { label: "Profile", href: "/dashboard/user/profile" },
      { label: "Alamat", href: "/dashboard/user/profile/address" },
      { label: "Security", href: "/dashboard/user/profile/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
