import { Fileline, Folder } from "@/features/nerdTree";
import skillsData from '@/data/skills.json'; // Importing JSON data directly

const treeContent = [
  {
    content: "\" Press ? for help",
    type: "misc",
    hexcode: "afd75f"
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

export function Tree() {
  const skills = skillsData.data; // Accessing the skills data

  return (
    <div className="flex flex-col px-4 h-screen w-80 bg-transparent border-r-2 border-gray-400">
      {treeContent.map((item, index) => (
        <Fileline
          key={index}
          content={item.content}
          type={item.type}
          hexcode={item.hexcode}
        />
      ))}

      <Folder
        title="skills"
      >
        {skills.map((skill, index) => (
          <p key={index}> {/* Added key for each skill */}
            {skill.name}
          </p>
        ))}
      </Folder>
      <Folder
        title="education"
      >
        {skills.map((skill, index) => (
          <p key={index}> {/* Added key for each skill */}
            {skill.name}
          </p>
        ))}
      </Folder>
      <Folder
        title="projects"
      >
        {skills.map((skill, index) => (
          <p key={index}> {/* Added key for each skill */}
            {skill.name}
          </p>
        ))}
      </Folder>
    </div>
  );
}
