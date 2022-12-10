import { Splide } from "@splidejs/react-splide";
import { Expo, gsap } from "gsap";
import { MutableRefObject, useLayoutEffect, useMemo, useState } from "react";

export function useProjectsAnimation(
  currentSection: number,
  sectionPlaying: boolean,
  splideRef: MutableRefObject<Splide>,
  mainContainerRef: MutableRefObject<HTMLDivElement>
) {
  const [playScene, setPlayScene] = useState(false);

  const play = useMemo(() => {
    return sectionPlaying && currentSection === 1;
  }, [currentSection, sectionPlaying]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reset
      if (!play) {
        gsap.set("h2 span[data-anim]", {
          y: "100%",
        });

        setPlayScene(false);

        return;
      }

      // Play
      gsap.fromTo(
        "h2 span[data-anim]",
        {
          y: "95%",
        },
        {
          duration: 1,
          stagger: 0.3,
          ease: Expo.easeInOut,
          y: 0,
        }
      );

      gsap.delayedCall(0.5, () => setPlayScene(true));
    }, mainContainerRef);

    const splide = splideRef.current?.splide;

    if (splide) {
      splide.go(0);
      splide.refresh();
    }

    return () => ctx.revert();
  }, [play]);

  return { playScene };
}
