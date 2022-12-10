function NavEntry({
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

export default NavEntry;
