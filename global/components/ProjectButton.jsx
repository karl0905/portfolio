import Link from "next/link";

export function ProjectButton({
  title,
  href,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`cursor-pointer hover:opacity-80 text-[var(--text)] px-4 py-2 border border-[var(--text)] `}
    >
      {title}
    </Link>
  );
}
