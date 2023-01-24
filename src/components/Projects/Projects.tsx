import { Canvas } from "@react-three/fiber";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { useRef } from "react";
import { useProjectsAnimation } from "./hooks/useProjectsAnimation";
import { useSelectedProject } from "./hooks/useSelectedProject";
import { useSliderChange } from "./hooks/useSliderChange";
import ProjectsThreeScene from "./ProjectsThreeScene";
import ProjectView from "./ProjectView/ProjectView";
import SliderView from "./SliderView";

function Projects({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  const splideRef = useRef<Splide>(null!);
  const mainContainerRef = useRef<HTMLDivElement>(null!);

  const { play, playThreeScene } = useProjectsAnimation(
    currentSection,
    sectionPlaying,
    splideRef,
    mainContainerRef
  );

  const { activeProject, onSliderChange } = useSliderChange();

  const {
    selectedProject,
    selectedProjectIndex,
    lastSelectedProject,
    selectProject,
  } = useSelectedProject();

  function onClickSlide(i: number) {
    selectProject(i);
  }

  return (
    <section
      className="absolute inset-0 bg-zinc-300"
      style={{
        display: currentSection === 1 ? "block" : "none",
      }}
    >
      <div className="absolute inset-0">
        <Canvas>
          <ProjectsThreeScene
            splideRef={splideRef}
            play={playThreeScene}
            selectedProject={selectedProject}
            selectedProjectIndex={selectedProjectIndex}
          />
        </Canvas>
      </div>

      <SliderView
        mainContainerRef={mainContainerRef}
        splideRef={splideRef}
        onSliderChange={onSliderChange}
        onClickSlide={onClickSlide}
        activeProject={activeProject}
        play={play}
        selectedProject={selectedProject}
      />

      <ProjectView
        project={lastSelectedProject}
        projectVisible={!!selectedProject}
        selectProject={selectProject}
      />
    </section>
  );
}

export default Projects;
