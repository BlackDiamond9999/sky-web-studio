export type QuoteInput = {
  industry: string;
  websiteType: string;
  pageCount: '1-3' | '4-7' | '8-12' | '12+';
  features: string[];
  multilingual: boolean;
};

export function estimateQuote(input: QuoteInput) {
  let base = 8;

  if (input.websiteType.includes('booking')) base += 6;
  if (input.websiteType.includes('Landing')) base += 3;
  if (input.pageCount === '4-7') base += 4;
  if (input.pageCount === '8-12') base += 8;
  if (input.pageCount === '12+') base += 14;
  base += input.features.length * 1.5;
  if (input.multilingual) base += 6;

  const min = Math.round(base);
  const max = Math.round(base * 1.45);

  const recommendedPlan = max <= 15 ? 'Basic' : max <= 30 ? 'Professional' : max <= 50 ? 'Premium' : 'Enterprise';
  const timeline = max <= 15 ? '7 - 12 ngày' : max <= 30 ? '12 - 18 ngày' : max <= 50 ? '18 - 30 ngày' : 'Theo scope riêng';

  return {
    priceRange: `Từ ${min} - ${max} triệu`,
    recommendedPlan,
    timeline
  };
}
