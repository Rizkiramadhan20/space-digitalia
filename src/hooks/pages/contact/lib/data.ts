import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

import * as z from "zod";

export const socialMedia = [
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/spacedigitalia?igsh=MWhucmN5bXl1YnViZQ==",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    link: "https://www.facebook.com/profile.php?id=61573748215102&mibextid=ZbWKwL",
  },
  {
    name: "Tiktok",
    icon: FaTiktok,
    link: "https://www.tiktok.com/@spacedigitalia?_t=ZS-8uKNO1JcPod&_r=1",
  },
];

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z
    .string()
    .email("Format email tidak valid"),
  phoneNumber: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .regex(/^[+]?[\d\s-]+$/, "Format nomor telepon tidak valid"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(1000, "Pesan maksimal 1000 karakter"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
