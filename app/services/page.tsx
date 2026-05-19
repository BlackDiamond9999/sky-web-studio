import { PageShell } from '@/components/layout/page-shell';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/lib/site-content';

export default function ServicesPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Dịch vụ" title="Giải pháp thiết kế website cao cấp cho từng mô hình kinh doanh" description="Mỗi dịch vụ được thiết kế xoay quanh 2 mục tiêu: nâng hình ảnh thương hiệu và tạo ra chuyển đổi tốt hơn." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="glass-panel rounded-3xl p-7">
              <div className="mb-6 h-12 w-12 rounded-2xl bg-sky/10 ring-1 ring-sky/30" />
              <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              <p className="mt-4 leading-8 text-muted">{service.description}</p>
              <ul className="mt-6 space-y-2 text-sm leading-7 text-silver">
                <li>• Tư duy giao diện premium</li>
                <li>• Tối ưu tốc độ và mobile</li>
                <li>• Cấu trúc nội dung phục vụ chuyển đổi</li>
              </ul>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
