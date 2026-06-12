import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAppointments from './pages/AdminAppointments';
import AdminDoctors from './pages/AdminDoctors';
import AdminDepartments from './pages/AdminDepartments';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <div className="flex h-full min-h-[calc(100vh-80px)] bg-gray-50/50">
                  <AdminSidebar />
                  <div className="flex-grow p-8">
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="appointments" element={<AdminAppointments />} />
                      <Route path="doctors" element={<AdminDoctors />} />
                      <Route path="departments" element={<AdminDepartments />} />
                      <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </AuthProvider>
  );
}

export default App;
