// admin/AdminLogin.jsx — Admin login page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Lock, User, Eye, EyeOff, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginAdmin } from '../api/authApi';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginAdmin(form);
      login(data.token, data.admin);
      toast.success(`Welcome back, ${data.admin.username}!`);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — SevaConnect</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, #0D7377 100%)' }}>
        
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Heart size={30} className="text-white" fill="white" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white">SevaConnect</h1>
            <p className="text-white/60 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Login Card */}
          <div className="card p-8">
            <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--color-dark)' }}>
              Sign In
            </h2>
            <form id="admin-login-form" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="admin-username">Username</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="admin-username"
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="form-input pl-9"
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="admin-password">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="form-input pl-9 pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-2"
                id="admin-login-submit"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In…</>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-6 text-center">
              Default credentials: <code className="bg-gray-100 px-1 rounded">admin / Admin@123</code>
            </p>
          </div>

          <p className="text-center text-white/40 text-xs mt-6">
            © {new Date().getFullYear()} SevaConnect NGO — Admin Portal
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
