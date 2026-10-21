# TODO - Sửa hiển thị & Tối ưu hiệu năng Portfolio

- [x] Cập nhật CSS để `.tabs` không còn trượt ngang khi màn hình nhỏ (720px trở xuống), chuyển sang wrap xuống dòng.
- [x] Bảo đảm `.tab` cho phép xuống dòng tự nhiên trên mobile (`white-space: normal`).
- [x] Tách toàn bộ CSS ra thư mục `css/` riêng biệt (`css/style.css`, `css/tools.css`, `css/admin.css`).
- [x] Tối ưu độ mượt khi cuộn trang (`requestAnimationFrame`, GPU `scaleX` cho progress bar, loại bỏ `scrollTo` lặp liên tục trên mobile).
- [x] Chuyển dải icon công cụ (marquee) sang CSS animation GPU mượt mà thay vì `setInterval`.
- [x] Tối ưu tải thumbnail video tự động qua Cloudinary mà không cần tải toàn bộ video ngầm.
