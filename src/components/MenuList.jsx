import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js' // <-- Import useCart

function MenuList({ items }) { // <-- Removed onAdd from props
  const { addToCart } = useCart() // <-- Get addToCart from context

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }
 
  return (
    <div className="grid">
      {/* <-- Pass addToCart instead of onAdd */}
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
      ))}
    </div>
  )
}
 
export default MenuList