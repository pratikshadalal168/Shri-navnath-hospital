import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-text text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <HeartPulse className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight">SHREE NAVNATH HOSPITAL</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Providing world-class healthcare with compassion and excellence. Our state-of-the-art facilities and expert medical team are dedicated to your well-being.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors text-gray-400"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors text-gray-400"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors text-gray-400"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors text-gray-400"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link to="/appointment" className="hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Medical Services</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Orthopedics</li>
              <li>Pediatrics</li>
              <li>General Surgery</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Get In Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-400">123 Medical Drive, Health City, HC 45678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-400">+91-9665560247</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-400">contact@axiscare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AxisCare Hospital. All rights reserved. Professional Healthcare Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
