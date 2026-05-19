import { PageShell } from '@/components/layout/page-shell';
import { SectionHeading } from '@/components/ui/section-heading';
import { pricing } from '@/lib/site-content';

export default function PricingPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Bảng giá" title="Mức đầu tư minh bạch cho thương hiệu muốn làm bài bản" description="Bảng giá này giúp khách hàng có khung tham chiếu rõ ràng. Báo giá cuối cùng sẽ được tinh chỉnh theo scope, ngành nghề và yêu cầu tính năng cụ thể." />
        <div className="grid gap-6 xl:grid-cols-4">
          {pricing.map((plan) => (
            <div key={plan.name} className={`rounded-3xl border p-7 ${plan.featured ? 'border-sky bg-sky/[0.08] shadow-glow' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                {plan.featured ? <span className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-black">Đề xuất</span> : null}
              </div>
              <p className="mt-4 text-3xl font-semibold text-white">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
