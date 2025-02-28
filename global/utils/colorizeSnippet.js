const COLORS = ["text-[var(--blue)]", "text-[var(--purple)]", "text-[var(--orange)]"];

export function colorizeSnippet(text, language) {
  const keywords = {
    css: cssKeywords,
    html: htmlKeywords,
    js: javascriptKeywords,
    jsx: reactKeywords,
    next: nextKeywords,
    njs: nodeKeywords,
    php: phpKeywords,
    mysql: mysqlKeywords,
    tw: tailwindKeywords,
    ts: typescriptKeywords,
    docker: dockerKeywords,
    mongo: mongoKeywords,
    drf: drfKeywords
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

// const gitKeywords = [
//   ["commit", "branch", "merge", "pull", "push", "remote", "origin", "master", "main"],
//   ["add", "status", "log", "diff", "checkout", "reset", "rebase", "fetch", "clone"],
//   ["--hard", "--soft", "--global", "--amend", "-m", "-b"]
// ];

const htmlKeywords = [
  [],
  ["head", "meta", "title"],
  ["charset", "name", "content"]
];

const javascriptKeywords = [
  ["a", "b", "subKeywords", "0", "1", "i", "2", "span", "colorizeSnippet", "exec"],
  ["function", "export", "return", "const", "let", "if", "while"],
  ["forEach", "RegExp", "push", "sort", "slice", "join", "escapeHtml", "text", "language", "COLORS"]
];

const typescriptKeywords = [
  ["Request", "Response", "IContact", "string", "undefined", "void", "Promise"],
  ["import", "export", "const", "let", "async", "await", "try", "catch", "if"],
  ["contactController", "searchContacts", "Contact", "find", "json", "status", "console", "error", "req", "res"]
];


const reactKeywords = [
  ["useContentStore", "MainContent", "colorizeString", "colorizeSnippet"],
  ["function", "const", "return"],
  ["@/global", "str", "index"]
];

const nextKeywords = [
  ["export", "async", "function", "const", "await", "return", "default"],
  ["getServerSideProps", "SnippetPage", "fetch", "json"],
  ["params", "props", "$"]
];

const tailwindKeywords = [
  ["use client", "import", "export", "function", "return", "const"],
  ["Button", "twJoin"],
  ["title", "variant", "disabled", "onClick"]
];

const nodeKeywords = [
  ["log", "once", "schedule", "getRecentMatch", "getDescriptions", "getMostRecentMatch", "writeMostRecentMatch", "buildNotificationEmbed"],
  ["const", "try", "catch", "if", "else", "return", "async", "await"],
  ["console"]
];


const phpKeywords = [
  ["getallheaders", "isset", "http_response_code", "json_encode", "exit", "preg_match", "query", "fetch_object", "DateTime", "return"],
  ["function", "if", "else", "echo"],
  ["\\$", "->", "\\$mySQL", "\\$headers", "\\$authHeader", "\\$bearerToken", "\\$sql", "\\$result", "\\$currentDateTime", "\\$accessTokenExpiry", "user_id", "access_token_expiry", "401", "1", "\\$matches"]
];

const dockerKeywords = [
  ["FROM", "AS", "COPY", "RUN", "CMD", "EXPOSE", "WORKDIR", "ENV", "ARG", "VOLUME", "USER", "ENTRYPOINT", "LABEL", "HEALTHCHECK", "ONBUILD"],
  ["npm", "nextjs"],
  ["3000", "ci"]
];

const mysqlKeywords = [
  [],
  ["SELECT", "AS", "FROM", "INNER JOIN", "LEFT JOIN", "ON", "GROUP BY", "HAVING", "LIMIT", "COUNT"],
  ["9000", "42"]
];

const mongoKeywords = [
  ["const", "require", "new", "mongoose", "Schema", "model", "module", "exports"],
  ["String", "Date"],
  ["name", "title", "email", "phone", "location", "summary", "category", "items", "description", "technologies", "imageUrl", "projectUrl", "githubUrl", "company", "position", "startDate", "endDate", "achievements", "institution", "degree", "field", "graduationDate", "issuer", "url", "date"]
];

const drfKeywords = [
  ["return", "class", "if", "else", "elif", "try", "except", "for", "in", "and", "or", "not", "is", "None", "True", "False", "index", "detail", "results", "vote"],
  ["HttpResponse", "render", "APIView", "Response", "status", "serializers", "viewsets", "routers", "permissions", "authentication", "def"],
  ["request", "response", "self", "pk", "queryset", "serializer_class", "permission_classes", "authentication_classes", "lookup_field", "context", "data", "validated_data", "question_id"]
];
