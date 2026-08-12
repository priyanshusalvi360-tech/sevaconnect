// pages/Volunteer.jsx — Volunteer Registration form page
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { UserCheck, Send, CheckCircle2 } from 'lucide-react';
import { submitVolunteer } from '../api/volunteerApi';

const INITIAL_FORM = {
  fullName: '', email: '', phone: '', age: '',
  areaOfInterest: '', availability: '', message: '',
};

const AREAS = [
  { value: '', label: 'Select an area…' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'environment', label: 'Environment' },
  { value: 'women-empowerment', label: "Women's Empowerment" },
  { value: 'child-welfare', label: 'Child Welfare' },
  { value: 'rural-development', label: 'Rural Development' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'social-media', label: 'Social Media & Communications' },
  { value: 'other', label: 'Other' },
];

const AVAILABILITY = [
  { value: '', label: 'Select availability…' },
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'both', label: 'Both Weekdays & Weekends' },
  { value: 'flexible', label: 'Flexible (as needed)' },
];

const Volunteer = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field-level error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit Indian phone number';
    if (!form.age) errs.age = 'Age is required';
    else if (Number(form.age) < 16 || Number(form.age) > 80) errs.age = 'Age must be between 16 and 80';
    if (!form.areaOfInterest) errs.areaOfInterest = 'Please select an area of interest';
    if (!form.availability) errs.availability = 'Please select your availability';
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
      await submitVolunteer({ ...form, age: Number(form.age) });
      setSubmitted(true);
      setForm(INITIAL_FORM);
      toast.success('Registration submitted successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Volunteer Registration — SevaConnect NGO</title>
        <meta name="description" content="Join SevaConnect as a volunteer. Register your interest in education, health, environment, and more." />
      </Helmet>

      {/* Header */}
      <section className="hero-gradient py-28 text-center" aria-labelledby="volunteer-heading">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>Make a Difference</span>
          <h1 id="volunteer-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Become a Volunteer
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your skills, time, and passion can transform communities. Join 5,200+ changemakers who are already making a difference with SevaConnect.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container max-w-3xl">

          {submitted ? (
            /* Success state */
            <div className="card p-12 text-center animate-fadeInUp">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(13,115,119,0.12)' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="font-heading text-3xl font-bold mb-3" style={{ color: 'var(--color-dark)' }}>
                Thank You for Volunteering!
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Your registration has been received. A member of our team will contact you within 3–5 working days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Register Another Person
              </button>
            </div>
          ) : (
            /* Registration form */
            <div className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(13,115,119,0.12)' }}>
                  <UserCheck size={24} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
                    Volunteer Registration Form
                  </h2>
                  <p className="text-sm text-gray-500">Fields marked * are required</p>
                </div>
              </div>

              <form id="volunteer-form" onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-fullName">Full Name *</label>
                    <input
                      id="vol-fullName" name="fullName" type="text"
                      value={form.fullName} onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="e.g. Priya Sharma"
                      autoComplete="name"
                    />
                    {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-email">Email Address *</label>
                    <input
                      id="vol-email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-phone">Phone Number *</label>
                    <input
                      id="vol-phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="10-digit mobile number"
                      autoComplete="tel"
                      maxLength={10}
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-age">Age *</label>
                    <input
                      id="vol-age" name="age" type="number"
                      value={form.age} onChange={handleChange}
                      className={`form-input ${errors.age ? 'error' : ''}`}
                      placeholder="Min. 16 years"
                      min={16} max={80}
                    />
                    {errors.age && <p className="form-error">{errors.age}</p>}
                  </div>

                  {/* Area of Interest */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-area">Area of Interest *</label>
                    <select
                      id="vol-area" name="areaOfInterest"
                      value={form.areaOfInterest} onChange={handleChange}
                      className={`form-input ${errors.areaOfInterest ? 'error' : ''}`}
                    >
                      {AREAS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                    </select>
                    {errors.areaOfInterest && <p className="form-error">{errors.areaOfInterest}</p>}
                  </div>

                  {/* Availability */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-avail">Availability *</label>
                    <select
                      id="vol-avail" name="availability"
                      value={form.availability} onChange={handleChange}
                      className={`form-input ${errors.availability ? 'error' : ''}`}
                    >
                      {AVAILABILITY.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                    </select>
                    {errors.availability && <p className="form-error">{errors.availability}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="vol-message">
                    Why do you want to volunteer? <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="vol-message" name="message"
                    value={form.message} onChange={handleChange}
                    className="form-input" rows={4}
                    placeholder="Tell us a bit about your motivation and any relevant skills or experience…"
                    maxLength={1000}
                  />
                  <p className="text-xs text-gray-400 mt-1">{form.message.length}/1000</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center mt-2"
                  id="volunteer-submit-btn"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Registration
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Volunteer;
