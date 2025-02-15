export function LualineDir({ currentDir = { dir: "home/karl/projects/portfolio", file: "index" } }) {
  return (
    <p className="text-[var(--text)] opacity-40 text-sm">
      {currentDir.dir && `${currentDir.dir}/`}{currentDir.file || "index"}{!currentDir.file.includes(".jsx") && `.jsx`}
    </p>
  )
}
 
