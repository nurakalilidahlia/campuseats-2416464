import { useParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export default function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const { user } = useAuth()

  // B5 Rule: Save per user. Guests default to "Any" (which is 5).
  const key = user ? `ce-spice-${user.uid}` : 'ce-spice-guest'
  const [maxSpice, setMaxSpice] = useLocalStorage(key, 5)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => String(v.id) === id)

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

  const filteredMenu = vendor.menu.filter((item) => (item.spice || 1) <= maxSpice)

  return (
    <section>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" className="link">← Back to vendors</Link>
      </div>
      
      <h2 className="section-title">Menu: {vendor.name}</h2>

      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f4f7f6', borderRadius: '8px' }}>
        <label htmlFor="spice-filter" style={{ fontWeight: 'bold', marginRight: '1rem' }}>
          Max Spice Level: {maxSpice === 5 ? 'Any' : maxSpice}
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

      <MenuList items={filteredMenu} />
    </section>
  )
}