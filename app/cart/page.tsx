"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/CartItem"
import { CartSummary } from "@/components/CartSummary"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any luxury timepieces to your cart yet.
          </p>
          <Button asChild size="lg" className="luxury-gradient">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold luxury-text-gradient">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} className="text-muted-foreground bg-transparent">
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
