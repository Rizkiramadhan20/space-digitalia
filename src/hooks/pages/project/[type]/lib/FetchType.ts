import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ProjectType } from "@/components/ui/project/lib/schema";

export const FetchProjectType = (
  typeCategory: string,
  callback: (projects: ProjectType[]) => void
) => {
  const projectsRef = collection(
    db,
    process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT!
  );

  const q = query(projectsRef, where("typeCategory", "==", typeCategory));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectType[];

    callback(projects);
  });

  return unsubscribe;
};
