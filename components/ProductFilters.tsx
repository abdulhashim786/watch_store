"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"

interface ProductFiltersProps {
  products: Product[]
  onFilterChange: (filters: FilterState) => void
  onSearchChange: (query: string) => void
}

export interface FilterState {
  search: string
  brand: string
  type: string
  caseMaterial: string
  strapMaterial: string
  priceRange: [number, number]
  sortBy: string
}

export function ProductFilters({ products, onFilterChange, onSearchChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    brand: "",
    type: "",
    caseMaterial: "",
    strapMaterial: "",
    priceRange: [0, 500000],
    sortBy: "name",
  })

  const [priceRange, setPriceRange] = useState([0, 500000])

  // Get unique values for filter options
  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean).sort()
  const types = [...new Set(products.map((p) => p.type))].filter(Boolean).sort()
  const caseMaterials = [...new Set(products.map((p) => p.caseMaterial))].filter(Boolean).sort()
  const strapMaterials = [...new Set(products.map((p) => p.strapMaterial))].filter(Boolean).sort()

  // Calculate price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.finalPrice)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      setPriceRange([minPrice, maxPrice])
      setFilters((prev) => ({ ...prev, priceRange: [minPrice, maxPrice] }))
    }
  }, [products])

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  useEffect(() => {
    onSearchChange(filters.search)
  }, [filters.search, onSearchChange])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      brand: "",
      type: "",
      caseMaterial: "",
      strapMaterial: "",
      priceRange: priceRange,
      sortBy: "name",
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "search") return value !== ""
    if (key === "priceRange") return value[0] !== priceRange[0] || value[1] !== priceRange[1]
    if (key === "sortBy") return false
    return value !== ""
  }).length

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search Products</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search"
            placeholder="Search watches..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="brand">Brand</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Brand</Label>
        <Select value={filters.brand} onValueChange={(value) => updateFilter("brand", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Case Material</Label>
        <Select value={filters.caseMaterial} onValueChange={(value) => updateFilter("caseMaterial", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Materials" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Materials</SelectItem>
            {caseMaterials.map((material) => (
              <SelectItem key={material} value={material}>
                {material}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Strap Material</Label>
        <Select value={filters.strapMaterial} onValueChange={(value) => updateFilter("strapMaterial", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Strap Materials" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strap Materials</SelectItem>
            {strapMaterials.map((material) => (
              <SelectItem key={material} value={material}>
                {material}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            max={priceRange[1]}
            min={priceRange[0]}
            step={1000}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 luxury-gradient text-white">{activeFiltersCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </div>
  )
}
