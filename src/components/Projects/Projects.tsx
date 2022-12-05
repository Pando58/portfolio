function Projects({
  currentSection,
  sectionPlaying,
}: {
  currentSection: number;
  sectionPlaying: boolean;
}) {
  return (
    <section
      className="absolute inset-0 bg-slate-800 pt-8"
      style={{
        display: currentSection === 1 ? "grid" : "none",
      }}
    >
      <h2 className="text-slate-100 text-4xl m-8">PROJECTS</h2>
    </section>
  );
}

export default Projects;
