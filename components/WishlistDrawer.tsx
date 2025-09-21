"use client"

import { Heart, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"
import Image from "next/image"

interface WishlistItemProps {
  item: any
  onRemove: (id: string) => void
  onAddToCart: (product: any) => void
}

function WishlistItem({ item, onRemove, onAddToCart }: WishlistItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-muted last:border-b-0">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.product.images[0] || "/placeholder.svg"}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product.id}`}>
          <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">{item.product.name}</h4>
        </Link>
        <p className="text-xs text-muted-foreground">{item.product.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold luxury-text-gradient">
            ₹{item.product.finalPrice.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-6 px-2 text-xs bg-transparent"
              onClick={() => onAddToCart(item.product)}
              disabled={item.product.stockQuantity === 0}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.product.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WishlistDrawer() {
  const { items, removeFromWishlist, clearWishlist, totalItems } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Heart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 luxury-gradient text-white text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Wishlist
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearWishlist} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground text-sm mb-4">Save your favorite timepieces for later</p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-1">
                  {items.map((item) => (
                    <WishlistItem
                      key={item.product.id}
                      item={item}
                      onRemove={removeFromWishlist}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Items</span>
                  <span className="text-lg font-bold luxury-text-gradient">{totalItems}</span>
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full luxury-gradient">
                    <Link href="/wishlist">View Full Wishlist</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      items.forEach((item) => addToCart(item.product))
                      clearWishlist()
                    }}
                    disabled={items.some((item) => item.product.stockQuantity === 0)}
                  >
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
