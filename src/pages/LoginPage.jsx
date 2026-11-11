import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Where the guest was going before they were redirected here
  const goTo = location.state?.from ?? '/' 
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password) // TODO 3 completed
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      await loginWithGoogle() // TODO 4 completed
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <section className="auth-page">
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        {error && <p className="field-error" role="alert">{error}</p>}
        
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Logging in...' : 'Log in'}
        </button>
        
        <button type="button" className="btn btn-outline" onClick={handleGoogle}>
          Continue with Google
        </button>
        
        <p className="muted">
          No account? <Link to="/register" state={location.state}>Register</Link>
        </p>
      </form>
    </section>
  )
}

export default LoginPage