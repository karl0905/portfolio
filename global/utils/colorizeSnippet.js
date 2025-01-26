const COLORS = ["text-[var(--blue)]", "text-[var(--purple)]", "text-[var(--orange)]"];

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

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const cssKeywords = [
  [],
  ["root", "body", "layer", "utilities", "h1", "p", "pre"],
  ["background", "font-family", "text-wrap", "font-size", "font-weight", "color", "user-select"]
];

const gitKeywords = [
  ["commit", "branch", "merge", "pull", "push", "remote", "origin", "master", "main"],
  ["add", "status", "log", "diff", "checkout", "reset", "rebase", "fetch", "clone"],
  ["--hard", "--soft", "--global", "--amend", "-m", "-b"]
];

const htmlKeywords = [
  [],
  ["head", "meta", "title"],
  ["charset", "name", "content"]
];

const javascriptKeywords = [
  ["a", "b", "text", "language", "subKeywords", "0", "1", "i", "2", "span"],
  ["function", "export", "return", "const", "let", "if", "while"],
  ["forEach", "RegExp", "push", "sort", "slice", "join", "exec", "escapeHtml"]
];

const reactKeywords = [
  ["useContentStore", "MainContent", "colorizeString", "colorizeSnippet"],
  ["function", "const", "return"],
  ["@/global", "str", "index"]
];

const nodeKeywords = [
  ["require", "module.exports", "process", "__dirname", "__filename"],
  ["async", "await", "Promise", "Buffer", "fs", "http", "path"],
  ["readFile", "writeFile", "createServer", "listen", "connect"]
];

const phpKeywords = [
  ["<?php", "?>", "echo", "print", "if", "else", "elseif", "foreach", "while", "function"],
  ["$", "public", "private", "protected", "class", "new", "return", "include", "require"],
  ["array()", "strlen()", "isset()", "empty()", "die()", "mysqli_connect()"]
];

const sqlKeywords = [
  ["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP", "TABLE"],
  ["JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT"],
  ["COUNT()", "SUM()", "AVG()", "MAX()", "MIN()", "DISTINCT", "AS"]
];

const tailwindKeywords = [
  ["flex", "grid", "container", "text-", "bg-", "p-", "m-", "w-", "h-", "rounded-"],
  ["sm:", "md:", "lg:", "xl:", "2xl:", "hover:", "focus:", "active:"],
  ["@apply", "@screen", "@variants", "@responsive", "@tailwind"]
];

const zshKeywords = [
  ["if", "then", "else", "fi", "for", "do", "done", "while", "case", "esac"],
  ["export", "alias", "unalias", "source", "echo", "print", "read", "local"],
  ["$PATH", "$HOME", "$USER", "$SHELL", "${}", "$()", "``"]
];
