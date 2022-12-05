import { gsap, Power4 } from "gsap";

import { useLayoutEffect, useRef, useState } from "react";

function SwipeTransition({
  transitionPlaying,
  onTransition,
  onExit,
  onComplete,
}: {
  transitionPlaying: boolean;
  onTransition: () => void;
  onExit: () => void;
  onComplete: () => void;
}) {
  const [active, setActive] = useState(false);
  const container = useRef<HTMLDivElement>(null!);
  const tlRef = useRef<gsap.core.Timeline>(null!);

  useLayoutEffect(() => {
    setActive(transitionPlaying);

    if (!transitionPlaying) return;

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ delay: 0 });

      const tl = tlRef.current;

      tl.set(".swipe", {
        left: 0,
        right: "100%",
      });

      tl.to(".swipe", {
        duration: 1,
        ease: Power4.easeInOut,
        right: 0,
        stagger: 0.1,
      });

      tl.to(
        ".swipe",
        {
          duration: 1,
          ease: Power4.easeInOut,
          left: "100%",
          stagger: -0.1,
        },
        "-=0.5"
      );

      tl.call(onTransition, [], 0.95);
      tl.call(onExit, [], 1.2);
      tl.call(
        () => {
          onComplete();
          setActive(false);
        },
        [],
        1.9
      );
    }, container);

    return () => ctx.revert();
  }, [transitionPlaying]);

  return (
    <div
      ref={container}
      className="inset-0 absolute top-0 z-20"
      style={{
        display: active ? "block" : "none",
      }}
    >
      <div className="absolute inset-y-0 swipe bg-slate-500"></div>
      <div className="absolute inset-y-0 swipe bg-slate-300"></div>
      <div className="absolute inset-y-0 swipe bg-slate-100"></div>
    </div>
  );
}

export default SwipeTransition;
