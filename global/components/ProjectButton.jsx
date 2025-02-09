export function ProjectButton({
  title,
  href,
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-pointer hover:opacity-80 text-[var(--text)] px-4 py-2 border border-[var(--text)] `}
    >
      {title}
    </a>
  );
}
