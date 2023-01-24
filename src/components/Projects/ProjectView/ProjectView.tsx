import { ProjectProps } from "@/data/projectList";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

function ProjectView({
  project,
  projectVisible,
  selectProject,
}: {
  project: ProjectProps;
  projectVisible: boolean;
  selectProject: (i: number) => void;
}) {
  const mainContainerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainContainerRef.current,
        { opacity: !projectVisible ? 1 : 0 },
        { opacity: !projectVisible ? 0 : 1, duration: 0.5 }
      );

      if (!projectVisible) {
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
  }, [project, projectVisible]);

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      ref={mainContainerRef}
    >
      <div className="absolute left-2 top-2">
        <button
          onClick={() => selectProject(-1)}
          className="w-10 h-10 mt-2 text-xl grid place-items-center"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="w-full p-12 xl:h-full xl:flex">
        <div className="xl:basis-2/6 shrink flex flex-col justify-center">
          <div className="relative min-h-[12rem] text-center">
            <div className="absolute bottom-4 left-0 right-0">
              <h2 className="text-center max-w-md mx-auto font-sans-semiexpanded font-bold text-4xl xl:text-5xl">
                {project.name}
              </h2>
            </div>
          </div>

          <div className="block xl:hidden w-full">
            <div className="pt-[56.25%]" />
          </div>
          <div className="px-4 pt-4 max-w-md mx-auto min-h-[14rem]">
            <p
              className="text-justify font-sans xl:text-lg"
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></p>
            <ul className="mt-6 text-2xl flex">
              <li>
                <a href={project.repo_url} target="_blank">
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-4 pb-6"></div>
        </div>
        <div className="hidden xl:block xl:basis-4/6" />
      </div>
    </div>
  );
}

export default ProjectView;
