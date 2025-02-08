import { Fileline, Folder } from "@/features/nerdTree";
import {
  getExperience,
  getProjects,
  getSkills,
  getReadme
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

const files = [
  {
    title: "README.md",
    route: "readme",
    type: "file",
    content: getReadme(),
  },
]
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
       min-w-[22rem] bg-transparent border-r-2 border-gray-400">
      {treeContent.map((item, index) => (
        <Fileline
          key={index}
          content={item.content}
          type={item.type}
          hexcode={item.hexcode}
        />
      ))}
      {files.map((file, index) => (
        <Fileline
          key={index}
          title={file.title}
          route={file.route}
          content={file.content}
        />
      )
      )}
      {folders.map((folder, index) => (
        <Folder
          key={index}
          title={folder.title}
          route={folder.route}
          content={folder.content}
        />
      ))
      }
    </div>
  );
}
