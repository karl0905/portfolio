"use server"
import fs from 'fs';
import path from 'path';

export async function fetchSnippet(fileType) {
  const snippetPath = path.join(process.cwd(), 'data', 'snippets', `snippet.${fileType}`);
  
  try {
    return fs.readFileSync(snippetPath, 'utf8');
  } catch (error) {
    console.error(`Error reading snippet for ${fileType}:`, error);
    return null;
  }
}
