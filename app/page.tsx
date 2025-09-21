"use client"

import Link from "next/link"
import { ArrowRight, Clock, Shield, Truck, Star, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductGrid } from "@/components/ProductGrid"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { useProducts } from "@/contexts/ProductContext"
import AdminNotice from "@/components/AdminNotice"

export default function HomePage() {
  const { products, loading } = useProducts()

  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8)

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <AdminNotice />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 luxury-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('/placeholder-ms7xg.png')] bg-cover bg-center" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-luxury-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-luxury-float"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-luxury-glow" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="animate-luxury-fade-in">
            <h1 className="text-responsive-5xl font-serif font-bold mb-6 leading-tight">
              Chronos
              <span className="block text-responsive-4xl opacity-90">Luxury</span>
            </h1>
            <p className="text-responsive-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover the finest collection of luxury timepieces, automatically synchronized from our live inventory.
              Each watch tells a story of precision, craftsmanship, and timeless elegance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-luxury-slide-up">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 luxury-hover-lift"
              asChild
            >
              <Link href="/products">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent text-lg px-8 py-6 luxury-hover-lift"
            >
              Watch Our Story
            </Button>
          </div>

          {/* Enhanced Stats with Animation */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-luxury-slide-up">
            <div className="text-center">
              <div className="text-responsive-3xl font-bold mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-responsive-sm opacity-80">Luxury Timepieces</div>
            </div>
            <div className="text-center">
              <div className="text-responsive-3xl font-bold mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-responsive-sm opacity-80">Premium Brands</div>
            </div>
            <div className="text-center">
              <div className="text-responsive-3xl font-bold mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-responsive-sm opacity-80">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center luxury-hover-glow">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 luxury-text-gradient">Why Choose Chronos Luxury</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the pinnacle of horological excellence with our curated collection and premium services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Timeless Craftsmanship",
                description:
                  "Each timepiece is meticulously crafted by master artisans with decades of experience, ensuring unparalleled quality and precision.",
              },
              {
                icon: Shield,
                title: "Lifetime Warranty",
                description:
                  "Every watch comes with comprehensive warranty coverage and expert servicing from our certified horologists.",
              },
              {
                icon: Truck,
                title: "Secure Delivery",
                description:
                  "Complimentary insured shipping with white-glove delivery service worldwide, ensuring your timepiece arrives safely.",
              },
              {
                icon: Award,
                title: "Authenticity Guaranteed",
                description:
                  "All our timepieces are 100% authentic and come with official certificates of authenticity from authorized dealers.",
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description:
                  "Our horological experts provide personalized consultation to help you find the perfect timepiece for your collection.",
              },
              {
                icon: Star,
                title: "Live Inventory",
                description:
                  "Our collection is automatically synchronized with live inventory data, ensuring real-time availability and pricing.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 luxury-gradient rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 luxury-text-gradient">Featured Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our most prestigious brands, automatically updated from our live inventory to
              showcase the finest timepieces available.
            </p>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 luxury-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-luxury-float" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-serif font-bold mb-4">Begin Your Horological Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of collectors who trust Chronos Luxury for their most precious timepieces. Discover your
            perfect watch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
