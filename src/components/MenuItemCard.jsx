function MenuItemCard({ item, onAdd }) {
  // This checks for spiceLevel, then spice, then defaults to 0
  const level = Number(item.spiceLevel ?? item.spice ?? 0)
  const spiceEmojis = '🌶️'.repeat(level)

  return (
    <div className="card">
      <div className="card-top">
        <div className="avatar">{item.name.charAt(0)}</div>
        <span className="badge">{item.category}</span>
      </div>
      
      <h3>
        {item.name} {level > 0 && <span>{spiceEmojis}</span>}
      </h3>
      
      <p className="muted">RM {item.price.toFixed(2)}</p>
      
      <button 
        type="button" 
        className="btn" 
        onClick={() => onAdd(item)}
      >
        Add
      </button>
    </div>
  )
}

export default MenuItemCard