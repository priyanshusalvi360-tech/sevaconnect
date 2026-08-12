// src/App.jsx — Root routing configuration for SevaConnect
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

// ── Shared Layout Components ────────────────────────────────────────────────
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// ── Public Pages (eager-loaded — they're the main content) ────────────────
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import Donate from './pages/Donate';

// ── Admin Pages (lazy-loaded for code-splitting) ──────────────────────────
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const ManageProjects = lazy(() => import('./admin/ManageProjects'));
const ManageGallery = lazy(() => import('./admin/ManageGallery'));
const ManageVolunteers = lazy(() => import('./admin/ManageVolunteers'));
const ManageContacts = lazy(() => import('./admin/ManageContacts'));

// ── Loading Spinner for Suspense fallback ──────────────────────────────────
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%', border: '4px solid var(--color-primary)',
        borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Loading…</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── Public Layout Wrapper (Navbar + content + Footer) ─────────────────────
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: '64px' }}>{children}</main>
    <Footer />
  </>
);

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' },
            success: { iconTheme: { primary: '#0D7377', secondary: 'white' } },
          }}
        />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Public Routes ──────────────────────────────── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/volunteer" element={<PublicLayout><Volunteer /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />

            {/* Projects with optional :id param for detail view */}
            <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
            <Route path="/projects/:id" element={<PublicLayout><Projects /></PublicLayout>} />

            {/* ── Admin Routes ──────────────────────────────── */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* All admin routes are nested under ProtectedRoute → AdminLayout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<ManageProjects />} />
                <Route path="/admin/gallery" element={<ManageGallery />} />
                <Route path="/admin/volunteers" element={<ManageVolunteers />} />
                <Route path="/admin/contacts" element={<ManageContacts />} />
              </Route>
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={
              <PublicLayout>
                <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: 'var(--color-primary)', margin: 0 }}>404</h1>
                  <p style={{ color: '#6b7280' }}>Oops! The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary">Go Home</a>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
