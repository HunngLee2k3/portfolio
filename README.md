# 🎬 Minh Nhật Video Editor — Portfolio + Admin System

## 📋 Tổng quát

Hệ thống hoàn chỉnh gồm:
- **🏠 Portfolio** (portfolio.html): Trang chủ hiển thị video dự án, showreel, kỹ năng
- **🛠️ Tools** (tools.html): Công cụ xử lý ảnh (cắt ảnh thẻ, làm nét ảnh)
- **⚙️ Admin Panel** (admin.html): Quản lý nội dung từ backend
- **🔥 Firebase**: Lưu trữ dữ liệu (Firestore)
- **☁️ Cloudinary**: Upload video & ảnh

---

## 🚀 Cài đặt nhanh

### 1. Firebase Setup
- Đọc [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- Tạo Firestore collections: `profile`, `projects`, `categories`
- Bật Authentication Email/Password
- Tạo tài khoản admin

### 2. Upload lên Hosting
Chọn một trong các option:
- **Vercel** (miễn phí): Drag-drop các file HTML
- **Netlify**: Kết nối GitHub hoặc drag-drop
- **GitHub Pages**: Push repo lên GitHub
- **Firebase Hosting**: Tích hợp tự động với Firebase

### 3. Thử nghiệm

```
http://your-domain.com/portfolio.html  → Trang chủ
http://your-domain.com/tools.html      → Công cụ
http://your-domain.com/admin.html      → Admin login
```

---

## 📱 Các tính năng

### Portfolio.html
✅ **Thanh timeline nav** (00:00:00, 00:00:12...) — điều hướng gợi video editing  
✅ **Progress playhead** — thanh tiến độ scroll theo kiểu video player  
✅ **Scroll reveal animation** — text fade-in lướt đến  
✅ **Dải icon công cụ** — chạy tự động (GitHub, ChatGPT, Gemini, VS Code...)  
✅ **Video showreel 9:16** — vertical format, phù hợp mobile & TikTok  
✅ **Portfolio grid** — xem video dự án theo danh mục  
✅ **Skills panel** — thanh độ thành thạo + tags công cụ  
✅ **Responsive** — desktop, tablet, mobile  

### Tools.html
✅ **Cắt ảnh thẻ** — 3x4cm, 4x6cm, 2x3cm  
✅ **Làm nét ảnh** — xử lý trực tiếp trên trình duyệt  
✅ **Menu mobile** — drawer sidebar  
✅ **Dải icon công cụ** — hiển thị công cụ làm việc  

### Admin.html
✅ **Đăng nhập Firebase** — bảo mật với email/password  
✅ **Quản lý video dự án** — CRUD (thêm, sửa, xóa)  
✅ **Quản lý showreel** — cập nhật URL video  
✅ **Quản lý avatar** — upload ảnh đại diện  
✅ **Quản lý danh sách chuyên ngành** — CRUD categories  
✅ **Upload Cloudinary** — tự động đẩy hình ảnh lên cloud  
✅ **Toast notifications** — phản hồi thao tác  

---

## 📂 Cấu trúc Firestore

```
firestore
├── profile/
│   ├── avatar
│   │   ├── url: "cloudinary-url"
│   │   └── updatedAt: timestamp
│   └── showreel
│       ├── url: "youtube-url"
│       └── updatedAt: timestamp
├── projects/
│   ├── [docId]
│   │   ├── name: "Quảng cáo trà sữa Mộc"
│   │   ├── category: "TVC / F&B"
│   │   ├── description: "..."
│   │   ├── videoURL: "youtube-url"
│   │   ├── thumbnail: "cloudinary-url"
│   │   └── createdAt: timestamp
│   └── ...
└── categories/
    ├── [docId]
    │   ├── name: "TVC / Quảng cáo"
    │   ├── emoji: "📺"
    │   └── createdAt: timestamp
    └── ...
```

---

## 🔐 Bảo mật

### Firebase Rules
- ✅ Ai cũng có thể **đọc** dữ liệu (public profile)
- 🔒 Chỉ user đã login mới **sửa/xóa**
- 🔑 API Key công khai (chỉ read được)

### Cloudinary
- ✅ Upload Preset (`videoprofile`) công khai
- 🔒 API Secret không bao giờ để frontend

### Admin Credentials
- 📧 Email: `admin@yourdomain.com` (bạn tạo)
- 🔐 Password: Mạnh, lưu ở nơi an toàn

---

## 💡 Hướng dẫn sử dụng

### Cho Bạn (Admin)
1. Truy cập `admin.html`
2. Đăng nhập email/password
3. Từng tab để quản lý nội dung

**Workflow thêm video dự án:**
1. Tab "Video Dự án"
2. Nhập tên, chọn chuyên ngành, mô tả
3. Dán URL YouTube/Vimeo (hoặc upload thumbnail)
4. Bấm "Thêm Video"
5. Dữ liệu tự lưu Firestore ✅

**Workflow cập nhật showreel:**
1. Tab "Showreel"
2. Dán URL video
3. Bấm "Lưu Showreel" ✅

### Cho nhà tuyển dụng
1. Vào `portfolio.html`
2. Scroll xem danh sách dự án
3. Bấm các icon ở nav timeline để jump nhanh
4. Vào `tools.html` để xem công cụ hỗ trợ

---

## 🎨 Tuỳ chỉnh

### Thay đổi màu sắc
- Portfolio: Mở `portfolio.html`, tìm `:root{` → thay `--blue`, `--cyan`
- Admin: Mở `admin.html`, tìm `:root{` → thay `--primary`, `--danger`, ...

### Thêm công cụ mới
- Tools page: Mở `tools.html`, thêm `<div class="tool-card">` mới
- Admin page: Thêm `<div class="tab">` + `<div class="tab-content">`

### Thay đổi Firestore structure
- Sửa đoạn `collection(db, 'projects')` → `collection(db, 'your-collection-name')`

---

## 🆘 Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-----------|---------|
| Admin login không được | Email/password sai | Tạo lại user ở Firebase Console |
| Video không hiển thị | URL YouTube/Vimeo sai | Kiểm tra lại URL, public video |
| Upload ảnh lỗi | Cloudinary config sai | Verify Cloud Name & Upload Preset |
| Dữ liệu không load | Firestore rules chặn | Kiểm tra Security Rules |
| Mobile nav không cuộn | Không update JS | Dùng phiên bản mới nhất |

---

## 📞 Contact & Support

- Lỗi gì báo cho mình ngay
- Cần thêm tính năng? Báo requirements
- Muốn thay đổi giao diện? Tell me the vision

---

## 📈 Roadmap (Optional)

- [ ] Blog section (viết article về video editing)
- [ ] Comment system (khách hàng review)
- [ ] Contact form (inbox messages)
- [ ] Analytics dashboard (xem stats)
- [ ] Dark mode toggle
- [ ] Multi-language (EN, VI)

---

**Happy creating! 🎬✨**

Last updated: 2026-07-04
