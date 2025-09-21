"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"

interface ProductSpecificationsProps {
  product: Product
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "Model Number", value: product.modelNumber },
    { label: "Type", value: product.type },
    { label: "Case Material", value: product.caseMaterial },
    { label: "Strap Material", value: product.strapMaterial },
    { label: "Dial Color", value: product.dialColor },
    { label: "Strap Color", value: product.strapColor },
    { label: "Warranty", value: product.warranty },
  ].filter((spec) => spec.value && spec.value.trim() !== "")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-muted last:border-b-0">
              <span className="font-medium text-muted-foreground">{spec.label}</span>
              <Badge variant="outline" className="ml-2">
                {spec.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
