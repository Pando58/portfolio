import { gsap, Power4 } from "gsap";
import { MutableRefObject, useLayoutEffect, useMemo, useState } from "react";

export function useWelcomeAnimation(
  currentSection: number,
  sectionPlaying: boolean,
  titlesContainer: MutableRefObject<HTMLDivElement>
) {
  const [playRubik, setPlayRubik] = useState(false);

  const play = useMemo(() => {
    return sectionPlaying && currentSection === 0;
  }, [currentSection, sectionPlaying]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reset animations if not playing
      if (!play) {
        gsap.set("span", {
          y: "95%",
        });

        setPlayRubik(false);

        return;
      }

      // Main animation
      gsap.fromTo(
        "span",
        {
          y: "95%",
        },
        {
          duration: 1,
          stagger: 0.2,
          ease: Power4.easeInOut,
          y: 0,
        }
      );

      gsap.delayedCall(0.7, () => setPlayRubik(true));
    }, titlesContainer);

    return () => ctx.revert();
  }, [play]);

  return {
    playRubik,
  };
}
