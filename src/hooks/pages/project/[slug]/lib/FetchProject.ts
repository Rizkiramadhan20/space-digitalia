import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { ProjectType } from "@/components/ui/project/types/project";

export function FetchProjectDetails(
  slug: string,
  callback: (project: ProjectType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string),
    where("slug", "==", slug)
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString(),
      })) as ProjectType[]
    );
  });
}

export function FetchRelatedProject(
  slug: string,
  callback: (project: ProjectType[]) => void
) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string),
    orderBy("createdAt", "desc"),
    limit(7)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    })) as ProjectType[];

    const filteredProjects = projects
      .filter((project) => project.slug !== slug)
      .slice(0, 6);

    callback(filteredProjects);
  });

  return unsubscribe;
}
