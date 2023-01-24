import { projectList, ProjectProps } from "@/data/projectList";
import { useCallback, useLayoutEffect, useState } from "react";

export function useSelectedProject(play: boolean) {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const [lastSelectedProject, setLastSelectedProject] = useState<ProjectProps>(
    projectList[0]
  );

  const selectProject = useCallback((i: number) => {
    setSelectedProjectIndex(i);

    const proj: ProjectProps | undefined = projectList[i];

    setSelectedProject(proj);
    if (proj) setLastSelectedProject(proj);
  }, []);

  useLayoutEffect(() => {
    selectProject(-1);
  }, [play]);

  return {
    selectedProject,
    selectedProjectIndex,
    lastSelectedProject,
    selectProject,
  };
}
