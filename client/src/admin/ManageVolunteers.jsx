// admin/ManageVolunteers.jsx — Admin view/manage volunteer registrations
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Loader2, Users, Trash2, ChevronDown } from 'lucide-react';
import { fetchVolunteers, updateVolunteerStatus, deleteVolunteer } from '../api/volunteerApi';

const STATUS_COLORS = {
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
};

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try {
      const { data } = await fetchVolunteers(filter ? { status: filter } : {});
      setVolunteers(data.data);
    } catch { toast.error('Failed to load volunteers'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateVolunteerStatus(id, status);
      toast.success('Status updated');
      load();
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVolunteer(id);
      toast.success('Record deleted');
      setDeleteConfirm(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <>
      <Helmet><title>Volunteers — SevaConnect Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Volunteer Registrations</h1>
          <p className="text-gray-500 text-sm mt-0.5">{volunteers.length} registration{volunteers.length !== 1 ? 's' : ''}</p>
        </div>
        <select
          id="volunteer-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-input py-2 text-sm max-w-[160px]"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 size={22} className="animate-spin" /> Loading…
          </div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users size={48} className="mx-auto mb-3 opacity-30" />
            <p>No volunteer registrations{filter ? ` with status "${filter}"` : ''} yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {volunteers.map((v) => (
              <div key={v._id}>
                {/* Row */}
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'var(--color-primary)' }}>
                    {v.fullName?.[0]?.toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: 'var(--color-dark)' }}>{v.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">{v.email} · {v.phone}</p>
                  </div>

                  <div className="hidden sm:block text-xs text-gray-500">
                    <span className="capitalize">{v.areaOfInterest?.replace(/-/g, ' ')}</span>
                    <br />
                    <span className="text-gray-400">{v.availability}</span>
                  </div>

                  {/* Status selector */}
                  <div className="relative">
                    <select
                      value={v.status}
                      onChange={(e) => handleStatusChange(v._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer appearance-none pr-6 ${STATUS_COLORS[v.status]}`}
                      aria-label={`Status for ${v.fullName}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => setExpanded(expanded === v._id ? null : v._id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 text-xs font-medium transition-colors"
                      aria-label="Toggle details"
                    >
                      {expanded === v._id ? 'Hide' : 'Details'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(v._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      aria-label={`Delete ${v.fullName}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expanded === v._id && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 grid sm:grid-cols-3 gap-3 text-sm">
                    <div><span className="text-gray-400 text-xs">Age</span><br /><span className="font-medium" style={{ color: 'var(--color-dark)' }}>{v.age} years</span></div>
                    <div><span className="text-gray-400 text-xs">Availability</span><br /><span className="font-medium capitalize" style={{ color: 'var(--color-dark)' }}>{v.availability}</span></div>
                    <div><span className="text-gray-400 text-xs">Registered</span><br /><span className="font-medium" style={{ color: 'var(--color-dark)' }}>{new Date(v.createdAt).toLocaleDateString('en-IN')}</span></div>
                    {v.message && (
                      <div className="sm:col-span-3">
                        <span className="text-gray-400 text-xs">Motivation</span>
                        <p className="mt-1 text-gray-600 leading-relaxed">{v.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Delete Record?</h3>
            <p className="text-gray-500 text-sm mb-5">This volunteer registration will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline text-sm py-2 px-4 flex-1">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageVolunteers;
