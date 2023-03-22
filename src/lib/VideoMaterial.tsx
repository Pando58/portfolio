import { useVideoTexture } from "@react-three/drei";

export function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url, {});
  texture.flipY = false;

  return <meshPhongMaterial map={texture} />
}
