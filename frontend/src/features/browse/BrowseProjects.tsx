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
  Bookmark,
  ChevronDown,
  ChevronRight,
  Code,
  Pill,
  Briefcase,
  FileText,
  Palette,
  Server
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
  subsection?: string;
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

export interface CategoryDefinition {
  id: string;
  name: string;
  icon: React.ElementType;
  subsections?: string[];
}

export const CATEGORIES_CONFIG: CategoryDefinition[] = [
  {
    id: 'engineering',
    name: 'Engineering projects',
    icon: Code,
    subsections: [
      'Web development',
      'AIML',
      'Cloud and devops',
      'IOT projects',
      'Data analytics projects'
    ]
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy thesis & projects',
    icon: Pill
  },
  {
    id: 'business',
    name: 'Business related project',
    icon: Briefcase
  },
  {
    id: 'research',
    name: 'Research paper publish',
    icon: FileText
  },
  {
    id: 'ui_ux',
    name: 'UI designing',
    icon: Palette
  },
  {
    id: 'deployment',
    name: 'Deployment Services',
    icon: Server
  }
];

export const PROJECT_CATALOG: ProjectItem[] = [
  // 1. Engineering Projects -> Web Development
  {
    id: 'PRJ-ENG-01',
    title: 'SaaS Analytics Dashboard & Client Portal',
    category: 'Engineering projects',
    subsection: 'Web development',
    tier: 'Tier 3 (MVP)',
    budget: 45000,
    rating: 4.9,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance React & Node.js B2B web application with multi-tenant authentication, real-time metrics, interactive telemetry, and Stripe billing.',
    tags: ['React', 'Node.js', 'Tailwind', 'TypeScript', 'PostgreSQL'],
    features: [
      'Interactive multi-tenant telemetry charts & CSV export',
      'Role-based access control (RBAC) with JWT auth',
      'Light/Dark mode responsive UI with Tailwind',
      'Strict TypeScript interfaces & unit test suite'
    ],
    deliverables: ['Production React & Node.js codebase', 'Figma design tokens', 'Component test suite', '15-Step Deployment checklist']
  },
  {
    id: 'PRJ-ENG-02',
    title: 'Modern FinTech Wallet & Mobile Web App',
    category: 'Engineering projects',
    subsection: 'Web development',
    tier: 'Tier 3 (MVP)',
    budget: 52000,
    rating: 4.9,
    deliveryTime: '3 Weeks',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'PWA & cross-platform financial portal with biometric login, UPI gateway deep linking, automated GST invoices, and live ledger.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    features: [
      'UPI deep-link & QR code payment gateway engine',
      'Immutable transactional audit log ledger',
      'Automated GST calculation and PDF receipt generator',
      'Fast responsive web app with zero-latency caching'
    ],
    deliverables: ['Full-stack repository', 'REST API documentation in OpenAPI 3.0', 'Database schema migrations', 'Verified milestone report']
  },

  // 1. Engineering Projects -> AIML
  {
    id: 'PRJ-ENG-03',
    title: 'Real-time Object Detection & Computer Vision',
    category: 'Engineering projects',
    subsection: 'AIML',
    tier: 'Tier 3 (MVP)',
    budget: 65000,
    rating: 5.0,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05388b7762?auto=format&fit=crop&w=800&q=80',
    description: 'Edge-optimized YOLOv8 + PyTorch inference server with WebRTC video stream annotations, bounding-box visualizer, and low-latency API.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    features: [
      'Sub-30ms TensorRT accelerated inference engine',
      'REST & WebSocket streaming endpoints for video streams',
      'Live bounding-box visualizer web app',
      'Automated GPU memory management & logging'
    ],
    deliverables: ['Trained model weights & quantization scripts', 'FastAPI backend service', 'React live preview client', 'Benchmark test reports']
  },
  {
    id: 'PRJ-ENG-04',
    title: 'Enterprise LLM RAG & Document AI Engine',
    category: 'Engineering projects',
    subsection: 'AIML',
    tier: 'Tier 4 (Enterprise)',
    budget: 85000,
    rating: 4.9,
    deliveryTime: '3 Weeks',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    description: 'Retrieval-Augmented Generation (RAG) system with ChromaDB vector search, hybrid chunking, source citation, and fine-tuned domain models.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    features: [
      'High-precision semantic vector search with re-ranking',
      'PDF, DOCX, and unstructured data ingestion pipeline',
      'Hallucination prevention guardrails & source citations',
      'Dockerized deployment ready for AWS or on-prem'
    ],
    deliverables: ['LangChain / LlamaIndex pipeline', 'Vector database configuration', 'Evaluation benchmark suite', 'Interactive chat UI client']
  },

  // 1. Engineering Projects -> Cloud and devops
  {
    id: 'PRJ-ENG-05',
    title: 'Multi-Tenant Kubernetes Platform & GitOps',
    category: 'Engineering projects',
    subsection: 'Cloud and devops',
    tier: 'Tier 4 (Enterprise)',
    budget: 95000,
    rating: 5.0,
    deliveryTime: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Production Kubernetes cluster deployment with automated Terraform IaC, ArgoCD GitOps, Istio service mesh, and Prometheus observability.',
    tags: ['Kubernetes', 'AWS', 'Docker', 'Node.js'],
    features: [
      'Zero-downtime blue/green & canary deployments',
      'Centralized Grafana & Prometheus telemetry metrics',
      'Strict AWS IAM least-privilege RBAC policies',
      'Automated TLS certificates & ingress controller setup'
    ],
    deliverables: ['Helm charts & Terraform infrastructure code', 'GitHub Actions CI/CD pipeline', 'Disaster recovery runbook', 'Security audit log']
  },

  // 1. Engineering Projects -> IOT projects
  {
    id: 'PRJ-ENG-06',
    title: 'Smart IoT Edge Telemetry & Sensor Gateway',
    category: 'Engineering projects',
    subsection: 'IOT projects',
    tier: 'Tier 3 (MVP)',
    budget: 48000,
    rating: 4.8,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Hardware edge IoT gateway connecting ESP32/Raspberry Pi sensors via MQTT, featuring real-time telemetry streaming and remote device management.',
    tags: ['Python', 'AWS', 'Docker', 'PostgreSQL'],
    features: [
      'Ultra-low power MQTT / WebSockets broker pipeline',
      'Time-series sensor telemetry logging & anomaly alerts',
      'Over-the-air (OTA) firmware upgrade mechanism',
      'Real-time IoT telemetry control dashboard'
    ],
    deliverables: ['Embedded C++ / MicroPython firmware code', 'AWS IoT Core / MQTT backend server', 'Real-time dashboard frontend', 'Hardware schematic guide']
  },

  // 1. Engineering Projects -> Data analytics projects
  {
    id: 'PRJ-ENG-07',
    title: 'Automated Real-Time ETL & Lakehouse Pipeline',
    category: 'Engineering projects',
    subsection: 'Data analytics projects',
    tier: 'Tier 4 (Enterprise)',
    budget: 80000,
    rating: 5.0,
    deliveryTime: '3 Weeks',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Scalable data pipeline processing 50GB+ daily metrics into a central PostgreSQL/Redshift warehouse with automated Airflow orchestration.',
    tags: ['Python', 'AWS', 'Docker', 'PostgreSQL'],
    features: [
      'Apache Airflow / Prefect DAG orchestration',
      'Data quality assertion with Great Expectations',
      'Automated schema migration & dead-letter queue replay',
      'Interactive executive KPI drill-down view'
    ],
    deliverables: ['Dockerized ETL repository', 'Terraform data lake templates', 'Data Dictionary & System Documentation', 'Pipeline monitoring dashboard']
  },

  // 2. Pharmacy thesis & projects
  {
    id: 'PRJ-PHARM-01',
    title: 'Molecular Docking & Pharmacokinetics Study',
    category: 'Pharmacy thesis & projects',
    tier: 'Tier 2 (Research)',
    budget: 38000,
    rating: 4.9,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    description: 'In-silico molecular docking, binding affinity simulation, ADMET profiling, and comprehensive pharmacokinetics thesis research report.',
    tags: ['Python', 'PostgreSQL'],
    features: [
      'AutoDock Vina / PyMOL receptor-ligand docking simulation',
      'ADMET pharmacokinetic property prediction & Lipinski rule checks',
      'High-resolution 3D ligand interaction visual charts',
      'Complete experimental methodology documentation'
    ],
    deliverables: ['Docking simulation log files & PDB coordinates', 'ADMET computational report', 'Thesis dissertation chapter draft', 'Statistical validation graphs']
  },
  {
    id: 'PRJ-PHARM-02',
    title: 'Nano-Formulation Drug Release Kinetics Modeling',
    category: 'Pharmacy thesis & projects',
    tier: 'Tier 3 (MVP)',
    budget: 42000,
    rating: 4.8,
    deliveryTime: '2 Weeks',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Controlled nano-carrier drug release kinetic analysis using Higuchi, Korsmeyer-Peppas, and zero-order mathematical curve-fitting models.',
    tags: ['Python'],
    features: [
      'Polymer nanoparticle dissolution rate curve regression',
      'Stability testing & zeta potential distribution analysis',
      'Automated regression charts with R-squared benchmarks',
      'Pharma industry standard thesis formatting'
    ],
    deliverables: ['Mathematical model scripts', 'Drug release kinetics comparative report', 'Statistical validation deck', 'Formatted thesis chapter']
  },

  // 3. Business related project
  {
    id: 'PRJ-BIZ-01',
    title: 'Predictive Revenue & Churn Intelligence Engine',
    category: 'Business related project',
    tier: 'Tier 2 (Research)',
    budget: 35000,
    rating: 4.8,
    deliveryTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'Predictive customer lifetime value (CLV), churn propensity modeling, and executive board-ready business intelligence dashboards.',
    tags: ['Python', 'PostgreSQL'],
    features: [
      'Cohort-based customer churn prediction with XGBoost',
      'Dynamic scenario modeling for pricing & unit economics',
      'Automated executive PDF summary generation',
      'Interactive executive KPI drill-down view'
    ],
    deliverables: ['Jupyter analysis notebooks', 'Production scoring script', 'Business feasibility methodology report', 'Executive presentation deck']
  },
  {
    id: 'PRJ-BIZ-02',
    title: 'B2B Market Expansion & Unit Economics Model',
    category: 'Business related project',
    tier: 'Tier 2 (Research)',
    budget: 30000,
    rating: 4.9,
    deliveryTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive financial forecasting model, TAM/SAM/SOM market sizing, competitor benchmarking, and investor pitch metrics deck.',
    tags: ['Python'],
    features: [
      '5-Year dynamic financial pro-forma statements',
      'Sensitivity analysis & burn rate projections',
      'Investor-ready unit economics valuation matrix',
      'Clean interactive visual dashboards'
    ],
    deliverables: ['Dynamic Financial Spreadsheet Model', 'Executive Market Research Report', 'Investor Pitch Valuation Deck', 'Executive Summary Memo']
  },

  // 4. Research paper publish
  {
    id: 'PRJ-RES-01',
    title: 'Scopus / IEEE Q1 Research Manuscript & Validation',
    category: 'Research paper publish',
    tier: 'Tier 2 (Research)',
    budget: 28000,
    rating: 5.0,
    deliveryTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    description: 'Complete research manuscript drafting in LaTeX with experimental benchmarking, ablation studies, baseline comparisons, and citation indexation.',
    tags: ['Python'],
    features: [
      'Strict IEEE / Springer / Elsevier double-column LaTeX template',
      'Empirical ablation study & statistical significance testing',
      'High-resolution vector charts & architecture diagrams',
      'Complete literature review & BibTeX bibliography'
    ],
    deliverables: ['Complete Overleaf/LaTeX source files', 'Compiled camera-ready PDF manuscript', 'Benchmark data & ablation tables', 'Peer review submission checklist']
  },
  {
    id: 'PRJ-RES-02',
    title: 'Systematic Literature Review & Meta-Analysis Framework',
    category: 'Research paper publish',
    tier: 'Tier 1 (Micro)',
    budget: 22000,
    rating: 4.8,
    deliveryTime: '1 Week',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    description: 'PRISMA-guided systematic review with bibliometric network mapping, risk of bias assessment, and multi-study synthesis.',
    tags: ['Python'],
    features: [
      'PRISMA flow diagram generation & study inclusion screening',
      'Co-occurrence & citation network bibliometric charts',
      'Structured comparative synthesis matrix',
      'Full journal publication formatting'
    ],
    deliverables: ['PRISMA systematic review manuscript', 'Bibliometric data extraction sheets', 'Journal submission cover letter', 'Publication compliance checklist']
  },

  // 5. UI designing
  {
    id: 'PRJ-UI-01',
    title: 'FinTech & Neo-Bank Design System in Figma',
    category: 'UI designing',
    tier: 'Tier 3 (MVP)',
    budget: 35000,
    rating: 4.9,
    deliveryTime: '10 Days',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'End-to-end Figma UI/UX design system with 60+ interactive mobile screens, dark/light theme tokens, micro-interactions, and component library.',
    tags: ['Tailwind', 'React'],
    features: [
      'Comprehensive atomic design system & color/typography tokens',
      '60+ pixel-perfect responsive iOS/Android Figma screens',
      'Interactive Figma prototypes with realistic micro-animations',
      'Developer handoff documentation & CSS token exports'
    ],
    deliverables: ['Figma master project link with full edit access', 'Design token JSON / Tailwind CSS config', 'Interactive prototype demo link', 'UX research persona document']
  },
  {
    id: 'PRJ-UI-02',
    title: 'B2B Enterprise SaaS Dark-Mode UI/UX Suite',
    category: 'UI designing',
    tier: 'Tier 2 (Research)',
    budget: 32000,
    rating: 5.0,
    deliveryTime: '1 Week',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek, futuristic dark-mode user interface designed for developer tools, telemetry dashboards, and cloud management consoles.',
    tags: ['Tailwind', 'React'],
    features: [
      'Glassmorphic dark-mode component architecture',
      'Telemetry charts, status pills, table filters & modal states',
      'Figma auto-layout with strict accessibility WCAG standards',
      'Tailwind CSS classes ready for direct developer integration'
    ],
    deliverables: ['Figma UI Kit & Design System', 'Tailwind component export code', 'Interactive prototype walkthrough', 'UX user flow diagrams']
  },

  // 6. Deployment Services
  {
    id: 'PRJ-DEP-01',
    title: 'Zero-Downtime AWS Cloud Migration & Security Hardening',
    category: 'Deployment Services',
    tier: 'Tier 2 (Research)',
    budget: 25000,
    rating: 5.0,
    deliveryTime: '5 Days',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Production infrastructure provisioning on AWS ECS/EC2 with SSL, NGINX reverse proxy, Cloudflare DDoS defense, and database auto-backups.',
    tags: ['AWS', 'Docker', 'PostgreSQL'],
    features: [
      'Automated SSL / TLS certificates via Let\'s Encrypt',
      'NGINX reverse proxy with rate limiting & gzip compression',
      'Automated daily PostgreSQL S3 encrypted backups',
      'CloudWatch monitoring & Telegram / Slack uptime alerts'
    ],
    deliverables: ['Docker-compose / ECS task definitions', 'NGINX hardened configuration files', 'Automated backup shell scripts', 'Server handover & credentials report']
  },
  {
    id: 'PRJ-DEP-02',
    title: 'Production CI/CD Automation & Docker Containerization',
    category: 'Deployment Services',
    tier: 'Tier 1 (Micro)',
    budget: 18000,
    rating: 4.9,
    deliveryTime: '3 Days',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    description: 'Fast automated GitHub Actions CI/CD pipeline with multi-stage Docker builds, staging preview environments, and production push triggers.',
    tags: ['Docker', 'AWS', 'Kubernetes'],
    features: [
      'Multi-stage Dockerfile optimization (sub-100MB production images)',
      'Automated test runner & linter verification on pull requests',
      'One-click rollback mechanism & secret management via GitHub Secrets',
      'Zero-downtime container rolling restart'
    ],
    deliverables: ['GitHub Actions .github/workflows YAML suite', 'Optimized multi-stage Dockerfiles', 'Deployment runbook & secrets guide', 'Live verification test report']
  }
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubsections, setSelectedSubsections] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['engineering']);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    if (initialSearch) {
      // Check if search matches a category name
      const matchedCat = CATEGORIES_CONFIG.find(
        c => c.name.toLowerCase() === initialSearch.toLowerCase()
      );
      if (matchedCat) {
        setSelectedCategories([matchedCat.name]);
      } else {
        setSearchQuery(initialSearch);
      }
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

  // Toggle Category Accordion
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // Toggle Main Category Filter
  const toggleCategory = (catName: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(catName);
      if (isSelected) {
        // If unchecking, also clear any subsections under this category if applicable
        const catDef = CATEGORIES_CONFIG.find(c => c.name === catName);
        if (catDef?.subsections) {
          setSelectedSubsections(sPrev => sPrev.filter(s => !catDef.subsections?.includes(s)));
        }
        return prev.filter(c => c !== catName);
      } else {
        return [...prev, catName];
      }
    });
  };

  // Toggle Subsection Filter
  const toggleSubsection = (subName: string, parentCatName: string) => {
    setSelectedSubsections(prev => {
      const isSelected = prev.includes(subName);
      if (isSelected) {
        return prev.filter(s => s !== subName);
      } else {
        // If selecting a subsection, also ensure the parent category is active or keep context
        if (!selectedCategories.includes(parentCatName)) {
          setSelectedCategories(cPrev => [...cPrev, parentCatName]);
        }
        return [...prev, subName];
      }
    });
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
    setSelectedSubsections([]);
    setSelectedTechs([]);
    setMinBudget('');
    setMaxBudget('');
    setSearchQuery('');
    showToast('Filters reset', 'info');
  };

  // Remove single active filter tag
  const removeCategoryTag = (cat: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== cat));
    const catDef = CATEGORIES_CONFIG.find(c => c.name === cat);
    if (catDef?.subsections) {
      setSelectedSubsections(prev => prev.filter(s => !catDef.subsections?.includes(s)));
    }
  };

  const removeSubsectionTag = (sub: string) => {
    setSelectedSubsections(prev => prev.filter(s => s !== sub));
  };

  const removeTechTag = (tech: string) => {
    setSelectedTechs(prev => prev.filter(t => t !== tech));
  };

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return PROJECT_CATALOG.filter(project => {
      // 1. Category and Subsection matching
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.includes(project.category);
        if (!matchesCategory) {
          return false;
        }

        // If subsections are also selected, check if this project matches selected subsections
        if (selectedSubsections.length > 0) {
          // If the project has a subsection, it must be in selectedSubsections
          if (project.subsection && !selectedSubsections.includes(project.subsection)) {
            return false;
          }
        }
      }

      // 2. Tech stack filter
      if (selectedTechs.length > 0 && !selectedTechs.some(t => project.tags.includes(t))) {
        return false;
      }

      // 3. Budget Min filter
      if (minBudget && project.budget < Number(minBudget)) {
        return false;
      }

      // 4. Budget Max filter
      if (maxBudget && project.budget > Number(maxBudget)) {
        return false;
      }

      // 5. Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesCategory = project.category.toLowerCase().includes(query);
        const matchesSubsection = project.subsection?.toLowerCase().includes(query) || false;
        const matchesTags = project.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesSubsection && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategories, selectedSubsections, selectedTechs, minBudget, maxBudget, searchQuery]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedSubsections.length > 0 || selectedTechs.length > 0 || minBudget !== '' || maxBudget !== '' || searchQuery !== '';

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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Mobile Filter Bar & Quick Toggles */}
        <div className="md:hidden mb-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className={`flex items-center gap-2 px-3.5 py-2 border rounded-xl text-xs font-bold transition-all ${
              isMobileFilterOpen || hasActiveFilters
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 text-gray-800 bg-gray-50 active:bg-gray-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>
              {isMobileFilterOpen ? 'Hide Filters' : hasActiveFilters ? `Filters (${selectedCategories.length + selectedSubsections.length + selectedTechs.length})` : 'Filter Projects'}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 font-semibold px-2 py-1 hover:underline"
              >
                Reset
              </button>
            )}
            <span className="text-xs text-gray-500 font-mono">
              {filteredProjects.length} found
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          
          {/* Sidebar Filters (Desktop & Collapsible Mobile) */}
          <aside className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-72 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 md:sticky md:top-28 shadow-sm`}>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-black font-headline">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-black font-semibold transition-colors"
                >
                  Reset All
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Project Categories with Engineering Subsections */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Categories & Subsections
                </h3>
                <div className="space-y-3">
                  {CATEGORIES_CONFIG.map(cat => {
                    const isChecked = selectedCategories.includes(cat.name);
                    const isExpanded = expandedCategories.includes(cat.id);
                    const hasSubsections = Boolean(cat.subsections && cat.subsections.length > 0);

                    return (
                      <div key={cat.id} className="border border-gray-100 rounded-xl p-2.5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <label className="flex items-center space-x-2.5 cursor-pointer select-none flex-grow">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCategory(cat.name)}
                              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                            />
                            <span className={`text-xs sm:text-sm transition-colors ${isChecked ? 'font-bold text-black' : 'text-gray-700 font-medium'}`}>
                              {cat.name}
                            </span>
                          </label>

                          {hasSubsections && (
                            <button
                              type="button"
                              onClick={() => toggleCategoryExpand(cat.id)}
                              className="p-1 text-gray-400 hover:text-black transition-colors rounded"
                              title="Toggle Subsections"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Subsections rendering (indented) */}
                        {hasSubsections && isExpanded && (
                          <div className="mt-2.5 pl-6 pt-2 border-t border-gray-200/60 space-y-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-gray-400 block mb-1">
                              Subsections:
                            </span>
                            {cat.subsections?.map(sub => {
                              const isSubChecked = selectedSubsections.includes(sub);
                              return (
                                <label 
                                  key={sub} 
                                  className="flex items-center space-x-2 cursor-pointer select-none group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSubChecked}
                                    onChange={() => toggleSubsection(sub, cat.name)}
                                    className="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                                  />
                                  <span className={`text-xs transition-colors ${isSubChecked ? 'font-bold text-black' : 'text-gray-600 group-hover:text-black'}`}>
                                    {sub}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
                  Tech Stack & Tools
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
                  placeholder="Search projects, subsections (AIML, Web, Cloud, IoT, Pharmacy, Research)..."
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
              {(selectedCategories.length > 0 || selectedSubsections.length > 0 || selectedTechs.length > 0 || minBudget || maxBudget) && (
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-xs font-semibold text-gray-500 mr-1">Active:</span>
                  
                  {selectedCategories.map(cat => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold border border-black"
                    >
                      {cat}
                      <button
                        onClick={() => removeCategoryTag(cat)}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}

                  {selectedSubsections.map(sub => (
                    <span
                      key={sub}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30"
                    >
                      Sub: {sub}
                      <button
                        onClick={() => removeSubsectionTag(sub)}
                        className="text-primary hover:text-red-500 transition-colors"
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
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center my-8 animate-scale-in">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 animate-float">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No project templates found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Try adjusting your search criteria, category filters, or subsection filters.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold rounded-lg transition-colors active:scale-95"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => onNavigate('submit')}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition-colors active:scale-95 shadow-md"
                  >
                    Submit Custom Scope
                  </button>
                </div>
              </div>
            ) : (
              /* Projects Grid (Bento/Card Style) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                  <article
                    key={project.id}
                    style={{ animationDelay: `${(idx % 6) * 60}ms` }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(124,58,237,0.12)] transition-all duration-300 flex flex-col group hover:-translate-y-1.5 border-hover glass-shine animate-fade-in-up"
                  >
                    {/* Thumbnail Image with Rating Badge & Bookmark */}
                    <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(project.id, project.title)}
                          className="bg-white/95 backdrop-blur-sm p-1.5 rounded-md text-black shadow-sm hover:bg-white transition-all active:scale-90"
                          title="Bookmark"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${
                            bookmarks.includes(project.id) ? 'fill-black text-black' : 'text-gray-600'
                          }`} />
                        </button>
                        <div className="bg-white/95 backdrop-blur-sm text-black px-2.5 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1 border border-gray-200 font-mono">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{project.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                              {project.category}
                            </span>
                            {project.subsection && (
                              <span className="text-xs font-bold text-primary flex items-center gap-1 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-radar-ping"></span>
                                {project.subsection}
                              </span>
                            )}
                          </div>
                          <span className="text-lg font-bold text-black font-headline">
                            {formatINR(project.budget)}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-black mb-2 line-clamp-1 group-hover:text-primary transition-colors font-headline">
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
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-md text-[11px] font-semibold font-mono hover:bg-gray-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full bg-white text-black border border-black font-semibold text-sm rounded-xl py-2.5 hover:bg-black hover:text-white transition-all duration-200 active:scale-95 shadow-sm flex items-center justify-center gap-1.5 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-glow"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-surface rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 p-5 sm:p-8 relative text-white animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all active:scale-90"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Header / Category / Price */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-zinc-400 uppercase mb-2">
              <span>{selectedProject.category}</span>
              {selectedProject.subsection && (
                <>
                  <span>•</span>
                  <span className="text-primary-light">{selectedProject.subsection}</span>
                </>
              )}
              <span>•</span>
              <span className="text-zinc-300">{selectedProject.tier}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-headline mb-3">
              {selectedProject.title}
            </h2>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-white font-headline">
                {formatINR(selectedProject.budget)}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-300 font-mono bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-zinc-400" /> Delivery: {selectedProject.deliveryTime}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {selectedProject.rating.toFixed(1)}
              </span>
            </div>

            {/* Image Preview */}
            <div className="h-44 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Tech Stack & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.tags.map(t => (
                  <span key={t} className="px-2.5 sm:px-3 py-1 bg-white/5 text-zinc-200 border border-white/10 rounded-lg text-xs font-mono font-semibold hover:border-primary/40 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Included Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200 bg-white/5 p-2.5 rounded-xl border border-white/5 hover:border-white/15 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6 sm:mb-8 bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2 text-primary-light font-bold text-xs">
                <Layers className="w-4 h-4 text-primary" />
                <span>Deliverables & Quality Assurance Guarantee</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                {selectedProject.deliverables.map((del, idx) => (
                  <li key={idx}>{del}</li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => handleOrderTemplate(selectedProject)}
                className="flex-1 py-3 sm:py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-glow hover-glow flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Order This Project Template</span>
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/10 hover:bg-white/15 text-zinc-200 rounded-xl font-semibold text-xs sm:text-sm transition-colors active:scale-95"
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
