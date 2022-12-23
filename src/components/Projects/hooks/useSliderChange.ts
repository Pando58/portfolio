import { projectList } from "@/data/projectList";
import { useMemo, useState } from "react";

export function useSliderChange() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const activeProject = useMemo(() => {
    return projectList[sliderIndex];
  }, [sliderIndex]);

  function onSliderChange(index: number) {
    setSliderIndex(index);
  }

  return { sliderIndex, activeProject, onSliderChange };
}
