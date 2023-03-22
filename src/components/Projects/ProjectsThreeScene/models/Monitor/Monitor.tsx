import monitor from "@/assets/models/monitor.gltf";
import { VideoMaterial } from "@/lib/VideoMaterial";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { ForwardedRef, forwardRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      Back: THREE.Mesh;
      Base: THREE.Mesh;
      MonitorOutside: THREE.Mesh;
      MonitorScreen: THREE.Mesh;
      Button1: THREE.Mesh;
      Button2: THREE.Mesh;
      Button3: THREE.Mesh;
      Button4: THREE.Mesh;
      ButtonPower: THREE.Mesh;
    };
    materials: {
      Plastic: THREE.MeshStandardMaterial;
      MonitorScreen: THREE.MeshPhysicalMaterial;
      Button: THREE.MeshStandardMaterial;
    };
  };

export default forwardRef((props: JSX.IntrinsicElements["group"] & { videoSrc: string }, ref: ForwardedRef<Group>) => {
  const { nodes, materials } = useGLTF(monitor) as unknown as GLTFResult;

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back.geometry}
        material={materials.Plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Base.geometry}
        material={materials.Plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MonitorOutside.geometry}
        material={materials.Plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MonitorScreen.geometry}
      // material={materials.MonitorScreen}
      >
        <VideoMaterial url={props.videoSrc} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button1.geometry}
        material={materials.Button}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button2.geometry}
        material={materials.Button}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button3.geometry}
        material={materials.Button}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Button4.geometry}
        material={materials.Button}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonPower.geometry}
        material={materials.Button}
      />
    </group>
  );
}
);

useGLTF.preload(monitor);
