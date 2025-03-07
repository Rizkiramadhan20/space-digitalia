import { useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { toast } from "react-hot-toast";

import { LicenceContent } from "@/hooks/dashboard/super-admins/project/license/lib/schema";

export const useLicenceOperations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [licences, setLicences] = useState<LicenceContent[]>([]);

  const fetchLicences = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_LICENSE_PROJECT as string
        )
      );
      const licenceArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LicenceContent[];

      const sortedLicences = licenceArray.sort((a, b) => {
        const dateA = a.createdAt?.toDate() || new Date(0);
        const dateB = b.createdAt?.toDate() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      setLicences(sortedLicences);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching licences:", error);
      setIsLoading(false);
    }
  };

  const createLicence = async (formData: LicenceContent) => {
    await addDoc(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_LICENSE_PROJECT as string
      ),
      {
        ...formData,
        createdAt: new Date(),
      }
    );
    toast.success("Licence created successfully!");
  };

  const updateLicence = async (id: string, updatedData: LicenceContent) => {
    const docRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_LICENSE_PROJECT as string,
      id
    );
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
    toast.success("Licence updated successfully!");
  };

  const deleteLicence = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_LICENSE_PROJECT as string,
        id
      );
      await deleteDoc(docRef);
      await fetchLicences();
      toast.success("Licence deleted successfully!");
    } catch (error) {
      console.error("Error deleting licence:", error);
      toast.error("Failed to delete licence. Please try again.");
    }
  };

  return {
    isLoading,
    licences,
    fetchLicences,
    createLicence,
    updateLicence,
    deleteLicence,
  };
};
