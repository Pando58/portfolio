import { useThreeVisibleSize } from "@/components/hooks/useThreeVisibleSize";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { useFrame } from "@react-three/fiber";
import { Splide } from "@splidejs/react-splide";
import { MutableRefObject, useMemo } from "react";
import { Mesh } from "three";

export function useSyncThreeSliders(
  cameraDistance: number,
  splideRef: MutableRefObject<Splide>,
  slideMeshes: MutableRefObject<Mesh[]>
) {
  const { windowW } = useWindowSize();
  const { visibleW, visibleH } = useThreeVisibleSize(cameraDistance);

  const spacing = useMemo(() => {
    const width = Math.min(visibleW * 0.56, visibleH * 0.76);
    const gap = Math.max(visibleW * 0.11, visibleW * 0.25 - visibleH * 0.19);

    return width + gap;
  }, [visibleW]);

  useFrame(() => {
    const splide = splideRef.current.splide;

    if (!splide) return;

    const { Layout, Move } = splide.Components;
    const sliderPos = Move.getPosition();
    const slideSize = Layout.slideSize(0, true);

    const sliderWorldPos =
      ((sliderPos - (windowW - slideSize) / 2) / windowW) * visibleW;

    const meshes = slideMeshes.current;

    for (let i = 0; i < meshes.length; i++) {
      meshes[i].position.x = sliderWorldPos + i * spacing;
      meshes[i].position.z = (Math.cos(sliderWorldPos + i * spacing) - 1) * 0.7;

      meshes[i].rotation.x = (sliderWorldPos + i * spacing) * 0.1;
      meshes[i].rotation.y = (sliderWorldPos + i * spacing) * 0.2;
    }
  });
}
