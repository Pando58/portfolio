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
      en: "A Spotify client site that allows to view and control playlists and tracks through authentication using the Spotify API, including playback controls and dynamic track information.",
      es: "Un cliente para Spotify que permite ver y controlar listas de reproducción por medio de autenticación utilizando la API de Spotify, mostrando controles de reproducción e información dinámica de sus canciones.",
    },
    repo_url: "https://github.com/Pando58/spotify-player",
    video: spotifyVideo,
  },
  {
    name: {
      en: "Osmium",
      es: "Osmium",
    },
    description: {
      en: "A music creation tool that allows to procedurally generate melodies and rhythms through node graphs, allowing for easy creation of polyrhythmic music and unique, dynamic compositions.",
      es: "Una herramienta de creación musical que permite generar melodias y ritmos por medio de diagramas de nodos, permitiendo crear fácilmente música polirrítmica, así como únicas composiciones dinámicas.",
    },
    repo_url: "https://github.com/Pando58/osmium",
    video: osmiumVideo,
  },
  {
    name: {
      en: "UAE School Handbook Site",
      es: "Sitio web Revista UAE",
    },
    description: {
      en: "<a href='https://unialvaedison.edu.mx/' target='_blank' class='link-highlight'>Universidad Alva Edison</a>'s online handbook site showcasing multimedia content such as images, videos and 360° photos related to the university's history and other features.",
      es: "Página web para la revista de la <a href='https://unialvaedison.edu.mx/' target='_blank' class='link-highlight'>Universidad Alva Edison</a>, mostrando contenido multimedia como imágenes, videos y fotografías 360° acerca de la historia y otros datos de la universidad.",
    },
    repo_url: "https://github.com/Pando58/revista-uae",
    video: revistaVideo,
  },
  {
    name: {
      en: "Guitar Trainer",
      es: "Guitar Trainer",
    },
    description: {
      en: "A music learning tool that focuses on improving the user's knowledge of musical intervals. As the user progresses, the tool dynamically generates new intervals, and allows the user to configure it to its liking.",
      es: "Una herramienta de aprendizaje musical que se enfoca en mejorar el conocimiento de los intervalos musicales del usuario. Conforme este progresa, la herramienta genera nuevos intervalos, y permite configurar la herramienta a su gusto.",
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
