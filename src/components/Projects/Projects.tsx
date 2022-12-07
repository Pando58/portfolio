import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, PerspectiveCamera as ThreePerspectiveCamera } from "three";

function Projects({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  return (
    <section
      className="absolute inset-0 bg-zinc-300"
      style={{
        display: currentSection === 1 ? "block" : "none",
      }}
    >
      <div className="absolute inset-0">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-zinc-600 text-4xl mt-16 text-center font-sans-semiexpanded">
            PROJECTS
          </h2>
        </div>

        <div
          className="relative"
          style={{
            paddingBottom: "min(45%, 60vh)" /* Simulate 3d scene spacing */,
          }}
        >
          {/*  */}
        </div>

        <div className="flex-1">
          <h2 className="text-zinc-800 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-12 text-center">
            Osmium
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Projects;

function Scene() {
  const threeState = useThree((state) => state.get);
  const cameraRef = useRef<ThreePerspectiveCamera>(null!);
  const example = useRef<Mesh>(null!);

  useEffect(() => {
    const updateCamera = () => {
      const camera = cameraRef.current;
      const { width: w, height: h } = threeState().size;

      // Adjust camera FOV using width and height
      if ("fov" in camera) {
        camera.aspect = w / h;

        const hfov = 40;
        const minFov = 30;

        camera.fov = Math.max(
          minFov,
          (Math.atan(Math.tan((hfov * Math.PI) / 360) / camera.aspect) * 360) /
            Math.PI
        );

        camera.updateProjectionMatrix();
      }
    };

    updateCamera();
    addEventListener("resize", updateCamera);

    return () => {
      removeEventListener("resize", updateCamera);
    };
  }, []);

  const [count, setCount] = useState(0);

  useFrame(() => {
    example.current.rotation.y = Math.cos(count * 0.03) * 0.4;

    setCount((i) => i + 1);
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={40}
        position={[0, 0, 4]}
      />
      <mesh rotation={[0, 0, 0]} ref={example}>
        <boxGeometry args={[1.6, 1.2, 0.05]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
