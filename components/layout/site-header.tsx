'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Dịch vụ', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Bảng giá', href: '/pricing' },
  { label: 'Về chúng tôi', href: '/about' },
  { label: 'Liên hệ', href: '/contact' }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/75 backdrop-blur-xl">
      <div className="container-luxury flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">SKY</div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-white">SKY Web Studio</p>
            <p className="text-xs text-muted">Luxury Web Design Agency</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${active ? 'bg-white/8 text-white ring-1 ring-sky/35' : 'text-silver hover:text-sky'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/quote" className="rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:border-sky hover:text-sky">Báo giá nhanh</Link>
          <Link href="/contact" className="rounded-full bg-sky px-5 py-3 text-sm font-medium text-black transition hover:bg-white">Tư vấn miễn phí</Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="container-luxury pb-5 lg:hidden">
          <div className="glass-panel rounded-3xl p-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm transition ${active ? 'bg-white/8 text-white ring-1 ring-sky/35' : 'text-silver hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Link href="/quote" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm text-white">Báo giá nhanh</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="rounded-2xl bg-sky px-4 py-3 text-center text-sm font-medium text-black">Tư vấn miễn phí</Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
