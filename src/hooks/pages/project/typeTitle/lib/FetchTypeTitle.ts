import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ProjectType } from "@/components/ui/project/lib/schema";

export function FetchTypeTitle(
  typeTitle: string,
  callback: (project: ProjectType[]) => void
) {
  const normalizedTitle = typeTitle.replace(/-/g, " ").toLowerCase().trim();

  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string),
    where("typeTitle", "==", normalizedTitle)
  );

  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    })) as ProjectType[];

    callback(projects);
  });
}
