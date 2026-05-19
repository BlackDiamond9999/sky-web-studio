import { PageShell } from '@/components/layout/page-shell';
import { QuoteConfigurator } from '@/components/ui/quote-configurator';

export default function QuotePage() {
  return (
    <PageShell>
      <main>
        <QuoteConfigurator />
      </main>
    </PageShell>
  );
}
