import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { ProductProvider } from "@/contexts/ProductContext"
import { CartProvider } from "@/contexts/CartContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Chronos Luxury - Premium Watch Collection",
  description:
    "Discover the finest collection of luxury watches with automatic synchronization and premium shopping experience.",
  generator: "v0.app",
  keywords: "luxury watches, premium timepieces, automatic watches, Swiss watches, watch collection",
  authors: [{ name: "Chronos Luxury" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-serif: ${playfair.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <ScrollToTop />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
