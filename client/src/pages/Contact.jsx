// pages/Contact.jsx — Contact Us page with inquiry form and contact details
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Globe, Share2, MessageCircle, Briefcase, Video } from 'lucide-react';
import { submitContact } from '../api/contactApi';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the highlighted errors');
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSubmitted(true);
      setForm(INITIAL_FORM);
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '123, Seva Marg, Andheri West, Mumbai, Maharashtra 400058', href: null },
    { icon: Phone, label: 'Phone', value: '+91 22 1234 5678', href: 'tel:+912212345678' },
    { icon: Mail, label: 'Email', value: 'info@sevaconnect.org', href: 'mailto:info@sevaconnect.org' },
    { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 6:00 PM', href: null },
  ];

  const socials = [
    { icon: Globe, href: '#', label: 'Facebook' },
    { icon: Share2, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: '#', label: 'Twitter/X' },
    { icon: Briefcase, href: '#', label: 'LinkedIn' },
    { icon: Video, href: '#', label: 'YouTube' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us — SevaConnect NGO</title>
        <meta name="description" content="Get in touch with SevaConnect. Send us an inquiry, find our office address, or connect on social media." />
      </Helmet>

      {/* Header */}
      <section className="hero-gradient py-28 text-center" aria-labelledby="contact-heading">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>Get In Touch</span>
          <h1 id="contact-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Have a question, partnership idea, or want to support our work? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10">
            
            {/* Contact Information Panel */}
            <aside className="lg:col-span-2">
              <div className="card p-8 h-full" style={{ background: 'var(--color-primary)' }}>
                <h2 className="font-heading text-2xl font-bold text-white mb-2">Get in Touch</h2>
                <p className="text-white/70 text-sm mb-8">
                  Reach out through any of the channels below. We respond within 2 business days.
                </p>

                <ul className="space-y-6 mb-8" role="list">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-white text-sm hover:text-white/80 transition-colors">{value}</a>
                        ) : (
                          <p className="text-white text-sm">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Social Links */}
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Follow Us</p>
                  <div className="flex gap-3" aria-label="Social media links">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: 'rgba(255,255,255,0.2)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                      >
                        <Icon size={15} className="text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="card p-12 text-center animate-fadeInUp h-full flex flex-col items-center justify-center">
                  <CheckCircle2 size={52} className="mb-5" style={{ color: 'var(--color-primary)' }} />
                  <h2 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--color-dark)' }}>
                    Message Received!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 2 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another Message</button>
                </div>
              ) : (
                <div className="card p-8 md:p-10">
                  <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--color-dark)' }}>
                    Send Us a Message
                  </h2>
                  <form id="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="form-group">
                        <label className="form-label" htmlFor="con-name">Your Name *</label>
                        <input id="con-name" name="name" type="text" value={form.name} onChange={handleChange}
                          className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Full name" autoComplete="name" />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="con-email">Email Address *</label>
                        <input id="con-email" name="email" type="email" value={form.email} onChange={handleChange}
                          className={`form-input ${errors.email ? 'error' : ''}`} placeholder="you@example.com" autoComplete="email" />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="con-subject">Subject *</label>
                      <input id="con-subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                        className={`form-input ${errors.subject ? 'error' : ''}`} placeholder="What is your inquiry about?" />
                      {errors.subject && <p className="form-error">{errors.subject}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="con-message">Message *</label>
                      <textarea id="con-message" name="message" value={form.message} onChange={handleChange}
                        className={`form-input ${errors.message ? 'error' : ''}`} rows={5}
                        placeholder="Describe your question or message in detail…" maxLength={2000} />
                      <p className="text-xs text-gray-400 mt-1">{form.message.length}/2000</p>
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center" id="contact-submit-btn">
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-10 rounded-2xl overflow-hidden shadow-lg" style={{ height: '300px' }}>
            <iframe
              title="SevaConnect Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.345!2d72.8347!3d19.1196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzEwLjYiTiA3MsKwNTAnMDQuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing SevaConnect office location in Andheri West, Mumbai"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
