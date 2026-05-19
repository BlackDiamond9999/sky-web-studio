import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SKY Web Studio - Thiết Kế Website & Landing Page Chuyên Nghiệp',
  description: 'Luxury web design agency chuyên thiết kế website doanh nghiệp cao cấp, landing page chuyển đổi cao, website Spa, Nha khoa, Cafe, Nhà hàng và thương hiệu dịch vụ premium.',
  openGraph: {
    title: 'SKY Web Studio',
    description: 'Thiết kế website & landing page chuyên nghiệp, cao cấp, tập trung tăng lead và hình ảnh thương hiệu.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
