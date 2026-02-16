import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Twitter, MapPin, Phone, Mail, LayoutDashboard, UtensilsCrossed, CalendarDays, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './Shared';

// --- Public Navbar ---
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-heading font-bold text-brand-red uppercase tracking-tighter">
                {settings.restaurantName}
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  isActive(link.path) ? 'text-brand-orange' : 'text-gray-700 hover:text-brand-red'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/reservations">
              <Button size="sm">Book Table</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-orange/10 text-brand-orange'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-red'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Footer ---
export const Footer: React.FC = () => {
  const { settings } = useApp();
  
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-6 text-brand-red">{settings.restaurantName}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Serving the city's best authentic pizza with passion and fresh ingredients since 2010. Experience the taste of tradition.
            </p>
            <div className="flex space-x-4">
              <a href={settings.socialLinks.facebook} className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href={settings.socialLinks.instagram} className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href={settings.socialLinks.twitter} className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-brand-cream">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="mt-1 flex-shrink-0 text-brand-orange" size={18} />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="flex-shrink-0 text-brand-orange" size={18} />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="flex-shrink-0 text-brand-orange" size={18} />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-brand-cream">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Weekdays</span>
                <span className="text-white font-medium">{settings.openingHours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Weekends</span>
                <span className="text-white font-medium">{settings.openingHours.weekends}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.restaurantName}. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white">Terms of Service</Link>
             <Link to="/admin" className="hover:text-white">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// --- Admin Layout ---
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useApp();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menu Manager', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Reservations', path: '/admin/reservations', icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-brand-orange font-heading">Admin Panel</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? 'bg-brand-red text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-red-900 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};