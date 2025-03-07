import { useState, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";

import {
  ServiceContent,
  ServiceFormData,
} from "@/hooks/dashboard/super-admins/layout/service/lib/service";

import { handleImageUpload } from "@/hooks/dashboard/super-admins/layout/service/lib/imageUtils";

export const useServiceData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<ServiceContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContents = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SERVICE as string)
      );
      const contentArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ServiceContent[];
      setContents(contentArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      toast.error("Failed to fetch contents");
      setIsLoading(false);
    }
  }, []);

  const createContent = async (
    formData: ServiceFormData,
    selectedImage: File | null,
    selectedProfileImage: File | null
  ) => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;
      let profileImageUrl = formData.profile.image;

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }
      if (selectedProfileImage) {
        profileImageUrl = await handleImageUpload(selectedProfileImage);
      }

      const updatedFormData = {
        ...formData,
        imageUrl: selectedImage ? imageUrl : formData.imageUrl,
        profile: {
          ...formData.profile,
          image: selectedProfileImage
            ? profileImageUrl
            : formData.profile.image,
        },
      };

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SERVICE as string),
        {
          ...updatedFormData,
          createdAt: new Date(),
        }
      );
      toast.success("Content created successfully!");
      await fetchContents();
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Failed to create content. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (
    id: string,
    formData: ServiceFormData,
    selectedImage: File | null,
    selectedProfileImage: File | null
  ) => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;
      let profileImageUrl = formData.profile.image;

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }
      if (selectedProfileImage) {
        profileImageUrl = await handleImageUpload(selectedProfileImage);
      }

      const updatedFormData = {
        ...formData,
        imageUrl: selectedImage ? imageUrl : formData.imageUrl,
        profile: {
          ...formData.profile,
          image: selectedProfileImage
            ? profileImageUrl
            : formData.profile.image,
        },
      };

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_SERVICE as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedFormData,
        updatedAt: new Date(),
      });
      toast.success("Content updated successfully!");
      await fetchContents();
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_SERVICE as string,
        id
      );
      await deleteDoc(docRef);
      await fetchContents();
      toast.success("Content deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content. Please try again.");
      return false;
    }
  };

  return {
    isLoading,
    contents,
    isSubmitting,
    createContent,
    updateContent,
    deleteContent,
    fetchContents,
  };
};
