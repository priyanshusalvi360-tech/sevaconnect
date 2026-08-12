// admin/AdminLayout.jsx — Shared sidebar + topbar layout for the admin panel
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Heart, LayoutDashboard, FolderOpen, Images, Users, MessageSquare, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/admin/gallery', icon: Images, label: 'Gallery' },
  { to: '/admin/volunteers', icon: Users, label: 'Volunteers' },
  { to: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#F0F4F8' }}>
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside
        className={`admin-sidebar flex flex-col transition-all duration-300 fixed top-0 bottom-0 left-0 z-40 ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
        aria-label="Admin sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--color-primary)' }}>
            <Heart size={17} className="text-white" fill="white" />
          </div>
          <div>
            <div className="font-heading text-lg font-bold text-white leading-tight">SevaConnect</div>
            <div className="text-xs text-gray-400">Admin Panel</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Admin navigation">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Main Menu</p>
          <ul role="list" className="space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  id={`admin-nav-${label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { background: 'var(--color-primary)' } : {}
                  }
                >
                  <Icon size={17} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info + Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--color-primary)' }}>
              {admin?.username?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{admin?.username}</p>
              <p className="text-gray-500 text-xs capitalize">{admin?.role}</p>
            </div>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
          >
            <LogOut size={17} />
            Logout
          </button>
          <div className="mt-4 px-3">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={12} /> View Public Site
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────────────── */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            id="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h2 className="font-semibold text-gray-700 text-sm">
            Welcome back, <span style={{ color: 'var(--color-primary)' }}>{admin?.username}</span> 👋
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
