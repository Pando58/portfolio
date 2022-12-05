import { sections } from "../../data/sectionRoutes";

function Nav() {
  return (
    <div className="absolute inset-y-0 right-0 flex flex-col items-center p-2 z-20">
      <div
        className="p-2 pt-4 uppercase text-slate-100 font-bold text-sm tracking-wider flex space-y-8"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {[...sections].map(([id, { path, name }]) => (
          <Entry sec={id} path={path} key={id}>
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
  children,
}: {
  sec: number;
  path: string;
  children: JSX.Element | string;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    const state = { sec };

    history.pushState(state, "", path);
    dispatchEvent(new PopStateEvent("popstate", { state }));
  }

  return (
    <a onClick={onClick} href={path}>
      {children}
    </a>
  );
}
