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

  useEffect(() => {
    addEventListener("popstate", onHistoryChange);

    const pathSection = [...sections].find(
      (i) => i[1].path === location.pathname
    );

    history.replaceState(
      { sec: pathSection ? pathSection[0] : 0 },
      "",
      pathSection ? pathSection[1].path : "/"
    );

    if (pathSection) switchSection();

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

      <Nav />
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
