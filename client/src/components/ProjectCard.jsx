// components/ProjectCard.jsx — Reusable card for displaying a project/campaign
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Leaf, Star, Baby, Home, HelpCircle } from 'lucide-react';

// Map category to icon and color
const categoryConfig = {
  'education': { icon: BookOpen, color: '#3B82F6', bg: '#DBEAFE', label: 'Education' },
  'health': { icon: Heart, color: '#EF4444', bg: '#FEE2E2', label: 'Health' },
  'environment': { icon: Leaf, color: '#10B981', bg: '#D1FAE5', label: 'Environment' },
  'women-empowerment': { icon: Star, color: '#8B5CF6', bg: '#EDE9FE', label: 'Women Empowerment' },
  'child-welfare': { icon: Baby, color: '#F59E0B', bg: '#FEF3C7', label: 'Child Welfare' },
  'rural-development': { icon: Home, color: '#D97706', bg: '#FDE68A', label: 'Rural Development' },
  'other': { icon: HelpCircle, color: '#6B7280', bg: '#F3F4F6', label: 'Other' },
};

/**
 * ProjectCard component.
 * Props:
 *  - project: object from the API (title, category, status, shortDescription, images)
 */
const ProjectCard = ({ project }) => {
  const { icon: CategoryIcon, color, bg, label } =
    categoryConfig[project.category] || categoryConfig['other'];

  const imageUrl = project.images?.[0]?.url ||
    `https://picsum.photos/seed/${project._id}/600/400`;

  return (
    <article className="card group" aria-labelledby={`project-title-${project._id}`}>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <span className={`badge ${project.status === 'ongoing' ? 'badge-ongoing' : 'badge-completed'}`}>
            {project.status === 'ongoing' ? '🟢 Ongoing' : '✅ Completed'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: bg, color }}
          >
            <CategoryIcon size={11} />
            {label}
          </span>
        </div>

        <h3
          id={`project-title-${project._id}`}
          className="font-heading text-lg font-semibold mb-2 line-clamp-2"
          style={{ color: 'var(--color-dark)' }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
          {project.shortDescription || project.description}
        </p>

        <Link
          to={`/projects/${project._id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group-hover:gap-2.5"
          style={{ color: 'var(--color-primary)' }}
          aria-label={`Learn more about ${project.title}`}
        >
          Learn More <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
