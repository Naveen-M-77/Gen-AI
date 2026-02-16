import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { PublicLayout, AdminLayout } from './components/Layout';
import { Input, Button, Card } from './components/Shared';

// Public Pages
import Home from './pages/public/Home';
import MenuPage from './pages/public/Menu';
import Reservations from './pages/public/Reservations';
// Placeholders for simple pages
const About = () => <div className="p-12 text-center max-w-4xl mx-auto"><h1 className="text-4xl font-heading font-bold mb-4">Our Story</h1><p className="text-lg text-gray-600">Founded in 2010, PizzaFast was born from a simple idea: premium pizza shouldn't take forever.</p></div>;
const Contact = () => <div className="p-12 text-center max-w-4xl mx-auto"><h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1><p className="text-lg text-gray-600">123 Dough Lane, Flavor Town, FT 90210</p></div>;
const NotFound = () => <div className="p-12 text-center"><h1 className="text-4xl font-bold text-gray-300">404</h1><p>Page not found</p></div>;

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminReservations from './pages/admin/AdminReservations';

const Login: React.FC = () => {
  const { login, isAdmin } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login();
    } else {
      alert('Invalid credentials (try admin/admin)');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white">
        <h2 className="text-2xl font-bold font-heading mb-6 text-center text-brand-red">Admin Access</h2>
        <form onSubmit={handleLogin}>
          <Input label="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button fullWidth className="mt-4">Login</Button>
        </form>
      </Card>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useApp();
  return isAdmin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/admin/login" />;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/menu" element={<PublicLayout><MenuPage /></PublicLayout>} />
        <Route path="/reservations" element={<PublicLayout><Reservations /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        
        {/* Admin Auth */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/menu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
        <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservations /></ProtectedRoute>} />

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;