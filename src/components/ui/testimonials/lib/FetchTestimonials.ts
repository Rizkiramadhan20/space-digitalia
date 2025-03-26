import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { TestimonialProps } from "@/components/ui/testimonials/types/schema";

export function FetchTestimonials(
  callback: (testimonials: TestimonialProps[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIALS as string),
    where("createdAt", "!=", ""),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
      })) as TestimonialProps[]
    );
  });
}
