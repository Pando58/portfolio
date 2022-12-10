import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { Expo, gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh, PerspectiveCamera as ThreePerspectiveCamera } from "three";

function Projects({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  const [play, setPlay] = useState(false);
  const [playScene, setPlayScene] = useState(false);
  const splideRef = useRef<Splide>(null!);
  const mainContainerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setPlay(sectionPlaying && currentSection === 1);
  }, [currentSection, sectionPlaying]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reset
      if (!play) {
        gsap.set("h2 span[data-anim]", {
          y: "100%",
        });

        setPlayScene(false);

        return;
      }

      // Play
      gsap.fromTo(
        "h2 span[data-anim]",
        {
          y: "95%",
        },
        {
          duration: 1,
          stagger: 0.3,
          ease: Expo.easeInOut,
          y: 0,
        }
      );

      gsap.delayedCall(0.5, () => setPlayScene(true));
    }, mainContainerRef);

    const splide = splideRef.current?.splide;

    if (splide) {
      splide.go(0);
      splide.refresh();
    }

    return () => ctx.revert();
  }, [play]);

  return (
    <section
      className="absolute inset-0 bg-zinc-300"
      style={{
        display: currentSection === 1 ? "block" : "none",
      }}
    >
      <div className="absolute inset-0">
        <Canvas>
          <Scene play={playScene} />
        </Canvas>
      </div>
      <div ref={mainContainerRef} className="flex flex-col h-full">
        <div className="flex-1 text-center">
          <h2 className="overflow-hidden text-zinc-600 text-4xl mt-16 font-sans-semiexpanded">
            <span className="inline-block" data-anim>
              PROJECTS
            </span>
          </h2>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            paddingBottom: "min(42%, 58vh)" /* Simulate 3d scene spacing */,
          }}
        >
          <div className="absolute inset-0">
            <Splide
              ref={splideRef}
              className="h-full"
              hasTrack={false}
              options={{
                // perPage: 3,
                fixedWidth: "min(56%, 76vh)",
                gap: "max(11%, calc(25vw - 19vh))",
                focus: "center",
                trimSpace: false,
                updateOnMove: true,
                wheel: true,
                pagination: false,
                arrows: false,
              }}
              aria-label="Projects"
            >
              <SplideTrack className="h-full">
                {[...Array(10)].map((_, i) => (
                  <SplideSlide
                    className="bg-neutral-400 bg-opacity-40"
                    key={i}
                  />
                ))}
              </SplideTrack>
            </Splide>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="overflow-hidden text-zinc-800 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-12 text-center">
            <span className="inline-block" data-anim>
              Osmium
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Projects;

function Scene({ play }: { play: boolean }) {
  const threeState = useThree((state) => state.get);
  const cameraRef = useRef<ThreePerspectiveCamera>(null!);
  const example = useRef<Mesh>(null!);

  useEffect(() => {
    const updateCamera = () => {
      const camera = cameraRef.current;
      const { width: w, height: h } = threeState().size;

      // Adjust camera FOV using width and height
      if ("fov" in camera) {
        camera.aspect = w / h;

        const hfov = 40;
        const minFov = 30;

        camera.fov = Math.max(
          minFov,
          (Math.atan(Math.tan((hfov * Math.PI) / 360) / camera.aspect) * 360) /
            Math.PI
        );

        camera.updateProjectionMatrix();
      }
    };

    updateCamera();
    addEventListener("resize", updateCamera);

    return () => {
      removeEventListener("resize", updateCamera);
    };
  }, []);

  useLayoutEffect(() => {
    if (!play) return;

    const ctx = gsap.context(() => {
      gsap.to(example.current.scale, {
        duration: 1,
        ease: Expo.easeOut,
        x: 1,
        y: 1,
        z: 1,
      });
    });

    return () => ctx.revert();
  }, [play]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={40}
        position={[0, 0, 4]}
      />
      <mesh ref={example} scale={0}>
        <boxGeometry args={[1.6, 1.2, 0.05]} />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
