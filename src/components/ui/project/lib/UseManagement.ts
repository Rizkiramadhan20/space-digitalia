import { useState, useEffect } from "react";

import { ProjectType } from "@/components/ui/project/lib/schema";

import { FetchProject } from "@/components/ui/project/lib/FetchProject";

import gsap from "gsap";

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// Custom Hook untuk Project Data
export const useProjectData = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FetchProject((newProjects) => {
      setProjects(newProjects);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { projects, loading };
};

// Custom Hook untuk Animasi
export const useProjectAnimation = (
  leftColumnRef: React.RefObject<HTMLDivElement>,
  rightColumnRef: React.RefObject<HTMLDivElement>,
  leftTimelineRef: React.RefObject<gsap.core.Timeline | null>,
  rightTimelineRef: React.RefObject<gsap.core.Timeline | null>,
  projects: ProjectType[],
  isMobile: boolean
) => {
  useEffect(() => {
    if (!leftColumnRef.current || !rightColumnRef.current || !projects.length)
      return;

    gsap.set(rightColumnRef.current, { y: "-33.33%" });

    leftTimelineRef.current = gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: isMobile ? 30 : 60, ease: "none" },
      })
      .to(leftColumnRef.current, {
        y: "-33.33%",
      });

    rightTimelineRef.current = gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        defaults: { duration: isMobile ? 30 : 60, ease: "none" },
      })
      .to(rightColumnRef.current, {
        y: "0%",
      });

    return () => {
      leftTimelineRef.current?.kill();
      rightTimelineRef.current?.kill();
    };
  }, [
    projects,
    isMobile,
    leftColumnRef,
    rightColumnRef,
    leftTimelineRef,
    rightTimelineRef,
  ]);

  const handleMouseEnter = (timeline: gsap.core.Timeline | null) => {
    timeline?.pause();
  };

  const handleMouseLeave = (timeline: gsap.core.Timeline | null) => {
    timeline?.play();
  };

  return { handleMouseEnter, handleMouseLeave };
};

// Utility function untuk memproses project data
export const getProjectColumns = (
  projects: ProjectType[],
  isMobile: boolean
) => {
  const firstProjects = isMobile
    ? [
        ...projects.slice(0, 3),
        ...projects.slice(0, 3),
        ...projects.slice(0, 3),
      ]
    : [
        ...projects.slice(0, Math.ceil(projects.length / 2)),
        ...projects.slice(0, Math.ceil(projects.length / 2)),
        ...projects.slice(0, Math.ceil(projects.length / 2)),
      ];

  const secondProjects = isMobile
    ? [
        ...projects.slice(3, 6),
        ...projects.slice(3, 6),
        ...projects.slice(3, 6),
      ]
    : [
        ...projects.slice(Math.ceil(projects.length / 2)),
        ...projects.slice(Math.ceil(projects.length / 2)),
        ...projects.slice(Math.ceil(projects.length / 2)),
      ];

  return { firstProjects, secondProjects };
};
