<<<<<<< HEAD
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
=======
# profilehunnglee203



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/onetopautox1-group/profilehunnglee203.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/onetopautox1-group/profilehunnglee203/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [Automatically close issues from merge requests](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
>>>>>>> 252ea8c6f802dcade2c276035446747b676d76c6
