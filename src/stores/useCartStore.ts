import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  id: number
  title: string
  image: string
  price: number
  sale_price: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id && i.size?.id === item.size?.id && i.color?.id === item.color?.id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.size?.id === item.size?.id && i.color?.id === item.color?.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },

      updateQuantity: (id, quantity, colorId, sizeId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.color?.id === colorId &&
            item.size?.id === sizeId
              ? { ...item, quantity }
              : item
          ),
      })),

      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
)
