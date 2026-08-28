import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  X, 
  Star, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { formatINR } from '../../utils/gst';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';

interface BrowseProjectsProps {
  onNavigate: (tab: NavTab) => void;
  initialSearch?: string;
  onSelectProject?: (project: ProjectItem) => void;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tier: string;
  budget: number;
  rating: number;
  deliveryTime: string;
  image: string;
  description: string;
  tags: string[];
  features: string[];
  deliverables: string[];
}

export const PROJECT_CATALOG: ProjectItem[] = [
  {
    id: 'PRJ-01',
    title: 'SaaS Dashboard Revamp',
    category: 'Web Development',
    tier: 'Tier 3 (MVP)',
    budget: 45000,
    rating: 4.9,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Redesigning the core analytics dashboard for a high-traffic B2B application with interactive graphs and real-time metrics.',
    tags: ['React', 'Tailwind', 'TypeScript', 'Recharts'],
    features: [
      'Interactive multi-tenant telemetry charts',
      'Dynamic filtering & CSV export pipelines',
      'Light/Dark theme with responsive layout',
      'Strict TypeScript interfaces & clean code standard'
    ],
    deliverables: ['Production React codebase', 'Figma design tokens', 'Component test suite', '15-Step Deployment checklist']
  },
  {
    id: 'PRJ-02',
    title: 'Automated ETL Pipeline',
    category: 'Engineering',
    tier: 'Tier 4 (Enterprise)',
    budget: 80000,
    rating: 5.0,
    deliveryTime: '3 Weeks',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Build a robust data pipeline processing 50GB+ daily metrics into a central warehouse with zero-downtime fault tolerance.',
    tags: ['Python', 'AWS', 'Docker', 'PostgreSQL'],
    features: [
      'Apache Airflow / Prefect DAG orchestration',
      'Data quality assertion with Great Expectations',
      'Automated schema migration & DLQ replay',
      'AWS S3 + Redshift/PostgreSQL data lake ingestion'
    ],
    deliverables: ['Dockerized ETL repository', 'IaC Terraform templates', 'Data Dictionary & UGC Documentation', 'Pipeline monitoring dashboard']
  },
  {
    id: 'PRJ-03',
    title: 'Real-time Object Detection & AI Vision',
    category: 'AI & Machine Learning',
    tier: 'Tier 3 (MVP)',
    budget: 65000,
    rating: 4.9,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05388b7762?auto=format&fit=crop&w=800&q=80',
    description: 'Edge-optimized YOLOv8 inference server with low-latency WebRTC streams, video annotations, and analytics logging.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    features: [
      'Sub-30ms inference pipeline with TensorRT acceleration',
      'REST & WebSocket streaming endpoints',
      'Live bounding-box visualizer web app',
      'Automated GPU memory management'
    ],
    deliverables: ['Trained model weights & quantization scripts', 'FastAPI backend service', 'React live preview client', 'Benchmark test reports']
  },
  {
    id: 'PRJ-04',
    title: 'Business Analytics & Predictive Modeling',
    category: 'Business Analytics',
    tier: 'Tier 2 (Research)',
    budget: 35000,
    rating: 4.8,
    deliveryTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Predictive customer churn and revenue forecasting models with automated reporting and executive KPI dashboards.',
    tags: ['Python', 'Pandas', 'Scikit-Learn', 'Node.js'],
    features: [
      'Feature engineering pipeline for tabular datasets',
      'XGBoost & Random Forest model benchmarking',
      'Automated monthly PDF report generation',
      'Interactive executive KPI drill-down view'
    ],
    deliverables: ['Jupyter analysis notebooks', 'Production scoring script', 'UGC compliant methodology report', 'Executive presentation deck']
  },
  {
    id: 'PRJ-05',
    title: 'Multi-Tenant Cloud Microservices Platform',
    category: 'Cloud & DevOps',
    tier: 'Tier 4 (Enterprise)',
    budget: 95000,
    rating: 5.0,
    deliveryTime: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Complete Kubernetes-orchestrated microservices cluster with automated CI/CD, Istio service mesh, and Prometheus observability.',
    tags: ['Kubernetes', 'AWS', 'Docker', 'Node.js'],
    features: [
      'Zero-downtime blue/green deployment strategy',
      'Centralized Grafana/Prometheus telemetry alerts',
      'Strict RBAC & AWS IAM least-privilege security',
      'Automated TLS certificate renewal via Let\'s Encrypt'
    ],
    deliverables: ['Helm charts & Kubernetes manifests', 'GitHub Actions workflow pipeline', 'Disaster recovery runbook', 'Security audit log']
  },
  {
    id: 'PRJ-06',
    title: 'Cross-Platform React Native FinTech App',
    category: 'Web Development',
    tier: 'Tier 3 (MVP)',
    budget: 52000,
    rating: 4.9,
    deliveryTime: '3 Weeks',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Modern mobile wallet and micro-investment application with biometric authentication, UPI deep linking, and real-time ledger.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    features: [
      'Biometric FaceID / Fingerprint authorization',
      'UPI deep-link & QR code transaction engine',
      'Immutable transactional audit ledger',
      'Instant push notifications via Firebase FCM'
    ],
    deliverables: ['React Native / Expo codebase', 'Node.js transaction service', 'API documentation in OpenAPI 3.0', 'UGC Academic validation deck']
  }
];

