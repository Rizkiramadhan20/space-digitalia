import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { TestimonialCount } from "@/hooks/pages/services/testimonialCount/lib/schema";

export function FetchTestimonialCount(
  callback: (TestimonialCount: TestimonialCount[]) => void
) {
  const q = query(
    collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_TESTIMONIAL_COUNT as string
    ),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as TestimonialCount[]
    );
  });
}
