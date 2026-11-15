import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

export function CartProvider({ children }) {
  // 1. Keep the cart in localStorage (only orders go to Firestore now)
  const [cart, setCart] = useLocalStorage('cart', [])

  // 2. Your exact cart functions
  function addToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) => {
      return prevCart
        .map((line) => {
          if (line.item.id === itemId) return { ...line, qty: line.qty + delta }
          return line
        })
        .filter((line) => line.qty > 0)
    })
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // 3. NEW: clearCart function (replaces placeOrder)
  function clearCart() {
    setCart([])
  }

  // 4. Calculate totals for the header/cart page
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  // 5. Pass everything down to the rest of the app
  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        clearCart, // <-- NEW
      }}
    >
      {children}
    </CartContext.Provider>
  )
}