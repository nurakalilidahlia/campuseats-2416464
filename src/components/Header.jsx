import { NavLink, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        {/* end ensures the Home link isn't highlighted on every page */}
        <NavLink to="/" end className="link">
          Vendors
        </NavLink>
        
        <NavLink to="/orders" className="link">
          My Orders
        </NavLink>
        
        <NavLink to="/cart" className="link cart">
          Cart <span className="badge">{count}</span>
        </NavLink>

        {/* NEW: Auth links */}
        {user ? (
          <>
            <span className="user-name">Hi, {user.displayName || user.email}</span>
            <button type="button" className="link" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="link">
            Log in
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header