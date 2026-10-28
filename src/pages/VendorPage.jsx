import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function VendorPage() {
  // 1. Get the ID from the URL (e.g., /vendor/1)
  const { id } = useParams()
  
  // 2. Get vendors
  const { vendors, loading, error, reload } = useVendors()

  // 3. Your personal feature (digit 4): persist maxSpice!
  const [maxSpice, setMaxSpice] = useLocalStorage('maxSpice', 5)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // 4. Find the vendor that matches the ID in the URL
  const vendor = vendors.find((v) => String(v.id) === id)

  // 5. Handle unknown vendor (required by the lab sheet)
  if (!vendor) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Vendor not found</h2>
        <p className="muted">The vendor you are looking for does not exist.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    )
  }

  // 6. Filter the menu based on the spice slider
  const filteredMenu = vendor.menu.filter((item) => (item.spice || 1) <= maxSpice)

  return (
    <section>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="link">← Back to vendors</Link>
      </div>
      
      <h2 className="section-title">Menu: {vendor.name}</h2>

      {/* The Slider UI */}
      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f4f7f6', borderRadius: '8px' }}>
        <label htmlFor="spice-filter" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
          Max Spice Level: {maxSpice}
        </label>
        <input
          id="spice-filter"
          type="range"
          min="1"
          max="5"
          value={maxSpice}
          onChange={(e) => setMaxSpice(Number(e.target.value))}
        />
      </div>

      {/* MenuList now gets its items! */}
      <MenuList items={filteredMenu} />
    </section>
  )
}