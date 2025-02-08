import {
  getRandomTextColorClass,
} from "@/global"

export function colorizeString(str) {
  const links = [];
  
  // First handle the links - convert [[text|url]] to placeholders
  const withPlaceholders = str.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, text, url) => {
    // Store the link info and a random color class for each link
    links.push({ 
      text, 
      url,
      colorClass: getRandomTextColorClass()
    });
    return `###LINK${links.length - 1}###`;
  });

  // Then do the normal color spans
  const withColors = withPlaceholders
    .replaceAll("{{", () => `<span class="${getRandomTextColorClass()}">`)
    .replaceAll("}}", "</span>");

  // Replace link placeholders with colored links
  return withColors.replace(/###LINK(\d+)###/g, (match, index) => {
    const link = links[parseInt(index)];
    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.colorClass} hover:opacity-80 transition-colors duration-200 underline">${link.text}</a>`;
  });
}
