import { useEffect, useState } from "react";

export function useMouseScreenPosition(range: number, lerpRatio: number) {
  let [mx, setMx] = useState(0);
  let [my, setMy] = useState(0);

  useEffect(() => {
    const mousemove = (e: MouseEvent) => {
      setMx((e.clientX * range) / innerWidth - range / 2);
      setMy((e.clientY * range) / innerHeight - range / 2);
    };

    const mouseleave = () => {
      setMx(0);
      setMy(0);
    };

    addEventListener("mousemove", mousemove);
    document.addEventListener("mouseleave", mouseleave);

    return () => {
      removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseleave", mouseleave);
    };
  }, []);

  return { mx, my };
}
