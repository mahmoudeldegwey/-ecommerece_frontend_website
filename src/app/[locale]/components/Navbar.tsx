"use client"
import CartDrawer from "./CartDrawer"

const fakeCartItems = [
  { title: "Product 1", price: 29.99, quantity: 2, image: "/placeholder.png" },
  { title: "Product 2", price: 59.99, quantity: 1, image: "/placeholder.png" },
]

export default function Navbar() {
  return (
    <div>
        <CartDrawer cartItems={fakeCartItems} isOpen={false} onOpenChange={() => {}} />
    </div>
  )
}
