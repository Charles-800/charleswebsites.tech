import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
          { ok: false, error: 'Unauthorized certification update request.' },
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

    const { id } = await context.params;
    const body = await req.json();
    const existingList = await getAllCertifications();
    const index = existingList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { ok: false, error: 'Certification not found.' },
        { status: 404 }
      );
    }

    const current = existingList[index];
    const title =
      typeof body.title === 'string' ? sanitizeSingleLine(body.title, 180) : current.title;
    const institution =
      typeof body.institution === 'string'
        ? sanitizeSingleLine(body.institution, 160)
        : current.institution;
    const status: CertificationStatus = VALID_STATUSES.includes(body.status)
      ? body.status
      : current.status;

    const verificationUrl =
      body.verificationUrl !== undefined
        ? sanitizeOptionalHttpUrl(body.verificationUrl)
        : current.verificationUrl;

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

    const updatedItem: CertificationItem = {
      ...current,
      title,
      institution,
      status,
      dateEarned:
        body.dateEarned !== undefined
          ? typeof body.dateEarned === 'string' && body.dateEarned.trim()
            ? sanitizeSingleLine(body.dateEarned, 60)
            : undefined
          : current.dateEarned,
      credentialId:
        body.credentialId !== undefined
          ? typeof body.credentialId === 'string' && body.credentialId.trim()
            ? sanitizeSingleLine(body.credentialId, 120)
            : undefined
          : current.credentialId,
      institutionLogo:
        body.institutionLogo !== undefined
          ? sanitizeOptionalAssetUrl(body.institutionLogo)
          : current.institutionLogo,
      certificateFileUrl:
        body.certificateFileUrl !== undefined
          ? sanitizeOptionalAssetUrl(body.certificateFileUrl)
          : current.certificateFileUrl,
      certificateFileType:
        body.certificateFileUrl !== undefined
          ? body.certificateFileType === 'pdf' || body.certificateFileType === 'image'
            ? body.certificateFileType
            : undefined
          : current.certificateFileType,
      certificateFileName:
        body.certificateFileUrl !== undefined
          ? typeof body.certificateFileName === 'string' && body.certificateFileName.trim()
            ? sanitizeSingleLine(body.certificateFileName, 140)
            : undefined
          : current.certificateFileName,
      verificationUrl,
      updatedAt: new Date().toISOString(),
    };

    const nextList = [...existingList];
    nextList[index] = updatedItem;
    await saveCertifications(nextList);

    revalidatePath('/');
    revalidatePath('/about');

    return NextResponse.json({ ok: true, certification: updatedItem });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to update certification.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
          { ok: false, error: 'Unauthorized certification delete request.' },
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

    const { id } = await context.params;
    const existingList = await getAllCertifications();
    const filtered = existingList.filter((item) => item.id !== id);

    if (filtered.length === existingList.length) {
      return NextResponse.json(
        { ok: false, error: 'Certification not found.' },
        { status: 404 }
      );
    }

    await saveCertifications(filtered);
    revalidatePath('/');
    revalidatePath('/about');

    return NextResponse.json({ ok: true, removedId: id });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to delete certification.' },
      { status: 500 }
    );
  }
}
