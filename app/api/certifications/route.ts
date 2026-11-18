import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { CertificationItem, CertificationStatus } from '@/lib/data/certifications';
import { getAllCertifications, saveCertifications } from '@/lib/server/store';
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  sanitizeSingleLine,
} from '@/lib/server/security';

const VALID_STATUSES: CertificationStatus[] = ['earned', 'in_progress', 'planned'];

function sanitizeOptionalAssetUrl(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (
    /^\/api\/certifications\/files\/[a-zA-Z0-9._-]+$/.test(trimmed) ||
    /^\/(?:images|assets)\/[a-zA-Z0-9_./-]+$/.test(trimmed) ||
    /^https?:\/\/[^\s"'<>]+$/i.test(trimmed)
  ) {
    return trimmed.slice(0, 500);
  }
  return undefined;
}

function sanitizeOptionalHttpUrl(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\/[^\s"'<>]+$/i.test(trimmed)) {
    return trimmed.slice(0, 500);
  }
  return undefined;
}

export async function GET() {
  try {
    const certifications = await getAllCertifications();
    return NextResponse.json({ ok: true, certifications });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Failed to load certifications.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden request origin.' },
        { status: 403 }
      );
    }

    const adminKey = process.env.CERTIFICATIONS_ADMIN_KEY?.trim();
    if (adminKey) {
      const authHeader = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
      if (authHeader !== adminKey) {
        return NextResponse.json(
          { ok: false, error: 'Unauthorized certification write request.' },
          { status: 401 }
        );
      }
    }

    const rate = checkRateLimit('certifications-write', getClientIp(req), 25, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const body = await req.json();
    const title = typeof body.title === 'string' ? sanitizeSingleLine(body.title, 180) : '';
    const institution =
      typeof body.institution === 'string' ? sanitizeSingleLine(body.institution, 160) : '';
    const status: CertificationStatus = VALID_STATUSES.includes(body.status)
      ? body.status
      : 'earned';
    const dateEarned =
      typeof body.dateEarned === 'string' && body.dateEarned.trim()
        ? sanitizeSingleLine(body.dateEarned, 60)
        : undefined;
    const credentialId =
      typeof body.credentialId === 'string' && body.credentialId.trim()
        ? sanitizeSingleLine(body.credentialId, 120)
        : undefined;
    const institutionLogo = sanitizeOptionalAssetUrl(body.institutionLogo);
    const certificateFileUrl = sanitizeOptionalAssetUrl(body.certificateFileUrl);
    const certificateFileType =
      body.certificateFileType === 'pdf' || body.certificateFileType === 'image'
        ? body.certificateFileType
        : undefined;
    const certificateFileName =
      typeof body.certificateFileName === 'string' && body.certificateFileName.trim()
        ? sanitizeSingleLine(body.certificateFileName, 140)
        : undefined;
    const verificationUrl = sanitizeOptionalHttpUrl(body.verificationUrl);

    if (title.length < 2 || institution.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Certification title and issuing institution are required.' },
        { status: 400 }
      );
    }

    if (
      typeof body.verificationUrl === 'string' &&
      body.verificationUrl.trim() &&
      !verificationUrl
    ) {
      return NextResponse.json(
        { ok: false, error: 'Verification URL must start with https:// or http://.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newItem: CertificationItem = {
      id: `cert-${crypto.randomUUID()}`,
      title,
      institution,
      institutionLogo,
      status,
      dateEarned,
      credentialId,
      certificateFileUrl,
      certificateFileType,
      certificateFileName,
      verificationUrl,
      createdAt: now,
      updatedAt: now,
    };

    const existing = await getAllCertifications();
    const updated = [newItem, ...existing];
    await saveCertifications(updated);

    revalidatePath('/');
    revalidatePath('/about');

    return NextResponse.json({ ok: true, certification: newItem }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to save certification.' },
      { status: 500 }
    );
  }
}
