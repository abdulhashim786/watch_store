"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountPercentage = product.discount && product.discount > 0 ? Math.round(product.discount) : 0

  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"

  const stockQuantity = product.stockQuantity || 0
  const finalPrice = product.finalPrice || product.price || 0
  const price = product.price || 0

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={primaryImage || "/placeholder.svg"}
            alt={product.name || "Product"}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              imageLoading ? "blur-sm" : "blur-0",
            )}
            onLoad={() => setImageLoading(false)}
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 luxury-gradient text-white font-semibold">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Stock Status */}
        {stockQuantity === 0 && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Out of Stock
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" onClick={handleToggleWishlist}>
            <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-red-500 text-red-500")} />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" asChild>
            <Link href={`/products/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="sm"
            className="luxury-gradient"
            onClick={handleAddToCart}
            disabled={stockQuantity === 0 || isInCart(product.id)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{product.brand || "Unknown Brand"}</p>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-serif text-lg font-semibold leading-tight hover:luxury-text-gradient transition-all duration-300">
                  {product.name || "Untitled Product"}
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {product.type || "Watch"}
            </Badge>
            <span>•</span>
            <span>{product.caseMaterial || "Steel"}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {discountPercentage > 0 ? (
                <>
                  <span className="text-lg font-bold luxury-text-gradient">₹{finalPrice.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-lg font-bold luxury-text-gradient">₹{price.toLocaleString()}</span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {stockQuantity > 0 ? `${stockQuantity} in stock` : "Out of stock"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
