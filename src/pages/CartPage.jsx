import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckOutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {
  const { cart, changeQty, removeFromCart, placeOrder, total } = useCart()

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

      {/* Pass placeOrder to the form */}
      <CheckoutForm onPlaceOrder={placeOrder} />
    </div>
  )
}

export default CartPage