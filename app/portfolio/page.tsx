import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { SectionHeading } from '@/components/ui/section-heading';
import { portfolio } from '@/lib/site-content';

const filters = ['Tất cả', 'Spa', 'Nha khoa', 'Cafe', 'Restaurant', 'Salon', 'Gym'];

export default function PortfolioPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Portfolio" title="Bộ sưu tập dự án được thiết kế để vừa đẹp, vừa mang lại kết quả kinh doanh" description="Mỗi project được trình bày như một case study cao cấp, giúp khách hàng cảm nhận rõ năng lực thiết kế và tư duy chuyển đổi của SKY Web Studio." />
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <span key={filter} className={`rounded-full px-4 py-2 text-sm ${index === 0 ? 'bg-sky text-black' : 'border border-white/10 text-white'}`}>
              {filter}
            </span>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {portfolio.map((item) => (
            <Link key={item.slug} href={`/portfolio/${item.slug}`} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] p-5 transition hover:-translate-y-1 hover:border-sky/30">
              <div className="relative mb-6 h-72 overflow-hidden rounded-[24px]">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 hover:scale-105" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{item.category}</span>
                </div>
                <p className="leading-8 text-muted">{item.summary}</p>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold">{item.result}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
