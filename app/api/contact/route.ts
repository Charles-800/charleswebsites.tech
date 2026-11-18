import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/config/site';
import { saveContactInquiry } from '@/lib/server/store';
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  sanitizeSingleLine,
} from '@/lib/server/security';

interface ContactPayload {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  serviceRequired?: unknown;
  budgetRange?: unknown;
  projectDescription?: unknown;
  locale?: unknown;
  companyWebsite?: unknown; // Honeypot field
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeWebhookUrl(raw?: string): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^["']+|["']+$/g, '');
  if (!cleaned || cleaned.includes('your-form-id')) return null;
  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  const webhookUrl = normalizeWebhookUrl(process.env.CONTACT_WEBHOOK_URL);
  const smtpConfigured = Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim()
  );
  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());

  return NextResponse.json({
    ok: true,
    channels: {
      webhookConfigured: Boolean(webhookUrl),
      smtpConfigured,
      resendConfigured,
      deliveryConfigured: Boolean(webhookUrl || smtpConfigured || resendConfigured),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden request origin.' },
        { status: 403 }
      );
    }

    const clientIp = getClientIp(req);
    const rate = checkRateLimit('contact', clientIp, 8, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please wait a moment before trying again.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.retryAfterSeconds) },
        }
      );
    }

    const body = (await req.json()) as ContactPayload;

    // Silent honeypot reject for automated bots
    if (typeof body.companyWebsite === 'string' && body.companyWebsite.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        referenceId: `CW-${Date.now().toString(36).toUpperCase()}`,
        emailDelivered: false,
        forwardedToWebhook: false,
      });
    }

    const fullName =
      typeof body.fullName === 'string' ? sanitizeSingleLine(body.fullName, 120) : '';
    const email = typeof body.email === 'string' ? sanitizeSingleLine(body.email, 180) : '';
    const phone = typeof body.phone === 'string' ? sanitizeSingleLine(body.phone, 40) : '';
    const company =
      typeof body.company === 'string' ? sanitizeSingleLine(body.company, 150) : '';
    const serviceRequired =
      typeof body.serviceRequired === 'string'
        ? sanitizeSingleLine(body.serviceRequired, 120)
        : '';
    const budgetRange =
      typeof body.budgetRange === 'string' ? sanitizeSingleLine(body.budgetRange, 120) : '';
    const projectDescription =
      typeof body.projectDescription === 'string'
        ? body.projectDescription.trim().slice(0, 4000)
        : '';
    const locale = body.locale === 'sw' ? 'sw' : 'en';

    const errors: Record<string, string> = {};

    if (fullName.length < 2) {
      errors.fullName = 'Full name is required.';
    }
    if (!EMAIL_REGEX.test(email)) {
      errors.email = 'Valid email address is required.';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      errors.phone = 'Valid phone number is required.';
    }
    if (!serviceRequired) {
      errors.serviceRequired = 'Service selection is required.';
    }
    if (!budgetRange) {
      errors.budgetRange = 'Budget range is required.';
    }
    if (projectDescription.length < 20) {
      errors.projectDescription = 'Project description must be at least 20 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Validation failed', fields: errors },
        { status: 400 }
      );
    }

    const referenceId = `CW-${Date.now().toString(36).toUpperCase()}`;
    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL?.trim() || SITE_CONFIG.email;
    const submittedAt = new Date().toISOString();

    const emailSubject = sanitizeSingleLine(
      `[Charles Websites Inquiry ${referenceId}] ${serviceRequired} — ${fullName}`,
      200
    );
    const plainTextBody = [
      `New Project Inquiry — Charles Websites`,
      `Reference ID: ${referenceId}`,
      `Recipient: ${recipientEmail}`,
      `Submitted At: ${submittedAt}`,
      ``,
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company || 'Not provided'}`,
      `Service Required: ${serviceRequired}`,
      `Budget Range: ${budgetRange}`,
      `Language: ${locale.toUpperCase()}`,
      ``,
      `Project Description:`,
      projectDescription,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #151515; line-height: 1.6; max-width: 640px;">
        <h2 style="margin-bottom: 8px; color: #151515;">New Project Inquiry — Charles Websites</h2>
        <p style="margin-top: 0; color: #686868; font-size: 13px;">Reference ID: <strong>${escapeHtml(referenceId)}</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Full Name</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Client Email</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Company</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(company || 'Not provided')}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Service Required</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(serviceRequired)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #E8E8EC; font-weight: bold;">Budget Range</td><td style="padding: 8px; border-bottom: 1px solid #E8E8EC;">${escapeHtml(budgetRange)}</td></tr>
        </table>
        <p style="font-weight: bold; margin-bottom: 4px;">Project Description:</p>
        <p style="white-space: pre-wrap; background: #F7F7F9; padding: 12px; border-radius: 8px;">${escapeHtml(projectDescription)}</p>
      </div>
    `;

    let emailDelivered = false;
    let forwardedToWebhook = false;

    // 1. Direct SMTP delivery (e.g. Gmail App Password via smtp.gmail.com)
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    if (smtpUser && smtpPass) {
      try {
        const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
        const smtpPort = Number(process.env.SMTP_PORT || '465');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Charles Websites Inquiries" <${smtpUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
        });
        emailDelivered = true;
      } catch (err) {
        console.error('SMTP email delivery failed:', err);
      }
    }

    // 2. Resend API delivery fallback if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!emailDelivered && resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Charles Websites <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: email,
            subject: emailSubject,
            text: plainTextBody,
            html: htmlBody,
          }),
        });
        emailDelivered = resendRes.ok;
      } catch (err) {
        console.error('Resend email delivery failed:', err);
      }
    }

    // 3. Universal Webhook relay (supports Formspree, Make, Zapier, n8n, Discord, Slack, Google Apps Script)
    const webhookUrl = normalizeWebhookUrl(process.env.CONTACT_WEBHOOK_URL);
    if (webhookUrl) {
      try {
        const parsedWebhook = new URL(webhookUrl);
        const host = parsedWebhook.hostname.toLowerCase();

        let webhookPayload: Record<string, unknown>;
        if (host.includes('discord.com') || host.includes('discordapp.com')) {
          webhookPayload = {
            content: plainTextBody,
          };
        } else if (host.includes('hooks.slack.com')) {
          webhookPayload = {
            text: plainTextBody,
          };
        } else {
          webhookPayload = {
            referenceId,
            recipientEmail,
            fullName,
            email,
            phone,
            company: company || 'Not provided',
            serviceRequired,
            budgetRange,
            projectDescription,
            locale,
            submittedAt,
            // Standard Formspree / Getform compatibility fields
            _replyto: email,
            _subject: emailSubject,
            message: plainTextBody,
          };
        }

        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(webhookPayload),
          signal: AbortSignal.timeout(8000),
        });
        forwardedToWebhook = webhookRes.ok;
        if (!webhookRes.ok) {
          console.error('Webhook returned non-OK status:', webhookRes.status);
        }
      } catch (err) {
        console.error('Webhook delivery failed:', err);
        forwardedToWebhook = false;
      }
    }

    await saveContactInquiry({
      id: referenceId,
      recipientEmail,
      fullName,
      email,
      phone,
      company: company || undefined,
      serviceRequired,
      budgetRange,
      projectDescription,
      locale,
      createdAt: submittedAt,
      emailDelivered,
      forwardedToWebhook,
    });

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        recipientEmail,
        emailDelivered,
        forwardedToWebhook,
        createdAt: submittedAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to process inquiry on the server.' },
      { status: 500 }
    );
  }
}
