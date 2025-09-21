"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-6" />
          <h1 className="text-4xl font-serif font-bold mb-4 luxury-text-gradient">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your luxury timepiece will be carefully prepared and shipped to you.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-sm">#CHR-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>3-5 Business Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Tracking Info:</span>
                <span className="text-muted-foreground">Will be sent via email</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button asChild size="lg" className="luxury-gradient">
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
