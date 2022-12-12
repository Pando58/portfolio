import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowW, setWindowW] = useState(0);
  const [windowH, setWindowH] = useState(0);

  useEffect(() => {
    const setSize = () => {
      setWindowW(innerWidth);
      setWindowH(innerHeight);
    };

    setSize();
    addEventListener("resize", setSize);
    return () => {
      removeEventListener("resize", setSize);
    };
  }, []);

  return { windowW, windowH };
}
