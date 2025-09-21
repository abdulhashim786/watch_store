"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, ShoppingCart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductImageGallery } from "@/components/ProductImageGallery"
import { ProductSpecifications } from "@/components/ProductSpecifications"
import { RelatedProducts } from "@/components/RelatedProducts"
import { Breadcrumb } from "@/components/Breadcrumb"
import { useProducts } from "@/contexts/ProductContext"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import type { Product } from "@/types/product"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById, loading } = useProducts()
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const foundProduct = getProductById(params.id)
      setProduct(foundProduct || null)
    }
  }, [params.id, getProductById])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-12 bg-muted rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountPercentage = product.discount > 0 ? Math.round(product.discount) : 0
  const inStock = product.stockQuantity > 0

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.brand, href: `/products?brand=${product.brand}` },
    { label: product.name },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div>
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.brand}</Badge>
              {discountPercentage > 0 && (
                <Badge className="luxury-gradient text-white">-{discountPercentage}% OFF</Badge>
              )}
              {!inStock && <Badge variant="destructive">Out of Stock</Badge>}
            </div>

            <h1 className="text-3xl font-serif font-bold mb-4 luxury-text-gradient">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">(4.8) • 127 reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-bold luxury-text-gradient">
                    ₹{product.finalPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-3xl font-bold luxury-text-gradient">₹{product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
          </div>

          <Separator />

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Type:</span>
              <span className="ml-2 text-muted-foreground">{product.type}</span>
            </div>
            <div>
              <span className="font-medium">Case Material:</span>
              <span className="ml-2 text-muted-foreground">{product.caseMaterial}</span>
            </div>
            <div>
              <span className="font-medium">Strap Material:</span>
              <span className="ml-2 text-muted-foreground">{product.strapMaterial}</span>
            </div>
            <div>
              <span className="font-medium">Warranty:</span>
              <span className="ml-2 text-muted-foreground">{product.warranty}</span>
            </div>
          </div>

          <Separator />

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {inStock ? `${product.stockQuantity} available` : "Out of stock"}
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 luxury-gradient"
                onClick={handleAddToCart}
                disabled={!inStock || isInCart(product.id)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
              </Button>

              <Button size="lg" variant="outline" onClick={handleToggleWishlist} className="bg-transparent">
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>

              <Button size="lg" variant="outline" className="bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Free shipping</span>
                  <span className="text-muted-foreground">On orders over ₹50,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Return policy</span>
                  <span className="text-muted-foreground">30-day returns</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Warranty</span>
                  <span className="text-muted-foreground">{product.warranty}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mb-12">
        <ProductSpecifications product={product} />
      </div>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </div>
  )
}
