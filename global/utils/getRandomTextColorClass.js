export const COLORS = ["text-[var(--blue)]", "text-[var(--purple)]", "text-[var(--orange)]"]

export function getRandomTextColorClass() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
