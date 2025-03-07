import { Metadata } from "next";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { ProjectType } from "@/components/ui/project/lib/schema";

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function getProject(typeTitle: string): Promise<ProjectType | null> {
  if (!typeTitle || typeof typeTitle !== "string") {
    console.warn("Invalid typeTitle:", typeTitle);
    return null;
  }

  try {
    const normalizedTitle = typeTitle.replace(/-/g, " ").toLowerCase().trim();
    const projectRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string
    );
    const q = query(projectRef, where("typeTitle", "==", normalizedTitle));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const projectData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as ProjectType),
      createdAt: doc.data().createdAt?.toDate?.().toISOString(),
    })) as ProjectType[];
    return projectData[0];
  } catch (error) {
    console.error("Error fetching Project:", error);
    return null;
  }
}

export async function getProjectMetadata({
  params,
}: {
  params: { typeTitle: string };
}): Promise<Metadata> {
  const project = await getProject(params.typeTitle);
  const TitleDisplay = project ? capitalizeWords(project.typeTitle) : "";
  const title = project ? `Projects - ${TitleDisplay}` : "Projects Not Found";
  const description = project
    ? `Explore our collection of ${TitleDisplay} projects. Find templates, tools, and resources for your next project.`
    : "Discover our diverse collection of projects and resources";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project?.imageUrl
        ? [
            {
              url: project.imageUrl,
              width: 1200,
              height: 630,
              alt: `${TitleDisplay} Projects`,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project?.imageUrl ? [project.imageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/project/${params.typeTitle}`,
    },
  };
}
