// pages/Projects.jsx — Projects & Campaigns listing with filter/search
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, ArrowLeft, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects, fetchProjectById } from '../api/projectApi';

// Placeholder projects for demo when DB is empty
const PLACEHOLDER_PROJECTS = [
  {
    _id: 'ph1', title: 'Digital Literacy for Rural Children', category: 'education', status: 'ongoing',
    shortDescription: 'Providing tablets and internet access to 500 rural children in Maharashtra.',
    description: 'This initiative aims to bridge the digital divide by distributing tablets, setting up solar-powered charging stations, and training local teachers in digital pedagogy. We work with 12 government schools across Palghar and Raigad districts.',
    impactMetrics: [{ label: 'Children Benefited', value: '500+' }, { label: 'Schools Covered', value: '12' }],
  },
  {
    _id: 'ph2', title: 'Free Health Camps — Tribal Villages', category: 'health', status: 'ongoing',
    shortDescription: 'Monthly health checkups, medicines, and awareness sessions for tribal communities.',
    description: 'Volunteer doctors and nurses conduct monthly mobile health camps in 8 tribal villages in Palghar. Services include general checkups, maternal health, eye care, and distribution of essential medicines.',
    impactMetrics: [{ label: 'Patients Served', value: '3,200+' }, { label: 'Villages Covered', value: '8' }],
  },
  {
    _id: 'ph3', title: 'Plantation Drive 2024', category: 'environment', status: 'completed',
    shortDescription: 'Planted 10,000 saplings across 8 villages to combat deforestation.',
    description: 'In collaboration with the Maharashtra Forest Department, we organized a mega plantation drive planting 10,000 native species saplings. Volunteers were trained in tree care and assigned personal trees to nurture.',
    impactMetrics: [{ label: 'Saplings Planted', value: '10,000' }, { label: 'Survival Rate', value: '87%' }],
  },
  {
    _id: 'ph4', title: 'Women Skill Development Center', category: 'women-empowerment', status: 'ongoing',
    shortDescription: 'Vocational training in tailoring, computers, and handicrafts for women.',
    description: 'Our skill development centers empower women from low-income households with vocational training. Over 200 women have started their own micro-enterprises after completing our 3-month program.',
    impactMetrics: [{ label: 'Women Trained', value: '200+' }, { label: 'Self-employed', value: '140+' }],
  },
  {
    _id: 'ph5', title: 'Child Nutrition Program', category: 'child-welfare', status: 'ongoing',
    shortDescription: 'Providing nutritious mid-day meals to 1,000 school children daily.',
    description: 'We partner with 20 anganwadis to supply nutritious meals to children under 6. Local SHG (Self Help Group) women cook and distribute meals, creating a self-sustaining ecosystem.',
    impactMetrics: [{ label: 'Children Fed Daily', value: '1,000' }, { label: 'Anganwadis', value: '20' }],
  },
  {
    _id: 'ph6', title: 'Rural Sanitation Drive', category: 'rural-development', status: 'completed',
    shortDescription: 'Built 500 household toilets in 15 villages under Swachh Bharat Mission.',
    description: 'In partnership with local panchayats and the district administration, we constructed 500 sanitation units and conducted extensive awareness campaigns about hygiene and open defecation free villages.',
    impactMetrics: [{ label: 'Toilets Built', value: '500' }, { label: 'ODF Villages', value: '15' }],
  },
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'environment', label: 'Environment' },
  { value: 'women-empowerment', label: "Women's Empowerment" },
  { value: 'child-welfare', label: 'Child Welfare' },
  { value: 'rural-development', label: 'Rural Development' },
];

// ─── Project Detail View ───────────────────────────────────────────────────
const ProjectDetail = ({ id }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Try live API first; fall back to placeholder
      try {
        const { data } = await fetchProjectById(id);
        setProject(data.data);
      } catch {
        setProject(PLACEHOLDER_PROJECTS.find((p) => p._id === id) || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container py-20 text-center text-gray-400">Loading…</div>;
  if (!project) return <div className="container py-20 text-center text-red-400">Project not found.</div>;

  return (
    <div className="container py-12">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--color-primary)' }}>
        <ArrowLeft size={15} /> Back to Projects
      </Link>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={project.images?.[0]?.url || `https://picsum.photos/seed/${project._id}/700/450`}
          alt={project.title}
          className="rounded-2xl w-full object-cover shadow-xl"
          style={{ height: '350px' }}
        />
        <div>
          <span className={`badge mb-3 ${project.status === 'ongoing' ? 'badge-ongoing' : 'badge-completed'}`}>
            {project.status === 'ongoing' ? '🟢 Ongoing' : '✅ Completed'}
          </span>
          <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>{project.title}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

          {project.impactMetrics?.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-dark)' }}>Impact So Far</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.impactMetrics.map(({ label, value }) => (
                  <div key={label} className="card p-4 text-center">
                    <div className="font-heading text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{value}</div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Projects Page ────────────────────────────────────────────────────
const Projects = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) return; // Don't load list when viewing a single project
    const load = async () => {
      try {
        const { data } = await fetchProjects({ category, status });
        setProjects(data.data.length > 0 ? data.data : PLACEHOLDER_PROJECTS);
      } catch {
        setProjects(PLACEHOLDER_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, category, status]);

  // If viewing a single project
  if (id) {
    return (
      <>
        <Helmet>
          <title>Project Detail — SevaConnect</title>
          <meta name="description" content="View full details of this SevaConnect project including impact metrics and description." />
        </Helmet>
        <div style={{ paddingTop: '64px' }}>
          <ProjectDetail id={id} />
        </div>
      </>
    );
  }

  // Filter by search term on client side
  const filtered = projects.filter((p) =>
    `${p.title} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Projects & Campaigns — SevaConnect NGO</title>
        <meta name="description" content="Browse all SevaConnect projects in education, health, environment, and more. Filter by category and status." />
      </Helmet>

      {/* Header */}
      <section className="hero-gradient py-28 text-center" aria-labelledby="projects-page-heading">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>What We Do</span>
          <h1 id="projects-page-heading" className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Our Projects & Campaigns
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Explore the full range of our community-driven initiatives across Maharashtra and beyond.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-5" aria-label="Project filters">
        <div className="container">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="project-search"
                type="search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-9 py-2.5 text-sm"
                aria-label="Search projects"
              />
            </div>

            {/* Category filter */}
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input py-2.5 text-sm max-w-[200px]"
              aria-label="Filter by category"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            {/* Status filter */}
            <select
              id="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input py-2.5 text-sm max-w-[160px]"
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            {/* Clear filters */}
            {(category || status || search) && (
              <button
                onClick={() => { setCategory(''); setStatus(''); setSearch(''); }}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
                aria-label="Clear all filters"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          {loading ? (
            <div className="grid-cards">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filtered.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid-cards">
                {filtered.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Filter size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No projects match your filters.</p>
              <button
                onClick={() => { setCategory(''); setStatus(''); setSearch(''); }}
                className="mt-4 btn-outline text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
