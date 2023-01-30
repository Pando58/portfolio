import uaeval3D from "@/assets/models/uaeval3D.gltf";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { ForwardedRef, forwardRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      Bg1: THREE.Mesh;
      Bg2: THREE.Mesh;
      MainBoard: THREE.Mesh;
      Nav: THREE.Mesh;
    };
    materials: {
      BgWhite: THREE.MeshPhysicalMaterial;
      BgGreen: THREE.MeshPhysicalMaterial;
      Screenshot: THREE.MeshPhysicalMaterial;
    };
  };

export default forwardRef(
  (props: JSX.IntrinsicElements["group"], ref: ForwardedRef<Group>) => {
    const { nodes, materials } = useGLTF(uaeval3D) as unknown as GLTFResult;
    return (
      <group {...props} ref={ref} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bg1.geometry}
          material={materials.BgWhite}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bg2.geometry}
          material={materials.BgGreen}
          position={[0, 0, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MainBoard.geometry}
          material={materials.Screenshot}
          position={[0, 0, 0.075]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Nav.geometry}
          material={materials.Screenshot}
          position={[0, 0, 0.025]}
        />
      </group>
    );
  }
);

useGLTF.preload(uaeval3D);
