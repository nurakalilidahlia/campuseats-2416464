import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

export default function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>No orders yet</h2>
        <p className="muted">You haven't placed any orders.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Browse vendors
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your Orders</h2>
      
      {orders.map((order, index) => (
        <div key={index} className="card" style={{ marginBottom: '1rem' }}>
          <h3>Order for {order.name}</h3>
          <p className="muted">Pickup at: {order.mahallah} ({order.pickupTime})</p>
          
          <ul style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.qty}x {line.item.name} - RM {(line.item.price * line.qty).toFixed(2)}
              </li>
            ))}
          </ul>
          
          <p><strong>Total: RM {order.total.toFixed(2)}</strong></p>
        </div>
      ))}
    </section>
  )
}