'use client';

import { useState } from 'react';

const options = ['Spa / Beauty', 'Nha khoa / Phòng khám', 'Cafe / Nhà hàng', 'Salon / Gym', 'Doanh nghiệp dịch vụ', 'Khác'];
const websiteTypes = ['Website doanh nghiệp cao cấp', 'Landing page chuyển đổi cao', 'Website + Booking', 'Website + CMS', 'Chưa rõ, cần tư vấn'];

export function ContactFormClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setSuccess(null);
    setError(null);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      type: 'contact',
      page: '/contact',
      source: 'sky-web-studio-contact-form',
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(json.message || 'Không thể gửi yêu cầu lúc này.');
        return;
      }

      setSuccess('Yêu cầu của bạn đã được ghi nhận. SKY Web Studio sẽ phản hồi sớm với định hướng phù hợp.');
    } catch {
      setLoading(false);
      setError('Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau ít phút.');
    }
  }

  return (
    <form action={handleSubmit} className="glass-panel rounded-[32px] p-8">
      <p className="text-sm uppercase tracking-[0.24em] text-sky">Form tư vấn</p>
      <h3 className="mt-4 text-3xl font-semibold text-white">Gửi yêu cầu tư vấn theo đúng mục tiêu kinh doanh của bạn</h3>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="Họ và tên" name="name" placeholder="Nguyễn Văn A" required />
        <Field label="Số điện thoại" name="phone" placeholder="09xx xxx xxx" required />
        <Field label="Email" name="email" type="email" placeholder="hello@brand.com" />
        <Field label="Ngân sách dự kiến" name="budget" placeholder="15 - 30 triệu" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <SelectField label="Ngành nghề" name="industry" options={options} />
        <SelectField label="Loại website" name="websiteType" options={websiteTypes} />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-silver">Mục tiêu chính</label>
        <textarea name="goal" rows={5} placeholder="Tăng lead, booking, nâng hình ảnh thương hiệu, tối ưu landing page..." className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-muted focus:border-sky" />
      </div>

      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={loading} className="rounded-full bg-sky px-6 py-4 text-sm font-medium text-black transition hover:bg-white disabled:opacity-60">
          {loading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
        </button>
        {success ? <p className="text-sm text-green-400">{success}</p> : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </form>
  );
}

function Field({ label, name, placeholder, type = 'text', required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-silver">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-muted focus:border-sky" />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-silver">{label}</label>
      <select name={name} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
