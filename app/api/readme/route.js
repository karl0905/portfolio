import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(path.join(dataDirectory, 'readme.json'), 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}
