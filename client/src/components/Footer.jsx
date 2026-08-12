// components/Footer.jsx — Site-wide footer with links, social icons, and contact info
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Globe, Share2, MessageCircle, Briefcase, Video } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/volunteer', label: 'Volunteer' },
    { to: '/contact', label: 'Contact' },
    { to: '/donate', label: 'Donate' },
  ];

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Share2, href: '#', label: 'Instagram', color: '#E1306C' },
    { icon: MessageCircle, href: '#', label: 'Twitter/X', color: '#1DA1F2' },
    { icon: Briefcase, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Video, href: '#', label: 'YouTube', color: '#FF0000' },
  ];

  return (
    <footer style={{ background: 'var(--color-dark)', color: '#cbd5e1' }} role="contentinfo">
      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="SevaConnect Home">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                <Heart size={20} className="text-white" fill="white" />
              </div>
              <span className="font-heading text-2xl font-bold text-white">
                Seva<span style={{ color: 'var(--color-accent)' }}>Connect</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Empowering communities through compassion, service, and sustainable action. 
              Every small act of service creates a ripple of change.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ '--hover-color': color }}
                  onMouseEnter={(e) => e.currentTarget.style.background = color}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: 'var(--color-accent)' }}></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Cause Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Our Causes</h3>
            <ul className="space-y-2 text-sm text-slate-400" role="list">
              {['Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Child Welfare', 'Rural Development'].map((cause) => (
                <li key={cause} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)' }}></span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Contact Us</h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <span>123, Seva Marg, Andheri West,<br />Mumbai, Maharashtra 400058</span>
              </li>
              <li>
                <a href="tel:+912212345678" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <Phone size={16} style={{ color: 'var(--color-accent)' }} />
                  +91 22 1234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@sevaconnect.org" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail size={16} style={{ color: 'var(--color-accent)' }} />
                  info@sevaconnect.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {currentYear} SevaConnect NGO. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Made with <Heart size={13} fill="currentColor" style={{ color: 'var(--color-accent)' }} /> for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
