import { useResponsiveCameraFOV } from "@/components/hooks/useResponsiveCameraFOV";
import { ProjectProps } from "@/data/projectList";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Splide } from "@splidejs/react-splide";
import { gsap, Power4 } from "gsap";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useSlidersIntroAnimation } from "./hooks/useSlidersIntroAnimation";
import { useSyncThreeSliders } from "./hooks/useSyncThreeSliders";

let camAngle = 0;

function ProjectsThreeScene({
  splideRef,
  play,
  selectedProject,
  selectedProjectIndex,
}: {
  splideRef: MutableRefObject<Splide>;
  play: boolean;
  selectedProject: ProjectProps | null;
  selectedProjectIndex: number;
}) {
  const cameraDistance = 4;

  const slideMeshes = useRef<Mesh[]>([]);

  const threeState = useThree((state) => state.get);

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

  // Project selection animation
  useEffect(() => {
    if (!play) return;

    const scales = slideMeshes.current.map((mesh) => mesh.scale);
    delete scales[selectedProjectIndex];

    const { camera, size } = threeState();
    const { width: w, height: h } = size;

    const cameraUpdater = {
      set rotation(a: number) {
        camera.setRotationFromAxisAngle(
          new Vector3(0, 1, 0),
          (camAngle * Math.PI) / 180
        );

        camAngle = a;
      },
      get rotation() {
        return camAngle;
      },
      set offsetY(offset: number) {
        camera.setViewOffset(w, h, camera.view?.offsetX || 0, offset, w, h);
      },
      get offsetY() {
        return camera.view?.offsetY || 0;
      },
    };

    if (selectedProject) {
      gsap.to(scales, {
        ease: Power4.easeOut,
        duration: 0.7,
        x: 0,
        y: 0,
        z: 0,
      });

      if (w > 1280) {
        gsap.to(cameraUpdater, {
          rotation: 8,
        });
      } else {
        gsap.to(cameraUpdater, {
          offsetY: 36,
        });
      }
    } else {
      gsap.to(scales, {
        x: 1,
        y: 1,
        z: 1,
      });

      gsap.to(cameraUpdater, {
        rotation: 0,
        offsetY: 0,
      });
    }
  }, [selectedProject]);

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
