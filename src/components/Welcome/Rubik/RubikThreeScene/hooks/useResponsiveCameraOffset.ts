import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function useResponsiveCameraOffset() {
  const threeState = useThree((state) => state.get);

  // Make camera offset responsive
  useEffect(() => {
    const updateCamera = () => {
      const state = threeState();

      const camera = state.camera;
      const { width: w, height: h } = state.size;

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
}
