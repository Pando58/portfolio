import guitarTrainerVideo from "@/assets/videos/guitarTrainer.mp4";
import osmiumVideo from "@/assets/videos/osmium.mp4";
import revistaVideo from "@/assets/videos/revista.mp4";
import spotifyVideo from "@/assets/videos/spotify.mp4";

export const projectList: ProjectProps[] = [
  {
    name: "Spotify Player",
    description: "description",
    repo_url: "https://github.com/Pando58/uaeval",
    video: spotifyVideo,
  },
  {
    name: "Osmium",
    description: "description",
    repo_url: "https://github.com/Pando58/osmium",
    video: osmiumVideo,
  },
  {
    name: "UAE School Handbook Site",
    description: "description",
    repo_url: "https://github.com/Pando58/uaeval",
    video: revistaVideo,
  },
  {
    name: "Guitar Trainer",
    description: "description",
    repo_url: "https://github.com/Pando58/guitar-trainer",
    video: guitarTrainerVideo,
  },
];

export interface ProjectProps {
  name: string;
  description: string;
  repo_url: string;
  video: string;
}
