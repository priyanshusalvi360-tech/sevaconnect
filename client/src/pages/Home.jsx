// pages/Home.jsx — Public Home Page
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Heart, Users, FolderOpen, Star, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import StatCounter from '../components/StatCounter';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../api/projectApi';

// ─── Static mock testimonials ─────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Volunteer, Education Drive',
    message:
      'Joining SevaConnect changed my perspective completely. Teaching underprivileged children and seeing their eyes light up with knowledge is the most fulfilling experience.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Donor & Supporter',
    message:
      'I have been donating to SevaConnect for two years. The transparency in their work and the real impact they create in rural communities gives me confidence in every rupee I contribute.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 3,
    name: 'Anjali Desai',
    role: 'Volunteer, Health Camp',
    message:
      "The health camps organized by SevaConnect in tribal areas are truly life-changing. I'm proud to be part of a team that puts community health first.",
    avatar: 'https://i.pravatar.cc/80?img=45',
  },
];

// ─── Why volunteer with us items ──────────────────────────────────────────
const whyUs = [
  'Work with passionate changemakers',
  'Gain hands-on social impact experience',
  'Flexible volunteering schedules',
  'Certificate of recognition',
  'Be part of a caring community',
  'Make a lasting difference in lives',
];

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await fetchProjects({ featured: true });
        // Fallback: show first 3 projects if none are marked featured
        setFeaturedProjects(data.data.slice(0, 3));
      } catch {
        setFeaturedProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <>
      <Helmet>
        <title>SevaConnect — Empowering Communities Through Compassion</title>
        <meta
          name="description"
          content="SevaConnect is an NGO dedicated to education, health, environment, and rural development. Join us as a volunteer or support our cause."
        />
      </Helmet>

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden" aria-label="Hero">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 bg-white" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 bg-white" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-5 bg-white" />
        </div>

        <div className="container relative z-10 py-32">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{ background: 'rgba(245,166,35,0.2)', color: 'var(--color-accent)' }}>
              <Star size={14} fill="currentColor" />
              Trusted by 5,000+ volunteers across India
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Lives,<br />
              <span style={{ color: 'var(--color-accent)' }}>One Act of Seva at a Time</span>
            </h1>

            <p className="text-lg text-white/80 mb-10 max-w-xl leading-relaxed">
              SevaConnect bridges the gap between compassionate individuals and communities in need.
              Together, we build a more equitable, healthy, and educated India.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/donate" className="btn-accent text-base py-3 px-8">
                ❤️ Donate Now
              </Link>
              <Link to="/volunteer" className="btn-outline text-base py-3 px-8"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
              >
                Become a Volunteer
              </Link>
              <Link to="/about" className="flex items-center gap-2 text-white/80 hover:text-white text-base font-medium transition-colors py-3">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Stats Section ─────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="stats-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Our Impact</span>
            <h2 id="stats-heading" className="section-title">Numbers That Tell Our Story</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter
              value={5200}
              label="Volunteers"
              suffix="+"
              icon={<Users size={26} style={{ color: 'var(--color-primary)' }} />}
            />
            <StatCounter
              value={120}
              label="Projects Completed"
              suffix="+"
              icon={<FolderOpen size={26} style={{ color: 'var(--color-primary)' }} />}
            />
            <StatCounter
              value={85000}
              label="Beneficiaries Reached"
              suffix="+"
              icon={<Heart size={26} style={{ color: 'var(--color-primary)' }} />}
            />
            <StatCounter
              value={18}
              label="Districts Covered"
              suffix="+"
              icon={<Star size={26} style={{ color: 'var(--color-primary)' }} />}
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg)' }} aria-labelledby="projects-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Our Work</span>
            <h2 id="projects-heading" className="section-title">Featured Projects & Campaigns</h2>
            <p className="section-subtitle">
              Explore some of our ongoing and completed initiatives across communities in need.
            </p>
          </div>

          {loadingProjects ? (
            <div className="grid-cards">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid-cards">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            /* Placeholder cards when no DB data yet */
            <div className="grid-cards">
              {[
                {
                  _id: 'p1', title: 'Digital Literacy for Rural Children', category: 'education',
                  status: 'ongoing', shortDescription: 'Providing tablets and internet access to 500 rural children in Maharashtra to bridge the digital divide.',
                },
                {
                  _id: 'p2', title: 'Free Health Camps — Tribal Villages', category: 'health',
                  status: 'ongoing', shortDescription: 'Monthly health checkups, medicines, and awareness sessions for tribal communities in Palghar district.',
                },
                {
                  _id: 'p3', title: 'Plantation Drive 2024', category: 'environment',
                  status: 'completed', shortDescription: 'Planted 10,000 saplings across 8 villages to combat deforestation and improve air quality.',
                },
              ].map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Volunteer Section ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-primary)' }} aria-labelledby="volunteer-cta-heading">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label" style={{ color: 'var(--color-accent)' }}>Join Us</span>
              <h2 id="volunteer-cta-heading" className="section-title text-white">
                Why Volunteer with SevaConnect?
              </h2>
              <p className="text-white/80 mb-8 text-base leading-relaxed">
                Whether you have an hour a week or a full weekend, your time and skills can transform
                communities. Become part of a movement that puts humanity first.
              </p>
              <ul className="space-y-3 mb-8" role="list">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 size={18} style={{ color: 'var(--color-accent)' }} className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/volunteer" className="btn-accent">
                Register as Volunteer <ArrowRight size={16} />
              </Link>
            </div>

            {/* Volunteer image placeholder */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                  alt="Volunteers working together in a community"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                  <Users size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-heading text-xl font-bold" style={{ color: 'var(--color-dark)' }}>5,200+</div>
                  <div className="text-xs text-gray-500">Active Volunteers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ─────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Voices of Change</span>
            <h2 id="testimonials-heading" className="section-title">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <figure key={t.id} className="card p-6" aria-label={`Testimonial by ${t.name}`}>
                <Quote size={32} className="mb-4 opacity-20" style={{ color: 'var(--color-primary)' }} />
                <blockquote className="text-gray-600 text-sm leading-relaxed mb-5">
                  "{t.message}"
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-dark)' }}>{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donate CTA Banner ────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, #E8940F 100%)' }}
        aria-labelledby="donate-cta-heading"
      >
        <div className="container">
          <h2 id="donate-cta-heading" className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Support a Cause That Matters
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Your contribution, however small, can change a child's future, restore a family's health,
            or give a woman her independence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donate" className="btn-primary" style={{ background: 'var(--color-dark)', color: 'white' }}>
              ❤️ Donate Now
            </Link>
            <Link to="/contact" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
