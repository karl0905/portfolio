export function LualineDir({ currentDir = { dir: "home/karl/projects/portfolio", file: "index" } }) {
  return (
    <p className="text-[var(--text)] opacity-40 text-sm pl-2">
      {currentDir.dir && `${currentDir.dir}/`}{currentDir.file || "index"}{!currentDir.file.includes(".jsx") && `home.jsx`}
    </p>
  )
}
 
