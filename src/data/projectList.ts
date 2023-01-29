import Osmium3D from "@/components/Projects/ProjectsThreeScene/models/Osmium3D";
import { ForwardRefExoticComponent } from "react";

export const projectList: ProjectProps[] = [
  {
    name: "Osmium",
    description:
      "Application for composing procedural polyrhythmic music, making use of connected nodes in a graph editor, and playing their output by placing the graphs on a timeline.",
    repo_url: "https://github.com/Pando58/osmium",
    modelComponent: Osmium3D,
  },
  {
    name: "UAE Evaluation Platform",
    description:
      "An evaluation system for <a href='https://unialvaedison.edu.mx/' target='_blank' class='text-sky-700 italic'>Universidad Alva Edison</a> where students qualify teachers and administrative staff in different categories, in order to analyze the data and improve the quality of the institution.",
    repo_url: "https://github.com/Pando58/uaeval",
    modelComponent: Osmium3D,
  },
  {
    name: "Guitar Trainer",
    description:
      "Application for learning music intervals, showing them randomly but in same amounts, and scrolling each given time.",
    repo_url: "https://github.com/Pando58/guitar-trainer",
    modelComponent: Osmium3D,
  },
  {
    name: "Portfolio",
    description:
      "My personal portfolio website, featuring animations and 3D elements.",
    repo_url: "https://github.com/Pando58/portfolio",
    modelComponent: Osmium3D,
  },
];

export interface ProjectProps {
  name: string;
  description: string;
  repo_url: string;
  modelComponent: ForwardRefExoticComponent<any>;
}
