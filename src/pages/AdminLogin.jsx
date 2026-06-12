import { supabase } from '../lib/supabase';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { HeartPulse, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data: user, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      toast.error('Invalid credentials');
      return;
    }

    if (user.password !== password) {
      toast.error('Invalid credentials');
      return;
    }

    login({
      id: user.id,
      username: user.username,
      role: 'admin',
    });

    toast.success('Login successful!');
    navigate('/admin/dashboard');
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};

  const handleSeed = async () => {
  try {
    const { data: existing } = await supabase
      .from('admins')
      .select('*')
      .eq('username', 'admin')
      .maybeSingle();

    if (existing) {
      toast.info('Admin already exists');
      return;
    }

    const { error } = await supabase
      .from('admins')
      .insert([
        {
          username: 'admin',
          password: 'admin123',
        },
      ]);

    if (error) throw error;

    toast.success('Admin created successfully');
  } catch (error) {
    console.error(error);
    toast.error('Seeding failed');
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 bg-primary-light rounded-2xl items-center justify-center text-primary mb-6 font-bold text-2xl">
              <HeartPulse />
            </div>
            <h1 className="text-2xl font-bold text-navy block">Admin Portal</h1>
            <p className="text-sm text-gray-500 mt-2">Secure access for hospital administrators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center hover:bg-primary transition-all shadow-xl shadow-navy/10"
            >
              {loading ? (
                 <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400 mb-4">First time? Seed admin with default credentials (admin/admin123)</p>
            <button
              onClick={handleSeed}
              className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-primary font-bold text-xs hover:border-primary transition-all"
            >
              Seed Admin User
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Not an admin? <a href="/" className="text-primary font-bold">Back to Home</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
