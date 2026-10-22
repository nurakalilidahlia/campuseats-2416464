function MenuItemCard({ item, onAdd }) {
  return (
    <div className="card">
      <div className="card-top">
        <div className="avatar">{item.name.charAt(0)}</div>
        <span className="badge">{item.category}</span>
      </div>
      <h3>{item.name}</h3>
      <p className="muted">RM {item.price.toFixed(2)}</p>
      
      { }
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