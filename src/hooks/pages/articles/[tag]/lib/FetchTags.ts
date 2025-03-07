import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ArticleType } from "@/hooks/pages/articles/articles/lib/schema";

// Definisikan tipe data untuk artikel
export const fetchArticlesByTag = async (
  tag: string
): Promise<ArticleType[]> => {
  try {
    const q = query(
      collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string),
      where("tags", "array-contains", tag)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as ArticleType[];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
