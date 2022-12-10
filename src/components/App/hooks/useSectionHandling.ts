import { sections } from "@/data/sectionRoutes";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useSectionHandling() {
  const pathSection = useMemo(() => {
    const secs = [...sections];

    return secs.find((i) => i[1].path === location.pathname) || secs[0];
  }, []);

  const [currentSectionId, setCurrentSectionId] = useState(pathSection[0]);

  const currentSection = useMemo(() => {
    return (sections.get(currentSectionId) || sections.get(0))!;
  }, [currentSectionId]);

  const [sectionPlaying, setSectionPlaying] = useState(false);
  const [transitionPlaying, setTransitionPlaying] = useState(false);

  function onHistoryChange() {
    setTransitionPlaying(true);
  }

  useEffect(() => {
    addEventListener("popstate", onHistoryChange);

    history.replaceState(
      {
        sec: pathSection[0],
        theme: pathSection[1].theme,
      },
      "",
      pathSection[1].path
    );

    switchSection();

    return () => {
      removeEventListener("popstate", onHistoryChange);
    };
  }, [pathSection]);

  const switchSection = useCallback(() => {
    setSectionPlaying(false);
    setCurrentSectionId(history.state.sec);
  }, []);

  const playSection = useCallback(() => {
    setSectionPlaying(true);
  }, []);

  const stopTransition = useCallback(() => {
    setTransitionPlaying(false);
  }, []);

  return {
    currentSectionId,
    currentSection,
    sectionPlaying,
    transitionPlaying,
    switchSection,
    playSection,
    stopTransition,
  };
}
