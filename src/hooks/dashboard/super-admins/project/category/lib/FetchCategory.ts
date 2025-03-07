import { db } from "@/utils/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { CategoryContent } from "@/hooks/dashboard/super-admins/project/category/lib/schema";

const COLLECTION_NAME = process.env
  .NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string;

export const categoryService = {
  fetchCategories: async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CategoryContent[];
  },

  createCategory: async (data: CategoryContent) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
  },

  updateCategory: async (id: string, data: CategoryContent) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  deleteCategory: async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  },
};
