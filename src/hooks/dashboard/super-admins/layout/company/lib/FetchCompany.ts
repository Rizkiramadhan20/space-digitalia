import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { CompanyContent } from "@/hooks/dashboard/super-admins/layout/company/lib/company";

export function useCompany() {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<CompanyContent[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<CompanyContent>({ imageUrl: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_COMPANY as string)
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CompanyContent[];
      setContents(contentArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();

      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });

      const base64 = await base64Promise;
      const result = await imagekitInstance.upload({
        file: base64,
        fileName: `company${Date.now()}`,
        folder: "/company",
      });

      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const resetForm = () => {
    setFormData({ imageUrl: "" });
    setSelectedImage(null);
    setImagePreview(null);
    setIsEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;
      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }

      if (isEditMode && formData.id) {
        const docRef = doc(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_COMPANY as string,
          formData.id
        );
        await updateDoc(docRef, {
          imageUrl,
          updatedAt: new Date(),
        });
        toast.success("Image updated successfully!");
      } else {
        await addDoc(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_COMPANY as string),
          {
            imageUrl,
            createdAt: new Date(),
          }
        );
        toast.success("Image uploaded successfully!");
      }

      resetForm();
      fetchContents();

      const modal = document.getElementById(
        "content_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
    } catch (error) {
      console.error("Error submitting content:", error);
      toast.error(
        isEditMode
          ? "Failed to update image. Please try again."
          : "Failed to upload image. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_COMPANY as string,
        id
      );
      await deleteDoc(docRef);
      fetchContents();
      toast.success("Image deleted successfully!");
      const deleteModal = document.getElementById(
        "delete_modal"
      ) as HTMLDialogElement | null;
      deleteModal?.close();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedImage));
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [selectedImage, imagePreview]);

  return {
    isLoading,
    contents,
    selectedImage,
    formData,
    isSubmitting,
    deleteId,
    imagePreview,
    isEditMode,
    handleSubmit,
    handleDelete,
    handleFileChange,
    resetForm,
    setDeleteId,
    setFormData,
    setIsEditMode,
    setImagePreview,
  };
}
