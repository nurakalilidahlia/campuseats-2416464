import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()
  console.log("Orders data:", orders)
  
 //debug
  if (loading) return <p>Loading orders...</p>
  if (error) return <p className="field-error">Error: {error}</p>
  if (orders.length === 0) return <p className="muted">No orders yet.</p>

  // Hide cancelled orders from the list (Stretch Task)
  const activeOrders = orders.filter((order) => order.status !== 'Cancelled')

  if (activeOrders.length === 0) return <p className="muted">No active orders.</p>

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <p className="muted">Status updates appear here live.</p>

      <ul className="order-list">
        {activeOrders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              {order.vendorName} · pickup {order.pickupTime}
            </p>
            <p className="muted">
              {order.items.map((i) => `${i.qty} x  ${i.name}`).join(', ')}
            </p>
            <p className="muted">
              Placed {order.createdAt ? order.createdAt.toDate().toLocaleString('en-MY') : 'just now'}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            
            {/* Show actions only if the status is still 'Received' */}
            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage