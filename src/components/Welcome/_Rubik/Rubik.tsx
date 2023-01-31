import { Canvas } from "@react-three/fiber";
import RubikThreeScene from "./RubikThreeScene";

function Rubik({ play }: { play: boolean }) {
  return (
    <div className="absolute inset-0 md:z-10">
      <Canvas>
        <RubikThreeScene play={play} />
      </Canvas>
    </div>
  );
}

export default Rubik;
