import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import BgScene from "./BgScene";

function Welcome({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  const titlesContainer = useRef<HTMLDivElement>(null!);

  /* const { playRubik } = useWelcomeAnimation(
    currentSection,
    sectionPlaying,
    titlesContainer
  ); */

  return (
    <section
      className="absolute inset-0 bg-slate-800 flex justify-center items-center"
      style={{
        display: currentSection === 0 ? "flex" : "none",
      }}
    >
      {/* <Rubik play={playRubik} /> */}
      <div className="absolute inset-0">
        <Canvas>
          <BgScene />
        </Canvas>
      </div>
      <div
        ref={titlesContainer}
        className="z-10 md:w-3/4 text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-center md:text-left text-slate-100"
      >
        <h2 className="font-bold overflow-hidden">
          <span className="inline-block">Enrique</span>
        </h2>
        <h2 className="font-bold overflow-hidden">
          <span className="inline-block">Pando</span>
        </h2>
        <h3 className="overflow-hidden text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono ml-2 text-slate-300">
          <span className="inline-block">web developer</span>
        </h3>
      </div>
    </section>
  );
}

export default Welcome;
