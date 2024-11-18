const COLORS = ["text-[var(--green)]", "text-[var(--purple)]", "text-[var(--orange)]"]

export function getRandomTextColorClass() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
