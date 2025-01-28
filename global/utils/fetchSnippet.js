export async function fetchSnippet(filename) {
  const res = await fetch(`/api/snippets?file=${filename}`);
  if (res.status === 404) {
    console.log('File not found or could not be read');
    return null;
  }
  return res.text();
}
