import { sections } from "@/data/sectionRoutes";
import { useRef } from "react";
import LangText from "../LangText";
import BgScene from "./BgScene";
import { useWelcomeAnimation } from "./hooks/useWelcomeAnimation";

function Welcome({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  const titlesContainer = useRef<HTMLDivElement>(null!);

  const { playRubik } = useWelcomeAnimation(
    currentSection,
    sectionPlaying,
    titlesContainer
  );

  return (
    <section
      className="absolute inset-0 bg-slate-800 flex justify-center items-center"
      style={{
        display: currentSection === 0 ? "flex" : "none",
      }}
    >
      {/* <Rubik play={playRubik} /> */}
      <div className="absolute inset-0">
        <BgScene />
      </div>
      <div
        ref={titlesContainer}
        className="z-10 md:w-3/4 text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-center font-sans-semiexpanded text-slate-100"
      >
        <h2 className="font-bold overflow-hidden">
          <span data-anim className="inline-block">
            Enrique
          </span>
        </h2>
        <h2 className="font-bold overflow-hidden">
          <span data-anim className="inline-block">
            Pando
          </span>
        </h2>
        <h3 className="mt-4 overflow-hidden text-lg sm:text-xl lg:text-2xl xl:text-3xl tracking-widest uppercase text-slate-300">
          <span data-anim className="inline-block">
            <LangText //
              en="web developer"
              es="desarrollador web"
            />
          </span>
        </h3>
        <div className="overflow-hidden">
          <button
            data-anim
            onClick={(e) => {
              e.preventDefault();

              const state = {
                sec: 1,
                theme: sections.get(1)?.theme,
              };

              history.pushState(state, "", sections.get(1)?.path);
              dispatchEvent(new PopStateEvent("popstate", { state }));
            }}
          >
            <span className="inline-block text-sm font-semibold tracking-wider border-2 p-2 rounded border-white border-opacity-50 hover:bg-white hover:text-gray-900 transition duration-150">
              <LangText //
                en="PROJECTS"
                es="PROYECTOS"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
