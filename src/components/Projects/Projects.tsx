import { Canvas } from "@react-three/fiber";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { useRef } from "react";
import { useProjectsAnimation } from "./hooks/useProjectsAnimation";
import { useSliderChange } from "./hooks/useSliderChange";
import ProjectName from "./ProjectName/ProjectName";
import ProjectsSlider from "./ProjectsSlider/ProjectsSlider";
import ProjectsThreeScene from "./ProjectsThreeScene";

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

  return (
    <section
      className="absolute inset-0 bg-zinc-300"
      style={{
        display: currentSection === 1 ? "block" : "none",
      }}
    >
      <div className="absolute inset-0">
        <Canvas>
          <ProjectsThreeScene splideRef={splideRef} play={playThreeScene} />
        </Canvas>
      </div>
      <div ref={mainContainerRef} className="flex flex-col h-full">
        <div className="flex-1 text-center">
          <h2 className="overflow-hidden text-zinc-600 text-4xl mt-16 font-sans-semiexpanded">
            <span className="inline-block" data-anim-intro>
              PROJECTS
            </span>
          </h2>
        </div>

        <ProjectsSlider splideRef={splideRef} onChange={onSliderChange} />

        <div className="flex-1">
          <ProjectName activeProject={activeProject} play={play} />
        </div>
      </div>
    </section>
  );
}

export default Projects;
