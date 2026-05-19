import { PageShell } from '@/components/layout/page-shell';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell>
      <main className="section-space container-luxury max-w-4xl space-y-8">
        <p className="text-sm uppercase tracking-[0.28em] text-sky">Blog Detail</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{slug}</h1>
        <p className="text-lg leading-8 text-muted">Template bài viết này dành cho nội dung chuyên sâu về website, landing page, SEO, UX và case study chuyển đổi.</p>
        <div className="glass-panel rounded-3xl p-8 text-base leading-8 text-silver">
          Nội dung bài viết sẽ được quản lý từ CMS hoặc content collection trong giai đoạn tiếp theo.
        </div>
      </main>
    </PageShell>
  );
}
