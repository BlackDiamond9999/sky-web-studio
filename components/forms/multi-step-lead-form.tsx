'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Bước 1',
    field: 'industry',
    text: 'Bạn đang hoạt động trong lĩnh vực nào? Spa, Nha khoa, Cafe, Nhà hàng, Dịch vụ hay ngành khác?',
    placeholder: 'Ví dụ: Spa chăm sóc da cao cấp'
  },
  {
    title: 'Bước 2',
    field: 'websiteType',
    text: 'Bạn cần website doanh nghiệp, landing page chuyển đổi, hay một hệ thống nhiều trang có CMS?',
    placeholder: 'Ví dụ: Landing page chốt lead + CRM'
  },
  {
    title: 'Bước 3',
    field: 'goal',
    text: 'Mục tiêu chính là gì: tăng lead, booking, doanh thu, hay nâng hình ảnh thương hiệu?',
    placeholder: 'Ví dụ: Tăng lead từ ads và tối ưu booking'
  },
  {
    title: 'Bước 4',
    field: 'budget',
    text: 'Ngân sách dự kiến và mốc thời gian mong muốn triển khai là bao nhiêu?',
    placeholder: 'Ví dụ: 20-30 triệu, triển khai trong 3 tuần'
  }
] as const;

const finalFields = [
  { name: 'name', label: 'Họ và tên', placeholder: 'Nguyễn Văn A', type: 'text' },
  { name: 'phone', label: 'Số điện thoại', placeholder: '09xx xxx xxx', type: 'tel' },
  { name: 'email', label: 'Email', placeholder: 'hello@brand.com', type: 'email' }
] as const;

export function MultiStepLeadForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => ((currentStep + 1) / (steps.length + 1)) * 100, [currentStep]);
  const step = steps[currentStep];
  const isLastQuestion = currentStep === steps.length;

  async function submitLead() {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...answers,
          type: 'contact',
          page: '/',
          source: 'sky-web-studio-home-multistep',
          submittedAt: new Date().toISOString(),
          honeypot: ''
        })
      });

      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(json.message || 'Chưa gửi được yêu cầu.');
        return;
      }

      setSuccess('Đã ghi nhận thông tin. SKY Web Studio sẽ liên hệ sớm để chốt hướng triển khai phù hợp.');
    } catch {
      setLoading(false);
      setError('Có lỗi khi gửi yêu cầu. Vui lòng thử lại sau ít phút.');
    }
  }

  function nextStep() {
    if (!isLastQuestion) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-8 shadow-glow"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky">Form tư vấn premium</p>
          <h3 className="mt-4 text-3xl font-semibold text-white">Trả lời nhanh 5 bước để nhận định hướng website phù hợp</h3>
        </div>
        <div className="hidden rounded-full border border-gold/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold md:block">Premium motion</div>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-sky via-cyan-300 to-gold" animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: 'easeOut' }} />
      </div>

      <AnimatePresence mode="wait">
        {!isLastQuestion ? (
          <motion.div
            key={step.field}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 space-y-5"
          >
            <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-sky">{step.title}</p>
              <p className="mt-3 text-lg leading-8 text-silver">{step.text}</p>
              <textarea
                value={answers[step.field] || ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [step.field]: event.target.value }))}
                rows={4}
                placeholder={step.placeholder}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-muted focus:border-sky"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 grid gap-5"
          >
            <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(0,191,255,0.08),rgba(255,255,255,0.03),rgba(212,175,55,0.06))] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-sky">Bước 5</p>
              <p className="mt-3 text-lg leading-8 text-silver">Để đội ngũ liên hệ tư vấn, vui lòng để lại thông tin thật.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {finalFields.map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm text-silver">{field.label}</label>
                    <input
                      type={field.type}
                      value={answers[field.name] || ''}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, [field.name]: event.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none placeholder:text-muted focus:border-sky"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-full border border-white/10 px-5 py-3 text-sm text-white"
          disabled={loading}
        >
          Quay lại
        </button>
        {!isLastQuestion ? (
          <button
            type="button"
            onClick={nextStep}
            className="rounded-full bg-sky px-5 py-3 text-sm font-medium text-black"
          >
            Tiếp theo
          </button>
        ) : (
          <button
            type="button"
            onClick={submitLead}
            disabled={loading}
            className="rounded-full bg-sky px-5 py-3 text-sm font-medium text-black disabled:opacity-60"
          >
            {loading ? 'Đang gửi...' : 'Gửi lead ngay'}
          </button>
        )}
      </div>

      {success ? <p className="mt-4 text-sm text-green-400">{success}</p> : null}
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
    </motion.div>
  );
}
