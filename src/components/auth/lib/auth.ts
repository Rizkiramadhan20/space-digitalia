import { z } from "zod";

//====== Sign In Schema ======//

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .trim(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

//====== Forgot Password Schema ======//

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

//====== Sign Up Schema ======//

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .trim(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters")
      .trim(),
    confirmPassword: z.string().min(1, "Please confirm your password").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

//====== Facebook Sign In Schema ======//

export const facebookSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
});

export type FacebookSignInFormData = z.infer<typeof facebookSignInSchema>;
