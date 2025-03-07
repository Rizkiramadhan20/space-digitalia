import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { Testimonial } from "@/hooks/dashboard/super-admins/layout/testimonials/lib/schema";

import imagekitInstance from "@/utils/imagekit";

const COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIALS!;

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const testimonialService = {
  // Create
  async create(testimonial: Omit<Testimonial, "id">, imageFile: File) {
    try {
      const base64File = await convertFileToBase64(imageFile);
      const uploadResponse = await imagekitInstance.upload({
        file: base64File,
        fileName: `testimonial-${Date.now()}`,
        folder: "/testimonials",
      });

      const newTestimonial = {
        ...testimonial,
        imageUrl: uploadResponse.url,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(
        collection(db, COLLECTION_NAME),
        newTestimonial
      );
      return { id: docRef.id, ...newTestimonial };
    } catch {
      throw new Error("Failed to create testimonial");
    }
  },

  // Read
  async getAll(): Promise<Testimonial[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
    } catch {
      throw new Error("Failed to fetch testimonials");
    }
  },

  // Update
  async update(
    id: string,
    testimonial: Partial<Testimonial>,
    newImageFile?: File
  ) {
    try {
      const updateData = { ...testimonial };

      if (newImageFile) {
        const base64File = await convertFileToBase64(newImageFile);
        const uploadResponse = await imagekitInstance.upload({
          file: base64File,
          fileName: `testimonial-${Date.now()}`,
          folder: "/testimonials",
        });
        updateData.imageUrl = uploadResponse.url;
      }

      await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
      return { id, ...updateData };
    } catch {
      throw new Error("Failed to update testimonial");
    }
  },

  // Delete
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch {
      throw new Error("Failed to delete testimonial");
    }
  },
};
