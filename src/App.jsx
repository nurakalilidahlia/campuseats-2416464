import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './context/CartProvider.jsx'
import Layout from './layouts/Layout.jsx'

// Import our Pages
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="vendor/:id" element={<VendorPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Protected Routes (Requires Login) */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App