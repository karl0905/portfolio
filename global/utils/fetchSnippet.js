export async function fetchSnippet(filename) {
  const res = await fetch(`/api/snippets?file=${filename}`);
  return res.text();
}
