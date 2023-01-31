import { useMouseScreenPosition } from "@/components/hooks/useMouseScreenPosition";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef, useState } from "react";
import { PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from "three";
import Blob from "./Blob";

function BgScene() {
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

  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 8]} />
      <Blob
        radius={3}
        pos={[4, -1.6, -3.8]}
        u_noiseDensity={1}
        u_noiseStrength={0.4}
        u_frequency={14}
        u_amplitude={2}
        u_colorIntensity={0.8}
        u_colorOffset={0.4}
        u_colorPalette={[
          [0.2, 0.7, 0.4], // [0.2, 0.7, 0.4],
          [0.6, 0.9, 0.2], // [0.6, 0.9, 0.2],
          [0.5, 0.8, 1.0], // [0.6, 0.8, 0.7],
          [0.5, 0.1, 0.0], // [0.5, 0.1, 0.0],
        ]}
      ></Blob>
      <Blob
        radius={1}
        pos={[-3.7, 1, 1]}
        u_noiseDensity={1}
        u_noiseStrength={0.2}
        u_frequency={10}
        u_amplitude={2}
        u_colorIntensity={2.4}
        u_colorOffset={-2}
        u_colorPalette={[
          [0.2, 0.7, 0.4],
          [0.6, 0.9, 0.2],
          [0.6, 0.8, 0.7],
          [0.5, 0.1, 0.0],
        ]}
      ></Blob>
      <Blob
        radius={0.3}
        pos={[1.2, 2, 1.6]}
        u_noiseDensity={1}
        u_noiseStrength={0.04}
        u_frequency={20}
        u_amplitude={2}
        u_colorIntensity={8}
        u_colorOffset={-2.2}
        u_colorPalette={[
          [0.3, 0.6, 0.4],
          [0.6, 0.9, 0.2],
          [0.6, 0.8, 0.7],
          [0.5, 0.1, 0.0],
        ]}
      ></Blob>
    </>
  );
}

function lerp(a: number, b: number, ratio: number) {
  return a + ratio * (b - a);
}

export default BgScene;
