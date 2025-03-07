import { Metadata } from "next";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { ProjectType } from "@/components/ui/project/lib/schema";

async function getProject(): Promise<ProjectType | null> {
  try {
    const projectRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string
    );
    const q = query(projectRef, where("createdAt", "!=", ""));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const projectData = querySnapshot.docs[0].data() as ProjectType;
    return projectData;
  } catch (error) {
    console.error("Error fetching Project:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const project = await getProject();

  return {
    title: project ? `Project - ${project.typeCategory}` : "Project Not Found",
    description: project?.description || "Project description not available",
    openGraph: {
      title: project
        ? `Project - ${project.typeCategory}`
        : "Project Not Found",
      description: project?.description || "Project description not available",
      images: project?.imageUrl ? [project.imageUrl[0]] : [],
    },
  };
}
