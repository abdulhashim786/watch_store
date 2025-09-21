"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TrendingUp, Clock } from "lucide-react"
import { useWishlist } from "@/contexts/WishlistContext"

export function WishlistStats() {
  const { items } = useWishlist()

  const totalValue = items.reduce((sum, item) => sum + item.product.finalPrice, 0)
  const averagePrice = items.length > 0 ? totalValue / items.length : 0
  const recentlyAdded = items.filter(
    (item) => new Date().getTime() - new Date(item.addedAt).getTime() < 7 * 24 * 60 * 60 * 1000,
  ).length

  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold luxury-text-gradient">{items.length}</div>
          <p className="text-xs text-muted-foreground">Saved timepieces</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold luxury-text-gradient">₹{totalValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Average: ₹{averagePrice.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recently Added</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold luxury-text-gradient">{recentlyAdded}</div>
          <p className="text-xs text-muted-foreground">In the last 7 days</p>
        </CardContent>
      </Card>
    </div>
  )
}
