import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
// Note: If you don't have a Loading component yet, we can just use a <p> tag
// import { Loading } from './Status.jsx' 

function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p>Loading...</p> // check loading FIRST
  
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet /> // signed in: show the page inside
}

export default ProtectedRoute