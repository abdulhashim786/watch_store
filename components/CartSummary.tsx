"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { items, totalPrice, totalItems } = useCart()

  const subtotal = totalPrice
  const shipping = totalPrice > 50000 ? 0 : 1500 // Free shipping over ₹50,000
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (GST 18%)</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="luxury-text-gradient">₹{total.toLocaleString()}</span>
        </div>

        {shipping > 0 && (
          <p className="text-sm text-muted-foreground">
            Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping
          </p>
        )}

        {showCheckoutButton && (
          <div className="space-y-2 pt-4">
            <Button asChild className="w-full luxury-gradient" size="lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
