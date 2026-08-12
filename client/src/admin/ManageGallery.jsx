// admin/ManageGallery.jsx — Admin interface for Gallery images
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, X, Save, Loader2, Image } from 'lucide-react';
import { fetchGalleryItems, addGalleryItem, deleteGalleryItem } from '../api/galleryApi';

const EMPTY_FORM = { imageUrl: '', caption: '', albumName: 'General', eventDate: '' };

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    try {
      const { data } = await fetchGalleryItems();
      setItems(data.data);
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) { toast.error('Image URL is required'); return; }
    setSaving(true);
    try {
      await addGalleryItem(form);
      toast.success('Image added to gallery!');
      setShowModal(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add image');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGalleryItem(id);
      toast.success('Image removed');
      setDeleteConfirm(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  // Group items by album for display
  const albums = [...new Set(items.map((i) => i.albumName || 'General'))];

  return (
    <>
      <Helmet><title>Manage Gallery — SevaConnect Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} image{items.length !== 1 ? 's' : ''} across {albums.length} album{albums.length !== 1 ? 's' : ''}.</p>
        </div>
        <button id="add-gallery-btn" onClick={() => { setForm(EMPTY_FORM); setShowModal(true); }} className="btn-primary text-sm py-2 px-5">
          <Plus size={16} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={22} className="animate-spin" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="card text-center py-16 text-gray-400">
          <Image size={48} className="mx-auto mb-4 opacity-30" />
          <p className="mb-4">No gallery images yet.</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">+ Add First Image</button>
        </div>
      ) : (
        albums.map((album) => {
          const albumItems = items.filter((i) => (i.albumName || 'General') === album);
          return (
            <div key={album} className="mb-8">
              <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--color-primary)' }} />
                {album} <span className="text-xs text-gray-400 font-normal">({albumItems.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {albumItems.map((item) => (
                  <div key={item._id} className="relative group rounded-xl overflow-hidden shadow-sm" style={{ height: '150px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.caption || 'Gallery image'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <button
                        onClick={() => setDeleteConfirm(item._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        aria-label="Delete image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                        <p className="text-white text-xs truncate">{item.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Add Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-dark)' }}>Add Gallery Image</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="form-group">
                <label className="form-label" htmlFor="gal-url">Image URL *</label>
                <input id="gal-url" className="form-input" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})} placeholder="https://…" type="url" />
                <p className="text-xs text-gray-400 mt-1">Paste a public image URL (Imgur, Cloudinary, etc.)</p>
              </div>
              {/* Preview */}
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg" onError={(e) => e.target.style.display = 'none'} />
              )}
              <div className="form-group">
                <label className="form-label" htmlFor="gal-caption">Caption</label>
                <input id="gal-caption" className="form-input" value={form.caption} onChange={(e) => setForm({...form, caption: e.target.value})} placeholder="Short description of the image" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="gal-album">Album Name</label>
                <input id="gal-album" className="form-input" value={form.albumName} onChange={(e) => setForm({...form, albumName: e.target.value})} placeholder="e.g. Health Camps" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="gal-date">Event Date</label>
                <input id="gal-date" className="form-input" type="date" value={form.eventDate} onChange={(e) => setForm({...form, eventDate: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? 'Adding…' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Remove Image?</h3>
            <p className="text-gray-500 text-sm mb-5">The image will be removed from the gallery permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline text-sm py-2 px-4 flex-1">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageGallery;
