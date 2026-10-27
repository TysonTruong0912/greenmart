import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/data/mock'
import { Button } from '@/components/ui/Button'

export function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore()
  const subtotal = getSubtotal()
  const shipping = subtotal >= 300000 ? 0 : 20000
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-xl font-bold text-gray-900">Giỏ hàng trống</h1>
        <p className="mt-2 text-gray-500">Hãy thêm sản phẩm vào giỏ để tiếp tục mua sắm</p>
        <Link to="/san-pham">
          <Button className="mt-6">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Giỏ hàng <span className="text-base font-normal text-gray-500">({items.length} sản phẩm)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="card p-4 flex gap-4">
              <Link to={`/san-pham/${item.product.slug}`} className="shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover bg-gray-50"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/san-pham/${item.product.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-primary-600 font-semibold">
                  {formatPrice(item.product.price)}
                  <span className="text-gray-400 font-normal"> / {item.product.unit}</span>
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-50"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-50"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition"
                      aria-label="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 mt-2"
          >
            Xóa toàn bộ giỏ hàng
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí giao hàng</span>
                <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-primary-600">
                  Mua thêm {formatPrice(300000 - subtotal)} để được miễn phí giao hàng
                </p>
              )}
              <hr className="my-3" />
              <div className="flex justify-between text-base font-bold">
                <span>Tổng cộng</span>
                <span className="text-primary-600">{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/thanh-toan">
              <Button className="w-full mt-5" size="lg">
                Tiến hành đặt hàng
              </Button>
            </Link>
            <Link
              to="/san-pham"
              className="mt-3 block text-center text-sm text-primary-600 hover:underline"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
