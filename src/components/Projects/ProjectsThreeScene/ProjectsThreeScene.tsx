import { useResponsiveCameraFOV } from "@/components/hooks/useResponsiveCameraFOV";
import { PerspectiveCamera } from "@react-three/drei";
import { Splide } from "@splidejs/react-splide";
import { MutableRefObject, useMemo, useRef } from "react";
import { Mesh } from "three";
import { useSlidersIntroAnimation } from "./hooks/useSlidersIntroAnimation";
import { useSyncThreeSliders } from "./hooks/useSyncThreeSliders";

function ProjectsThreeScene({
  splideRef,
  play,
}: {
  splideRef: MutableRefObject<Splide>;
  play: boolean;
}) {
  const cameraDistance = 4;

  const slideMeshes = useRef<Mesh[]>([]);

  useResponsiveCameraFOV(40, 30);
  useSyncThreeSliders(cameraDistance, splideRef, slideMeshes);
  useSlidersIntroAnimation(play, slideMeshes);

  const slides = useMemo(() => {
    return splideRef.current.splide?.Components.Slides.get() || [];
  }, []);

  function addSlideMeshesRef(el: Mesh | null, index: number) {
    if (!el) return;

    slideMeshes.current[index] = el;
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, cameraDistance]} />
      {slides.map((_slide, i) => (
        <mesh ref={(el) => addSlideMeshesRef(el, i)} key={i}>
          <boxGeometry args={[1.6, 1.2, 0.05]} />
          <meshNormalMaterial />
        </mesh>
      ))}
    </>
  );
}

export default ProjectsThreeScene;
