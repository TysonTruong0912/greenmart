import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-lg">
                G
              </div>
              <div>
                <span className="text-xl font-bold text-white">GreenMart</span>
                <p className="text-xs text-gray-400">Siêu thị gia đình trực tuyến</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Cung cấp thực phẩm tươi sống, hàng tiêu dùng chất lượng với giá tốt nhất. Giao hàng nhanh chóng tận nhà.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-primary-600 transition" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-primary-600 transition" aria-label="Youtube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Về GreenMart</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/gioi-thieu" className="hover:text-primary-400 transition">Giới thiệu</Link></li>
              <li><Link to="/tuyen-dung" className="hover:text-primary-400 transition">Tuyển dụng</Link></li>
              <li><Link to="/tin-tuc" className="hover:text-primary-400 transition">Tin tức</Link></li>
              <li><Link to="/lien-he" className="hover:text-primary-400 transition">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/chinh-sach/giao-hang" className="hover:text-primary-400 transition">Chính sách giao hàng</Link></li>
              <li><Link to="/chinh-sach/doi-tra" className="hover:text-primary-400 transition">Chính sách đổi trả</Link></li>
              <li><Link to="/chinh-sach/bao-mat" className="hover:text-primary-400 transition">Chính sách bảo mật</Link></li>
              <li><Link to="/chinh-sach/thanh-toan" className="hover:text-primary-400 transition">Hướng dẫn thanh toán</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary-400" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <a href="tel:19001234" className="hover:text-primary-400">1900 1234</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <a href="mailto:hotro@greenmart.vn" className="hover:text-primary-400">hotro@greenmart.vn</a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Giờ làm việc: 7:00 - 22:00 hàng ngày
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 GreenMart. Tất cả quyền được bảo lưu.</p>
          <p>Giấy phép kinh doanh số 0123456789 do Sở KH&ĐT TP.HCM cấp</p>
        </div>
      </div>
    </footer>
  )
}
