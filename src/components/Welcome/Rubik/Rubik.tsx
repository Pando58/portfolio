import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Expo, gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Group, Mesh } from "three";

function Rubik({ play }: { play: boolean }) {
  return (
    <div className="absolute w-full h-full md:z-10">
      <Canvas>
        <CameraConfig />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube play={play} />
      </Canvas>
    </div>
  );
}

export default Rubik;

function Cube({ play }: { play: boolean }) {
  const threeState = useThree((state) => state.get);
  const introAnim = useRef<Group>(null!);
  const spin = useRef<Group>(null!);
  const cube = useRef<Mesh>(null!);

  // Intro animation
  useLayoutEffect(() => {
    if (!play) return;

    const ctx = gsap.context(() => {
      gsap.to(
        introAnim.current.scale,

        {
          duration: 2,
          ease: Expo.easeOut,
          x: 1,
          y: 1,
          z: 1,
        }
      );

      gsap.to(introAnim.current.rotation, {
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
      const w = threeState().size.width;

      cube.current.scale.setScalar(
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
    const spn = spin.current;

    spn.rotateY(-0.006);
    spn.position.y = Math.cos(spinCounter / 32) / 24;

    setSpinCounter((i) => i + 1);
  });

  return (
    <group ref={introAnim} scale={0} rotation={[0, Math.PI * 4, 0]}>
      <group ref={spin}>
        <mesh ref={cube} rotation={[(54.74 * Math.PI) / 180, Math.PI / 4, 0]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </group>
    </group>
  );
}

function CameraConfig() {
  const threeState = useThree((state) => state.get);

  // Make camera offset responsive
  useEffect(() => {
    const updateCamera = () => {
      const camera = threeState().camera;
      const { width: w, height: h } = threeState().size;

      // Adjust camera FOV using width instead of height
      if ("fov" in camera) {
        camera.aspect = w / h;

        const hfov = 40;

        camera.fov =
          (Math.atan(Math.tan((hfov * Math.PI) / 360) / camera.aspect) * 360) /
          Math.PI;

        camera.updateProjectionMatrix();
      }

      // View offset
      const offset =
        w >= 2000 //
          ? 0.15
          : w >= 1570
          ? 0.2
          : w >= 768
          ? 0.25
          : 0;

      camera.setViewOffset(w, h, -w * offset, 0, w, h);
    };

    updateCamera();
    addEventListener("resize", updateCamera);

    return () => {
      removeEventListener("resize", updateCamera);
    };
  }, []);

  return <></>;
}
