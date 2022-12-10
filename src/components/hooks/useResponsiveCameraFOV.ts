import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function useResponsiveCameraFOV(horizontalFOV: number, minFOV: number) {
  const threeState = useThree((state) => state.get);

  useEffect(() => {
    const updateCamera = () => {
      const state = threeState();

      const camera = state.camera;
      const { width: w, height: h } = state.size;

      // Adjust camera FOV using width and height
      if ("fov" in camera) {
        camera.aspect = w / h;

        camera.fov = Math.max(
          minFOV,
          (Math.atan(
            Math.tan((horizontalFOV * Math.PI) / 360) / camera.aspect
          ) *
            360) /
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
}
