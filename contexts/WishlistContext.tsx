"use client"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"
import type { Product, WishlistItem } from "@/types/product"

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  totalItems: number
}

type WishlistAction =
  | { type: "ADD_TO_WISHLIST"; product: Product }
  | { type: "REMOVE_FROM_WISHLIST"; productId: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; items: WishlistItem[] }

function wishlistReducer(state: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const exists = state.find((item) => item.product.id === action.product.id)
      if (exists) return state
      return [...state, { product: action.product, addedAt: new Date() }]
    }
    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.product.id !== action.productId)
    case "CLEAR_WISHLIST":
      return []
    case "LOAD_WISHLIST":
      return action.items.map((item) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }))
    default:
      return state
  }
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, [])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("luxury-watch-wishlist")
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", items: parsedWishlist })
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luxury-watch-wishlist", JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", product })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", productId })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        totalItems: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
