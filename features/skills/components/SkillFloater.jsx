import Image from "next/image";

export function SkillFloater({ source }) {
  return (
    <>
      <Image src={source} alt="image of skill" height="140" width="140"/>
    </>
  );
}
