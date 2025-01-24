import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filetype = searchParams.get('file');
  const filename = `snippet.${filetype}`;

  if (!filetype) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const dataDirectory = path.join(process.cwd(), 'data', 'snippets');
  try {
    const fileContents = await fs.readFile(path.join(dataDirectory, filename), 'utf8');
    return new NextResponse(fileContents, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found or could not be read' }, { status: 404 });
  }
}

