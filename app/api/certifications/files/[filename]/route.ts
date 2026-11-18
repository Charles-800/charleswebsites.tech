import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CERTIFICATIONS_UPLOAD_DIR } from '@/lib/server/store';

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      return NextResponse.json({ ok: false, error: 'Invalid filename.' }, { status: 400 });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_BY_EXT[ext];
    if (!contentType) {
      return NextResponse.json({ ok: false, error: 'Unsupported file type.' }, { status: 400 });
    }

    const filePath = path.join(CERTIFICATIONS_UPLOAD_DIR, filename);
    const data = await fs.readFile(filePath);

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${filename}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=31536000, immutable',
    };

    if (ext === '.svg') {
      headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'; sandbox;";
    }

    return new NextResponse(data, { status: 200, headers });
  } catch {
    return NextResponse.json({ ok: false, error: 'File not found.' }, { status: 404 });
  }
}
