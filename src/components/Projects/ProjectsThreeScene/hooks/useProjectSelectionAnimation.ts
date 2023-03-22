import { gsap, Power4 } from "gsap";
import { Group, Vector3 } from "three";

import { ProjectProps } from "@/data/projectList";
import { useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo } from "react";

export function useProjectSelectionAnimation(
  play: boolean,
  slideMeshes: MutableRefObject<Group[]>,
  selectedProject: ProjectProps | null,
  selectedProjectIndex: number
) {
  const threeState = useThree((state) => state.get);

  const camAngle = useMemo(
    () => ({
      value: 0,
    }),
    []
  );

  useEffect(() => {
    const scales = slideMeshes.current.map((mesh) => mesh.scale);
    delete scales[selectedProjectIndex];

    const { camera, size } = threeState();
    const { width: w, height: h } = size;

    const cameraUpdater = {
      set rotation(a: number) {
        camera.setRotationFromAxisAngle(
          new Vector3(0, 1, 0),
          (a * Math.PI) / 180
        );

        camAngle.value = a;
      },
      get rotation() {
        return camAngle.value;
      },
      set offsetY(offset: number) {
        camera.setViewOffset(w, h, camera.view?.offsetX || 0, offset, w, h);
      },
      get offsetY() {
        return camera.view?.offsetY || 0;
      },
    };

    if (!play) {
      cameraUpdater.rotation = 0;
      cameraUpdater.offsetY = 0;

      return;
    }

    if (selectedProject) {
      gsap.to(scales, {
        ease: Power4.easeOut,
        duration: 0.7,
        x: 0,
        y: 0,
        z: 0,
      });

      if (w > 1280) {
        gsap.to(cameraUpdater, {
          rotation: 8,
        });
      } else {
        gsap.to(cameraUpdater, {
          offsetY: 36,
        });
      }
    } else {
      gsap.to(scales, {
        x: 1,
        y: 1,
        z: 1,
      });

      gsap.to(cameraUpdater, {
        rotation: 0,
        offsetY: 0,
      });
    }
  }, [selectedProject]);
}
