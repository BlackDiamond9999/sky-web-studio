'use client';

import { useMemo, useState } from 'react';
import { estimateQuote } from '@/lib/quote-engine';

const featureOptions = ['booking', 'zalo', 'gallery', 'seo', 'blog', 'multi-branch'];

export function QuoteConfigurator() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    industry: 'Spa / Beauty',
    websiteType: 'Website doanh nghiệp + booking',
    pageCount: '8-12' as '1-3' | '4-7' | '8-12' | '12+',
    features: ['booking', 'zalo', 'seo'] as string[],
    multilingual: false,
    budget: '18 - 35 triệu',
    timeline: '2 - 4 tuần',
    goal: 'Tăng lead và booking',
    notes: '',
    website: '',
    honeypot: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const example = useMemo(() => estimateQuote({
    industry: form.industry,
    websiteType: form.websiteType,
    pageCount: form.pageCount,
    features: form.features,
    multilingual: form.multilingual
  }), [form]);

  function toggleFeature(feature: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature) ? prev.features.filter((item) => item !== feature) : [...prev.features, feature]
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type: 'quote',
          page: '/quote',
          source: 'sky-web-studio-quote-configurator',
          submittedAt: new Date().toISOString()
        })
      });

      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(json.message || 'Không gửi được yêu cầu báo giá.');
        return;
      }
      setSuccess('Đã gửi yêu cầu báo giá. Đội ngũ sẽ liên hệ với đề xuất phù hợp.');
    } catch {
      setLoading(false);
      setError('Không gửi được yêu cầu báo giá. Vui lòng thử lại sau.');
    }
  }

  return (
    <section className="section-space container-luxury">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.28em] text-sky">Quote Tool</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Khách hàng chọn nhu cầu, hệ thống hiển thị mức đầu tư ước tính và gửi lead nóng ngay lập tức</h2>
          <p className="text-lg leading-8 text-muted">
            Công cụ này vừa tăng conversion, vừa giúp sales nhận được lead có nhu cầu rõ ràng hơn ngay từ đầu.
          </p>
          <div className="rounded-3xl border border-sky/20 bg-sky/[0.06] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-sky">Ước tính realtime</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{example.priceRange}</h3>
            <p className="mt-3 text-muted">Thời gian triển khai: {example.timeline}</p>
            <p className="mt-3 text-muted">Gói đề xuất: {example.recommendedPlan}</p>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Họ và tên" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
            <Field label="Số điện thoại" value={form.phone} onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))} />
            <Field label="Email" value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
            <Field label="Doanh nghiệp" value={form.company} onChange={(value) => setForm((prev) => ({ ...prev, company: value }))} />
            <Field label="Ngành nghề" value={form.industry} onChange={(value) => setForm((prev) => ({ ...prev, industry: value }))} />
            <Field label="Loại website" value={form.websiteType} onChange={(value) => setForm((prev) => ({ ...prev, websiteType: value }))} />
            <SelectField label="Số trang" value={form.pageCount} options={['1-3', '4-7', '8-12', '12+']} onChange={(value) => setForm((prev) => ({ ...prev, pageCount: value as '1-3' | '4-7' | '8-12' | '12+' }))} />
            <Field label="Ngân sách dự kiến" value={form.budget} onChange={(value) => setForm((prev) => ({ ...prev, budget: value }))} />
            <Field label="Timeline mong muốn" value={form.timeline} onChange={(value) => setForm((prev) => ({ ...prev, timeline: value }))} />
            <Field label="Website hiện tại" value={form.website} onChange={(value) => setForm((prev) => ({ ...prev, website: value }))} />
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm text-silver">Tính năng cần có</p>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map((feature) => {
                const active = form.features.includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`rounded-full px-4 py-2 text-sm transition ${active ? 'bg-sky text-black' : 'border border-white/10 text-white hover:border-sky'}`}
                  >
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <input id="multilingual" type="checkbox" checked={form.multilingual} onChange={(e) => setForm((prev) => ({ ...prev, multilingual: e.target.checked }))} />
            <label htmlFor="multilingual" className="text-sm text-silver">Cần đa ngôn ngữ</label>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-silver">Mục tiêu chính</label>
            <textarea value={form.goal} onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))} rows={4} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-silver">Ghi chú thêm</label>
            <textarea value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} rows={3} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
          </div>

          <input type="text" value={form.honeypot} onChange={(e) => setForm((prev) => ({ ...prev, honeypot: e.target.value }))} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" onClick={handleSubmit} disabled={loading} className="rounded-full bg-sky px-6 py-4 text-sm font-medium text-black transition hover:bg-white disabled:opacity-60">
              {loading ? 'Đang gửi...' : 'Nhận báo giá nhanh'}
            </button>
            {success ? <p className="text-sm text-green-400">{success}</p> : null}
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-silver">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-silver">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
