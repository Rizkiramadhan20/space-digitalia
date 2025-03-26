import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { CompanyType } from "@/components/ui/company/types/company";

export function FetchCompany(callback: (company: CompanyType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_COMPANY as string),
    where("createdAt", "!=", "")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
      })) as CompanyType[]
    );
  });
}
