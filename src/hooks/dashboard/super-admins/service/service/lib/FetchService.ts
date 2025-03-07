import { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import imagekitInstance from "@/utils/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { toast } from "react-hot-toast";

import {
  ServiceContent,
  ServiceFormData,
} from "@/hooks/dashboard/super-admins/service/service/lib/schema";

export function useServices() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SERVICES_CONTENT!)
      );
      const serviceList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ServiceContent[];
      setServices(serviceList);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveService = async (formData: ServiceFormData, serviceId?: string) => {
    setLoading(true);
    try {
      let imageUrl = serviceId
        ? services.find((s) => s.id === serviceId)?.imageUrl
        : undefined;

      if (formData.image) {
        const compressedFile = await compressImage(formData.image);
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(compressedFile);
        });

        const uploadResponse = await imagekitInstance.upload({
          file: base64,
          fileName: `service-content-${Date.now()}`,
          folder: "/services/content",
        });

        imageUrl = uploadResponse.url;
      }

      if (!imageUrl && !serviceId) {
        throw new Error("Image is required for new services");
      }

      const serviceData = {
        imageUrl,
        title: formData.title,
        description: formData.description,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        ...(serviceId ? { updatedAt: new Date() } : { createdAt: new Date() }),
      };

      if (serviceId) {
        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_SERVICES_CONTENT!,
            serviceId
          ),
          serviceData
        );
        toast.success("Service updated successfully!");
      } else {
        await addDoc(
          collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SERVICES_CONTENT!),
          serviceData
        );
        toast.success("Service added successfully!");
      }

      await fetchServices();
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save service"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    setDeleteLoading(true);
    try {
      await deleteDoc(
        doc(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_SERVICES_CONTENT!,
          serviceId
        )
      );
      toast.success("Service deleted successfully!");
      await fetchServices();
      return true;
    } catch {
      toast.error("Failed to delete service");
      return false;
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    isLoading,
    loading,
    deleteLoading,
    saveService,
    deleteService,
  };
}
