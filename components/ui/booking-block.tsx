'use client';

import { useState } from 'react';

export function BookingBlock() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    goal: 'Tư vấn chiến lược website / landing page',
    notes: '',
    website: '',
    honeypot: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type: 'booking',
          page: '/contact',
          source: 'sky-web-studio-booking-block',
          submittedAt: new Date().toISOString()
        })
      });

      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(json.message || 'Không gửi được lịch tư vấn.');
        return;
      }
      setSuccess('Đã ghi nhận lịch mong muốn. Đội ngũ sẽ xác nhận sớm với bạn.');
    } catch {
      setLoading(false);
      setError('Không gửi được lịch tư vấn. Vui lòng thử lại sau.');
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-8">
      <p className="text-sm uppercase tracking-[0.24em] text-sky">Đặt lịch tư vấn</p>
      <h3 className="mt-4 text-3xl font-semibold text-white">Book một cuộc gọi chiến lược 1:1</h3>
      <p className="mt-4 text-base leading-8 text-muted">
        Phù hợp nếu bạn muốn được tư vấn nhanh về định vị website, cấu trúc landing page, gói ngân sách phù hợp và hướng triển khai tối ưu theo ngành.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Field label="Họ và tên" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} />
        <Field label="Số điện thoại" value={form.phone} onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))} />
        <Field label="Email" value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
        <Field label="Doanh nghiệp" value={form.company} onChange={(value) => setForm((prev) => ({ ...prev, company: value }))} />
        <Field label="Ngày mong muốn" type="date" value={form.preferredDate} onChange={(value) => setForm((prev) => ({ ...prev, preferredDate: value }))} />
        <Field label="Khung giờ" type="time" value={form.preferredTime} onChange={(value) => setForm((prev) => ({ ...prev, preferredTime: value }))} />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-silver">Mục tiêu buổi gọi</label>
        <textarea value={form.goal} onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))} rows={3} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-silver">Ghi chú thêm</label>
        <textarea value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} rows={3} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
      </div>

      <input type="text" value={form.website} onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))} placeholder="Website hiện tại" className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
      <input type="text" value={form.honeypot} onChange={(e) => setForm((prev) => ({ ...prev, honeypot: e.target.value }))} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={handleSubmit} disabled={loading} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-60">{loading ? 'Đang gửi...' : 'Đặt lịch tư vấn'}</button>
        <a href="/contact" className="rounded-full border border-white/10 px-5 py-3 text-sm text-white">Gửi yêu cầu trước</a>
      </div>

      {success ? <p className="mt-4 text-sm text-green-400">{success}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-silver">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none focus:border-sky" />
    </div>
  );
}
