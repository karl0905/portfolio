import { Fileline, Folder } from "@/features/nerdTree";
import {
  getExperience,
  getProjects,
  getSkills,
} from "@/global";

const treeContent = [
  {
    content: "\" Press ? for help",
    type: "misc",
    hexcode: "afd75f"
  },
  {
    content: <br />,
    type: "misc",
    hexcode: "9574d7"
  },
  {
    content: ".. (up a dir)",
    type: "misc",
    hexcode: "af87ff"
  },
  {
    content: "/home/karl/projects/portfolio/",
    type: "misc",
    hexcode: "9574d7"
  },
];

const folders = [
  {
    title: "experience",
    route: "experience",
    content: getExperience(),
  },
  {
    title: "projects",
    route: "projects",
    content: getProjects(),
  },
  {
    title: "skills_and_tools",
    route: "skills",
    content: getSkills(),
  },
]

export async function Tree() {
  return (
    <div
      className="overflow-y-auto overflow-x-none flex flex-col px-4 
       min-w-80 bg-transparent border-r-2 border-gray-400">
      {treeContent.map((item, index) => (
        <Fileline
          key={index}
          content={item.content}
          type={item.type}
          hexcode={item.hexcode}
        />
      ))}

      {folders.map((folder, index) => (
        <Folder
          key={index}
          title={folder.title}
          route={folder.route}
          content={folder.content}
        />
      ))}
    </div>
  );
}
