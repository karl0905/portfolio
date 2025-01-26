export function colorizeSnippet(text, language) {
  const keywords = {
    css: cssKeywords,
    git: gitKeywords,
    html: htmlKeywords,
    js: javascriptKeywords,
    jsx: reactKeywords,
    njs: nodeKeywords,
    php: phpKeywords,
    sql: sqlKeywords,
    tw: tailwindKeywords,
    zsh: zshKeywords,
  }[language];

  if (!keywords) {
    return escapeHtml(text);
  }

  let spans = [];

  keywords.forEach((subKeywords, i) => {
    if (subKeywords.length === 0) {
      return;
    }

    const regex = new RegExp(`(^|[^-\\w])(${subKeywords.join("|")})(?![\\w-])`, "g");
    let match;
    while ((match = regex.exec(text)) !== null) {
      spans.push({
        start: match.index + match[1].length,
        end: match.index + match[0].length,
        color: COLORS[i],
        text: match[2]
      });
    }
  });

  spans.sort((a, b) => a.start - b.start);

  let result = '';
  let lastIndex = 0;

  spans.forEach(span => {
    result += escapeHtml(text.slice(lastIndex, span.start));
    result += `<span class="${span.color}">${escapeHtml(span.text)}</span>`;
    lastIndex = span.end;
  });

  result += escapeHtml(text.slice(lastIndex));

  return result;
}
