import { Canvas } from "@react-three/fiber";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { useRef } from "react";
import { useProjectsAnimation } from "./hooks/useProjectsAnimation";
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

  const { playScene } = useProjectsAnimation(
    currentSection,
    sectionPlaying,
    splideRef,
    mainContainerRef
  );

  return (
    <section
      className="absolute inset-0 bg-zinc-300"
      style={{
        display: currentSection === 1 ? "block" : "none",
      }}
    >
      <div className="absolute inset-0">
        <Canvas>
          <ProjectsThreeScene splideRef={splideRef} play={playScene} />
        </Canvas>
      </div>
      <div ref={mainContainerRef} className="flex flex-col h-full">
        <div className="flex-1 text-center">
          <h2 className="overflow-hidden text-zinc-600 text-4xl mt-16 font-sans-semiexpanded">
            <span className="inline-block" data-anim>
              PROJECTS
            </span>
          </h2>
        </div>

        <ProjectsSlider splideRef={splideRef} />

        <div className="flex-1">
          <h2 className="overflow-hidden text-zinc-800 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-12 text-center">
            <span className="inline-block" data-anim>
              Osmium
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Projects;
