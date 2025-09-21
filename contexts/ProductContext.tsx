"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Product } from "@/types/product"
import { fetchProductsFromSheets } from "@/lib/sheets-api"

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  refreshProducts: () => Promise<void>
  getProductById: (id: string) => Product | undefined
  searchProducts: (query: string) => Product[]
  filterProducts: (filters: ProductFilters) => Product[]
}

interface ProductFilters {
  brand?: string
  type?: string
  priceRange?: [number, number]
  caseMaterial?: string
  strapMaterial?: string
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] ProductContext: Starting to refresh products...")
      const fetchedProducts = await fetchProductsFromSheets()

      if (fetchedProducts.length === 0) {
        console.log("[v0] ProductContext: No products received, but no error thrown")
        setError("No products available at the moment")
      } else {
        console.log("[v0] ProductContext: Successfully loaded", fetchedProducts.length, "products")
        setProducts(fetchedProducts)
        setError(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
      setError(`Unable to load products: ${errorMessage}`)
      console.error("[v0] ProductContext: Error refreshing products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshProducts()

    // Auto-refresh every 5 minutes to sync with sheet changes
    const interval = setInterval(refreshProducts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.modelNumber.toLowerCase().includes(lowercaseQuery),
    )
  }

  const filterProducts = (filters: ProductFilters) => {
    return products.filter((product) => {
      if (filters.brand && product.brand !== filters.brand) return false
      if (filters.type && product.type !== filters.type) return false
      if (filters.caseMaterial && product.caseMaterial !== filters.caseMaterial) return false
      if (filters.strapMaterial && product.strapMaterial !== filters.strapMaterial) return false
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        if (product.finalPrice < min || product.finalPrice > max) return false
      }
      return true
    })
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts,
        getProductById,
        searchProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
