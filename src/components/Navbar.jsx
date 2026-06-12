import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath && user) return null;

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PlusCircle className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary-text tracking-tight">Navnath Hospital</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary border-b-2 border-primary" : "text-secondary-text"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="bg-primary text-white px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-primary-hover transition-all"
            >
              Make Appointment
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary underline decoration-primary/20 underline-offset-4">Admin</Link>
                <button onClick={logout} className="text-sm font-medium text-red-600 cursor-pointer">Logout</button>
              </div>
            ) : (
              <Link to="/admin/login" className="text-sm font-medium text-gray-400 hover:text-primary">Admin</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/appointment"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 mt-4 text-center bg-primary text-white rounded-lg font-semibold"
          >
            Make Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
