import { useResponsiveCameraFOV } from "@/components/hooks/useResponsiveCameraFOV";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { useCubeAnimation } from "./hooks/useCubeAnimation";
import { useResponsiveCameraOffset } from "./hooks/useResponsiveCameraOffset";

function WelcomeThreeScene({ play }: { play: boolean }) {
  const introAnimRef = useRef<Group>(null!);
  const spinRef = useRef<Group>(null!);
  const cubeRef = useRef<Mesh>(null!);

  useResponsiveCameraFOV(40, 20);
  useResponsiveCameraOffset();
  useCubeAnimation(play, introAnimRef, spinRef, cubeRef);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group ref={introAnimRef} scale={0} rotation={[0, Math.PI * 4, 0]}>
        <group ref={spinRef}>
          <mesh
            ref={cubeRef}
            rotation={[(54.74 * Math.PI) / 180, Math.PI / 4, 0]}
          >
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default WelcomeThreeScene;
