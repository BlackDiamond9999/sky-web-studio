import { PageShell } from '@/components/layout/page-shell';
import { SectionHeading } from '@/components/ui/section-heading';

const posts = [
  '7 yếu tố bắt buộc của một website spa cao cấp',
  'Landing page nha khoa cần gì để tăng tỉ lệ đăng ký tư vấn',
  'Vì sao website cafe đẹp chưa chắc bán hàng tốt',
  'Website doanh nghiệp cao cấp khác gì website làm nhanh giá rẻ?'
];

export default function BlogPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Blog" title="Kiến thức website, chuyển đổi và định vị thương hiệu số" description="Blog được dùng cho cả SEO lẫn authority building, nhưng giọng điệu vẫn phải giữ chất premium, rõ ràng và có chiều sâu." />
        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post} className="glass-panel rounded-3xl p-7">
              <p className="text-sm uppercase tracking-[0.2em] text-sky">Resource</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{post}</h2>
              <p className="mt-4 leading-8 text-muted">Bài viết chuyên sâu giúp khách hàng hiểu vì sao đầu tư đúng vào website có thể nâng hình ảnh thương hiệu và cải thiện hiệu quả kinh doanh rõ rệt.</p>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
