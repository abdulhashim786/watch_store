"use client"

import { useState, useMemo, useCallback } from "react"
import { ProductFilters, type FilterState } from "@/components/ProductFilters"
import { ProductGrid } from "@/components/ProductGrid"
import { useProducts } from "@/contexts/ProductContext"

export default function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    brand: "",
    type: "",
    caseMaterial: "",
    strapMaterial: "",
    priceRange: [0, 500000],
    sortBy: "name",
  })

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.modelNumber.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand)
    }

    if (filters.type) {
      filtered = filtered.filter((product) => product.type === filters.type)
    }

    if (filters.caseMaterial) {
      filtered = filtered.filter((product) => product.caseMaterial === filters.caseMaterial)
    }

    if (filters.strapMaterial) {
      filtered = filtered.filter((product) => product.strapMaterial === filters.strapMaterial)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.finalPrice >= filters.priceRange[0] && product.finalPrice <= filters.priceRange[1],
    )

    // Apply sorting
    const sortedProducts = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.finalPrice - b.finalPrice
        case "price-high":
          return b.finalPrice - a.finalPrice
        case "brand":
          return a.brand.localeCompare(b.brand)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return sortedProducts
  }, [products, searchQuery, filters])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-4 luxury-text-gradient">Luxury Watch Collection</h1>
        <p className="text-lg text-muted-foreground">
          Discover our exquisite collection of premium timepieces, automatically synchronized with our latest inventory.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-4">
            <ProductFilters
              products={products}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {loading ? "Loading..." : `${filteredAndSortedProducts.length} products found`}
            </p>
          </div>

          <ProductGrid products={filteredAndSortedProducts} loading={loading} />
        </div>
      </div>
    </div>
  )
}
