import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setItems((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, purchased: false }
    ])
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, purchased: !it.purchased } : it
      )
    )
  }

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    toggleItem
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}