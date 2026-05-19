# Deploy SKY Web Studio lên Vercel (free)

## Cách nhanh nhất

### 1) Đẩy code lên GitHub
Tạo repo mới rồi push thư mục `SKY-Web-Studio` lên.

### 2) Import vào Vercel
- Vào: https://vercel.com/new
- Chọn repo GitHub vừa push
- Framework sẽ tự nhận là **Next.js**
- Root Directory: `./` nếu repo chỉ chứa project này
- Bấm **Deploy**

### 3) Domain free dùng ngay
Sau khi deploy xong, Vercel sẽ cấp domain dạng:
- `ten-project.vercel.app`

## Environment Variables cần thêm
Vào **Project Settings -> Environment Variables** rồi thêm:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_NOTIFY_CHAT_ID`
- `DISCORD_WEBHOOK_URL`
- `LEAD_WEBHOOK_URL`
- `GOOGLE_SHEETS_SCRIPT_URL`

Có thể để trống nếu chưa dùng notify tương ứng. Site vẫn chạy, chỉ skip notify.

## Build settings
Thường không cần chỉnh gì thêm:
- Framework Preset: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`

## Sau deploy cần test ngay
1. Mở homepage
2. Test form contact
3. Test form quote
4. Test booking
5. Kiểm tra lead có vào `notify` / webhook / sheets không

## Lưu ý
- File JSON local như `data/leads.json` không phù hợp để lưu bền vững trên serverless lâu dài.
- Hiện tại phù hợp để demo / thử nghiệm / pre-production.
- Khi chạy production nghiêm túc, nên chuyển lead sang Google Sheets, DB, webhook CRM hoặc Supabase.
