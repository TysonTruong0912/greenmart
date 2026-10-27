import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, MapPin, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { categories } from '@/data/mock'
import { cn } from '@/utils/cn'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems } = useCartStore()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const navigate = useNavigate()
  const totalItems = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`)
      closeMobileMenu()
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-primary-600 text-white shadow-md">
      {/* Top bar */}
      <div className="border-b border-primary-500/30">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-primary-100">
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Giao đến:</span>
              <button className="font-medium text-white hover:underline truncate max-w-[180px] sm:max-w-none">
                P.2, Quận Tân Bình, TP. Hồ Chí Minh
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4 text-primary-100">
              <Link to="/ho-tro" className="hover:text-white">Hỗ trợ</Link>
              <Link to="/khuyen-mai" className="hover:text-white">Khuyến mãi</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-3 md:gap-6">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-primary-500"
            aria-label="Mở menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={closeMobileMenu}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 font-bold text-lg">
              G
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-tight">GreenMart</span>
              <p className="text-[10px] text-primary-200 -mt-0.5">Siêu thị gia đình</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bạn tìm gì ở GreenMart?"
                className="w-full rounded-full border-0 bg-white py-2.5 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-400"
                aria-label="Tìm kiếm"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              to="/tai-khoan"
              className="hidden sm:flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-primary-500 transition"
            >
              <User className="h-5 w-5" />
              <span className="text-[11px]">Tài khoản</span>
            </Link>

            <Link
              to="/gio-hang"
              className="relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-primary-500 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-[11px] hidden sm:block">Giỏ hàng</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav - desktop */}
      <nav className="hidden lg:block border-t border-primary-500/30 bg-primary-700">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-0">
            <li>
              <Link
                to="/danh-muc"
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium hover:bg-primary-600 transition whitespace-nowrap"
              >
                <Menu className="h-4 w-4" />
                Danh mục
              </Link>
            </li>
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/danh-muc/${cat.slug}`}
                  className="block px-3 py-2.5 text-sm hover:bg-primary-600 transition whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/khuyen-mai"
                className="block px-3 py-2.5 text-sm font-semibold text-accent-300 hover:bg-primary-600 transition whitespace-nowrap"
              >
                🔥 Khuyến mãi
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMobileMenu} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white text-gray-900 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b bg-primary-600 text-white">
              <span className="font-bold text-lg">Danh mục sản phẩm</span>
              <button onClick={closeMobileMenu} className="p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="py-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/danh-muc/${cat.slug}`}
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                  >
                    
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t space-y-2">
              <Link
                to="/tai-khoan"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Tài khoản của tôi
              </Link>
              <Link
                to="/khuyen-mai"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-accent-50 text-accent-700 text-sm font-medium"
              >
                🔥 Khuyến mãi sốc
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
