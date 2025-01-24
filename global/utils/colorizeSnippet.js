export function colorizeSnippet() {
  const element = document.getElementsByTagName("code")[0];

  if (element == null) {
    return;
  }

  const text = element.innerText;
  const language = element.classList[0];

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

  if (keywords == null) {
    return;
  }

  let coloredText = text;

  keywords.forEach((subKeywords, i) => {
    if (subKeywords.length === 0) {
      return;
    }

    const regex = new RegExp(`\\b(${subKeywords.join("|")})\\b`, "g");
    coloredText = coloredText.replaceAll(
      regex,
      (match) => `<span class="${COLORS[i]}">${match}</span>`,
    );
  });

  element.innerHTML = coloredText;
}

const cssKeywords = [
  ["class", "id", "body", "html", "div", "span", "p", "a", "img", "ul", "li"],
  ["color", "background", "margin", "padding", "font-size", "display", "position", "width", "height", "border", "flex"],
  ["rgba", "var", "calc", "url", "linear-gradient"]
];

const gitKeywords = [
  ["commit", "branch", "merge", "pull", "push", "remote", "origin", "master", "main"],
  ["add", "status", "log", "diff", "checkout", "reset", "rebase", "fetch", "clone"],
  ["--hard", "--soft", "--global", "--amend", "-m", "-b"]
];

const htmlKeywords = [
  ["html", "head", "body", "div", "span", "p", "a", "img", "ul", "li", "form"],
  ["class", "id", "style", "href", "src", "alt", "type", "value", "placeholder"],
  ["<!DOCTYPE>", "<meta>", "<link>", "<script>"]
];

const javascriptKeywords = [
  ["function", "var", "let", "const", "if", "else", "for", "while", "switch", "case"],
  ["return", "break", "continue", "this", "new", "typeof", "instanceof", "null", "undefined"],
  ["console.log", "parseInt", "JSON.stringify", "Math.random", "Array.isArray"]
];

const reactKeywords = [
  ["React", "Component", "useState", "useEffect", "useContext", "props", "state"],
  ["render", "return", "className", "onClick", "onChange", "onSubmit", "key"],
  ["ReactDOM.render", "createElement", "cloneElement", "createContext"]
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
