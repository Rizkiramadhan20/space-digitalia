import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { StatusProjectContent } from "@/hooks/dashboard/super-admins/project/status/lib/schema";

const COLLECTION_NAME = process.env
  .NEXT_PUBLIC_COLLECTIONS_STATUS_PROJECT as string;

export const statusProjectService = {
  fetchStatusProject: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StatusProjectContent[];
  },

  createStatusProject: async (data: StatusProjectContent) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
  },

  updateStatusProject: async (id: string, data: StatusProjectContent) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  deleteStatusProject: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },
};
