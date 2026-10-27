import { Link } from 'react-router-dom'
import { ChevronRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react'
import { products, categories, banners, formatPrice } from '@/data/mock'
import { ProductCard } from '@/components/product/ProductCard'
import { useState, useEffect } from 'react'

export function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const saleProducts = products.filter((p) => p.discountPercent && p.discountPercent > 0)
  const freshProducts = products.filter((p) => p.isFresh)
  const bestSellers = products.filter((p) => p.isBestSeller)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gray-50">
      {/* Banner carousel */}
      <section className="container mx-auto px-4 pt-4">
        <div className="relative overflow-hidden rounded-xl bg-primary-600 aspect-[3/1] sm:aspect-[4/1] md:aspect-[5/1]">
          {banners.map((banner, idx) => (
            <Link
              key={banner.id}
              to={banner.link || '#'}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                <div className="px-6 md:px-12 text-white">
                  <h2 className="text-xl md:text-3xl font-bold">{banner.title}</h2>
                  {banner.subtitle && (
                    <p className="mt-1 md:mt-2 text-sm md:text-lg text-white/90">{banner.subtitle}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentBanner ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Banner ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category list - text only */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/danh-muc/${cat.slug}`}
              className="flex items-center justify-center px-3 py-3 rounded-xl bg-white border border-gray-100 text-center text-sm font-medium text-gray-700 hover:border-primary-300 hover:text-primary-700 hover:shadow-card transition"
            >
              <span className="line-clamp-2 leading-snug">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-500">🔥</span> Khuyến mãi sốc
          </h2>
          <Link
            to="/khuyen-mai"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-0.5"
          >
            Xem thêm <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {saleProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Fresh products */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">🥬 Thực phẩm tươi sống</h2>
          <Link
            to="/danh-muc/thit-ca-trung-hai-san"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-0.5"
          >
            Xem thêm <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {freshProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">⭐ Sản phẩm bán chạy</h2>
          <Link
            to="/san-pham?sort=bestseller"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-0.5"
          >
            Xem thêm <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {bestSellers.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All products preview */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Tất cả sản phẩm</h2>
          <Link
            to="/san-pham"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-0.5"
          >
            Xem tất cả <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Policies */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: 'Giao hàng nhanh', desc: 'Trong 2 giờ tại TP.HCM' },
            { icon: Shield, title: 'Sản phẩm chính hãng', desc: 'Cam kết chất lượng' },
            { icon: RefreshCw, title: 'Đổi trả dễ dàng', desc: 'Trong vòng 24 giờ' },
            { icon: Headphones, title: 'Hỗ trợ 24/7', desc: 'Hotline 1900 1234' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 text-center sm:text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
