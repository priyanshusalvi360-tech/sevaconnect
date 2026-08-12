// admin/ManageContacts.jsx — Admin view/manage contact inquiries
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Loader2, MessageSquare, Trash2, ChevronDown, Mail } from 'lucide-react';
import { fetchContacts, updateContactStatus, deleteContact } from '../api/contactApi';

const STATUS_COLORS = {
  unread: 'bg-red-100 text-red-700',
  read: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
};

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try {
      const { data } = await fetchContacts(filter ? { status: filter } : {});
      setContacts(data.data);
    } catch { toast.error('Failed to load contacts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      toast.success('Status updated');
      load();
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success('Inquiry deleted');
      setDeleteConfirm(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <>
      <Helmet><title>Contact Inquiries — SevaConnect Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Contact Inquiries</h1>
          <p className="text-gray-500 text-sm mt-0.5">{contacts.length} inquiry{contacts.length !== 1 ? 'ies' : ''}</p>
        </div>
        <select
          id="contacts-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-input py-2 text-sm max-w-[160px]"
          aria-label="Filter inquiries by status"
        >
          <option value="">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 size={22} className="animate-spin" /> Loading…
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
            <p>No inquiries{filter ? ` with status "${filter}"` : ''} yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {contacts.map((c) => (
              <div key={c._id} className={c.status === 'unread' ? 'border-l-3' : ''}>
                {/* Row */}
                <div className={`flex items-center gap-4 px-5 py-4 transition-colors ${c.status === 'unread' ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: c.status === 'unread' ? '#FEE2E2' : 'rgba(13,115,119,0.1)' }}>
                    <Mail size={17} style={{ color: c.status === 'unread' ? '#EF4444' : 'var(--color-primary)' }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate" style={{ color: 'var(--color-dark)' }}>{c.name}</p>
                      {c.status === 'unread' && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#EF4444' }} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{c.subject}</p>
                    <p className="text-xs text-gray-400">{c.email}</p>
                  </div>

                  <p className="hidden md:block text-xs text-gray-400 flex-shrink-0">
                    {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>

                  {/* Status selector */}
                  <div className="relative flex-shrink-0">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer appearance-none pr-6 ${STATUS_COLORS[c.status]}`}
                      aria-label={`Status for inquiry from ${c.name}`}
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                    </select>
                    <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setExpanded(expanded === c._id ? null : c._id);
                        // Mark as read on expand
                        if (c.status === 'unread' && expanded !== c._id) handleStatusChange(c._id, 'read');
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 text-xs font-medium transition-colors"
                    >
                      {expanded === c._id ? 'Hide' : 'Read'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(c._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      aria-label={`Delete inquiry from ${c.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Expanded Message */}
                {expanded === c._id && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Message</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                    <a
                      href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <Mail size={14} /> Reply via Email
                    </a>
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
            <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Delete Inquiry?</h3>
            <p className="text-gray-500 text-sm mb-5">This contact inquiry will be permanently deleted.</p>
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

export default ManageContacts;
