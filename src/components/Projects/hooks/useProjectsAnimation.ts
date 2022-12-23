import { Splide } from "@splidejs/react-splide";
import { Expo, gsap } from "gsap";
import { MutableRefObject, useLayoutEffect, useMemo, useState } from "react";

export function useProjectsAnimation(
  currentSection: number,
  sectionPlaying: boolean,
  splideRef: MutableRefObject<Splide>,
  mainContainerRef: MutableRefObject<HTMLDivElement>
) {
  const [playThreeScene, setPlayThreeScene] = useState(false);

  const play = useMemo(() => {
    return sectionPlaying && currentSection === 1;
  }, [currentSection, sectionPlaying]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reset
      if (!play) {
        setPlayThreeScene(false);

        return;
      }

      // Play

      gsap.set("h2 span[data-anim-first]", {
        y: "-100%",
      });

      gsap.fromTo(
        "h2 span[data-anim-intro]",
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

      gsap.delayedCall(0.5, () => setPlayThreeScene(true));
    }, mainContainerRef);

    const splide = splideRef.current?.splide;

    if (splide) {
      splide.go(0);
      splide.refresh();
    }

    return () => ctx.revert();
  }, [play]);

  return { play, playThreeScene };
}
