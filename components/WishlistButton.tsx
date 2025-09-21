"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/WishlistContext"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

interface WishlistButtonProps {
  product: Product
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
  className?: string
  showText?: boolean
}

export function WishlistButton({
  product,
  size = "default",
  variant = "outline",
  className,
  showText = false,
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <Button size={size} variant={variant} onClick={handleToggle} className={cn("bg-transparent", className)}>
      <Heart className={cn("h-4 w-4", showText && "mr-2", inWishlist && "fill-red-500 text-red-500")} />
      {showText && (inWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
    </Button>
  )
}
