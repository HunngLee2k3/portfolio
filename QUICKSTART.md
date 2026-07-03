# ⚡ Quick Start — 5 bước để chạy hệ thống

## 📦 Các file bạn đã có

```
✅ portfolio.html      — Trang chủ (progress bar + scroll reveal + video 9:16)
✅ tools.html          — Công cụ ảnh (cắt ảnh thẻ, làm nét)
✅ admin.html          — Admin panel (quản lý nội dung)
✅ firebase-config.js  — Firebase & Cloudinary config (dùng tham khảo)
```

---

## 🚀 Bước 1: Setup Firebase (5 phút)

### 1.1 Tạo Firestore Collections

Vào [Firebase Console](https://console.firebase.google.com) → Project `profilehunnglee203` → Firestore Database

**Tạo 3 collections:**

1. **`profile`** (chứa avatar & showreel)
   ```
   📄 Document ID: avatar
      └─ url: "" (Cloudinary URL, để trống lúc đầu)
   
   📄 Document ID: showreel
      └─ url: "" (YouTube URL, để trống lúc đầu)
   ```

2. **`categories`** (danh sách chuyên ngành)
   ```
   📄 Auto ID
      ├─ name: "TVC / Quảng cáo"
      └─ emoji: "📺"
   
   📄 Auto ID
      ├─ name: "MV Ca nhạc"
      └─ emoji: "🎵"
   
   (tạo 3-4 categories sơ bộ)
   ```

3. **`projects`** (video dự án)
   ```
   (để trống lúc đầu, sẽ thêm qua admin)
   ```

### 1.2 Bật Authentication

Vào **Authentication** tab → **Sign-in method** → **Email/Password** → **Enable**

### 1.3 Tạo tài khoản Admin

**Users** tab → **Add user**
- Email: `admin@gmail.com` (hoặc email khác)
- Password: `Admin@123456` (tùy chỉnh, lưu vào somewhere safe)

✅ Xong Firebase setup!

---

## 🚀 Bước 2: Setup Cloudinary (2 phút)

Vào [Cloudinary Console](https://cloudinary.com/console/c-f6b3d60d2e45407a0b5c9d5e3f7a2b8c/media_library)

- Cloud Name: `dfs1bwlez` ✅
- Upload Preset: `videoprofile` ✅ (đã setup)

Không cần làm gì thêm, đã sẵn sàng!

---

## 🚀 Bước 3: Deploy lên Hosting (5 phút)

Chọn một option:

### Option A: Vercel (Đơn giản nhất)
1. Vào https://vercel.com
2. Sign up với GitHub / Google
3. **Add New Project** → **Import from Git** → Link repo GitHub của bạn
4. Hoặc **Drag & drop** 4 file HTML/JS vào

### Option B: Netlify
1. Vào https://netlify.com
2. **New site from Git** hoặc **Drag & drop files**
3. Tên site: `minhnhat-portfolio`

### Option C: GitHub Pages (Free)
1. Tạo repo `minhnhat-portfolio.github.io`
2. Push 4 file lên
3. Vào `https://minhnhat-portfolio.github.io/portfolio.html`

### Option D: Firebase Hosting (Integrate ngay)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

→ Sẽ deploy tại `https://profilehunnglee203.web.app`

✅ Xong deployment!

---

## 🚀 Bước 4: Test Admin Panel (3 phút)

1. Vào `https://your-domain.com/admin.html`
2. Login với email/password admin
3. **Thêm avatar:**
   - Tab "Avatar"
   - Chọn ảnh của bạn
   - Bấm "Lưu Avatar"
   - ✅ Check Firestore xem có update không

4. **Thêm showreel:**
   - Tab "Showreel"
   - Dán YouTube URL: `https://www.youtube.com/embed/VIDEO_ID`
   - Bấm "Lưu Showreel"

5. **Thêm video dự án:**
   - Tab "Video Dự án"
   - Nhập: Tên, chuyên ngành, mô tả
   - Dán URL YouTube
   - Chọn thumbnail (optional)
   - Bấm "Thêm Video"
   - ✅ Check Firestore xem collection `projects` có data không

---

## 🚀 Bước 5: Xem Portfolio Live (1 phút)

1. Vào `https://your-domain.com/portfolio.html`
2. Scroll xem các hiệu ứng:
   - ✅ **Progress bar** dưới nav chạy khi scroll
   - ✅ **Thanh timeline nav** ghi nhãn (INTRO, SHOWREEL, DỰ ÁN...)
   - ✅ **Dải icon** chạy tự động (GitHub, ChatGPT, Gemini...)
   - ✅ **Video showreel** hiển thị (9:16 vertical)
   - ✅ **Danh sách dự án** từ Firestore
   - ✅ **Avatar** từ Cloudinary

---

## ✨ Bonus: Thêm dữ liệu demo

Nếu muốn test nhiều hơn, thêm 3-4 video dự án qua admin:

| Tên | Chuyên ngành | YouTube URL |
|-----|-------------|------------|
| Quảng cáo trà sữa | TVC / F&B | https://youtube.com/embed/dQw4w9WgXcQ |
| MV "Tình yêu" | MV Ca nhạc | https://youtube.com/embed/dQw4w9WgXcQ |
| Vlog du lịch | Vlog / Content | https://youtube.com/embed/dQw4w9WgXcQ |

(Thay `dQw4w9WgXcQ` bằng ID video thực của bạn)

---

## 🎯 Checklist hoàn thành

- [ ] Firebase Collections tạo xong
- [ ] Firebase Auth bật, tài khoản admin tạo
- [ ] Cloudinary setup ✅
- [ ] Deploy lên hosting
- [ ] Test login admin
- [ ] Upload avatar & showreel
- [ ] Thêm 1-2 video dự án
- [ ] View portfolio.html, xem dữ liệu từ Firestore
- [ ] Kiểm tra mobile responsive

---

## 🆘 Common Issues

**Q: Admin login không được**
- A: Kiểm tra email/password đúng không ở Firebase Console

**Q: Upload ảnh lỗi**
- A: Check Cloudinary API, tạo lại upload preset nếu cần

**Q: Video không hiển thị**
- A: Kiểm tra YouTube URL format: `https://youtube.com/embed/VIDEO_ID`

**Q: Firestore dữ liệu trống**
- A: Check Security Rules, nó có thể chặn read. Dùng rules từ FIREBASE_SETUP.md

---

## 📞 Next Steps

Sau khi xong 5 bước này:
1. Đọc full [README.md](./README.md) để hiểu cấu trúc
2. Đọc [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) cho advanced config
3. Customize CSS (màu sắc, typography...)
4. Thêm domain riêng (tùy chọn)

---

**Bạn xong chưa? Báo cho mình khi hit any snag!** 🚀
