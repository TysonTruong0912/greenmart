export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  parentId?: string | null
  children?: Category[]
}
export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
}
export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description?: string
  price: number
  originalPrice?: number
  discountPercent?: number
  unit: string // kg, g, lít, ml, hộp, chai, gói
  stock: number
  isActive: boolean
  images: string[]
  categoryId: string
  category?: Category
  brandId?: string
  brand?: Brand
  rating?: number
  reviewCount?: number
  isFresh?: boolean
  isBestSeller?: boolean
  tags?: string[]
}
export interface CartItem {
  productId: string
  product: Product
  quantity: number
}
export interface User {
  id: string
  fullName: string
  email?: string
  phone?: string
  avatar?: string
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF'
}
export interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  isActive: boolean
}
export interface Address {
  id: string
  fullName: string
  phone: string
  province: string
  district: string
  ward: string
  street: string
  isDefault: boolean
}
