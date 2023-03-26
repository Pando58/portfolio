import { Lang } from "@/lib/langHandler";

export const sections = new Map<number, SectionProps>([
  [
    0,
    {
      path: "/",
      name: {
        en: "Home",
        es: "Inicio",
      },
      theme: "dark",
    },
  ],
  [
    1,
    {
      path: "/projects",
      name: {
        en: "Projects",
        es: "Proyectos",
      },
      theme: "light",
    },
  ],
]);

interface SectionProps {
  path: string;
  name: Record<Lang, string>;
  theme: string;
}
