import { useResponsiveCameraFOV } from "@/components/hooks/useResponsiveCameraFOV";
import { PerspectiveCamera } from "@react-three/drei";
import { Expo, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Mesh } from "three";

function ProjectsThreeScene({ play }: { play: boolean }) {
  const example = useRef<Mesh>(null!);

  useResponsiveCameraFOV(40, 30);

  useLayoutEffect(() => {
    if (!play) return;

    const ctx = gsap.context(() => {
      gsap.to(example.current.scale, {
        duration: 1,
        ease: Expo.easeOut,
        x: 1,
        y: 1,
        z: 1,
      });
    });

    return () => ctx.revert();
  }, [play]);

  return (
    <>
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 4]} />
      <mesh ref={example} scale={0}>
        <boxGeometry args={[1.6, 1.2, 0.05]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}

export default ProjectsThreeScene;
