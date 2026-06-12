import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Building2, LogOut, HeartPulse } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard /> },
    { name: 'Appointments', path: '/admin/appointments', icon: <Calendar /> },
    { name: 'Doctors', path: '/admin/doctors', icon: <Users /> },
   
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-80px)] sticky top-20">
      <div className="p-6">
        <div className="flex items-center space-x-2 text-primary mb-8 px-2">
          <HeartPulse className="h-6 w-6" />
          <span className="font-bold text-lg tracking-tight text-navy">Shri Navnath Hospital Admin</span>
        </div>
        
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary-light text-primary shadow-sm shadow-primary/10" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                )}
              >
                <span className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")}>
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
