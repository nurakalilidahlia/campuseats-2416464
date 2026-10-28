import { useCallback, useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    try {
      // ⚠️ KEEP YOUR EXACT FETCH URL HERE (from your old App.jsx)
      const res = await fetch('/api/vendors.json', { signal: controller.signal })
      if (!res.ok) throw new Error(`Failed to load vendors (status ${res.status})`)
      const data = await res.json()
      setVendors(data)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { vendors, loading, error, reload }
}