export interface Product {
  id: string
  name: string
  brand: string
  modelNumber: string
  type: "Analog" | "Digital" | "Smart" | "Automatic" | "Diving" | "Chronograph" | "Dress" | "Sport"
  caseMaterial: string
  strapMaterial: string
  dialColor: string
  strapColor: string
  price: number
  discount: number
  finalPrice: number
  warranty: string
  stockQuantity: number
  description: string
  images: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: Date
}
