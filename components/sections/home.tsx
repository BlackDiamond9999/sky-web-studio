import Image from 'next/image';
import { MultiStepLeadForm } from '@/components/forms/multi-step-lead-form';
import { Magnetic } from '@/components/motion/magnetic';
import { Parallax } from '@/components/motion/parallax';
import { Reveal, RevealStagger } from '@/components/motion/reveal';
import { IconBadge } from '@/components/ui/icon-badge';
import { homepageCopy, portfolio, pricing, reasons, services, stats, testimonials } from '@/lib/site-content';

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm uppercase tracking-[0.28em] text-sky">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}

export function HomePageSections() {
  return (
    <main className="relative overflow-hidden noise-overlay">
      <section className="section-space container-luxury relative pt-10 md:pt-16">
        <Reveal className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver">
              SKY Web Studio - Thiết Kế Website & Landing Page Chuyên Nghiệp
            </div>
            <div className="space-y-6">
              <h1 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
                {homepageCopy.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
                {homepageCopy.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a href="#contact" className="inline-flex rounded-full bg-sky px-7 py-4 text-center text-sm font-medium text-black transition hover:bg-white">Nhận tư vấn miễn phí</a>
              </Magnetic>
              <Magnetic>
                <a href="#portfolio" className="inline-flex rounded-full border border-white/10 px-7 py-4 text-center text-sm font-medium text-white transition hover:border-sky hover:text-sky">Xem dự án thực tế</a>
              </Magnetic>
            </div>
            <RevealStagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <Reveal key={item.label} className="glass-panel rounded-2xl p-5">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-muted">{item.label}</p>
                </Reveal>
              ))}
            </RevealStagger>
          </div>
          <Parallax offset={80} className="relative">
            <div className="absolute -inset-10 rounded-full bg-sky/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-4 shadow-glow">
              <div className="relative h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f10]">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
                  alt="Premium website studio showcase"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.72))]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="rounded-[24px] border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-sky">Premium Showcase</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">Luxury Digital Presence</h3>
                      </div>
                      <div className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">SKY Signature</div>
                    </div>
                    <div className="grid grid-cols-[1fr_140px] gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="text-sm text-muted">Lead uplift</p>
                        <p className="mt-3 text-3xl font-semibold text-white">+42%</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="text-sm text-muted">Booking</p>
                        <p className="mt-3 text-3xl font-semibold text-white">24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Parallax>
        </Reveal>
      </section>

      <section className="section-space container-luxury">
        <Reveal>
          <SectionTitle eyebrow="Định vị" title={homepageCopy.introTitle} description={homepageCopy.introBody} />
        </Reveal>
      </section>

      <section className="section-space container-luxury" id="services">
        <Reveal>
          <SectionTitle eyebrow="Dịch vụ" title="Giải pháp thiết kế website cao cấp cho từng mô hình kinh doanh" description="Từ website doanh nghiệp sang trọng đến landing page chuyển đổi cao, mọi thứ đều được xây dựng để phục vụ hình ảnh thương hiệu và kết quả kinh doanh." />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} className="glass-panel rounded-3xl p-7 transition hover:-translate-y-1 hover:border-sky/40">
              <IconBadge icon={index % 2 === 0 ? 'sparkles' : 'gem'} className="mb-6" />
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-base leading-8 text-muted">{service.description}</p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      <section className="section-space container-luxury" id="portfolio">
        <Reveal>
          <SectionTitle eyebrow="Portfolio" title="Dự án thực tế được thiết kế để vừa đẹp, vừa tạo ra kết quả" description="Mỗi giao diện là một tài sản thương hiệu. Mỗi cấu trúc nội dung là một công cụ thuyết phục khách hàng hành động." />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolio.map((item) => (
            <Reveal key={item.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] p-5">
              <div className="relative mb-6 h-72 overflow-hidden rounded-[24px]">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 hover:scale-105" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">{item.category}</span>
                </div>
                <p className="text-base leading-8 text-muted">{item.summary}</p>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold">{item.result}</p>
              </div>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      <section className="section-space container-luxury">
        <Reveal>
          <SectionTitle eyebrow="Vì sao chọn SKY" title="Không chỉ đẹp hơn. Thương hiệu của bạn sẽ thuyết phục hơn." />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2">
          {reasons.map((reason) => (
            <Reveal key={reason} className="glass-panel rounded-2xl p-6 text-lg leading-8 text-silver">{reason}</Reveal>
          ))}
        </RevealStagger>
      </section>

      <section className="section-space container-luxury">
        <Reveal>
          <SectionTitle eyebrow="Bảng giá" title="Minh bạch để bạn dễ chọn đúng gói phù hợp với mục tiêu" />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-6 xl:grid-cols-4">
          {pricing.map((plan) => (
            <Reveal key={plan.name} className={`rounded-3xl border p-7 ${plan.featured ? 'border-sky bg-sky/[0.08] shadow-glow' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                {plan.featured ? <span className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-black">Đề xuất</span> : null}
              </div>
              <p className="mt-4 text-3xl font-semibold text-white">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      <section className="section-space container-luxury">
        <Reveal>
          <SectionTitle eyebrow="Khách hàng nói gì" title="Sự sang trọng phải đi cùng kết quả đủ thuyết phục" />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <Reveal key={item.name} className="glass-panel rounded-3xl p-8">
              <p className="text-xl leading-9 text-white">“{item.quote}”</p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-muted">{item.name}</footer>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      <section className="section-space container-luxury" id="contact">
        <Reveal>
          <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,191,255,0.10),rgba(255,255,255,0.03),rgba(212,175,55,0.08))] p-6 md:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.28em] text-sky">Tư vấn miễn phí</p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                  Sẵn sàng để thương hiệu của bạn trông đắt giá hơn và chuyển đổi tốt hơn?
                </h2>
                <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                  Hãy để SKY Web Studio tư vấn cho bạn cấu trúc website, phong cách thiết kế và lộ trình triển khai phù hợp với mục tiêu kinh doanh thực tế.
                </p>
                <div className="grid gap-3 text-sm text-muted sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Ngành nghề: Spa / Nha khoa / Cafe / Nhà hàng / Doanh nghiệp dịch vụ</div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Mục tiêu: Tăng lead / booking / doanh thu / hình ảnh thương hiệu</div>
                </div>
              </div>
              <MultiStepLeadForm />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
