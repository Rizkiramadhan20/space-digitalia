import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ArticleType } from "@/hooks/pages/articles/articles/lib/schema";

export function FetchArticleDetails(
  slug: string,
  callback: (article: ArticleType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string),
    where("slug", "==", slug)
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ArticleType[]
    );
  });
}

export function FetchRelatedArticles(
  slug: string,
  callback: (articles: ArticleType[]) => void
) {
  // Mengambil 4 artikel terbaru (1 artikel saat ini + 3 artikel terkait)
  const q = query(
    collection(db, "articles"),
    orderBy("createdAt", "desc"),
    limit(4)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    }));
    callback(articles as ArticleType[]);
  });

  return unsubscribe;
}
