import {
  getRandomTextColorClass,
} from "@/global"

export function colorizeString(str) {
  const links = [];
  
  // handle links - convert [[text|url]] to placeholders
  const withPlaceholders = str.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, text, url) => {
    // Store link info and random color class for link
    links.push({ 
      text, 
      url,
      colorClass: getRandomTextColorClass()
    });
    return `###LINK${links.length - 1}###`;
  });

  // Replace color placeholders with colored spans
  const withColors = withPlaceholders
    .replaceAll("{{", () => `<span class="${getRandomTextColorClass()}">`)
    .replaceAll("}}", "</span>");

  // Replace link placeholders with colored links
  return withColors.replace(/###LINK(\d+)###/g, (match, index) => {
    const link = links[parseInt(index)];
    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${link.colorClass} hover:opacity-80 transition-colors duration-200 underline">${link.text}</a>`;
  });
}
