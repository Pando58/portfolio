import { gsap, Power3 } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Rubik from "./Rubik";

function Welcome({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  const [play, setPlay] = useState(false);
  const [playRubik, setPlayRubik] = useState(false);
  const titlesContainer = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setPlay(sectionPlaying && currentSection === 0);
  }, [currentSection, sectionPlaying]);

  useLayoutEffect(() => {
    // Reset animations if not playing
    if (!play) {
      gsap.set("span", {
        y: "100%",
      });

      setPlayRubik(false);

      return;
    }

    // Main animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "span",
        {
          y: "100%",
        },
        {
          duration: 1,
          stagger: 0.2,
          ease: Power3.easeInOut,
          y: 0,
        }
      );

      gsap.delayedCall(0.7, () => setPlayRubik(true));
    }, titlesContainer);

    return () => ctx.revert();
  }, [play]);

  return (
    <section
      className="absolute inset-0 bg-slate-800 flex justify-center items-center"
      style={{
        display: currentSection === 0 ? "flex" : "none",
      }}
    >
      <Rubik play={playRubik} />
      <div
        ref={titlesContainer}
        className="md:w-3/4 text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-center md:text-left text-slate-100"
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
