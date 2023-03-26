function ProjectDescription({ html }: { html: string }) {
  return (
    <p
      className="text-justify font-sans xl:text-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default ProjectDescription;
