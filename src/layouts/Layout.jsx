import { Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        {/* Outlet is a placeholder. React Router will swap this out 
            with HomePage, VendorPage, CartPage, etc., depending on the URL. */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}