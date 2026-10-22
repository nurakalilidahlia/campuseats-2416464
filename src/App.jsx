import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [view, setView] = useState('menu')
  const [cart, setCart] = useState([])
  const [lastOrder, setLastOrder] = useState(null)

  // NEW (B6): State for the Max Spice slider
  const [maxSpice, setMaxSpice] = useState(5)

  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/vendors.json', { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed to load vendors (status ${res.status})`)
        
        const data = await res.json()
        setVendors(data)
        if (data.length > 0) setSelectedVendorId(data[0].id)
        setLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      }
    }

    loadVendors()
    return () => controller.abort()
  }, [reloadKey])

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) => {
      return prevCart
        .map((line) => {
          if (line.item.id === itemId) return { ...line, qty: line.qty + delta }
          return line
        })
        .filter((line) => line.qty > 0)
    })
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handleRetry() {
    setReloadKey((k) => k + 1)
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  const totalQty = cart.reduce((sum, line) => sum + line.qty, 0)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // personal feature (B6): Filter the menu based on the slider
  const filteredMenu = selectedVendor 
    ? selectedVendor.menu.filter((item) => (item.spice || 1) <= maxSpice)
    : []

  return (
    <>
      <Header 
        cartCount={totalQty} 
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />

      <main className="container">
        {view === 'menu' && (
          <>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
            {!loading && !error && (
              <>
                <section>
                  <h2 className="section-title">Choose a vendor</h2>
                  <div className="vendor-grid">
                    {vendors.map((vendor) => (
                      <VendorCard
                        key={vendor.id}
                        vendor={vendor}
                        isSelected={vendor.id === selectedVendorId}
                        onSelect={setSelectedVendorId}
                      />
                    ))}
                  </div>
                </section>
                {selectedVendor && (
                  <section>
                    <h2 className="section-title">Menu: {selectedVendor.name}</h2>
                    
                    {/*  (B6): The Slider UI */}
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

                    {/* Pass the filteredMenu here */}
                    <MenuList items={filteredMenu} onAdd={handleAddToCart} />
                  </section>
                )}
              </>
            )}
          </>
        )}

        {view === 'cart' && (
          <CartPage
            cart={cart}
            onChangeQty={handleChangeQty}
            onRemove={handleRemove}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === 'done' && lastOrder && (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Order placed!</h2>
            <p>Thank you, {lastOrder.name}.</p>
            <p>Pickup time: <strong>{lastOrder.pickupTime}</strong> at {lastOrder.mahallah}.</p>
            <p>Total paid: <strong>RM {lastOrder.total.toFixed(2)}</strong></p>
            <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
              Order again
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App