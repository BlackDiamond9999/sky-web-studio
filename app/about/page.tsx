import { PageShell } from '@/components/layout/page-shell';
import { SectionHeading } from '@/components/ui/section-heading';

export default function AboutPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Về chúng tôi" title="Chúng tôi xây website như một tài sản thương hiệu, không phải một file bàn giao cho xong" description="SKY Web Studio theo đuổi tiêu chuẩn thiết kế cao, hiệu năng cao và tư duy kinh doanh rõ ràng. Mỗi website đều phải khiến thương hiệu trông chuyên nghiệp hơn và bán hàng tốt hơn." />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold text-white">Story</h2>
            <p className="mt-4 leading-8 text-muted">Chúng tôi được xây dựng từ nhu cầu rất thực tế: nhiều doanh nghiệp đầu tư nghiêm túc cho thương hiệu nhưng website lại chưa phản ánh đúng đẳng cấp đó.</p>
          </div>
          <div className="glass-panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold text-white">Cam kết</h2>
            <p className="mt-4 leading-8 text-muted">Thiết kế tinh tế, tốc độ mạnh, responsive hoàn hảo, UX mượt, SEO sạch và đồng hành sau bàn giao với tinh thần trách nhiệm cao.</p>
          </div>
          <div className="glass-panel rounded-3xl p-7">
            <h2 className="text-2xl font-semibold text-white">Chuẩn chất lượng</h2>
            <p className="mt-4 leading-8 text-muted">Không template đại trà. Không giao diện rẻ tiền. Không làm đẹp bề mặt mà bỏ quên chuyển đổi. Mọi thứ phải đủ premium và đủ hiệu quả.</p>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
