import Loader from "../Loader";
import Nav from "../Nav";
import Projects from "../Projects";
import SwipeTransition from "../SwipeTransition";
import Welcome from "../Welcome";
import "./App.css";
import { useSectionHandling } from "./hooks/useSectionHandling";

function App() {
  const {
    currentSectionId,
    currentSection,
    sectionPlaying,
    transitionPlaying,
    switchSection,
    playSection,
    stopTransition,
  } = useSectionHandling();

  return (
    <>
      <Welcome
        currentSection={currentSectionId}
        sectionPlaying={sectionPlaying}
      />
      <Projects
        currentSection={currentSectionId}
        sectionPlaying={sectionPlaying}
      />

      <Nav theme={currentSection.theme} />
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
