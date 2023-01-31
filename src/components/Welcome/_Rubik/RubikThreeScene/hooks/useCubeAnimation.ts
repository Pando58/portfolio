import { useFrame, useThree } from "@react-three/fiber";
import { Expo, gsap } from "gsap";
import { MutableRefObject, useEffect, useLayoutEffect, useState } from "react";
import { Group, Mesh } from "three";

export function useCubeAnimation(
  play: boolean,
  introAnimRef: MutableRefObject<Group>,
  spinRef: MutableRefObject<Group>,
  cubeRef: MutableRefObject<Mesh>
) {
  const threeState = useThree((state) => state.get);

  // Intro animation
  useLayoutEffect(() => {
    if (!play) return;

    const ctx = gsap.context(() => {
      gsap.to(introAnimRef.current.scale, {
        duration: 2,
        ease: Expo.easeOut,
        x: 1,
        y: 1,
        z: 1,
      });

      gsap.to(introAnimRef.current.rotation, {
        duration: 2,
        ease: Expo.easeOut,
        y: 0,
      });
    });

    return () => ctx.revert();
  }, [play]);

  // Make cube size responsive
  useEffect(() => {
    const updateCube = () => {
      const state = threeState();

      const w = state.size.width;

      cubeRef.current.scale.setScalar(
        w >= 1570 //
          ? 0.7
          : w >= 768
          ? 0.9
          : w >= 550
          ? 1.3
          : 2
      );
    };

    updateCube();
    addEventListener("resize", updateCube);

    return () => {
      removeEventListener("resize", updateCube);
    };
  }, []);

  // Main cube animation
  const [spinCounter, setSpinCounter] = useState(0);

  useFrame(() => {
    const spn = spinRef.current;

    spn.rotateY(-0.006);
    spn.position.y = Math.cos(spinCounter / 32) / 24;

    setSpinCounter((i) => i + 1);
  });
}
