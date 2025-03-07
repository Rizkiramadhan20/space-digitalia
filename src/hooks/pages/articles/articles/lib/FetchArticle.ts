import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ArticleType } from "@/components/ui/article/lib/schema";

export function FetchArticle(callback: (article: ArticleType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string),
    where("status", "==", "published")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
      })) as ArticleType[]
    );
  });
}
