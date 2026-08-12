// admin/AdminDashboard.jsx — Overview dashboard with stats cards
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FolderOpen, Users, MessageSquare, Images, ArrowRight, TrendingUp } from 'lucide-react';
import { fetchProjects } from '../api/projectApi';
import { fetchVolunteers } from '../api/volunteerApi';
import { fetchContacts } from '../api/contactApi';
import { fetchGalleryItems } from '../api/galleryApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, volunteers: 0, contacts: 0, gallery: 0 });
  const [newCounts, setNewCounts] = useState({ volunteers: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [p, v, c, g] = await Promise.all([
          fetchProjects(),
          fetchVolunteers(),
          fetchContacts(),
          fetchGalleryItems(),
        ]);
        setStats({
          projects: p.data.count,
          volunteers: v.data.count,
          contacts: c.data.count,
          gallery: g.data.count,
        });
        // Count "new" volunteers and "unread" contacts
        setNewCounts({
          volunteers: v.data.data.filter((x) => x.status === 'new').length,
          contacts: c.data.data.filter((x) => x.status === 'unread').length,
        });
      } catch {
        // Non-critical; show zeros
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderOpen, color: 'var(--color-primary)', link: '/admin/projects', badge: null },
    { label: 'Volunteer Registrations', value: stats.volunteers, icon: Users, color: '#8B5CF6', link: '/admin/volunteers', badge: newCounts.volunteers },
    { label: 'Contact Inquiries', value: stats.contacts, icon: MessageSquare, color: 'var(--color-accent)', link: '/admin/contacts', badge: newCounts.contacts },
    { label: 'Gallery Images', value: stats.gallery, icon: Images, color: '#10B981', link: '/admin/gallery', badge: null },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard — SevaConnect Admin</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold" style={{ color: 'var(--color-dark)' }}>Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your NGO's digital presence and engagement.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, link, badge }) => (
          <Link key={label} to={link} className="card p-5 flex items-center gap-4 group hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative"
              style={{ background: `${color}18` }}>
              <Icon size={24} style={{ color }} />
              {badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ background: '#EF4444' }}>
                  {badge}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
                {loading ? <span className="inline-block w-10 h-6 bg-gray-200 rounded animate-pulse" /> : value}
              </p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-semibold" style={{ color: 'var(--color-dark)' }}>Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {[
              { to: '/admin/projects', label: '+ Add New Project', color: 'var(--color-primary)' },
              { to: '/admin/gallery', label: '+ Upload Gallery Image', color: '#10B981' },
              { to: '/admin/volunteers', label: '📋 Review New Volunteers', color: '#8B5CF6' },
              { to: '/admin/contacts', label: '📨 View Unread Inquiries', color: 'var(--color-accent)' },
            ].map(({ to, label, color }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all hover:translate-x-1"
                style={{ background: `${color}10`, color }}
              >
                {label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>📢 Alerts</h2>
          {newCounts.volunteers > 0 || newCounts.contacts > 0 ? (
            <ul className="space-y-3">
              {newCounts.volunteers > 0 && (
                <li className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 text-purple-700 text-sm">
                  <Users size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong>{newCounts.volunteers}</strong> new volunteer registration{newCounts.volunteers > 1 ? 's' : ''} awaiting review.</span>
                </li>
              )}
              {newCounts.contacts > 0 && (
                <li className="flex items-start gap-3 p-3 rounded-lg text-sm"
                  style={{ background: 'rgba(245,166,35,0.1)', color: '#92600A' }}>
                  <MessageSquare size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong>{newCounts.contacts}</strong> unread contact inquiry{newCounts.contacts > 1 ? 'ies' : ''} need attention.</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">
              ✅ All caught up! No pending alerts.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
