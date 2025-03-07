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
    .min(2, "Nama harus terdiri dari setidaknya 2 karakter")
    .max(50, "Nama harus kurang dari 50 karakter"),
  email: z.string().email("Silakan masukkan alamat email yang valid"),
  message: z
    .string()
    .min(10, "Pesan harus terdiri dari setidaknya 10 karakter")
    .max(1000, "Pesan harus kurang dari 1000 karakter"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
