import { useState } from 'react'
import { useNavigate } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckOutForm.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'

function CartPage() {
  // 1. Get the new tools
  const { cart, changeQty, removeFromCart, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  // 2. The new place order handler (TODO 4)
  async function handlePlaceOrder(details) {
    setError('')
    try {
      await placeOrders(user, cart, details) // 1. Save to Firestore
      clearCart()                           // 2. Empty the cart
      navigate('/orders')                   // 3. Go to Orders page
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  if (cart.length === 0) {
    return (
      <p className="muted">
        Your cart is empty. Pick something from a menu first.
      </p>
    )
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>

      {/* Show error if Firestore fails */}
      {error && <p className="field-error" role="alert">{error}</p>}

      {/* Pass the new handler and the user's name */}
      <CheckoutForm 
        defaultValue={user?.displayName ?? ''} 
        onPlaceOrder={handlePlaceOrder} 
      />
    </div>
  )
}

export default CartPage