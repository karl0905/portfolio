import {
  getRandomTextColorClass,
} from "@/global"

export function colorizeString(str) {
  return str
    .replaceAll("{{", () => `<span class="${getRandomTextColorClass()}">`)
    .replaceAll("}}", "</span>")
}
