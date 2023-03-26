import guitarTrainerVideo from "@/assets/videos/guitarTrainer.mp4";
import osmiumVideo from "@/assets/videos/osmium.mp4";
import revistaVideo from "@/assets/videos/revista.mp4";
import spotifyVideo from "@/assets/videos/spotify.mp4";
import { Lang } from "@/lib/langHandler";

export const projectList: ProjectProps[] = [
  {
    name: {
      en: "Spotify Player",
      es: "Spotify Player",
    },
    description: {
      en: "description",
      es: "description",
    },
    repo_url: "https://github.com/Pando58/uaeval",
    video: spotifyVideo,
  },
  {
    name: {
      en: "Osmium",
      es: "Osmium",
    },
    description: {
      en: "description",
      es: "description",
    },
    repo_url: "https://github.com/Pando58/osmium",
    video: osmiumVideo,
  },
  {
    name: {
      en: "UAE School Handbook Site",
      es: "UAE School Handbook Site",
    },
    description: {
      en: "description",
      es: "description",
    },
    repo_url: "https://github.com/Pando58/uaeval",
    video: revistaVideo,
  },
  {
    name: {
      en: "Guitar Trainer",
      es: "Guitar Trainer",
    },
    description: {
      en: "description",
      es: "description",
    },
    repo_url: "https://github.com/Pando58/guitar-trainer",
    video: guitarTrainerVideo,
  },
];

export interface ProjectProps {
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  repo_url: string;
  video: string;
}
