import { useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { toast } from "react-hot-toast";

import {
  AboutImage,
  FormData,
} from "@/hooks/dashboard/super-admins/about/about/lib/schema";

import { UseAboutReturn } from "@/hooks/dashboard/super-admins/about/about/lib/schema";

export const useAbout = (): UseAboutReturn => {
  const [images, setImages] = useState<AboutImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AboutImage | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    text: "",
    description: "",
    image: null,
  });

  // Firebase Services
  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!)
      );
      const imageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AboutImage[];
      setImages(imageList.slice(0, 1)); // Only take the first item
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const compressedFile = await compressImage(file);
    const reader = new FileReader();

    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });

    const base64 = await base64Promise;

    const uploadResponse = await imagekitInstance.upload({
      file: base64,
      fileName: `about-${Date.now()}`,
      folder: "/about",
    });

    return uploadResponse.url;
  };

  // Handlers
  const handleEdit = (image: AboutImage) => {
    setIsEditing(true);
    setSelectedImage(image);
    setFormData({
      title: image.title,
      text: image.text,
      description: image.description,
      image: null,
    });
    (document.getElementById("about_modal") as HTMLDialogElement)?.showModal();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = selectedImage?.imageUrl;

      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      const contentData = {
        imageUrl,
        title: formData.title,
        text: formData.text,
        description: formData.description,
      };

      if (isEditing && selectedImage?.id) {
        await updateDoc(
          doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!, selectedImage.id),
          {
            ...contentData,
            updatedAt: new Date(),
          }
        );
        toast.success("Content updated successfully!");
      } else {
        const querySnapshot = await getDocs(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!)
        );

        if (!imageUrl) {
          toast.error("Please upload an image");
          setLoading(false);
          return;
        }

        if (querySnapshot.size > 0) {
          const firstDoc = querySnapshot.docs[0];
          await updateDoc(
            doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!, firstDoc.id),
            {
              ...contentData,
              updatedAt: new Date(),
            }
          );
        } else {
          await addDoc(
            collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!),
            {
              ...contentData,
              createdAt: new Date(),
            }
          );
        }
        toast.success("Content added successfully!");
      }

      await fetchImages();
      resetForm();
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", text: "", description: "", image: null });
    setIsEditing(false);
    setSelectedImage(null);
    (document.getElementById("about_modal") as HTMLDialogElement)?.close();
  };

  const handleDeleteImage = (imageId: string) => {
    setImageToDelete(imageId);
    (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ABOUT!, imageToDelete)
      );
      toast.success("Content deleted successfully!");
      await fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete content");
    } finally {
      setDeleteLoading(false);
      setImageToDelete(null);
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    }
  };

  return {
    // States
    images,
    loading,
    isLoading,
    isEditing,
    selectedImage,
    imageToDelete,
    deleteLoading,
    formData,

    // State setters
    setIsEditing,
    setSelectedImage,
    setImageToDelete,
    setFormData,

    // Methods
    fetchImages,
    handleEdit,
    handleFormSubmit,
    handleDeleteImage,
    confirmDelete,
  };
};
