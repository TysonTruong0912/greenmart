import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Truck, Shield, ChevronRight, Star } from 'lucide-react'
import { products, categories, formatPrice } from '@/data/mock'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const { addToast } = useUIStore()

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy sản phẩm</h1>
        <Link to="/san-pham" className="mt-4 inline-block text-primary-600 hover:underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const related = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 5)

  const handleAddToCart = () => {
    addItem(product, quantity)
    addToast(`Đã thêm ${quantity} ${product.unit} ${product.name} vào giỏ`)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-1">
        <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {category && (
          <>
            <Link to={`/danh-muc/${category.slug}`} className="hover:text-primary-600">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-gray-900 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= Math.round(product.rating!)
                        ? 'fill-accent-400 text-accent-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} đánh giá)
              </span>
            </div>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="badge-sale">-{product.discountPercent}%</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">Đơn vị: {product.unit}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                product.stock > 10
                  ? 'bg-green-50 text-green-700'
                  : product.stock > 0
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </span>
          </div>

          {/* Quantity + Add */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 hover:bg-gray-50"
                aria-label="Giảm"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2.5 hover:bg-gray-50"
                aria-label="Tăng"
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1 sm:flex-none"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              Thêm vào giỏ
            </Button>
            <Button variant="accent" size="lg" className="flex-1 sm:flex-none" disabled={product.stock === 0}>
              Mua ngay
            </Button>
          </div>

          {/* Policies */}
          <div className="mt-8 space-y-3 border-t pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-primary-500" />
              <span>Giao hàng nhanh trong 2 giờ tại nội thành TP.HCM</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-primary-500" />
              <span>Cam kết hàng chính hãng, đổi trả trong 24 giờ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Mô tả sản phẩm</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description ||
            `${product.name} là sản phẩm chất lượng cao, được lựa chọn kỹ lưỡng để mang đến trải nghiệm tốt nhất cho gia đình bạn. Sản phẩm được bảo quản đúng tiêu chuẩn và giao hàng nhanh chóng.`}
        </p>
        <p className="mt-3 text-xs text-gray-400 italic">
          * Thông tin chi tiết về thành phần, xuất xứ và hạn sử dụng sẽ được cập nhật từ hệ thống.
        </p>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
