import { gsap, Power4 } from "gsap";
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

export function useLoaderAnimation(
  onFinish: () => void,
  mainContainer: MutableRefObject<HTMLDivElement>,
  shapesContainer: MutableRefObject<HTMLDivElement>,
  squaresContainer: MutableRefObject<HTMLDivElement>
) {
  const [active, setActive] = useState(true);
  const [percent, setPercent] = useState(0);
  const tlRef = useRef<gsap.core.Timeline>(null!);

  useLayoutEffect(() => {
    const loadingTime = 3 + Math.random() * 0.5;

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

      const percentObj = { val: 0 };

      gsap.to(percentObj, {
        val: 100,
        duration: loadingTime - 0.6,
        delay: 0.5,
        ease: "none",
        onUpdate: () => {
          setPercent(percentObj.val | 0);
        },
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

    const finish = setTimeout(triggerFinishLoading, loadingTime * 1000);

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

  return {
    active,
    percent,
  };
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

  // Add frames in all 4 rotations
  const allRotations = [
    ...frames,
    ...rotateFrames(frames, Math.PI * 0.5),
    ...rotateFrames(frames, Math.PI),
    ...rotateFrames(frames, Math.PI * 1.5),
  ];

  // Randomize start
  allRotations.push(
    ...allRotations.splice(0, Math.random() * allRotations.length)
  );

  // Put the last one at the start
  allRotations.push(allRotations[0]);

  return allRotations;
})();
