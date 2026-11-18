'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, MessageCircle, CheckCircle2, AlertCircle, Send, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SITE_CONFIG, buildWhatsAppUrl, buildMailtoUrl } from '@/lib/config/site';

interface ContactClientProps {
  preselectedPackage?: string;
  preselectedService?: string;
  preselectedProject?: string;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceIndex: number;
  customService: string;
  budgetIndex: number;
  projectDescription: string;
  companyWebsite: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getInitialServiceIndex(preselectedPackage?: string): number {
  if (preselectedPackage?.toLowerCase().includes('business')) return 1;
  if (preselectedPackage?.toLowerCase().includes('premium')) return 2;
  return 0;
}

function getInitialBudgetIndex(preselectedPackage?: string): number {
  if (preselectedPackage?.toLowerCase().includes('business')) return 1;
  if (preselectedPackage?.toLowerCase().includes('premium')) return 4;
  return 0;
}

export default function ContactClient({
  preselectedPackage,
  preselectedService,
  preselectedProject,
}: ContactClientProps) {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();

  const resolvedPackage = preselectedPackage ?? searchParams.get('package') ?? undefined;
  const resolvedService = preselectedService ?? searchParams.get('service') ?? undefined;
  const resolvedProject = preselectedProject ?? searchParams.get('project') ?? undefined;

  const [form, setForm] = useState<FormState>(() => ({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceIndex: getInitialServiceIndex(resolvedPackage),
    customService: resolvedService || '',
    budgetIndex: getInitialBudgetIndex(resolvedPackage),
    projectDescription: resolvedProject
      ? `Interested in a website similar to ${resolvedProject}.`
      : '',
    companyWebsite: '',
  }));

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    referenceId: string;
    emailDelivered: boolean;
    mailtoUrl: string;
  } | null>(null);

  const selectedServiceValue =
    form.customService || t.contact.serviceOptions[form.serviceIndex] || t.contact.serviceOptions[0];
  const selectedBudgetValue =
    t.contact.budgetOptions[form.budgetIndex] || t.contact.budgetOptions[0];

  const validate = (): boolean => {
    const nextErrors: Partial<Record<string, string>> = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = t.contact.validation.nameRequired;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = t.contact.validation.emailInvalid;
    }
    if (form.phone.replace(/\D/g, '').length < 9) {
      nextErrors.phone = t.contact.validation.phoneInvalid;
    }
    if (!selectedServiceValue.trim()) {
      nextErrors.serviceRequired = t.contact.validation.serviceRequired;
    }
    if (!selectedBudgetValue.trim()) {
      nextErrors.budgetRequired = t.contact.validation.budgetRequired;
    }
    if (form.projectDescription.trim().length < 20) {
      nextErrors.projectDescription = t.contact.validation.descriptionMin;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          serviceRequired: selectedServiceValue,
          budgetRange: selectedBudgetValue,
          projectDescription: form.projectDescription,
          locale,
          companyWebsite: form.companyWebsite,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitError(data.error || t.contact.errorGeneric);
        return;
      }

      const mailtoUrl = buildMailtoUrl(
        `[${data.referenceId}] ${selectedServiceValue} — ${form.fullName}`,
        `Reference ID: ${data.referenceId}\nName: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company || 'N/A'}\nService: ${selectedServiceValue}\nBudget: ${selectedBudgetValue}\n\nProject Details:\n${form.projectDescription}`
      );

