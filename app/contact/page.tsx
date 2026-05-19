import { PageShell } from '@/components/layout/page-shell';
import { BookingBlock } from '@/components/ui/booking-block';
import { ContactFormClient } from '@/components/forms/contact-form-client';
import { SectionHeading } from '@/components/ui/section-heading';

export default function ContactPage() {
  return (
    <PageShell>
      <main className="section-space container-luxury space-y-14">
        <SectionHeading eyebrow="Liên hệ" title="Trao đổi nhanh về website, landing page hoặc chiến lược nâng cấp thương hiệu số" description="Nếu bạn muốn một website thật sự sang trọng, đáng tin và có khả năng chuyển đổi tốt hơn, đây là điểm bắt đầu phù hợp." />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactFormClient />
          <BookingBlock />
        </div>
      </main>
    </PageShell>
  );
}
