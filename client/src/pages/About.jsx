// pages/About.jsx — About Us page
import { Helmet } from 'react-helmet-async';
import { Target, Eye, Heart, Lightbulb, Users, Award } from 'lucide-react';

const teamMembers = [
  { name: 'Dr. Meera Joshi', role: 'Founder & President', img: 'https://i.pravatar.cc/200?img=47' },
  { name: 'Suresh Patil', role: 'Executive Director', img: 'https://i.pravatar.cc/200?img=11' },
  { name: 'Anita Nair', role: 'Head of Volunteers', img: 'https://i.pravatar.cc/200?img=45' },
  { name: 'Vikram Rao', role: 'Program Manager', img: 'https://i.pravatar.cc/200?img=15' },
  { name: 'Deepa Kulkarni', role: 'Health Initiatives Lead', img: 'https://i.pravatar.cc/200?img=48' },
  { name: 'Arjun Singh', role: 'Technology & Digital', img: 'https://i.pravatar.cc/200?img=20' },
];

const coreValues = [
  { icon: Heart, title: 'Compassion', desc: 'Every action we take is rooted in empathy for those we serve.' },
  { icon: Award, title: 'Integrity', desc: 'We operate with full transparency, accountability, and honesty.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We seek creative, sustainable solutions to community challenges.' },
  { icon: Users, title: 'Inclusivity', desc: 'We welcome all volunteers and serve all communities without bias.' },
];

const About = () => (
  <>
    <Helmet>
      <title>About Us — SevaConnect NGO</title>
      <meta name="description" content="Learn about SevaConnect's mission, vision, founding story, and the passionate team behind India's growing NGO platform." />
    </Helmet>

    {/* Page Header */}
    <section className="hero-gradient py-32 text-center" aria-labelledby="about-heading">
      <div className="container">
        <span className="section-label" style={{ color: 'var(--color-accent)' }}>Who We Are</span>
        <h1 id="about-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          About SevaConnect
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          A grassroots NGO born from the belief that every person deserves dignity, opportunity, and care — regardless of where they were born.
        </p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section bg-white" aria-labelledby="mission-heading">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="card p-8 border-t-4" style={{ borderColor: 'var(--color-primary)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(13,115,119,0.12)' }}>
                <Target size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 id="mission-heading" className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To empower marginalized communities across India through holistic programs in education, health, environmental sustainability, and women's empowerment — creating long-lasting, measurable change through volunteer-driven action and strategic partnerships.
            </p>
          </div>

          <div className="card p-8 border-t-4" style={{ borderColor: 'var(--color-accent)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.12)' }}>
                <Eye size={24} style={{ color: 'var(--color-accent)' }} />
              </div>
              <h2 className="font-heading text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              An India where every child has access to quality education, every family has access to healthcare, every woman has the freedom to pursue her dreams, and every community lives in harmony with nature.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Founding Story */}
    <section className="section" style={{ background: 'var(--color-bg)' }} aria-labelledby="story-heading">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&q=80"
              alt="Founding members of SevaConnect at their first community drive"
              className="rounded-2xl shadow-xl w-full object-cover"
              style={{ height: '380px' }}
              loading="lazy"
            />
          </div>
          <div>
            <span className="section-label">Our Story</span>
            <h2 id="story-heading" className="section-title text-left">
              How It All Began
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              SevaConnect was founded in 2010 by Dr. Meera Joshi, a social activist from Mumbai, after witnessing firsthand the devastating impact of healthcare inaccessibility in Palghar's tribal areas. With just 12 volunteers and a small community fund, she organized the first free health camp serving over 300 tribal villagers.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Word spread rapidly. By 2015, SevaConnect had expanded to education, environment, and women's empowerment programs across three districts. Today, with 5,000+ registered volunteers and partnerships with 20+ government and corporate bodies, SevaConnect has become one of Maharashtra's most respected grassroots NGOs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our name comes from the Sanskrit word <em>"Seva"</em> — selfless service — the very spirit that drives every one of our initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="section bg-white" aria-labelledby="values-heading">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">What Guides Us</span>
          <h2 id="values-heading" className="section-title">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors"
                style={{ background: 'rgba(13,115,119,0.1)' }}
              >
                <Icon size={26} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="section" style={{ background: 'var(--color-bg)' }} aria-labelledby="team-heading">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">The People Behind the Change</span>
          <h2 id="team-heading" className="section-title">Our Leadership Team</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map(({ name, role, img }) => (
            <div key={name} className="card p-6 text-center group">
              <img
                src={img}
                alt={`Portrait of ${name}, ${role}`}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4"
                style={{ borderColor: 'rgba(13,115,119,0.2)' }}
                loading="lazy"
              />
              <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-dark)' }}>{name}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--color-primary)' }}>{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
