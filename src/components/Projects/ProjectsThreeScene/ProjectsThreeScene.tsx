import { useResponsiveCameraFOV } from "@/components/hooks/useResponsiveCameraFOV";
import { projectList, ProjectProps } from "@/data/projectList";
import { PerspectiveCamera } from "@react-three/drei";
import { Splide } from "@splidejs/react-splide";
import { MutableRefObject, useMemo, useRef } from "react";
import { Group } from "three";
import { useProjectMouseAnimation } from "./hooks/useProjectMouseAnimation";
import { useProjectSelectionAnimation } from "./hooks/useProjectSelectionAnimation";
import { useSlidersIntroAnimation } from "./hooks/useSlidersIntroAnimation";
import { useSyncThreeSliders } from "./hooks/useSyncThreeSliders";
import Monitor from "./models/Monitor";

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

  const slideMeshes = useRef<Group[]>([]);

  useResponsiveCameraFOV(40, 30);
  useSyncThreeSliders(cameraDistance, splideRef, slideMeshes);
  useSlidersIntroAnimation(play, slideMeshes);
  useProjectSelectionAnimation(
    play,
    slideMeshes,
    selectedProject,
    selectedProjectIndex
  );
  useProjectMouseAnimation(slideMeshes, selectedProject, selectedProjectIndex);

  const slides = useMemo(() => {
    return splideRef.current.splide?.Components.Slides.get() || [];
  }, []);

  function addSlideMeshesRef(el: Group | null, index: number) {
    if (!el) return;

    slideMeshes.current[index] = el;
  }

  return (
    <>
      <hemisphereLight args={["#9AF", "#000"]} intensity={0.5} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[1, 4, 2]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, cameraDistance]} />
      {slides.map((_slide, i) => (
        <group key={i}>
          {projectList[i] ? (
            <Monitor
              videoSrc={projectList[i].video}
              ref={(el) => addSlideMeshesRef(el, i)}
            />
          ) : (
            <object3D />
          )}
        </group>
      ))}
    </>
  );
}

export default ProjectsThreeScene;
