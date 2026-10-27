import { Link } from 'react-router-dom'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/data/mock'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const { addToast } = useUIStore()
  const cartItem = items.find((i) => i.productId === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = () => {
    addItem(product, 1)
    addToast(`Đã thêm ${product.name} vào giỏ hàng`)
  }

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1)
  }

  return (
    <div className={cn('card group relative flex flex-col h-full', className)}>
      {/* Badge */}
      {product.discountPercent && product.discountPercent > 0 && (
        <span className="absolute top-2 left-2 z-10 badge-sale">
          -{product.discountPercent}%
        </span>
      )}
      {product.isBestSeller && !product.discountPercent && (
        <span className="absolute top-2 left-2 z-10 badge-new">Bán chạy</span>
      )}

      {/* Image */}
      <Link to={`/san-pham/${product.slug}`} className="block aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <Link to={`/san-pham/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">/{product.unit}</p>
        </div>

        {/* Actions */}
        <div className="mt-3">
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="w-full"
              size="sm"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock === 0 ? 'Hết hàng' : 'Thêm'}
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleDecrease}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                aria-label="Giảm số lượng"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2rem] text-center font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                aria-label="Tăng số lượng"
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
