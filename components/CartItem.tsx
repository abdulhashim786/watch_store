"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { CartItem as CartItemType } from "@/types/product"
import { useCart } from "@/contexts/CartContext"

interface CartItemProps {
  item: CartItemType
  compact?: boolean
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id)
    } else {
      updateQuantity(item.product.id, newQuantity)
    }
  }

  const itemTotal = item.product.finalPrice * item.quantity

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-3">
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
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-semibold">₹{itemTotal.toLocaleString()}</span>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-6 w-6 p-0 bg-transparent"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs w-8 text-center">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-6 w-6 p-0 bg-transparent"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.product.images[0] || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-serif text-lg font-semibold hover:luxury-text-gradient transition-all duration-300">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground">{item.product.brand}</p>
                <p className="text-sm text-muted-foreground">
                  {item.product.type} • {item.product.caseMaterial}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.product.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-12 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">₹{item.product.finalPrice.toLocaleString()} each</p>
                <p className="text-lg font-bold luxury-text-gradient">₹{itemTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
