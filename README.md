# GreenMart – Siêu thị gia đình trực tuyến

Thực hành xây dựng website bán thực phẩm & hàng tiêu dùng, lấy cảm hứng từ mô hình siêu thị online tại Việt Nam.

## Công nghệ

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (giỏ hàng)
- React Hook Form + Zod
- Lucide React (icon)

## Tính năng hiện có

- Trang chủ: banner, danh mục, khuyến mãi, sản phẩm bán chạy
- Danh sách sản phẩm: lọc, sắp xếp, tìm kiếm
- Chi tiết sản phẩm
- Giỏ hàng (thêm / xóa / sửa số lượng, lưu localStorage)
- Đăng nhập / Đăng ký (UI + validation)
- Responsive (mobile / tablet / desktop)

## Cách chạy

```bash
# Cài đặt
npm install

# Chạy dev
npm run dev
```

Mở trình duyệt: http://localhost:5173

## Cấu trúc thư mục

```
src/
├── components/     # UI components
├── data/           # Dữ liệu mẫu
├── layouts/        # Layout chính
├── pages/          # Các trang
├── stores/         # Zustand stores
├── types/          # TypeScript types
└── utils/          # Hàm tiện ích
```

## Ghi chú

- Hiện dùng **mock data** (chưa có backend).
- Ảnh sản phẩm lấy từ Unsplash (miễn phí).
- Đây là đồ án học tập, không dùng cho mục đích thương mại.

## Tác giả

Sinh viên Trương Nguyễn Tấn Sĩ thực hiện thực hành môn Thiết Kế Web.
