"use client"

import { ProductCard } from "./ProductCard"
import { useProducts } from "@/contexts/ProductContext"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  currentProduct: Product
  limit?: number
}

export function RelatedProducts({ currentProduct, limit = 4 }: RelatedProductsProps) {
  const { products } = useProducts()

  // Find related products based on brand or type
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.brand === currentProduct.brand || product.type === currentProduct.type),
    )
    .slice(0, limit)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-serif font-bold mb-6 luxury-text-gradient">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
