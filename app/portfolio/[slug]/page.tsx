import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { portfolio } from '@/lib/site-content';

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolio.find((entry) => entry.slug === slug);

  if (!item) notFound();

  return (
    <PageShell>
      <main className="section-space container-luxury space-y-12">
        <div className="max-w-4xl space-y-5">
          <p className="text-sm uppercase tracking-[0.28em] text-sky">Case Study</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{item.title}</h1>
          <p className="text-lg leading-8 text-muted">{item.summary}</p>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-[32px] border border-white/10">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-7"><h2 className="text-2xl font-semibold text-white">Bài toán</h2><p className="mt-4 leading-8 text-muted">Khách hàng cần một website có hình ảnh đủ cao cấp để tăng niềm tin và một cấu trúc nội dung đủ rõ để tạo chuyển đổi.</p></div>
          <div className="glass-panel rounded-3xl p-7"><h2 className="text-2xl font-semibold text-white">Giải pháp</h2><p className="mt-4 leading-8 text-muted">Thiết kế visual premium, UX tập trung vào booking/lead và storytelling thương hiệu rõ ràng trên cả desktop lẫn mobile.</p></div>
          <div className="glass-panel rounded-3xl p-7"><h2 className="text-2xl font-semibold text-white">Kết quả</h2><p className="mt-4 leading-8 text-muted">{item.result} cùng cảm nhận thương hiệu chuyên nghiệp hơn ngay từ lần truy cập đầu tiên.</p></div>
        </div>
      </main>
    </PageShell>
  );
}
