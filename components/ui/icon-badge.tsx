import { ArrowRight, BadgeCheck, Gem, Sparkles } from 'lucide-react';

const icons = {
  sparkles: Sparkles,
  gem: Gem,
  check: BadgeCheck,
  arrow: ArrowRight
};

export function IconBadge({ icon, className = '' }: { icon: keyof typeof icons; className?: string }) {
  const Icon = icons[icon];
  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sky ${className}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}
