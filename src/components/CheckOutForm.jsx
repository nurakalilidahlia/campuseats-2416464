import { useState } from 'react'
import { useNavigate } from 'react-router'

// The options for the dropdown
const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair']

export default function CheckoutForm({ onPlaceOrder }) {
  const navigate = useNavigate()
  
  // State for the form values
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' })
  const [error, setError] = useState('')

  // One handler for all inputs
  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault() //prevent form reloading ; event atau e both can ; if not react will auto back to default & refresh entire page(lose all its memory/state/inputs)

    // Validation
    if (values.name.trim().length < 3) {
      setError('Name must be at least 3 characters.')
      return
    }
    if (!values.mahallah) {
      setError('Please choose a mahallah.')
      return
    }
    if (!values.pickupTime) {
      setError('Please choose a pickup time.')
      return
    }

    setError('')
    
    // Send data up to the parent (CartProvider) and navigate
    onPlaceOrder(values)
    navigate('/orders')
  }

  return (
    // Note the className="card form" which applies the CSS!
    <form className="card form" onSubmit={handleSubmit}>
      <h3>Checkout</h3>
      
      {error && <p className="field-error">{error}</p>}

      <label htmlFor="name">Name</label>
      <input 
        id="name"
        name="name" 
        value={values.name} 
        onChange={handleChange} 
      />

      <label htmlFor="mahallah">Mahallah</label>
      <select 
        id="mahallah"
        name="mahallah" 
        value={values.mahallah} 
        onChange={handleChange}
      >
        <option value="">Select...</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <label htmlFor="pickupTime">Pickup time</label>
      <input 
        id="pickupTime"
        name="pickupTime" 
        type="time" 
        value={values.pickupTime} 
        onChange={handleChange} 
      />

      <button type="submit" className="btn">Place order</button>
    </form>
  )
}