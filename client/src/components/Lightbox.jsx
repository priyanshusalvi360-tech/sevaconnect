// components/Lightbox.jsx — Full-screen image lightbox viewer
import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Lightbox component for gallery image enlargement.
 * Props:
 *  - images: array of { imageUrl, caption }
 *  - currentIndex: currently selected image index
 *  - onClose: function to close the lightbox
 *  - onNext: function to go to next image
 *  - onPrev: function to go to previous image
 */
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const current = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        id="lightbox-close"
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          id="lightbox-prev"
          className="absolute left-4 w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Main Image */}
      <div
        className="max-w-5xl max-h-[90vh] mx-4 flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()} // Prevent close on image click
      >
        <img
          src={current.imageUrl}
          alt={current.caption || `Gallery image ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain rounded-lg"
          loading="eager"
        />
        {current.caption && (
          <p className="text-white/80 text-sm text-center px-4">{current.caption}</p>
        )}
        <p className="text-white/50 text-xs">{currentIndex + 1} / {images.length}</p>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          id="lightbox-next"
          className="absolute right-4 w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Lightbox;
