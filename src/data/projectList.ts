export const projectList: ProjectProps[] = [
  {
    name: "Osmium",
    description:
      "Application for composing procedural polyrhythmic music, making use of connected nodes in a graph editor, and playing their output by placing the graphs on a timeline.",
    repo_url: "https://github.com/Pando58/osmium",
  },
  {
    name: "UAE Evaluation Platform",
    description:
      "An evaluation system for <a href='https://unialvaedison.edu.mx/' target='_blank' class='text-sky-700 italic'>Universidad Alva Edison</a> where students qualify teachers and administrative staff in different categories, in order to analyze the data and improve the quality of the institution.",
    repo_url: "https://github.com/Pando58/uaeval",
  },
  {
    name: "Guitar Trainer",
    description:
      "Application for learning music intervals, showing them randomly but in same amounts, and scrolling each given time.",
    repo_url: "https://github.com/Pando58/guitar-trainer",
  },
  {
    name: "Portfolio",
    description:
      "My personal portfolio website, featuring animations and 3D elements.",
    repo_url: "https://github.com/Pando58/portfolio",
  },
];

export interface ProjectProps {
  name: string;
  description: string;
  repo_url: string;
}
