import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Book';
import Book from './pages/Book';
import Profile from './pages/Profile';
import SendPasswordResetEmail from './pages/SendPasswordResetEmail';
import ResetPassword from './pages/ResetPassword';
import NavigationBar from './components/Navbar';
import FilterBooks from './components/FilterBooks';
import SearchBooks from './components/SearchBooks';
import ManageBooks from './pages/ManageBooks';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import CheckoutForm from './components/CheckoutForm';
import Checkout from './pages/Checkout';
function App() {
  const [role, setRole] = useState(localStorage.getItem('role')); // Use state for role

  // Update role dynamically when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <CartProvider>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        
        <Route path="/profile" element={<Profile />} />
        {role === "admin" && (
          <Route path="/manage-books" element={<ManageBooks />} />
        )}
        <Route path="/send-password-reset-email" element={<SendPasswordResetEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/filter-books/" element={<FilterBooks />} />
        <Route path="/search-books" element={<SearchBooks />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;