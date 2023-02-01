import { useMouseScreenPosition } from "@/components/hooks/useMouseScreenPosition";
import { Bounds, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MutableRefObject, useMemo, useRef, useState } from "react";
import {
  PerspectiveCamera as ThreePerspectiveCamera,
  Vector2,
  Vector3,
} from "three";
import Blob from "./Blob";

function BgScene() {
  return (
    <Canvas>
      <color attach="background" args={["#2c2c36"]} />
      <BgSceneContent />
    </Canvas>
  );
}

function BgSceneContent() {
  const camera: MutableRefObject<ThreePerspectiveCamera> = useRef(null!);

  const { mx, my } = useMouseScreenPosition(6, 0.1);
  const [lerpMx, setLerpMx] = useState(mx);
  const [lerpMy, setLerpMy] = useState(my);

  const cameraTarget = new Vector3(0, 0, 0);

  useFrame(() => {
    setLerpMx((val) => lerp(val, mx, 0.02));
    setLerpMy((val) => lerp(val, my, 0.02));

    camera.current.position.x = lerpMx;
    camera.current.position.y = -lerpMy;

    camera.current.lookAt(cameraTarget);
  });

  const bgShapes = useMemo(() => {
    return [...Array(20)].map(() => ({
      x: (Math.random() * 240 - 120) * (innerWidth / innerHeight),
      y: Math.random() * 240 - 120,
      z: Math.random() * 160 - 80 - 200,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      scl: 10,
      shape: ["torus", "cone", "ico", "octa", "tetra", "knot"][
        Math.floor(Math.random() * 6)
      ],
    }));
  }, []);

  return (
    <>
      <EffectComposer>
        <BrightnessContrast
          brightness={-0.18} // brightness. min: -1, max: 1
          contrast={-0.1} // contrast: min -1, max: 1
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.001, 0.001)}
        />
        <Vignette
          blendFunction={BlendFunction.NORMAL}
          offset={0.2}
          darkness={0.4}
        />
      </EffectComposer>
      <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 3]} />

      {bgShapes.map((props, i) => (
        <mesh
          position={[props.x, props.y, props.z]}
          rotation={[props.rotX, props.rotY, props.rotZ]}
          scale={props.scl}
          key={i}
        >
          {props.shape === "torus" ? (
            <torusGeometry args={[0.5, 0.2, 12, 18]} />
          ) : props.shape === "cone" ? (
            <coneGeometry args={[0.6, 1, 24, 1]} />
          ) : props.shape === "ico" ? (
            <icosahedronGeometry />
          ) : props.shape === "octa" ? (
            <octahedronGeometry />
          ) : props.shape === "tetra" ? (
            <tetrahedronGeometry />
          ) : (
            <torusKnotGeometry args={[0.5, 0.2]} />
          )}
          <meshStandardMaterial color={"#404048"} />
        </mesh>
      ))}
      <Bounds fit clip observe damping={6} margin={0.7}>
        <Blob
          radius={3}
          pos={[4, -1.6, -3.8]}
          u_noiseDensity={1}
          u_noiseStrength={0.4}
          u_frequency={14}
          u_amplitude={2}
          u_colorIntensity={0.8} // u_colorIntensity={0.8}
          u_colorOffset={0.5} // u_colorOffset={0.4}
          u_colorPalette={[
            [0.5, 0.5, 0.5], // [0.2, 0.7, 0.4], // [0.2, 0.7, 0.4],
            [0.5, 0.5, 0.5], // [0.6, 0.9, 0.3], // [0.6, 0.9, 0.2],
            [1.0, 1.0, 1.0], // [0.5, 0.8, 1.0], // [0.6, 0.8, 0.7],
            [0.0, 0.05, 0.08], // [0.5, 0.1, 0.0], // [0.5, 0.1, 0.0],
          ]}
        ></Blob>
        <Blob
          radius={1}
          pos={[-3.7, 1, 1]}
          u_noiseDensity={1}
          u_noiseStrength={0.2}
          u_frequency={10}
          u_amplitude={2}
          u_colorIntensity={1.6} // u_colorIntensity={2.4}
          u_colorOffset={0.6} // u_colorOffset={-2}
          u_colorPalette={[
            [0.5, 0.5, 0.5], // [0.2, 0.7, 0.4],
            [0.5, 0.5, 0.5], // [0.6, 0.9, 0.3],
            [1.0, 1.0, 1.0], // [0.6, 0.8, 0.7],
            [0.1, 0.05, 0.02], // [0.5, 0.1, 0.0],
          ]}
        ></Blob>
        <Blob
          radius={0.3}
          pos={[1.2, 2, 1.6]}
          u_noiseDensity={1}
          u_noiseStrength={0.04}
          u_frequency={20}
          u_amplitude={2}
          u_colorIntensity={8} // u_colorIntensity={8}
          u_colorOffset={0.8} // u_colorOffset={-2.2}
          u_colorPalette={[
            [0.5, 0.5, 0.5], // [0.3, 0.6, 0.4],
            [0.5, 0.5, 0.5], // [0.6, 0.9, 0.3],
            [1.0, 1.0, 1.0], // [0.6, 0.8, 0.7],
            [0.0, 0.05, 0.08], // [0.5, 0.1, 0.0],
          ]}
        ></Blob>
      </Bounds>
    </>
  );
}

function lerp(a: number, b: number, ratio: number) {
  return a + ratio * (b - a);
}

export default BgScene;
