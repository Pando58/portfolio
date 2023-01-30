import { FaCodepen, FaGithub } from "react-icons/fa";
import { sections } from "../../data/sectionRoutes";
import NavEntry from "./NavEntry";

function Nav({ theme }: { theme: string }) {
  return (
    <nav className="absolute inset-y-0 right-0 flex flex-col items-center justify-between p-2 z-20 pointer-events-none">
      <ul
        className={`
          p-2 pt-4 uppercase font-bold text-sm tracking-wider flex space-y-8 pointer-events-auto
          ${theme === "dark" ? "text-zinc-100" : "text-zinc-800"}
        `}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {[...sections].map(([id, { path, name, theme }]) => (
          <NavEntry sec={id} path={path} theme={theme} key={id}>
            {name}
          </NavEntry>
        ))}
      </ul>
      <ul
        className={`
          p-2 pb-2 uppercase font-bold text-2xl tracking-wider flex space-y-4 pointer-events-auto
          ${theme === "dark" ? "text-zinc-100" : "text-zinc-800"}
        `}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <li>
          <a href="https://github.com/Pando58" target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://codepen.io/pando_" target="_blank">
            <FaCodepen />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
