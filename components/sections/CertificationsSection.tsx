'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Hash,
  Pencil,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  CertificationItem,
  CertificationStatus,
} from '@/lib/data/certifications';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ResilientImage from '@/components/ui/ResilientImage';

interface CertificationsSectionProps {
  initialCertifications: CertificationItem[];
}

export default function CertificationsSection({
  initialCertifications,
}: CertificationsSectionProps) {
  const { t } = useLanguage();
  const [certifications, setCertifications] =
    useState<CertificationItem[]>(initialCertifications);
  const [statusFilter, setStatusFilter] = useState<'all' | CertificationStatus>('all');
  const [manageMode, setManageMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Certificate preview modal state
  const [previewItem, setPreviewItem] = useState<CertificationItem | null>(null);

  // Add / Edit modal state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<CertificationStatus>('earned');
  const [formTitle, setFormTitle] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formLogoUrl, setFormLogoUrl] = useState('');
  const [formDateEarned, setFormDateEarned] = useState('');
  const [formCredentialId, setFormCredentialId] = useState('');
  const [formVerificationUrl, setFormVerificationUrl] = useState('');
  const [formCertUrl, setFormCertUrl] = useState('');
  const [formCertType, setFormCertType] = useState<'image' | 'pdf' | undefined>(
    undefined
  );
  const [formCertName, setFormCertName] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showAdminKeyInput, setShowAdminKeyInput] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!previewItem && !editorOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewItem(null);
        setEditorOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewItem, editorOpen]);

  const filteredCertifications = useMemo(() => {
    if (statusFilter === 'all') return certifications;
    return certifications.filter((item) => item.status === statusFilter);
  }, [certifications, statusFilter]);

  const statusMeta = (status: CertificationStatus) => {
    switch (status) {
      case 'earned':
        return {
          label: t.certifications.statusEarned,
          badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        };
      case 'in_progress':
        return {
          label: t.certifications.statusInProgress,
          badgeClass: 'border-[#7137D8]/30 bg-[#7137D8]/10 text-[#7137D8]',
          icon: <Clock className="h-3.5 w-3.5" />,
        };
      case 'planned':
        return {
          label: t.certifications.statusPlanned,
          badgeClass: 'border-[#E8E8EC] bg-[#F7F7F9] text-[#686868]',
          icon: <Calendar className="h-3.5 w-3.5" />,
        };
    }
  };

  const openEditModal = (item: CertificationItem) => {
    setEditingId(item.id);
    setFormStatus(item.status);
    setFormTitle(item.title);
    setFormInstitution(item.institution);
    setFormLogoUrl(item.institutionLogo || '');
    setFormDateEarned(item.dateEarned || '');
    setFormCredentialId(item.credentialId || '');
    setFormVerificationUrl(item.verificationUrl || '');
    setFormCertUrl(item.certificateFileUrl || '');
    setFormCertType(item.certificateFileType);
    setFormCertName(item.certificateFileName || '');
    setFormError(null);
    setEditorOpen(true);
  };

  const buildAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};
    if (adminKey.trim()) {
      headers['Authorization'] = `Bearer ${adminKey.trim()}`;
    }
    return headers;
  };

  const handleFileUpload = async (
    file: File,
    purpose: 'logo' | 'certificate'
  ) => {
    setFormError(null);
    if (purpose === 'logo') {
      setUploadingLogo(true);
    } else {
      setUploadingCert(true);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purpose', purpose);

      const res = await fetch('/api/certifications/upload', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: formData,
      });

      const data = await res.json();
      if (res.status === 401) {
        setShowAdminKeyInput(true);
      }
      if (!res.ok || !data.ok) {
        setFormError(data.error || 'File upload failed.');
        return;
      }

      if (purpose === 'logo') {
        setFormLogoUrl(data.url);
      } else {
        setFormCertUrl(data.url);
        setFormCertType(data.fileType === 'pdf' ? 'pdf' : 'image');
        setFormCertName(data.originalName || file.name);
      }
    } catch {
      setFormError('Network error while uploading file.');
    } finally {
      if (purpose === 'logo') {
        setUploadingLogo(false);
      } else {
        setUploadingCert(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const endpoint = editingId
        ? `/api/certifications/${editingId}`
        : '/api/certifications';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...buildAuthHeaders(),
        },
        body: JSON.stringify({
          status: formStatus,
          title: formTitle,
          institution: formInstitution,
          institutionLogo: formLogoUrl,
          dateEarned: formDateEarned,
          credentialId: formCredentialId,
          verificationUrl: formVerificationUrl,
          certificateFileUrl: formCertUrl,
          certificateFileType: formCertType,
          certificateFileName: formCertName,
        }),
      });

      const data = await res.json();
      if (res.status === 401) {
        setShowAdminKeyInput(true);
      }
      if (!res.ok || !data.ok) {
        setFormError(data.error || 'Could not save certification.');
        return;
      }

      if (editingId) {
        setCertifications((prev) =>
          prev.map((item) => (item.id === editingId ? data.certification : item))
        );
      } else {
        setCertifications((prev) => [data.certification, ...prev]);
      }
      setEditorOpen(false);
    } catch {
      setFormError('Network error while saving certification.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch(`/api/certifications/${id}`, {
        method: 'DELETE',
        headers: buildAuthHeaders(),
      });
      if (res.status === 401) {
        setShowAdminKeyInput(true);
        openEditModal(
          certifications.find((c) => c.id === id) || certifications[0]
        );
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        setCertifications((prev) => prev.filter((item) => item.id !== id));
        setConfirmDeleteId(null);
      }
    } catch {
      // Network error
    }
  };

  const filterTabs: Array<{ key: 'all' | CertificationStatus; label: string }> = [
    { key: 'all', label: t.certifications.filterAll },
    { key: 'earned', label: t.certifications.statusEarned },
    { key: 'in_progress', label: t.certifications.statusInProgress },
    { key: 'planned', label: t.certifications.statusPlanned },
  ];

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-[#E8E8EC] bg-gradient-to-b from-white via-[#F7F7F9]/75 to-white py-20 sm:py-24"
    >
      {/* Subtle architectural glass ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#7137D8]/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-[#E5092F]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-[#7137D8]">
              {t.certifications.kicker}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#151515] sm:text-4xl lg:text-[42px]">
              {t.certifications.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#686868] sm:text-lg">
              {t.certifications.subheading}
            </p>
          </div>

          {certifications.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => {
                  setManageMode((prev) => !prev);
                  setConfirmDeleteId(null);
                }}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  manageMode
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E8E8EC] bg-white/80 backdrop-blur-sm text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8]'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>
                  {manageMode
                    ? t.certifications.doneManageBtn
                    : t.certifications.manageBtn}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Status Filters (shown when credentials exist) */}
        {certifications.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const count =
                tab.key === 'all'
                  ? certifications.length
                  : certifications.filter((c) => c.status === tab.key).length;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === tab.key
                      ? 'bg-[#111111] text-white'
                      : 'border border-[#E8E8EC] bg-white/80 backdrop-blur-sm text-[#686868] hover:text-[#7137D8]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      statusFilter === tab.key ? 'text-white/75' : 'text-[#686868]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State or Cards Grid */}
        {certifications.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#E8E8EC] bg-white/80 p-8 sm:p-10 backdrop-blur-md shadow-xs">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#7137D8]/25 bg-[#7137D8]/10 text-[#7137D8]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[#151515]">
                    {t.certifications.emptyTitle}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#686868]">
                    {t.certifications.emptyDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertifications.map((item) => {
              const badge = statusMeta(item.status);
              const hasCertificateFile = Boolean(item.certificateFileUrl);
              const hasVerificationUrl = Boolean(item.verificationUrl);

              return (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E8E8EC] bg-white/85 p-6 backdrop-blur-md shadow-xs transition-shadow duration-200 hover:border-[#7137D8]/50 hover:shadow-xl"
                >
                  <div>
                    {/* Top Row: Institution Logo + Status Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-2">
                        {item.institutionLogo ? (
                          <ResilientImage
                            src={item.institutionLogo}
                            alt={`${item.institution} logo`}
                            width={48}
                            height={48}
                            fill={false}
                            className="h-10 w-10 object-contain"
                            fallbackLabel={item.institution}
                          />
                        ) : (
                          <Award className="h-6 w-6 text-[#7137D8]" />
                        )}
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ${badge.badgeClass}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Issuing Institution & Title */}
                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#7137D8]">
                      {item.institution}
                    </p>
                    <h3 className="mt-1.5 font-[family-name:var(--font-jakarta)] text-lg font-extrabold leading-snug text-[#151515]">
                      {item.title}
                    </h3>

                    {/* Metadata Rows (Rendered strictly when provided) */}
                    {(item.dateEarned || item.credentialId) && (
                      <div className="mt-4 space-y-2 border-t border-[#E8E8EC] pt-4 text-xs text-[#686868]">
                        {item.dateEarned && (
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <Calendar className="h-3.5 w-3.5 text-[#E5092F]" />
                              <span>{t.certifications.dateEarnedLabel}</span>
                            </span>
                            <span className="font-semibold text-[#151515]">
                              {item.dateEarned}
                            </span>
                          </div>
                        )}
                        {item.credentialId && (
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 font-medium shrink-0">
                              <Hash className="h-3.5 w-3.5 text-[#7137D8]" />
                              <span>{t.certifications.credentialIdLabel}</span>
                            </span>
                            <span className="truncate font-mono text-[11px] font-semibold text-[#151515]">
                              {item.credentialId}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Attached Certificate Document Preview */}
                    {hasCertificateFile && item.certificateFileUrl && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-[#E8E8EC] bg-[#F7F7F9]">
                        {item.certificateFileType === 'image' ? (
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="relative block aspect-[4/3] w-full overflow-hidden bg-white p-2 cursor-pointer"
                            aria-label={`${t.certifications.viewCertificate}: ${item.title}`}
                          >
                            <ResilientImage
                              src={item.certificateFileUrl}
                              alt={`${item.title} certificate`}
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.02]"
                              fallbackLabel={item.title}
                            />
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 px-3.5 py-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E8E8EC] text-[#E5092F]">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold text-[#151515]">
                                {item.certificateFileName || 'Certificate.pdf'}
                              </p>
                              <p className="text-[11px] text-[#686868]">PDF Document</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="mt-6 space-y-2.5 border-t border-[#E8E8EC] pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {hasCertificateFile ? (
                        <button
                          type="button"
                          onClick={() => setPreviewItem(item)}
                          className="btn-primary-cta inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold tracking-wide whitespace-nowrap cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>{t.certifications.viewCertificate}</span>
                        </button>
                      ) : hasVerificationUrl && item.verificationUrl ? (
                        <a
                          href={item.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-cta inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold tracking-wide whitespace-nowrap"
                        >
                          <BadgeCheck className="h-3.5 w-3.5" />
                          <span>{t.certifications.viewCertificate}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <div className="flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-[#E8E8EC] bg-[#F7F7F9] px-3 py-2 text-[11px] font-semibold text-[#686868]">
                          <Clock className="h-3.5 w-3.5 text-[#7137D8]" />
                          <span>{t.certifications.pendingNotice}</span>
                        </div>
                      )}

                      {hasCertificateFile &&
                        hasVerificationUrl &&
                        item.verificationUrl && (
                          <a
                            href={item.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary-outline inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold whitespace-nowrap"
                            aria-label={`${t.certifications.verifyOnline} — ${item.title}`}
                          >
                            <span>{t.certifications.verifyOnline}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                    </div>

                    {manageMode && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E8EC]/70">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E8EC] bg-white px-3 py-1.5 text-xs font-semibold text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8] cursor-pointer"
                        >
                          <Pencil className="h-3 w-3" />
                          <span>{t.certifications.editBtn}</span>
                        </button>

                        {confirmDeleteId === item.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#E5092F] px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
                            >
                              {t.certifications.confirmRemoveBtn}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="rounded-lg border border-[#E8E8EC] px-2.5 py-1.5 text-xs font-semibold text-[#686868] cursor-pointer"
                            >
                              {t.certifications.cancelBtn}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E8EC] bg-white px-3 py-1.5 text-xs font-semibold text-[#E5092F] hover:border-[#E5092F] cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>{t.certifications.removeBtn}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Certificate Preview Modal */}
      {previewItem && previewItem.certificateFileUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-preview-title"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#E8E8EC] bg-[#111111] px-6 py-4 text-white">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B5CF6]">
                  {previewItem.institution}
                </p>
                <h3
                  id="certificate-preview-title"
                  className="truncate font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-white"
                >
                  {previewItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label={t.certifications.closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white hover:border-[#8B5CF6] hover:text-[#8B5CF6] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#F7F7F9] p-4 sm:p-6">
              {previewItem.certificateFileType === 'pdf' ? (
                <iframe
                  src={previewItem.certificateFileUrl}
                  title={previewItem.title}
                  className="h-[65vh] w-full rounded-xl border border-[#E8E8EC] bg-white"
                />
              ) : (
                <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-xl border border-[#E8E8EC] bg-white">
                  <ResilientImage
                    src={previewItem.certificateFileUrl}
                    alt={previewItem.title}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                    fallbackLabel={previewItem.title}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E8E8EC] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#686868]">
                {previewItem.dateEarned && (
                  <span>
                    <strong className="text-[#151515]">
                      {t.certifications.dateEarnedLabel}:
                    </strong>{' '}
                    {previewItem.dateEarned}
                  </span>
                )}
                {previewItem.credentialId && (
                  <span className="font-mono">
                    <strong className="font-sans text-[#151515]">
                      {t.certifications.credentialIdLabel}:
                    </strong>{' '}
                    {previewItem.credentialId}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={previewItem.certificateFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  <span>{t.certifications.openOriginal}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {previewItem.verificationUrl && (
                  <a
                    href={previewItem.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wide whitespace-nowrap"
                  >
                    <BadgeCheck className="h-4 w-4" />
                    <span>{t.certifications.verifyOnline}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Certification Modal */}
      {editorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certification-editor-title"
          onClick={() => setEditorOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E8E8EC] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8E8EC] bg-white px-6 py-4">
              <h3
                id="certification-editor-title"
                className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]"
              >
                {editingId
                  ? t.certifications.modalEditTitle
                  : t.certifications.modalAddTitle}
              </h3>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                aria-label={t.certifications.closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8EC] text-[#151515] hover:border-[#7137D8] hover:text-[#7137D8] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 p-6">
              {/* Status Selector */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#151515]">
                  {t.certifications.fieldStatus}
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2.5">
                  {(
                    [
                      { key: 'earned', label: t.certifications.statusEarned },
                      {
                        key: 'in_progress',
                        label: t.certifications.statusInProgress,
                      },
                      { key: 'planned', label: t.certifications.statusPlanned },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setFormStatus(opt.key)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                        formStatus === opt.key
                          ? 'border-[#7137D8] bg-[#7137D8]/10 text-[#7137D8]'
                          : 'border-[#E8E8EC] bg-[#F7F7F9] text-[#686868] hover:text-[#151515]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cert-title"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    {t.certifications.fieldTitle} *
                  </label>
                  <input
                    id="cert-title"
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder={t.certifications.fieldTitlePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cert-institution"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    {t.certifications.fieldInstitution} *
                  </label>
                  <input
                    id="cert-institution"
                    type="text"
                    required
                    value={formInstitution}
                    onChange={(e) => setFormInstitution(e.target.value)}
                    placeholder={t.certifications.fieldInstitutionPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cert-date"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    {t.certifications.fieldDateEarned}
                  </label>
                  <input
                    id="cert-date"
                    type="text"
                    value={formDateEarned}
                    onChange={(e) => setFormDateEarned(e.target.value)}
                    placeholder={t.certifications.fieldDateEarnedPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cert-id"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    {t.certifications.fieldCredentialId}
                  </label>
                  <input
                    id="cert-id"
                    type="text"
                    value={formCredentialId}
                    onChange={(e) => setFormCredentialId(e.target.value)}
                    placeholder={t.certifications.fieldCredentialIdPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 font-mono text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cert-verify-url"
                  className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                >
                  {t.certifications.fieldVerificationUrl}
                </label>
                <input
                  id="cert-verify-url"
                  type="url"
                  value={formVerificationUrl}
                  onChange={(e) => setFormVerificationUrl(e.target.value)}
                  placeholder={t.certifications.fieldVerificationUrlPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
              </div>

              {/* Uploads: Institution Logo & Certificate Image/PDF */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4">
                  <label
                    htmlFor="cert-logo-upload"
                    className="block text-xs font-bold text-[#151515]"
                  >
                    {t.certifications.fieldLogo}
                  </label>
                  <label
                    htmlFor="cert-logo-upload"
                    className="mt-2.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#7137D8]/40 bg-white px-3 py-2.5 text-xs font-bold text-[#7137D8] hover:border-[#7137D8]"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>
                      {uploadingLogo
                        ? t.certifications.uploadingFile
                        : 'Upload Logo'}
                    </span>
                    <input
                      id="cert-logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="sr-only"
                      disabled={uploadingLogo}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleFileUpload(file, 'logo');
                      }}
                    />
                  </label>
                  {formLogoUrl && (
                    <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-[#151515]">
                      <span className="truncate font-mono">{formLogoUrl}</span>
                      <button
                        type="button"
                        onClick={() => setFormLogoUrl('')}
                        className="font-bold text-[#E5092F] cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-[#E8E8EC] bg-[#F7F7F9] p-4">
                  <label
                    htmlFor="cert-doc-upload"
                    className="block text-xs font-bold text-[#151515]"
                  >
                    {t.certifications.fieldCertificateFile}
                  </label>
                  <label
                    htmlFor="cert-doc-upload"
                    className="mt-2.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#E5092F]/40 bg-white px-3 py-2.5 text-xs font-bold text-[#E5092F] hover:border-[#E5092F]"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>
                      {uploadingCert
                        ? t.certifications.uploadingFile
                        : 'Upload Image / PDF'}
                    </span>
                    <input
                      id="cert-doc-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      className="sr-only"
                      disabled={uploadingCert}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleFileUpload(file, 'certificate');
                      }}
                    />
                  </label>
                  {formCertUrl && (
                    <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-[#151515]">
                      <span className="truncate font-mono">
                        {formCertName || formCertUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormCertUrl('');
                          setFormCertType(undefined);
                          setFormCertName('');
                        }}
                        className="font-bold text-[#E5092F] cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showAdminKeyInput && (
                <div>
                  <label
                    htmlFor="cert-admin-key"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    Admin Authorization Key
                  </label>
                  <input
                    id="cert-admin-key"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Enter CERTIFICATIONS_ADMIN_KEY"
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-4 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  />
                </div>
              )}

              {formError && (
                <p className="rounded-lg border border-[#E5092F]/30 bg-[#E5092F]/10 px-4 py-2.5 text-xs font-semibold text-[#E5092F]">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 border-t border-[#E8E8EC] pt-4">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="rounded-xl border border-[#E8E8EC] px-5 py-2.5 text-xs font-bold text-[#686868] hover:text-[#151515] cursor-pointer"
                >
                  {t.certifications.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingLogo || uploadingCert}
                  className="btn-primary-cta rounded-xl px-6 py-2.5 text-xs font-extrabold tracking-wide disabled:opacity-60 cursor-pointer"
                >
                  {saving ? t.certifications.savingBtn : t.certifications.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
