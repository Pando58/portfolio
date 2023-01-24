import { ProjectProps } from "@/data/projectList";
import { Splide } from "@splidejs/react-splide";
import { gsap } from "gsap";
import { MutableRefObject, useLayoutEffect } from "react";
import ProjectName from "../ProjectName/ProjectName";
import ProjectsSlider from "../ProjectsSlider/ProjectsSlider";

function SliderView({
  mainContainerRef,
  splideRef,
  onSliderChange,
  onClickSlide,
  activeProject,
  play,
  selectedProject,
}: {
  mainContainerRef: MutableRefObject<HTMLDivElement>;
  splideRef: MutableRefObject<Splide>;
  onSliderChange: (index: number) => void;
  onClickSlide: (i: number) => void;
  activeProject: ProjectProps;
  play: boolean;
  selectedProject: ProjectProps | null;
}) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainContainerRef.current,
        { opacity: selectedProject ? 1 : 0 },
        { opacity: selectedProject ? 0 : 1, duration: 0.5 }
      );

      if (selectedProject) {
        gsap
          .to(mainContainerRef.current, {
            visibility: "hidden",
          })
          .delay(0.5);
      } else {
        gsap.set(mainContainerRef.current, {
          visibility: "visible",
        });
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, [selectedProject]);

  return (
    <div ref={mainContainerRef} className="absolute inset-0 flex flex-col">
      <div className="flex-1 text-center">
        <h2 className="overflow-hidden text-zinc-600 text-4xl mt-16 font-sans-semiexpanded">
          <span className="inline-block" data-anim-intro>
            PROJECTS
          </span>
        </h2>
      </div>

      <ProjectsSlider
        splideRef={splideRef}
        onChange={onSliderChange}
        onClickSlide={onClickSlide}
      />

      <div className="flex-1">
        <ProjectName activeProject={activeProject} play={play} />
      </div>
    </div>
  );
}

export default SliderView;
