import { useEffect, useState } from "react";
import { sections } from "../../data/sectionRoutes";
import Loader from "../Loader";
import Nav from "../Nav";
import Projects from "../Projects";
import SwipeTransition from "../SwipeTransition";
import Welcome from "../Welcome";
import "./App.css";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionPlaying, setSectionPlaying] = useState(false);
  const [transitionPlaying, setTransitionPlaying] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    addEventListener("popstate", onHistoryChange);

    const pathSec =
      [...sections].find((i) => i[1].path === location.pathname) ||
      [...sections][0];

    history.replaceState(
      {
        sec: pathSec[0],
        theme: pathSec[1].theme,
      },
      "",
      pathSec[1].path
    );

    switchSection();

    return () => {
      removeEventListener("popstate", onHistoryChange);
    };
  }, []);

  function onHistoryChange() {
    setTransitionPlaying(true);
  }

  function switchSection() {
    setSectionPlaying(false);
    setCurrentSection(history.state.sec);
    setTheme(history.state.theme);
  }

  function playSection() {
    setSectionPlaying(true);
  }

  function stopTransition() {
    setTransitionPlaying(false);
  }

  return (
    <>
      <Welcome
        currentSection={currentSection}
        sectionPlaying={sectionPlaying}
      />
      <Projects
        currentSection={currentSection}
        sectionPlaying={sectionPlaying}
      />

      <Nav theme={theme} />
      <Loader onFinish={playSection} />
      <SwipeTransition
        transitionPlaying={transitionPlaying}
        onTransition={switchSection}
        onExit={playSection}
        onComplete={stopTransition}
      />
    </>
  );
}

export default App;
