# Google Sheets setup cho SKY Web Studio

## Mục tiêu
Dùng Google Sheets làm nơi lưu lead bền vững khi deploy web lên Vercel.

## Bước 1: Tạo Google Sheet
- Tạo 1 file Google Sheet mới
- Đặt tên tùy ý, ví dụ: `SKY Web Studio Leads`

## Bước 2: Mở Apps Script
- Trong Google Sheet: **Extensions -> Apps Script**
- Xóa code mặc định
- Dán toàn bộ nội dung từ file:
  - `GOOGLE_SHEETS_APPS_SCRIPT.gs`

## Bước 3: Deploy Web App
- Bấm **Deploy -> New deployment**
- Chọn type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Bấm **Deploy**
- Copy URL web app

## Bước 4: Gắn vào web
Set env trên local hoặc Vercel:

```env
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/...../exec
```

## Payload mà web gửi lên
Web hiện gửi:
- `event`
- `headers`
- `row`
- `lead`

Apps Script đang ưu tiên dùng `row` nếu có, nên rất ổn định.

## Test nhanh
Sau khi deploy script:
1. Gắn `GOOGLE_SHEETS_SCRIPT_URL`
2. Submit form contact / quote / booking
3. Mở sheet xem có dòng mới không

## Cấu trúc cột hiện tại
1. createdAt
2. id
3. type
4. name
5. phone
6. email
7. company
8. industry
9. websiteType
10. pageCount
11. features
12. multilingual
13. budget
14. timeline
15. preferredDate
16. preferredTime
17. goal
18. notes
19. page
20. source
21. website
22. ip
23. userAgent

## Ghi chú quan trọng
- Khi dùng Vercel, hãy xem Google Sheets là nơi lưu chính.
- File `data/leads.json` chỉ nên coi là local/dev fallback.
