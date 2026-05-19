const links = {
  company: [
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' }
  ],
  services: [
    { label: 'Website cao cấp', href: '/services' },
    { label: 'Landing page', href: '/services' },
    { label: 'Bảo trì website', href: '/pricing' }
  ],
  contact: [
    { label: 'hello@skywebstudio.vn', href: 'mailto:hello@skywebstudio.vn' },
    { label: '0900 000 000', href: 'tel:0900000000' },
    { label: 'Zalo OA / Booking Call', href: '/contact' }
  ]
};

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black/20">
      <div className="container-luxury grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">SKY Web Studio</h3>
          <p className="max-w-md text-sm leading-7 text-muted">
            Thiết kế website và landing page cao cấp cho thương hiệu muốn nâng đẳng cấp hình ảnh, tăng niềm tin và tối ưu chuyển đổi thật.
          </p>
        </div>

        <FooterColumn title="Công ty" items={links.company} />
        <FooterColumn title="Dịch vụ" items={links.services} />
        <FooterColumn title="Liên hệ" items={links.contact} />
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">{title}</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <a key={item.label} href={item.href} className="block text-sm text-muted transition hover:text-sky">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
