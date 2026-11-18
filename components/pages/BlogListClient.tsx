'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Search, X, Pencil } from 'lucide-react';
import { BlogArticle, BlogCategory } from '@/lib/data/blog';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ResilientImage from '@/components/ui/ResilientImage';

interface BlogListClientProps {
  initialArticles: BlogArticle[];
}

const CATEGORIES: BlogCategory[] = [
  'Web Development',
  'AI Engineering',
  'SEO & Growth',
  'Design & UX',
];

const FEATURED_IMAGE_CHOICES = [
  { label: 'Web Design Studio', value: '/images/blog_business_website_1794830658161.jpg' },
  { label: 'AI Workflow Workstation', value: '/images/blog_ai_chatbots_1794830656838.jpg' },
  { label: 'SEO Analytics & Strategy', value: '/images/blog_seo_growth_1794830657849.jpg' },
  { label: 'Corporate Web Showcase', value: '/images/portfolio_ruevan_limited_1794830653531.jpg' },
];

export default function BlogListClient({ initialArticles }: BlogListClientProps) {
  const { locale, t } = useLanguage();
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | BlogCategory>('all');

  // Article editor modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState<BlogCategory>('Web Development');
  const [formImage, setFormImage] = useState(FEATURED_IMAGE_CHOICES[0].value);
  const [titleEn, setTitleEn] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [titleSw, setTitleSw] = useState('');
  const [excerptSw, setExcerptSw] = useState('');
  const [contentSw, setContentSw] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const localized = locale === 'sw' ? article.sw : article.en;
      return (
        localized.title.toLowerCase().includes(q) ||
        localized.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
      );
    });
  }, [articles, locale, searchQuery, selectedCategory]);

  const openCreateModal = () => {
    setEditingSlug(null);
    setFormCategory('Web Development');
    setFormImage(FEATURED_IMAGE_CHOICES[0].value);
    setTitleEn('');
    setExcerptEn('');
    setContentEn('');
    setTitleSw('');
    setExcerptSw('');
    setContentSw('');
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (article: BlogArticle) => {
    setEditingSlug(article.slug);
    setFormCategory(article.category);
    setFormImage(article.featuredImage);
    setTitleEn(article.en.title);
    setExcerptEn(article.en.excerpt);
    setContentEn(article.en.content.join('\n\n'));
    setTitleSw(article.sw.title);
    setExcerptSw(article.sw.excerpt);
    setContentSw(article.sw.content.join('\n\n'));
    setFormError(null);
    setModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      const endpoint = editingSlug ? `/api/blog/${editingSlug}` : '/api/blog';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: formCategory,
          featuredImage: formImage,
          titleEn,
          excerptEn,
          contentEn,
          titleSw,
          excerptSw,
          contentSw,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data.error || 'Could not save article.');
        return;
      }

      if (editingSlug) {
        setArticles((prev) =>
          prev.map((item) => (item.slug === editingSlug ? data.article : item))
        );
      } else {
        setArticles((prev) => [data.article, ...prev]);
      }
      setModalOpen(false);
    } catch {
      setFormError('Network error while saving article.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-[#E8E8EC] bg-[#F7F7F9] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-bold tracking-widest text-[#7137D8]">
                {t.hero.kicker}
              </p>
              <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold tracking-tight text-[#151515] sm:text-5xl">
                {t.blog.pageTitle}
              </h1>
              <p className="text-base leading-relaxed text-[#686868] sm:text-lg">
                {t.blog.pageSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="btn-primary-cta inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold tracking-wider whitespace-nowrap self-start md:self-auto cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{t.blog.addArticleTitle}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Category Filters */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#111111] text-white'
                    : 'border border-[#E8E8EC] bg-[#F7F7F9] text-[#686868] hover:text-[#7137D8]'
                }`}
              >
                {t.blog.allCategories}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#111111] text-white'
                      : 'border border-[#E8E8EC] bg-[#F7F7F9] text-[#686868] hover:text-[#7137D8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686868]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.blog.searchPlaceholder}
                aria-label={t.blog.searchPlaceholder}
                className="w-full rounded-xl border border-[#E8E8EC] bg-white py-2.5 pl-10 pr-4 text-sm text-[#151515] placeholder:text-[#686868]/70 focus:border-[#7137D8] focus:outline-none"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-[#E8E8EC] bg-[#F7F7F9] p-12 text-center">
              <p className="text-base text-[#686868]">{t.blog.noResults}</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => {
                const localized = locale === 'sw' ? article.sw : article.en;
                return (
                  <article
                    key={article.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white transition-all duration-200 hover:border-[#7137D8]/50 hover:shadow-lg"
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F7F9]"
                    >
                      <ResilientImage
                        src={article.featuredImage}
                        alt={localized.imageAlt}
                        fallbackLabel={localized.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-[#686868]">
                        <span className="font-semibold text-[#7137D8]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                        <span aria-hidden="true">·</span>
                        <span>
                          {article.readTimeMinutes} {t.blog.minRead}
                        </span>
                      </div>

                      <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-xl font-bold leading-snug text-[#151515]">
                        <Link
                          href={`/blog/${article.slug}`}
                          className="hover:text-[#7137D8] transition-colors"
                        >
                          {localized.title}
                        </Link>
                      </h2>

                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#686868]">
                        {localized.excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#E8E8EC] pt-4">
                        <Link
                          href={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-[#E5092F] hover:text-[#7137D8] transition-colors"
                        >
                          <span>{t.blog.readMore}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => openEditModal(article)}
                          aria-label={`Edit ${localized.title}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#686868] hover:text-[#7137D8] cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Add / Edit Article Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E8E8EC] pb-4">
              <h2
                id="blog-modal-title"
                className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[#151515]"
              >
                {editingSlug ? t.blog.editArticleTitle : t.blog.addArticleTitle}
              </h2>
              <button
                type="button"
                aria-label="Close article editor"
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E8EC] text-[#151515] hover:text-[#7137D8] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="mt-5 space-y-4">
              {formError && (
                <p
                  role="alert"
                  className="rounded-lg bg-[#E5092F]/10 px-4 py-2.5 text-xs font-semibold text-[#E5092F]"
                >
                  {formError}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="blog-category"
                    className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                  >
                    Category
                  </label>
                  <select
                    id="blog-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as BlogCategory)}
                    className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {!editingSlug && (
                  <div>
                    <label
                      htmlFor="blog-featured-image"
                      className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                    >
                      Featured Image
                    </label>
                    <select
                      id="blog-featured-image"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                    >
                      {FEATURED_IMAGE_CHOICES.map((img) => (
                        <option key={img.value} value={img.value}>
                          {img.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="blog-title-en"
                  className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                >
                  Title (English) *
                </label>
                <input
                  id="blog-title-en"
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="blog-excerpt-en"
                  className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                >
                  Excerpt (English) *
                </label>
                <textarea
                  id="blog-excerpt-en"
                  rows={2}
                  required
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="blog-content-en"
                  className="block text-xs font-bold uppercase tracking-wider text-[#151515]"
                >
                  Article Body (English, separate paragraphs with blank lines) *
                </label>
                <textarea
                  id="blog-content-en"
                  rows={5}
                  required
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
              </div>

              <div className="border-t border-[#E8E8EC] pt-4 space-y-3">
                <p className="text-xs font-bold text-[#7137D8]">
                  Kiswahili Translation (Optional — defaults to English if omitted)
                </p>
                <input
                  type="text"
                  aria-label="Article title in Kiswahili"
                  placeholder="Kichwa cha Makala (Kiswahili)"
                  value={titleSw}
                  onChange={(e) => setTitleSw(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
                <textarea
                  rows={2}
                  aria-label="Article excerpt in Kiswahili"
                  placeholder="Muhtasari (Kiswahili)"
                  value={excerptSw}
                  onChange={(e) => setExcerptSw(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
                <textarea
                  rows={3}
                  aria-label="Article content in Kiswahili"
                  placeholder="Maudhui kamili (Kiswahili)"
                  value={contentSw}
                  onChange={(e) => setContentSw(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8EC] px-3.5 py-2.5 text-sm text-[#151515] focus:border-[#7137D8] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E8EC]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary-outline rounded-xl px-5 py-2.5 text-xs font-bold cursor-pointer"
                >
                  {t.blog.cancel}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary-cta rounded-xl px-6 py-2.5 text-xs font-bold disabled:opacity-60 cursor-pointer"
                >
                  {saving ? '...' : t.blog.saveArticle}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
