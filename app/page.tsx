import { PageShell } from '@/components/layout/page-shell';
import { HomePageSections } from '@/components/sections/home';

export default function HomePage() {
  return (
    <PageShell>
      <HomePageSections />
    </PageShell>
  );
}