const ALL_CATEGORIES = [
  'Engineering',
  'Web Development',
  'Business Analytics',
  'AI & Machine Learning',
  'Cloud & DevOps'
];

const ALL_TECH_STACKS = [
  'React',
  'Python',
  'Node.js',
  'AWS',
  'Tailwind',
  'Docker',
  'PostgreSQL',
  'TypeScript',
  'Kubernetes',
  'PyTorch'
];

export const BrowseProjects: React.FC<BrowseProjectsProps> = ({ 
  onNavigate, 
  initialSearch = '',
  onSelectProject
}) => {
  const { showToast } = useToast();

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Web Development']);
  const [selectedTechs, setSelectedTechs] = useState<string[]>(['React']);
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Toggle Bookmark
  const toggleBookmark = (id: string, title: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed "${title}" from bookmarks`, 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast(`Saved "${title}" to bookmarks`, 'success');
        return [...prev, id];
      }
    });
  };

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Tech Stack
  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTechs([]);
    setMinBudget('');
    setMaxBudget('');
    setSearchQuery('');
    showToast('Filters reset', 'info');
  };

  // Remove single active filter tag
  const removeCategoryTag = (cat: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== cat));
  };

  const removeTechTag = (tech: string) => {
    setSelectedTechs(prev => prev.filter(t => t !== tech));
  };

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return PROJECT_CATALOG.filter(project => {
      // Category filter (if none selected, match all)
      if (selectedCategories.length > 0 && !selectedCategories.includes(project.category)) {
        return false;
      }

      // Tech stack filter (if any selected, project must match at least one)
      if (selectedTechs.length > 0 && !selectedTechs.some(t => project.tags.includes(t))) {
        return false;
      }

      // Budget Min filter
      if (minBudget && project.budget < Number(minBudget)) {
        return false;
      }

      // Budget Max filter
      if (maxBudget && project.budget > Number(maxBudget)) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesCategory = project.category.toLowerCase().includes(query);
        const matchesTags = project.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategories, selectedTechs, minBudget, maxBudget, searchQuery]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTechs.length > 0 || minBudget !== '' || maxBudget !== '' || searchQuery !== '';

  const handleOrderTemplate = (project: ProjectItem) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
    showToast(`Template "${project.title}" loaded for custom requirement`, 'success');
    setSelectedProject(null);
    onNavigate('submit');
  };

  return (
    <div className="w-full bg-white min-h-[calc(100vh-80px)] pb-16">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-800 bg-gray-50 active:bg-gray-100"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs text-gray-500 font-mono">
            {filteredProjects.length} projects found
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar Filters (Desktop & Collapsible Mobile) */}
          <aside className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-6 md:sticky md:top-28 shadow-sm`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black font-headline">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-black font-semibold transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-2.5">
                  {ALL_CATEGORIES.map(cat => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <label 
                        key={cat} 
                        className="flex items-center space-x-2.5 cursor-pointer group select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                        />
                        <span className={`text-sm transition-colors ${isChecked ? 'font-semibold text-black' : 'text-gray-700 group-hover:text-black'}`}>
                          {cat}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Budget Range (INR)
                </h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    placeholder="Min"
                    className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  />
                  <span className="text-gray-400 font-bold">-</span>
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="Max"
                    className="w-full h-11 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ALL_TECH_STACKS.map(tech => {
                    const isSelected = selectedTechs.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={`w-full mt-6 h-11 rounded-xl text-xs font-bold tracking-wide transition-all ${
                hasActiveFilters
                  ? 'bg-gray-100 text-black hover:bg-gray-200 active:scale-95'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Clear Filters
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow flex flex-col w-full">
            
            {/* Search & Active Filters Header */}
            <div className="mb-6 flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, skills, or categories..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 shadow-sm text-base text-gray-900 bg-white placeholder:text-gray-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Active Filter Chips */}
              {(selectedCategories.length > 0 || selectedTechs.length > 0 || minBudget || maxBudget) && (
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-xs font-semibold text-gray-500 mr-1">Active:</span>
                  
                  {selectedCategories.map(cat => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold border border-gray-200"
                    >
                      {cat}
                      <button
                        onClick={() => removeCategoryTag(cat)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  {selectedTechs.map(tech => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold border border-gray-200"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechTag(tech)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  {(minBudget || maxBudget) && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold border border-gray-200">
                      ₹{minBudget || '0'} - ₹{maxBudget || '∞'}
                      <button
                        onClick={() => { setMinBudget(''); setMaxBudget(''); }}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 hover:underline font-semibold ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center my-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No project templates found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Try adjusting your search criteria, category filters, or tech stack filters.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold rounded-lg transition-colors"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => onNavigate('submit')}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Submit Custom Scope
                  </button>
                </div>
              </div>
            ) : (
              /* Projects Grid (Bento/Card Style) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group border-hover"
                  >
                    {/* Thumbnail Image with Rating Badge & Bookmark */}
                    <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(project.id, project.title)}
                          className="bg-white/95 backdrop-blur-sm p-1.5 rounded-md text-black shadow-sm hover:bg-white transition-colors"
                          title="Bookmark"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${
                            bookmarks.includes(project.id) ? 'fill-black text-black' : 'text-gray-600'
                          }`} />
                        </button>
                        <div className="bg-white/95 backdrop-blur-sm text-black px-2.5 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1 border border-gray-200 font-mono">
                          <Star className="w-3.5 h-3.5 fill-black text-black" />
                          <span>{project.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <span className="text-xs font-bold text-black tracking-wide">
                            {project.category}
                          </span>
                          <span className="text-lg font-bold text-black font-headline">
                            {formatINR(project.budget)}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-black mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors font-headline">
                          {project.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech stack tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-md text-[11px] font-semibold font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full bg-white text-black border border-black font-semibold text-sm rounded-xl py-2.5 hover:bg-black hover:text-white transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Category / Price */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-500 uppercase mb-2">
              <span>{selectedProject.category}</span>
              <span>•</span>
              <span className="text-blue-600">{selectedProject.tier}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-black font-headline mb-3">
              {selectedProject.title}
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-black font-headline">
                {formatINR(selectedProject.budget)}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" /> Delivery: {selectedProject.deliveryTime}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-black bg-yellow-100/70 border border-yellow-200 px-2.5 py-1 rounded-full font-mono">
                <Star className="w-3 h-3 fill-black text-black" /> {selectedProject.rating.toFixed(1)}
              </span>
            </div>

            {/* Image Preview */}
            <div className="h-56 rounded-2xl overflow-hidden mb-6 border border-gray-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-gray-100 text-black border border-gray-200 rounded-lg text-xs font-mono font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Included Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-bold text-xs">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Deliverables & UGC 2018 Compliance Guarantee</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                {selectedProject.deliverables.map((del, idx) => (
                  <li key={idx}>{del}</li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleOrderTemplate(selectedProject)}
                className="flex-1 py-3.5 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Order This Project Template</span>
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
