import { LenisProvider } from '@/components/motion/lenis-provider';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LenisProvider />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
