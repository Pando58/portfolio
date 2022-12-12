import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

export function useThreeVisibleSize(distance: number) {
  const { windowW, windowH } = useWindowSize();
  const [visibleW, setVisibleW] = useState(0);
  const [visibleH, setVisibleH] = useState(0);

  const threeState = useThree((state) => state.get);

  useEffect(() => {
    const { camera } = threeState();

    if (!("fov" in camera)) return;

    const tan = Math.tan(camera.fov * Math.PI / 180 / 2); // prettier-ignore

    const h = tan * 2 * distance;
    const w = h * camera.aspect;

    setVisibleW(w);
    setVisibleH(h);
  }, [windowW, windowH]);

  return { visibleW, visibleH };
}
