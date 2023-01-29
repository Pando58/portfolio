import osmium3D from "@/assets/models/osmium3D.gltf";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { ForwardedRef, forwardRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      Base: THREE.Mesh;
      SectionGraph: THREE.Mesh;
      SectionTabs: THREE.Mesh;
      Line1: THREE.Mesh;
      Line2: THREE.Mesh;
      Line3: THREE.Mesh;
      Line4: THREE.Mesh;
      IconTracks: THREE.Mesh;
      IconNodes: THREE.Mesh;
      NodeStart: THREE.Mesh;
      IconMixer: THREE.Mesh;
      NodeOutput: THREE.Mesh;
      NodeDataSequencer: THREE.Mesh;
      NodeNoteSequencer: THREE.Mesh;
      SectionTrack: THREE.Mesh;
      SectionTrackItems: THREE.Mesh;
      SectionTrackNames: THREE.Mesh;
    };
    materials: {
      Dark1: THREE.MeshPhysicalMaterial;
      Dark2: THREE.MeshPhysicalMaterial;
      WireWhite: THREE.MeshStandardMaterial;
      WireOrange: THREE.MeshStandardMaterial;
      WireGreen: THREE.MeshStandardMaterial;
      IconTracks: THREE.MeshStandardMaterial;
      IconNodes: THREE.MeshStandardMaterial;
      MatNodeStart: THREE.MeshPhysicalMaterial;
      IconMixer: THREE.MeshStandardMaterial;
      MatNodeOutput: THREE.MeshPhysicalMaterial;
      MatNodeDataSequencer: THREE.MeshPhysicalMaterial;
      MatNodeNoteSequencer: THREE.MeshPhysicalMaterial;
      SecTrackBg: THREE.MeshPhysicalMaterial;
      SecTrackItems: THREE.MeshPhysicalMaterial;
      SecTrackNames: THREE.MeshPhysicalMaterial;
    };
  };

export default forwardRef(
  (props: JSX.IntrinsicElements["group"], ref: ForwardedRef<Group>) => {
    const { nodes, materials } = useGLTF(osmium3D) as unknown as GLTFResult;
    return (
      <group {...props} ref={ref} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Base.geometry}
          material={materials.Dark1}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SectionGraph.geometry}
          material={materials.Dark2}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SectionTabs.geometry}
          material={materials.Dark2}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line1.geometry}
          material={materials.WireWhite}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line2.geometry}
          material={materials.WireWhite}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line3.geometry}
          material={materials.WireOrange}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Line4.geometry}
          material={materials.WireGreen}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IconTracks.geometry}
          material={materials.IconTracks}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IconNodes.geometry}
          material={materials.IconNodes}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NodeStart.geometry}
          material={materials.MatNodeStart}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.IconMixer.geometry}
          material={materials.IconMixer}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NodeOutput.geometry}
          material={materials.MatNodeOutput}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NodeDataSequencer.geometry}
          material={materials.MatNodeDataSequencer}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NodeNoteSequencer.geometry}
          material={materials.MatNodeNoteSequencer}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SectionTrack.geometry}
          material={materials.SecTrackBg}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SectionTrackItems.geometry}
          material={materials.SecTrackItems}
          scale={0.2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SectionTrackNames.geometry}
          material={materials.SecTrackNames}
          scale={0.2}
        />
      </group>
    );
  }
);

useGLTF.preload(osmium3D);
