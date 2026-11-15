import { useEffect, useState } from 'react'
import { subscribeToVendor, subscribeToMenuFiltered } from '../services/vendors.js'

export function useVendor(vendorId, maxSpice = 3) {
  const [vendor, setVendor] = useState(undefined)
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) => setError(err.message))
    
    // Use the new filtered query!
    const stopMenu = subscribeToMenuFiltered(
      vendorId, 
      maxSpice, 
      setMenu, 
      (err) => setError(err.message)
    )
    
    return () => {
      stopVendor()
      stopMenu()
    }
  }, [vendorId, maxSpice]) // <-- Add maxSpice here so it re-runs when the user changes the dropdown

  return { vendor, menu, loading: vendor === undefined && !error, error }
}