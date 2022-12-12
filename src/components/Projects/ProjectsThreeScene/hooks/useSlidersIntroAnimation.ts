import { Expo, gsap } from "gsap";
import { MutableRefObject, useLayoutEffect } from "react";
import { Mesh } from "three";

export function useSlidersIntroAnimation(
  play: boolean,
  slideMeshes: MutableRefObject<Mesh[]>
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scales = slideMeshes.current.map((i) => i.scale);

      gsap.set(scales, {
        x: 0,
        y: 0,
        z: 0,
      });

      if (!play) return;

      gsap.to(scales, {
        duration: 1,
        ease: Expo.easeOut,
        x: 1,
        y: 1,
        z: 1,
      });
    });

    return () => ctx.revert();
  }, [play]);
}
