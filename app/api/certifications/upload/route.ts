import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  CERTIFICATIONS_UPLOAD_DIR,
  ensureCertificationsUploadDir,
} from '@/lib/server/store';
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
} from '@/lib/server/security';

const ALLOWED_CERTIFICATE_MIME: Record<string, { ext: string; kind: 'image' | 'pdf' }> = {
  'image/png': { ext: 'png', kind: 'image' },
  'image/jpeg': { ext: 'jpg', kind: 'image' },
  'image/webp': { ext: 'webp', kind: 'image' },
  'application/pdf': { ext: 'pdf', kind: 'pdf' },
};

const ALLOWED_LOGO_MIME: Record<string, { ext: string; kind: 'image' }> = {
  'image/png': { ext: 'png', kind: 'image' },
  'image/jpeg': { ext: 'jpg', kind: 'image' },
  'image/webp': { ext: 'webp', kind: 'image' },
  'image/svg+xml': { ext: 'svg', kind: 'image' },
};

const MAX_CERTIFICATE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden upload origin.' },
        { status: 403 }
      );
    }

    const adminKey = process.env.CERTIFICATIONS_ADMIN_KEY?.trim();
    if (adminKey) {
      const authHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
      if (authHeader !== adminKey) {
        return NextResponse.json(
          { ok: false, error: 'Unauthorized upload request.' },
          { status: 401 }
        );
      }
    }

    const rate = checkRateLimit('certifications-upload', getClientIp(req), 20, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many uploads. Please wait a minute.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const purpose = formData.get('purpose') === 'logo' ? 'logo' : 'certificate';

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: 'No file selected for upload.' },
        { status: 400 }
      );
    }

    const maxBytes = purpose === 'logo' ? MAX_LOGO_BYTES : MAX_CERTIFICATE_BYTES;
    if (file.size <= 0 || file.size > maxBytes) {
      return NextResponse.json(
        {
          ok: false,
          error:
            purpose === 'logo'
              ? 'Institution logo must be 2 MB or smaller.'
              : 'Certificate file must be 10 MB or smaller.',
        },
        { status: 400 }
      );
    }

    const mimeMap = purpose === 'logo' ? ALLOWED_LOGO_MIME : ALLOWED_CERTIFICATE_MIME;
    const matched = mimeMap[file.type];
    if (!matched) {
      return NextResponse.json(
        {
          ok: false,
          error:
            purpose === 'logo'
              ? 'Supported logo formats: PNG, JPG, WebP, or SVG.'
              : 'Supported certificate formats: PNG, JPG, WebP, or PDF.',
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await ensureCertificationsUploadDir();
    const safeFilename = `${purpose}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${matched.ext}`;
    const destPath = path.join(CERTIFICATIONS_UPLOAD_DIR, safeFilename);
    await fs.writeFile(destPath, buffer);

    return NextResponse.json(
      {
        ok: true,
        url: `/api/certifications/files/${safeFilename}`,
        fileType: matched.kind,
        originalName: file.name.replace(/[^\w.\-\s]/g, '').slice(0, 120) || safeFilename,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to process uploaded file.' },
      { status: 500 }
    );
  }
}
