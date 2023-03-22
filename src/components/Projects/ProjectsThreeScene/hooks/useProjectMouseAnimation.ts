import { ProjectProps } from "@/data/projectList";
import { gsap } from "gsap";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { Euler, Group } from "three";

export function useProjectMouseAnimation(
  slideMeshes: MutableRefObject<Group[]>,
  selectedProject: ProjectProps | null,
  selectedProjectIndex: number
) {
  const updater = useMemo(
    () => ({
      scale: 0,
      mouseX: 0,
      mouseY: 0,
    }),
    []
  );

  let [lastMesh, setLastMesh] = useState<Group | null>(null);

  useEffect(() => {
    const mesh = slideMeshes.current[selectedProjectIndex];

    if (mesh && mesh !== lastMesh) {
      setLastMesh(mesh);
      return;
    }

    const updateMesh = () => {
      if (lastMesh?.parent)
        lastMesh.parent.setRotationFromEuler(
          new Euler(
            (updater.mouseY - window.innerHeight / 2) * 0.0005 * updater.scale,
            (updater.mouseX - window.innerWidth / 2) * 0.0005 * updater.scale,
            0,
            "XYZ"
          )
        );
    };

    const updaterWrapper = {
      set scale(val: number) {
        updateMesh();

        updater.scale = val;
      },
      get scale() {
        return updater.scale;
      },
      set mouseX(val: number) {
        updateMesh();

        updater.mouseX = val;
      },
      get mouseX() {
        return updater.mouseX;
      },
      set mouseY(val: number) {
        updateMesh();

        updater.mouseY = val;
      },
      get mouseY() {
        return updater.mouseY;
      },
    };

    if (selectedProject) {
      gsap.to(updaterWrapper, {
        scale: 1,
      });
    } else {
      gsap.to(updaterWrapper, {
        scale: 0,
      });
    }

    const listener = ({ clientX, clientY }: MouseEvent) => {
      updaterWrapper.mouseX = clientX;
      updaterWrapper.mouseY = clientY;
    };

    addEventListener("mousemove", listener);

    return () => {
      removeEventListener("mousemove", listener);
    };
  }, [selectedProject, lastMesh]);
}
