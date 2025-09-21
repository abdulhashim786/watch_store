import type { Product } from "@/types/product"

export async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
    console.log("[v0] Fetching products from API route...")
    const response = await fetch("/api/products", {
      cache: "no-store", // Always get fresh data
    })

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const products = await response.json()
    console.log("[v0] Successfully fetched", products.length, "products from API")
    return products
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}
