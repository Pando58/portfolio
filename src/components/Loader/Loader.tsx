import { gsap, Power4 } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

function Loader({ onFinish }: { onFinish: () => void }) {
  const [active, setActive] = useState(true);
  const mainContainer = useRef<HTMLDivElement>(null!);
  const shapesContainer = useRef<HTMLDivElement>(null!);
  const squaresContainer = useRef<HTMLDivElement>(null!);
  const tlRef = useRef<gsap.core.Timeline>(null!);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ repeat: -1, delay: 0.5 });

      const tl = tlRef.current;

      // Start transparent
      gsap.from(shapesContainer.current, {
        duration: 1,
        delay: 0.5,
        ease: Power4.easeOut,
        opacity: 0,
      });

      const squares = gsap.utils.toArray<HTMLDivElement>(".loading-square");

      // Squares initial state
      for (const [squareIndex, square] of squares.entries()) {
        tl.set(square, {
          x: squareAnimFrames[0][squareIndex][0] * 42,
          y: squareAnimFrames[0][squareIndex][1] * 42,
        });
      }

      // Register frames at the corresponding time
      for (const [frameIndex, frame] of squareAnimFrames.slice(1).entries()) {
        for (const [squareIndex, square] of squares.entries()) {
          tl.to(
            square,
            {
              duration: 0.5,
              ease: Power4.easeInOut,
              x: frame[squareIndex][0] * 42,
              y: frame[squareIndex][1] * 42,
            },
            frameIndex * 0.5
          );
        }
      }
    }, squaresContainer);

    const finish = setTimeout(
      triggerFinishLoading,
      3000 + Math.random() * 1000
    );

    return () => {
      ctx.revert();
      clearTimeout(finish);
    };
  }, []);

  function triggerFinishLoading() {
    const tl = tlRef.current;

    tl.repeat(0);

    tl.clear();

    tl.to(".loading-square", {
      duration: 0.6,
      ease: Power4.easeOut,
      x: 42,
      y: 42,
    })
      .to(
        shapesContainer.current,
        {
          duration: 0.6,
          ease: Power4.easeIn,
          opacity: 0,
        },
        "-=0.5"
      )
      .to(
        mainContainer.current,
        {
          duration: 1.2,
          ease: Power4.easeInOut,
          width: 0,
        },
        "-=0.2"
      )
      .call(onFinish, [], 1)
      .call(() => setActive(false), [], 1.7);
  }

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
          <h4 className="text-center font-bold text-zinc-700 border-zinc-700 my-2 pt-1">
            LOADING...
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Loader;

function Square() {
  return (
    <div className="absolute loading-square">
      <svg viewBox="0 0 6 6" className="w-9 h-9 inline-block">
        <mask id="outline-mask">
          <rect
            x="-2" //
            y="-2"
            width="8"
            height="8"
            fill="white"
          />
          <rect
            x="1" //
            y="1"
            width="4"
            height="4"
            fill="black"
          />
        </mask>
        <rect
          x="0" //
          y="0"
          width="6"
          height="6"
          mask="url(#outline-mask)"
          className="fill-zinc-700"
        />
        <rect
          x="2" //
          y="2"
          width="2"
          height="2"
          className="fill-zinc-700"
        />
      </svg>
    </div>
  );
}

// Animation frames
const squareAnimFrames = (() => {
  type P = [number, number];

  const frames: P[][] = [
    [
      [0, 2],
      [1, 2],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 1],
      [1, 0],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ];

  const origin: P = [1, 1];

  const rotate = (point: P, origin: P, angle: number): P => {
    const [px, py] = point;
    const [ox, oy] = origin;

    return [
      ox + Math.cos(angle) * (px - ox) - Math.sin(angle) * (py - oy),
      oy + Math.sin(angle) * (px - ox) + Math.cos(angle) * (py - oy),
    ];
  };

  const rotateFrame = (points: P[], angle: number) =>
    points.map((point): P => rotate(point, origin, angle));

  const rotateFrames = (frames: P[][], angle: number) =>
    frames.map((frame) => rotateFrame(frame, angle));

  const allRotations = [
    ...frames,
    ...rotateFrames(frames, Math.PI * 0.5),
    ...rotateFrames(frames, Math.PI),
    ...rotateFrames(frames, Math.PI * 1.5),
  ];

  allRotations.push(
    ...allRotations.splice(0, Math.random() * allRotations.length)
  );

  allRotations.push(allRotations[0]);

  return allRotations;
})();
