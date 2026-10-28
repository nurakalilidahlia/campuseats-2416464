import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function CheckoutForm({ onPlaceOrder }) {
  const navigate = useNavigate()
  
 
  const [name, setName] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [mahallah, setMahallah] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    
    
    onPlaceOrder({ name, pickupTime, mahallah })
    
    
    navigate('/orders')
  }

  return (
    <form className="card checkout-form" onSubmit={handleSubmit}>
      <h3>Checkout</h3>
      
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Pickup Time</label>
        <input value={pickupTime} onChange={e => setPickupTime(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Mahallah</label>
        <input value={mahallah} onChange={e => setMahallah(e.target.value)} required />
      </div>
    

      <button type="submit" className="btn">Place Order</button>
    </form>
  )
}