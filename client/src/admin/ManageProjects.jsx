// admin/ManageProjects.jsx — Admin CRUD interface for Projects
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projectApi';

const CATEGORIES = ['education','health','environment','women-empowerment','child-welfare','rural-development','other'];
const EMPTY_FORM = { title: '', shortDescription: '', description: '', category: 'education', status: 'ongoing', featured: false };

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // id of project to delete

  const load = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data.data);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ title: p.title, shortDescription: p.shortDescription || '', description: p.description, category: p.category, status: p.status, featured: p.featured });
    setEditingId(p._id);
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditingId(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) { toast.error('Title, description and category are required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        toast.success('Project updated!');
      } else {
        await createProject(form);
        toast.success('Project created!');
      }
      closeModal();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      setDeleteConfirm(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <>
      <Helmet><title>Manage Projects — SevaConnect Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Projects & Campaigns</h1>
          <p className="text-gray-500 text-sm mt-0.5">Add, edit or remove NGO projects.</p>
        </div>
        <button id="add-project-btn" onClick={openCreate} className="btn-primary text-sm py-2 px-5">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 size={22} className="animate-spin" /> Loading…
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-4">No projects yet.</p>
            <button onClick={openCreate} className="btn-primary text-sm">+ Add First Project</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100" style={{ background: 'var(--color-bg)' }}>
                <tr>
                  {['Title', 'Category', 'Status', 'Featured', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium" style={{ color: 'var(--color-dark)', maxWidth: '220px' }}>
                      <p className="truncate">{p.title}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{p.shortDescription}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="capitalize text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                        {p.category.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge ${p.status === 'ongoing' ? 'badge-ongoing' : 'badge-completed'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold ${p.featured ? 'text-amber-600' : 'text-gray-300'}`}>
                        {p.featured ? '⭐ Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" aria-label={`Edit ${p.title}`}>
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteConfirm(p._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors" aria-label={`Delete ${p.title}`}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close modal"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="form-group">
                <label className="form-label" htmlFor="proj-title">Title *</label>
                <input id="proj-title" className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Project title" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-short">Short Description</label>
                <input id="proj-short" className="form-input" value={form.shortDescription} onChange={(e) => setForm({...form, shortDescription: e.target.value})} placeholder="One-line summary (shown on cards)" maxLength={300} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="proj-desc">Full Description *</label>
                <textarea id="proj-desc" className="form-input" rows={4} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Detailed project description…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="proj-cat">Category *</label>
                  <select id="proj-cat" className="form-input" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g,' ')}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="proj-status">Status *</label>
                  <select id="proj-status" className="form-input" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded" />
                Feature on Home Page
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-outline text-sm py-2 px-5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? 'Saving…' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Delete Project?</h3>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
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

export default ManageProjects;
