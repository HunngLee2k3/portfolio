# 🔥 Hướng dẫn cài đặt Firebase & Firestore

## 1. Firestore Database Setup

Vào [Firebase Console](https://console.firebase.google.com) → Select project `profilehunnglee203` → Firestore Database

### Tạo Collections:

1. **Collections > Create Collection**: `profile`
   - Document ID: `showreel`
     ```json
     {
       "url": "https://youtube.com/watch?v=...",
       "updatedAt": timestamp
     }
     ```
   - Document ID: `avatar`
     ```json
     {
       "url": "cloudinary-url-here",
       "updatedAt": timestamp
     }
     ```

2. **Collections > Create Collection**: `projects`
   - Auto-generate document IDs, add fields:
     ```json
     {
       "name": "Tên dự án",
       "category": "TVC / Quảng cáo",
       "description": "Mô tả",
       "videoURL": "youtube-url",
       "thumbnail": "cloudinary-url",
       "createdAt": timestamp
     }
     ```

3. **Collections > Create Collection**: `categories`
   - Auto-generate document IDs:
     ```json
     {
       "name": "TVC / Quảng cáo",
       "emoji": "📺",
       "createdAt": timestamp
     }
     ```

## 2. Firestore Security Rules

Vào Firestore Database → Rules tab, thay thế với:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép đọc public
    match /{document=**} {
      allow read: if true;
    }
    
    // Chỉ admin được sửa/xóa
    match /projects/{docId} {
      allow write: if request.auth != null;
    }
    match /categories/{docId} {
      allow write: if request.auth != null;
    }
    match /profile/{docId} {
      allow write: if request.auth != null;
    }
  }
}
```

## 3. Authentication Setup

Vào Authentication tab → Sign-in method → Email/Password → Enable

### Tạo tài khoản Admin:

1. Tab "Users" → Add user
2. Email: `admin@yourdomain.com` (tùy chỉnh)
3. Password: `[strong password]`

**Lưu tài khoản này để đăng nhập admin panel**

## 4. Cloudinary Setup

Upload Preset đã tạo: `videoprofile`

Vào [Cloudinary Dashboard](https://cloudinary.com/console) → Settings → Upload

- Tìm `videoprofile` preset
- Đảm bảo cho phép upload từ unsigned mode

## 5. Cấu trúc thư mục Deploy

```
/
├── portfolio.html (trang chủ)
├── tools.html (công cụ ảnh)
├── admin.html (admin panel)
└── firebase-config.js (config - optional)
```

## 6. Sử dụng

### Trang chủ: `portfolio.html`
- Lướt xem danh sách dự án
- Hiệu ứng scroll reveal
- Progress bar playhead

### Admin: `admin.html`
- Đăng nhập với email/password
- Quản lý video, showreel, avatar, categories
- Upload trực tiếp Cloudinary

## 7. Notes

- **API Key Cloudinary**: Để trong HTML không sao (chỉ upload preset được phép)
- **Firebase API Key**: Công khai trong frontend (chỉ read được, write cần auth)
- **Cloudinary API Secret**: ⚠️ KHÔNG bao giờ để frontend, chỉ dùng backend nếu cần

## 8. Testing

1. Upload ảnh avatar qua admin
2. Thêm category "TVC / Quảng cáo"
3. Thêm video dự án (chọn category)
4. Refresh portfolio.html → Kiểm tra dữ liệu tải từ Firestore

---

**Mọi vấn đề hoặc cần tích hợp thêm tính năng? Hãy báo cho mình!** 🚀
