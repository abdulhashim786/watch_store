"use client"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"
import type { Product, CartItem } from "@/types/product"

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.product.id === action.product.id)
      if (existingItem) {
        return state.map((item) =>
          item.product.id === action.product.id ? { ...item, quantity: item.quantity + action.quantity } : item,
        )
      }
      return [...state, { product: action.product, quantity: action.quantity }]
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.product.id !== action.productId)
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((item) => item.product.id !== action.productId)
      }
      return state.map((item) => (item.product.id === action.productId ? { ...item, quantity: action.quantity } : item))
    case "CLEAR_CART":
      return []
    case "LOAD_CART":
      return action.items
    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("luxury-watch-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", items: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luxury-watch-cart", JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0)

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", product, quantity })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
