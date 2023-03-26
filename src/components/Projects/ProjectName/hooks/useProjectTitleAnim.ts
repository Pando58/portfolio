import { ProjectProps } from "@/data/projectList";
import { gsap, Power3 } from "gsap";
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

export function useProjectTitleAnim(
  activeProject: ProjectProps,
  containerRef: MutableRefObject<HTMLDivElement>,
  play: boolean
) {
  const tlRef = useRef<gsap.core.Timeline>();

  const [prevName, setPrevName] = useState<ProjectProps["name"]>({
    en: "",
    es: "",
  });
  const [activeName, setActiveName] = useState<ProjectProps["name"]>({
    en: "",
    es: "",
  });

  useLayoutEffect(() => {
    setPrevName(activeName);
    setActiveName(activeProject.name);

    const ctx = gsap.context(() => {
      if (!play) return; // Prevent animation conflict when playing intro

      tlRef.current = gsap.timeline({
        defaults: {
          ease: Power3.easeOut,
          duration: 0.4,
        },
      });

      const tl = tlRef.current;

      tl.fromTo(
        "[data-anim-second]", //
        { y: "100%" },
        { y: 0 },
        0
      );

      tl.fromTo(
        "[data-anim-first]", //
        { y: 0 },
        { y: "-100%" },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeProject]);

  return { prevName, activeName };
}
