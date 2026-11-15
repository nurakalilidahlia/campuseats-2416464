import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import MenuList from '../components/MenuList.jsx'

export default function VendorPage() {
  const { id } = useParams()
  
  // 1. State for the filter
  const [maxSpice, setMaxSpice] = useState(3) 
  
  // 2. Pass it to the hook
  const { vendor, menu, loading, error } = useVendor(id, maxSpice)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!vendor) return <p>Vendor not found. <Link to="/">Back to vendors</Link></p>

  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }))

  return (
    <section>
      <p><Link to="/"> All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>
      
      {/* 3. The Filter Dropdown */}
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="spice-filter">Max Spice Level: </label>
        <select 
          id="spice-filter" 
          value={maxSpice} 
          onChange={(e) => setMaxSpice(Number(e.target.value))}
          style={{ padding: '0.3rem', borderRadius: '8px' }}
        >
          <option value={0}>0 (No Spice)</option>
          <option value={1}>1 (Mild 🌶️)</option>
          <option value={2}>2 (Medium 🌶️🌶️)</option>
          <option value={3}>3 (Hot 🌶️🌶️🌶️)</option>
        </select>
      </div>

      <MenuList items={items} />
    </section>
  )
}