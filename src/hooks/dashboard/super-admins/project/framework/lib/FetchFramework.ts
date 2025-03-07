import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { FrameworkContent } from "./schema";

export const useFrameworkOperations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [frameworks, setFrameworks] = useState<FrameworkContent[]>([]);

  const fetchFrameworks = async () => {
    try {
      // Fetch frameworks
      const frameworksSnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_FRAMEWORK_PROJECT as string
        )
      );

      // Fetch categories
      const categoriesSnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string
        )
      );

      // Create categories map for quick lookup
      const categoriesMap = new Map();
      categoriesSnapshot.docs.forEach((doc) => {
        categoriesMap.set(doc.id, doc.data().title);
      });

      // Combine framework data with category titles
      const frameworkArray = frameworksSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          categoryTitle: categoriesMap.get(data.categoryId), // Add category title
        } as FrameworkContent;
      });

      const sortedFrameworks = frameworkArray.sort((a, b) => {
        const dateA = a.createdAt?.toDate() || new Date(0);
        const dateB = b.createdAt?.toDate() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setFrameworks(sortedFrameworks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching frameworks:", error);
      setIsLoading(false);
    }
  };

  const createFramework = async (
    formData: FrameworkContent,
    imageFile: File
  ) => {
    try {
      // Get category title first
      const categoryDoc = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string
        )
      );
      let categoryTitle = "";
      categoryDoc.docs.forEach((doc) => {
        if (doc.id === formData.categoryId) {
          categoryTitle = doc.data().title;
        }
      });

      // Compress image first
      const compressedImage = await compressImage(imageFile);

      // Convert compressed image to base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(compressedImage);
      });
      const base64Image = await base64Promise;

      // Upload to ImageKit
      const uploadResponse = await imagekitInstance.upload({
        file: base64Image as string,
        fileName: `framework_${Date.now()}`,
        folder: "/frameworks",
      });

      // Create framework document with image details and category title
      await addDoc(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_FRAMEWORK_PROJECT as string
        ),
        {
          title: formData.title,
          categoryId: formData.categoryId,
          categoryTitle: categoryTitle,
          imageUrl: uploadResponse.url,
          createdAt: new Date(),
        }
      );

      await fetchFrameworks();
      toast.success("Framework created successfully!");
    } catch (error) {
      console.error("Error creating framework:", error);
      toast.error("Failed to create framework. Please try again.");
    }
  };

  const updateFramework = async (
    id: string,
    formData: FrameworkContent,
    imageFile?: File
  ) => {
    try {
      // Get category title first
      const categoryDoc = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string
        )
      );
      let categoryTitle = "";
      categoryDoc.docs.forEach((doc) => {
        if (doc.id === formData.categoryId) {
          categoryTitle = doc.data().title;
        }
      });

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_FRAMEWORK_PROJECT as string,
        id
      );

      const updateData: Partial<FrameworkContent> = {
        title: formData.title,
        categoryId: formData.categoryId,
        categoryTitle: categoryTitle,
        updatedAt: serverTimestamp() as Timestamp,
      };

      if (imageFile) {
        // Compress and upload new image
        const compressedImage = await compressImage(imageFile);

        // Convert to base64
        const reader = new FileReader();
        const base64Promise = new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(compressedImage);
        });
        const base64Image = await base64Promise;

        // Upload to ImageKit
        const uploadResponse = await imagekitInstance.upload({
          file: base64Image as string,
          fileName: `framework_${Date.now()}`,
          folder: "/frameworks",
        });

        updateData.imageUrl = uploadResponse.url;
      }

      await updateDoc(docRef, updateData);
      await fetchFrameworks();
      toast.success("Framework updated successfully!");
    } catch (error) {
      console.error("Error updating framework:", error);
      toast.error("Failed to update framework. Please try again.");
    }
  };

  const deleteFramework = async (id: string) => {
    try {
      // Delete framework document
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_FRAMEWORK_PROJECT as string,
        id
      );
      await deleteDoc(docRef);
      await fetchFrameworks();
      toast.success("Framework deleted successfully!");
    } catch (error) {
      console.error("Error deleting framework:", error);
      toast.error("Failed to delete framework. Please try again.");
    }
  };

  return {
    isLoading,
    frameworks,
    fetchFrameworks,
    createFramework,
    updateFramework,
    deleteFramework,
  };
};
