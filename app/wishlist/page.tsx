"use client"

import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ProductCard"
import { WishlistStats } from "@/components/WishlistStats"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      if (item.product.stockQuantity > 0) {
        addToCart(item.product)
      }
    })
  }

  const availableItems = items.filter((item) => item.product.stockQuantity > 0)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite luxury timepieces to your wishlist and never lose track of the watches you love. Create
            your personal collection of dream timepieces.
          </p>
          <Button asChild size="lg" className="luxury-gradient">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold luxury-text-gradient">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">
              {items.length} {items.length === 1 ? "timepiece" : "timepieces"} saved for later
            </p>
          </div>
          <div className="flex gap-2">
            {availableItems.length > 0 && (
              <Button onClick={handleAddAllToCart} className="luxury-gradient">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add All to Cart ({availableItems.length})
              </Button>
            )}
            <Button variant="outline" className="bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share Wishlist
            </Button>
            <Button variant="outline" onClick={clearWishlist} className="text-muted-foreground bg-transparent">
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <WishlistStats />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.product.id} product={item.product} />
        ))}
      </div>

      {items.length > 8 && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Looking for more luxury timepieces? Explore our complete collection.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-transparent">
            <Link href="/products">
              Browse All Products
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
