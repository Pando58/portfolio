export const sections = new Map<number, SectionProps>([
  [0, { path: "/", name: "Home", theme: "dark" }],
  [1, { path: "/projects", name: "Projects", theme: "light" }],
]);

interface SectionProps {
  path: string;
  name: string;
  theme: string;
}
