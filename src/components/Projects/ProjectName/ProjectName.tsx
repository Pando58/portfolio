import LangText from "@/components/LangText";
import { ProjectProps } from "@/data/projectList";
import { useRef } from "react";
import { useProjectTitleAnim } from "./hooks/useProjectTitleAnim";

function ProjectName({
  activeProject,
  play,
}: {
  activeProject: ProjectProps;
  play: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null!);

  const { prevName, activeName } = useProjectTitleAnim(
    activeProject,
    containerRef,
    play
  );

  return (
    <div ref={containerRef} className="relative mt-12">
      <h2 className="overflow-hidden text-zinc-800 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center absolute inset-0">
        <span className="inline-block" data-anim-first>
          <LangText
            en={prevName.en} //
            es={prevName.es}
          />
        </span>
      </h2>
      <h2 className="overflow-hidden text-zinc-800 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
        <span className="inline-block" data-anim-intro data-anim-second>
          <LangText
            en={activeName.en} //
            es={activeName.es}
          />
        </span>
      </h2>
    </div>
  );
}

export default ProjectName;
