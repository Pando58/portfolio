import { projectList } from "@/data/projectList";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { MutableRefObject } from "react";

function ProjectsSlider({
  splideRef,
  onChange,
}: {
  splideRef: MutableRefObject<Splide>;
  onChange: (index: number) => void;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        paddingBottom: "min(42%, 58vh)" /* Simulate 3d scene spacing */,
      }}
    >
      <div className="absolute inset-0">
        <Splide
          ref={splideRef}
          className="h-full"
          hasTrack={false}
          onMove={(s) => onChange(s.index)}
          options={{
            // perPage: 3,
            fixedWidth: "min(56%, 76vh)",
            gap: "max(11%, calc(25vw - 19vh))",
            focus: "center",
            trimSpace: false,
            updateOnMove: true,
            wheel: true,
            pagination: false,
            arrows: false,
          }}
          aria-label="Projects"
        >
          <SplideTrack className="h-full">
            {projectList.map((_, i) => (
              <SplideSlide key={i} />
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </div>
  );
}

export default ProjectsSlider;
