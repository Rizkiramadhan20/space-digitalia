import { FiHome, FiSettings } from "react-icons/fi";

import { RiAdminFill, RiCustomerService2Fill } from "react-icons/ri";

import { GiCardboardBoxClosed } from "react-icons/gi";

import { GrArticle } from "react-icons/gr";

import { FiLayout } from "react-icons/fi";

import { FcAbout } from "react-icons/fc";

export const menuItems = [
  {
    icon: FiHome,
    label: "Dashboard",
    href: "/dashboard/super-admins",
  },

  {
    icon: FiLayout,
    label: "Layout",
    href: "/dashboard/super-admins/layout",
    subItems: [
      { label: "Home", href: "/dashboard/super-admins/layout/home" },

      {
        label: "Featured",
        href: "/dashboard/super-admins/layout/featured",
      },

      {
        label: "Service",
        href: "/dashboard/super-admins/layout/service",
      },

      {
        label: "Company",
        href: "/dashboard/super-admins/layout/company",
      },

      {
        label: "Testimonials",
        href: "/dashboard/super-admins/layout/testimonials",
      },
    ],
  },

  {
    icon: FcAbout,
    label: "About",
    href: "/dashboard/super-admins/about",
    subItems: [
      { label: "About", href: "/dashboard/super-admins/about" },

      {
        label: "Team",
        href: "/dashboard/super-admins/about/team",
      },
    ],
  },

  {
    icon: RiCustomerService2Fill,
    label: "Service",
    href: "/dashboard/super-admins/service",
    subItems: [
      { label: "Service", href: "/dashboard/super-admins/service" },

      {
        label: "Count Testimoni",
        href: "/dashboard/super-admins/service/count-testimonial",
      },
    ],
  },

  {
    icon: GiCardboardBoxClosed,
    label: "Project",
    href: "/dashboard/super-admins/project",
    subItems: [
      { label: "Daftar Project", href: "/dashboard/super-admins/project" },
      { label: "Category", href: "/dashboard/super-admins/project/category" },
      { label: "Type", href: "/dashboard/super-admins/project/type" },
      { label: "Licence", href: "/dashboard/super-admins/project/license" },
      { label: "Framework", href: "/dashboard/super-admins/project/framework" },
    ],
  },

  {
    icon: GrArticle,
    label: "Article",
    href: "/dashboard/super-admins/article",
    subItems: [
      { label: "Daftar Article", href: "/dashboard/super-admins/article" },
      { label: "Category", href: "/dashboard/super-admins/article/category" },
      { label: "Tags", href: "/dashboard/super-admins/article/tags" },
    ],
  },

  {
    icon: RiAdminFill,
    label: "Accounts",
    href: "/dashboard/super-admins/accounts",
    subItems: [
      { label: "Admins", href: "/dashboard/super-admins/accounts/admins" },
      { label: "User", href: "/dashboard/super-admins/accounts/user" },
    ],
  },

  {
    icon: FiSettings,
    label: "Pengaturan",
    href: "/dashboard/super-admins/settings",
    subItems: [
      { label: "Profile", href: "/dashboard/super-admins/settings/profile" },
      { label: "Security", href: "/dashboard/super-admins/settings/security" },
    ],
  },

  {
    icon: FiHome,
    label: "Home",
    href: "/",
  },
];
