import { projectList, ProjectProps } from "@/data/projectList";
import { useCallback, useState } from "react";

export function useSelectedProject() {
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

  return {
    selectedProject,
    selectedProjectIndex,
    lastSelectedProject,
    selectProject,
  };
}
