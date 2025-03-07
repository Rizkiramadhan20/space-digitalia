import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import {
  TypeContent,
  TypeFormData,
} from "@/hooks/dashboard/super-admins/project/type/lib/schema";

export const typeService = {
  fetchCategories: async () => {
    const querySnapshot = await getDocs(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORY_PROJECT as string
      )
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  fetchTypes: async (pageSize: number, page: number) => {
    const typeCollectionRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TYPE_PROJECT as string
    );

    // First get total count
    const totalSnapshot = await getDocs(typeCollectionRef);
    const totalCount = totalSnapshot.size;

    // Get all documents up to the end of the requested page
    const limitSize = (page + 1) * pageSize;

    const typeQuery = query(
      typeCollectionRef,
      orderBy("createdAt", "desc"),
      limit(limitSize)
    );

    const querySnapshot = await getDocs(typeQuery);
    const allDocs = querySnapshot.docs;

    // Get only the documents for the current page
    const startIndex = page * pageSize;
    const types = allDocs
      .slice(startIndex, startIndex + pageSize)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TypeContent[];

    return { types, totalCount };
  },

  createType: async (formData: TypeFormData) => {
    return await addDoc(
      collection(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_TYPE_PROJECT as string
      ),
      {
        ...formData,
        createdAt: new Date(),
      }
    );
  },

  updateType: async (id: string, updatedData: TypeContent) => {
    const docRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TYPE_PROJECT as string,
      id
    );
    return await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  },

  deleteType: async (id: string) => {
    const docRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TYPE_PROJECT as string,
      id
    );
    return await deleteDoc(docRef);
  },
};
