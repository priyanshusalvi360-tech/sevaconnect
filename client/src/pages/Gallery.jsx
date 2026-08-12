// pages/Gallery.jsx — Gallery page with lightbox and album filter
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Images } from 'lucide-react';
import Lightbox from '../components/Lightbox';
import { fetchGalleryItems, fetchAlbums } from '../api/galleryApi';

// Placeholder gallery data using a reliable image service
const PLACEHOLDER_IMAGES = [
  { _id: 'g1', imageUrl: 'https://picsum.photos/seed/seva1/600/400', caption: 'Annual Plantation Drive 2024', albumName: 'Plantation Drive' },
  { _id: 'g2', imageUrl: 'https://picsum.photos/seed/seva2/600/400', caption: 'Health Camp at Palghar', albumName: 'Health Camps' },
  { _id: 'g3', imageUrl: 'https://picsum.photos/seed/seva3/600/400', caption: 'Digital Literacy Workshop', albumName: 'Education Programs' },
  { _id: 'g4', imageUrl: 'https://picsum.photos/seed/seva4/600/400', caption: 'Women\'s Skill Training Center', albumName: 'Women Empowerment' },
  { _id: 'g5', imageUrl: 'https://picsum.photos/seed/seva5/600/400', caption: 'Child Nutrition Program', albumName: 'Child Welfare' },
  { _id: 'g6', imageUrl: 'https://picsum.photos/seed/seva6/600/400', caption: 'Volunteer Orientation Day', albumName: 'General' },
  { _id: 'g7', imageUrl: 'https://picsum.photos/seed/seva7/600/400', caption: 'Annual Gala 2023', albumName: 'Events' },
  { _id: 'g8', imageUrl: 'https://picsum.photos/seed/seva8/600/400', caption: 'Rural Sanitation Drive', albumName: 'Rural Development' },
  { _id: 'g9', imageUrl: 'https://picsum.photos/seed/seva9/600/400', caption: 'Eye Checkup Camp', albumName: 'Health Camps' },
  { _id: 'g10', imageUrl: 'https://picsum.photos/seed/seva10/600/400', caption: 'Classroom Renovation Completed', albumName: 'Education Programs' },
  { _id: 'g11', imageUrl: 'https://picsum.photos/seed/seva11/600/400', caption: 'Tree Planting — 10,000 saplings', albumName: 'Plantation Drive' },
  { _id: 'g12', imageUrl: 'https://picsum.photos/seed/seva12/600/400', caption: 'Community Kitchen Launch', albumName: 'General' },
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [albums, setAlbums] = useState(['All']);
  const [activeAlbum, setActiveAlbum] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  useEffect(() => {
    const load = async () => {
      try {
        const [itemsRes, albumsRes] = await Promise.all([fetchGalleryItems(), fetchAlbums()]);
        const items = itemsRes.data.data.length > 0 ? itemsRes.data.data : PLACEHOLDER_IMAGES;
        setImages(items);
        setAlbums(['All', ...(albumsRes.data.data.length > 0 ? albumsRes.data.data : [...new Set(PLACEHOLDER_IMAGES.map((i) => i.albumName))])]);
      } catch {
        setImages(PLACEHOLDER_IMAGES);
        setAlbums(['All', ...new Set(PLACEHOLDER_IMAGES.map((i) => i.albumName))]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = activeAlbum === 'All' ? images : images.filter((i) => i.albumName === activeAlbum);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i + 1) % filtered.length), [filtered.length]);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  return (
    <>
      <Helmet>
        <title>Gallery — SevaConnect NGO</title>
        <meta name="description" content="Browse photos from SevaConnect's events, camps, and community initiatives across India." />
      </Helmet>

      {/* Header */}
      <section className="hero-gradient py-28 text-center" aria-labelledby="gallery-heading">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>Our Memories</span>
          <h1 id="gallery-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Gallery
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            A glimpse into the lives we've touched and the communities we've served.
          </p>
        </div>
      </section>

      {/* Album Filter */}
      <section className="bg-white border-b border-gray-100 py-5 sticky top-16 z-30" aria-label="Album filter">
        <div className="container">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gallery albums">
            {albums.map((album) => (
              <button
                key={album}
                role="tab"
                aria-selected={activeAlbum === album}
                onClick={() => setActiveAlbum(album)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeAlbum === album ? 'text-white shadow-md' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
                style={activeAlbum === album ? { background: 'var(--color-primary)' } : {}}
              >
                {album}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="section" style={{ background: 'var(--color-bg)' }} aria-label="Gallery images">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl bg-gray-200 animate-pulse" style={{ height: '220px' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Images size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No images in this album yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, idx) => (
                <button
                  key={item._id}
                  id={`gallery-item-${item._id}`}
                  className="group relative rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ height: '220px', '--tw-ring-color': 'var(--color-primary)' }}
                  onClick={() => openLightbox(idx)}
                  aria-label={`View image: ${item.caption || `Gallery image ${idx + 1}`}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || `Gallery image from ${item.albumName}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                    {item.caption && (
                      <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
};

export default Gallery;
