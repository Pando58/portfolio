import { useRef } from "react";
import { useLoaderAnimation } from "./hooks/useLoaderAnimation";
import Square from "./Square";

function Loader({ onFinish }: { onFinish: () => void }) {
  const mainContainer = useRef<HTMLDivElement>(null!);
  const shapesContainer = useRef<HTMLDivElement>(null!);
  const squaresContainer = useRef<HTMLDivElement>(null!);

  const { active, percent } = useLoaderAnimation(
    onFinish,
    mainContainer,
    shapesContainer,
    squaresContainer
  );

  return (
    <div
      ref={mainContainer}
      className="absolute inset-0 bg-zinc-200 overflow-hidden z-20"
      style={{
        display: active ? "block" : "none",
      }}
    >
      <div className="w-screen h-screen flex justify-center items-center">
        <div ref={shapesContainer}>
          <div ref={squaresContainer} className="w-[120px] h-[120px] relative">
            {[...Array(4)].map((_, i) => (
              <Square key={i} />
            ))}
          </div>
          <h4 className="text-center font-bold font-sans-semiexpanded text-zinc-700 border-zinc-700 my-2 pt-1">
            {percent}%
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Loader;
