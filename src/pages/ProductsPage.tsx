import { useState, useMemo } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { Filter, ChevronDown, X } from 'lucide-react'
import { products, categories } from '@/data/mock'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { slug: pathSlug } = useParams()
  const [showFilters, setShowFilters] = useState(false)

  const categorySlug = pathSlug || searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'newest'
  const minPrice = Number(searchParams.get('minPrice')) || 0
  const maxPrice = Number(searchParams.get('maxPrice')) || 1000000
  const onlySale = searchParams.get('sale') === '1' || window.location.pathname.includes('khuyen-mai')
  const q = searchParams.get('q') || ''

  const filtered = useMemo(() => {
    let result = [...products]

    if (categorySlug) {
      const cat = categories.find((c) => c.slug === categorySlug)
      if (cat) result = result.filter((p) => p.categoryId === cat.id)
    }

    if (q) {
      const lower = q.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.sku.toLowerCase().includes(lower)
      )
    }

    if (onlySale) {
      result = result.filter((p) => p.discountPercent && p.discountPercent > 0)
    }

    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      default:
        break
    }

    return result
  }, [categorySlug, sort, minPrice, maxPrice, onlySale, q])

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value === null || value === '') next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  const currentCategory = categories.find((c) => c.slug === categorySlug)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        {currentCategory ? (
          <>
            <Link to="/san-pham" className="hover:text-primary-600">Sản phẩm</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentCategory.name}</span>
          </>
        ) : q ? (
          <span className="text-gray-900">Kết quả tìm kiếm: "{q}"</span>
        ) : (
          <span className="text-gray-900">Tất cả sản phẩm</span>
        )}
      </nav>

      <div className="flex gap-6">
        {/* Sidebar filters - desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card p-4 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => updateParam('category', null)}
                  className={cn(
                    'w-full text-left px-2 py-1.5 rounded hover:bg-gray-50',
                    !categorySlug && 'bg-primary-50 text-primary-700 font-medium'
                  )}
                >
                  Tất cả
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => updateParam('category', cat.slug)}
                    className={cn(
                      'w-full text-left px-2 py-1.5 rounded hover:bg-gray-50',
                      categorySlug === cat.slug && 'bg-primary-50 text-primary-700 font-medium'
                    )}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>

            <hr className="my-4" />

            <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Dưới 50.000đ', min: 0, max: 50000 },
                { label: '50.000đ - 100.000đ', min: 50000, max: 100000 },
                { label: '100.000đ - 200.000đ', min: 100000, max: 200000 },
                { label: 'Trên 200.000đ', min: 200000, max: 10000000 },
              ].map((range) => (
                <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={minPrice === range.min && maxPrice === range.max}
                    onChange={() => {
                      updateParam('minPrice', String(range.min))
                      updateParam('maxPrice', String(range.max))
                    }}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  {range.label}
                </label>
              ))}
            </div>

            <hr className="my-4" />

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => updateParam('sale', e.target.checked ? '1' : null)}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              Chỉ hiện khuyến mãi
            </label>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-sm text-gray-600">
              Tìm thấy <strong>{filtered.length}</strong> sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4" />
                Bộ lọc
              </Button>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="bestseller">Bán chạy</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="card py-16 text-center">
              <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => setSearchParams({})}
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Bộ lọc</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Same filter content simplified */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Danh mục</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        updateParam('category', cat.slug)
                        setShowFilters(false)
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm border',
                        categorySlug === cat.slug
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-300'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => updateParam('sale', e.target.checked ? '1' : null)}
                />
                Chỉ hiện khuyến mãi
              </label>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowFilters(false)}>
              Áp dụng
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
