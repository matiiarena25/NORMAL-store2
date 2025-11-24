import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext/AuthProvider';
import CartProvider from './context/CartContext/CartProvider';
import ThemeProvider from './context/ThemeContext/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import SecretMessage from './components/SecretMessage';
import ThemeBackground from './components/ThemeBackground';
import ProtectedRoute from './routes/ProtectedRoute';
import useTheme from './context/ThemeContext/useTheme';
import './App.css';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Admin from './pages/Admin';

function AppContent() {
  const { isDarkMode } = useTheme();
  return (
    <BrowserRouter>
      <div className={`d-flex flex-column min-vh-100 ${isDarkMode ? 'dark-mode' : ''}`}>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </main>
        <Notification />
        <SecretMessage />
        <Footer />
        <ThemeBackground />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