      setSuccessInfo({
        referenceId: data.referenceId,
        emailDelivered: Boolean(data.emailDelivered || data.forwardedToWebhook),
        mailtoUrl,
      });
      setForm({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceIndex: 0,
        customService: '',
        budgetIndex: 0,
        projectDescription: '',
        companyWebsite: '',
      });
      setErrors({});
    } catch {
      setSubmitError(t.contact.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDirectUrl = buildWhatsAppUrl(t.contact.whatsappPrefill);

  const serviceOptionsList =
    form.customService && !t.contact.serviceOptions.includes(form.customService)
      ? [form.customService, ...t.contact.serviceOptions]
      : t.contact.serviceOptions;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-[#E5092F]">
              {SITE_CONFIG.name.toUpperCase()} · {SITE_CONFIG.title.toUpperCase()}
            </p>
            <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
              {t.contact.headline}
            </h1>
            <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.contact.subheading}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Direct Contact Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#E8E8EC] bg-[#111111] p-7 text-white">
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-white">
                  {t.contact.directTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                  {t.contact.hoursNote}
                </p>

                <div className="mt-7 space-y-4">
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4 text-white transition-colors hover:border-[#8B5CF6]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5092F] text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">{t.footer.phoneLabel}</p>
                      <p className="font-mono text-base font-bold tabular-nums text-white">
                        {SITE_CONFIG.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-cta flex items-center gap-3.5 rounded-xl p-4 text-white"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/85">{t.footer.whatsappLabel}</p>
                      <p className="font-mono text-base font-bold tabular-nums text-white">
                        {SITE_CONFIG.whatsappDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={SITE_CONFIG.emailHref}
                    className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4 text-white transition-colors hover:border-[#8B5CF6]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#7137D8] text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#A1A1AA]">Email</p>
                      <p className="truncate font-mono text-sm font-bold text-white">
                        {SITE_CONFIG.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-[#E8E8EC] bg-white p-6 sm:p-10 shadow-xs">
                <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                  {t.contact.formTitle}
                </h2>

                {successInfo ? (
                  <div className="mt-8 rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-8 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7137D8]/15 text-[#7137D8]">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[#151515]">
                      {t.contact.successTitle}
                    </h3>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-[#686868]">
                      {t.contact.successMessage}
                    </p>
                    <p className="font-mono text-xs font-bold text-[#151515]">
                      {t.contact.referenceLabel}: {successInfo.referenceId}
                    </p>
                    <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSuccessInfo(null)}
                        className="btn-secondary-outline rounded-xl px-5 py-3 text-xs font-bold cursor-pointer"
                      >
                        {t.contact.sendAnother}
                      </button>
                      {!successInfo.emailDelivered && (
                        <a
                          href={successInfo.mailtoUrl}
                          className="btn-secondary-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold"
                        >
                          <Mail className="h-4 w-4 text-[#7137D8]" />
                          <span>Email {SITE_CONFIG.email}</span>
                        </a>
                      )}
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{t.nav.whatsappUs}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                    {/* Invisible honeypot field against automated bot spam */}
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="companyWebsite">Company Website</label>
                      <input
                        id="companyWebsite"
                        name="companyWebsite"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.companyWebsite}
                        onChange={(e) => setForm({ ...form, companyWebsite: e.target.value })}
                      />
                    </div>
                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-[#E5092F]/40 bg-[#E5092F]/5 p-4 text-sm text-[#E5092F]"
                      >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.fullName} *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          aria-invalid={Boolean(errors.fullName)}
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder={t.contact.fullNamePlaceholder}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] placeholder:text-[#686868]/60 focus:border-[#7137D8] focus:outline-none"
                        />
                        {errors.fullName && (
                          <p className="mt-1.5 text-xs font-medium text-[#E5092F]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.email} *
                        </label>
                        <input
                          id="email"
                          type="email"
                          aria-invalid={Boolean(errors.email)}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t.contact.emailPlaceholder}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] placeholder:text-[#686868]/60 focus:border-[#7137D8] focus:outline-none"
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs font-medium text-[#E5092F]">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.phone} *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          aria-invalid={Boolean(errors.phone)}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder={t.contact.phonePlaceholder}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] placeholder:text-[#686868]/60 focus:border-[#7137D8] focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs font-medium text-[#E5092F]">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.company}
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder={t.contact.companyPlaceholder}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] placeholder:text-[#686868]/60 focus:border-[#7137D8] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="serviceRequired"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.serviceRequired} *
                        </label>
                        <select
                          id="serviceRequired"
                          value={selectedServiceValue}
                          onChange={(e) => {
                            const idx = t.contact.serviceOptions.indexOf(e.target.value);
                            if (idx >= 0) {
                              setForm({ ...form, serviceIndex: idx, customService: '' });
                            } else {
                              setForm({ ...form, customService: e.target.value });
                            }
                          }}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                        >
                          {serviceOptionsList.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="budgetRange"
                          className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                        >
                          {t.contact.budgetRange} *
                        </label>
                        <select
                          id="budgetRange"
                          value={selectedBudgetValue}
                          onChange={(e) => {
                            const idx = t.contact.budgetOptions.indexOf(e.target.value);
                            setForm({ ...form, budgetIndex: idx >= 0 ? idx : 0 });
                          }}
                          className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                        >
                          {t.contact.budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectDescription"
                        className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                      >
                        {t.contact.projectDescription} *
                      </label>
                      <textarea
                        id="projectDescription"
                        rows={5}
                        value={form.projectDescription}
                        onChange={(e) =>
                          setForm({ ...form, projectDescription: e.target.value })
                        }
                        placeholder={t.contact.projectDescriptionPlaceholder}
                        className="mt-2 w-full rounded-xl border border-[#E8E8EC] bg-white px-4 py-3 text-sm text-[#151515] placeholder:text-[#686868]/60 focus:border-[#7137D8] focus:outline-none"
                      />
                      {errors.projectDescription && (
                        <p className="mt-1.5 text-xs font-medium text-[#E5092F]">
                          {errors.projectDescription}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary-cta inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-xs font-extrabold tracking-wider disabled:opacity-60 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        <span>{submitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
