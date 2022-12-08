import { sections } from "../../data/sectionRoutes";

function Nav({ theme }: { theme: string }) {
  return (
    <div className="absolute inset-y-0 right-0 flex flex-col items-center p-2 z-20 pointer-events-none">
      <div
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
          <Entry sec={id} path={path} theme={theme} key={id}>
            {name}
          </Entry>
        ))}
      </div>
    </div>
  );
}

export default Nav;

function Entry({
  sec,
  path,
  theme,
  children,
}: {
  sec: number;
  path: string;
  theme: string;
  children: JSX.Element | string;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    const state = { sec, theme };

    history.pushState(state, "", path);
    dispatchEvent(new PopStateEvent("popstate", { state }));
  }

  return (
    <a onClick={onClick} href={path}>
      {children}
    </a>
  );
}
