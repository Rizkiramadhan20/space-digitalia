import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ServicesContent } from "@/hooks/pages/services/serviceContent/lib/schema";

export function FetchServicesContent(
  callback: (servicesContent: ServicesContent[]) => void
) {
  const q = query(
    collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_SERVICES_CONTENT as string
    ),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ServicesContent[]
    );
  });
}
