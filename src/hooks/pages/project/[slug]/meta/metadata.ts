import { Metadata } from "next";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export interface Project {
  title: string;
  description: string;
  imageUrl: string[];
  slug: string;
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const projectRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string
    );
    const q = query(projectRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const projectData = querySnapshot.docs[0].data() as Project;
    return projectData;
  } catch (error) {
    console.error("Error fetching Project:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);

  return {
    title: project ? `Project - ${project.title}` : "Project Not Found",
    description: project?.description || "Project description not available",
    openGraph: {
      title: project ? `Project - ${project.title}` : "Project Not Found",
      description: project?.description || "Project description not available",
      images: project?.imageUrl ? [project.imageUrl[0]] : [],
    },
  };
}
