import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

export function CartProvider({ children }) {
  // 1. We use your custom hook to save cart AND orders history to localStorage
  const [cart, setCart] = useLocalStorage('cart', [])
  const [orders, setOrders] = useLocalStorage('orders', [])

  // 2. Your exact cart functions (moved from App.jsx)
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

  // 3. The new placeOrder function (saves to history and clears the cart)
  function placeOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    const newOrder = { ...details, total, items: cart, date: new Date().toISOString() }
    
    setOrders((prevOrders) => [newOrder, ...prevOrders]) // add to history
    setCart([]) // clear cart
    return newOrder
  }

  // 4. Calculate totals for the header/cart page
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  // 5. Pass everything down to the rest of the app
  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}