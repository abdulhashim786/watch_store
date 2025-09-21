import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4 luxury-text-gradient">Product Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The luxury timepiece you're looking for doesn't exist or may have been removed from our collection.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="luxury-gradient">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Browse All Products
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
