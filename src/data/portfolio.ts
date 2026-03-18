import type {
  PortfolioData,
  PersonalInfo,
  Project,
  Skill,
  Experience,
  Metric,
  ContactInfo,
} from '../types'

// ─────────────────────────────────────────────
// CONSTANTS — all hardcoded strings live here
// Update this section when details change
// ─────────────────────────────────────────────

const PERSONAL_DETAILS = {
  name: 'Puneet Tanwar',
  title: 'Frontend Developer',
  tagline: 'Turning complex business logic into seamless user experiences.',
  location: 'Jaipur, India',
  email: 'puneet.twr2@gmail.com',
  linkedin: 'https://linkedin.com/in/puneet-tanwar',
  github: 'https://github.com/puneet-tanwar', // placeholder
  resumeUrl: '/resume.pdf',                    // placeholder — add PDF to public/
  availability: 'Open to opportunities',
} as const

const ACCENT_COLORS = {
  cyan: '#00ffff',
  purple: '#8b5cf6',
  pink: '#ff007f',
  green: '#1D9E75',
} as const

const PLACEHOLDER_IMAGE = '/images/profile-placeholder.jpg' as const

// ─────────────────────────────────────────────
// PERSONAL
// ─────────────────────────────────────────────

const personal: PersonalInfo = {
  name: PERSONAL_DETAILS.name,
  title: PERSONAL_DETAILS.title,
  tagline: PERSONAL_DETAILS.tagline,
  bio:
    'Frontend Developer with 3+ years of experience building scalable, high-performance web applications for complex business domains including dispatch management, construction finance, and logistics platforms. Based in Jaipur, India, I specialise in architecting reusable component systems, optimising API performance, and resolving critical production issues — all while maintaining 85%+ test coverage.',
  valueProp:
    'I combine deep frontend expertise with full-stack awareness and strong business logic implementation skills. Capable of end-to-end feature ownership — from reusable UI component design to API optimisation and production issue resolution. Proven track record of delivering measurable impact while maintaining code quality and user experience excellence.',
  location: PERSONAL_DETAILS.location,
  email: PERSONAL_DETAILS.email,
  linkedin: PERSONAL_DETAILS.linkedin,
  github: PERSONAL_DETAILS.github,
  resumeUrl: PERSONAL_DETAILS.resumeUrl,
  availability: PERSONAL_DETAILS.availability,
}

// ─────────────────────────────────────────────
// PROJECTS
// 3 major projects — NGAT contains 2 key features
// ─────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 'ngat',
    title: 'NGAT',
    subtitle: 'Roll On Dispatch Platform',
    role: 'Frontend Lead',
    duration: 'July 2023 – March 2026',
    context:
      'Enterprise dispatch management platform supporting complex multi-customer workflows, location-based tracking, and invoicing systems. The platform handles roll-on dispatch operations requiring rigorous validation, real-time tracking, and multi-environment release management.',
    description:
      'Led frontend development of a large-scale dispatch management system, owning the UI architecture, testing infrastructure, and two major feature rollouts — Multi-Customer Shipment (MCS) and Geofencing. Drove a 30% workflow efficiency improvement and maintained 85%+ test coverage throughout.',
    highlights: [
      'Architected scalable, reusable UI component system using React and TypeScript',
      'Built confirmation flows and advanced validation logic across the platform',
      'Established testing automation infrastructure with Cypress and Jest achieving 85%+ coverage',
      'Resolved 10+ critical production bugs in multi-customer invoicing, email delivery, and broker fee systems',
      'Led geofencing system implementation across tenant settings, location modals, and coordinate validation',
      'Managed multiple DEV→TEST→MAIN release cycles with targeted cherry-picks',
      'Optimised API performance via segregated fetch operations, preventing timeouts on large datasets',
    ],
    techStack: [
      'React',
      'TypeScript',
      'Cypress',
      'Jest',
      'RESTful APIs',
      'Redux',
      'GPS/Geolocation APIs',
      'Feature Flags',
      'Git',
      'CI/CD',
    ],
    outcomes: [
      '+30% workflow efficiency improvement',
      '-20% reduction in UI errors through validation enhancements',
      '85%+ test coverage achievement',
      '-15% reduction in post-deployment defects',
      '10+ critical production bugs resolved',
      'Zero rollbacks across multiple release cycles',
    ],
    accentColor: ACCENT_COLORS.cyan,
    features: [
      {
        title: 'Multi-Customer Shipment (MCS) System',
        description:
          'A major feature within NGAT adding full support for multi-customer shipment scenarios with customer-specific invoicing, broker fee calculations, partial order management, and independent billing workflows.',
        highlights: [
          'Fixed email management in invoice modals for both single and multi-invoice flows',
          'Resolved broker fee visibility and calculation logic across all customer types',
          'Implemented invoice preview functionality for multiple customers simultaneously',
          'Fixed "Send Again" feature to correctly target selected customers',
          'Ensured correct customer names, bill-to info, and PO numbers on all invoices',
          'Designed and implemented partial orders UI from scratch',
          'Enhanced draft shipment table UI and search functionality',
          'Fixed button state management and cancel/discard support in build order flows',
          'Added descriptive tooltips for additional charges and deductions',
          'Integrated customer-wise broker fees into driver assignment API',
          'Removed tenant drivers from loadboard for MCS shipments',
          'Ensured customer-specific commodity assignment from the loadboard',
          'Implemented segregated API calls to prevent timeouts on large datasets',
        ],
        techStack: [
          'React',
          'TypeScript',
          'Redux',
          'REST APIs',
          'AG Grid',
          'Feature Flags',
          'Git (cherry-picks)',
        ],
        outcomes: [
          '10+ critical production bugs resolved, improving invoicing reliability',
          'Prevented API timeouts on large shipment datasets',
          'Improved UX through clearer button states, validation, and tooltips',
          'Successfully coordinated multiple release cycles with zero rollbacks',
        ],
      },
      {
        title: 'Geofencing System Implementation',
        description:
          'A location-based notification feature built within NGAT to automate delivery tracking and improve operational visibility. Implemented tenant-level radius defaults, location modal enhancements, and GPS coordinate validation.',
        highlights: [
          'Implemented default geofence radius settings at the tenant configuration level',
          'Enhanced location modal with geofencing fields for radius and notification triggers',
          'Enabled optional "Notify Within (Miles)" values for flexible pin drop configurations',
          'Fixed critical coordinate trimming and validation bugs causing production failures',
          'Standardised pickup and drop-off location labels platform-wide',
          'Integrated geofencing across all location selection interfaces in the dispatch flow',
        ],
        techStack: [
          'React',
          'TypeScript',
          'GPS/Geolocation APIs',
          'REST APIs',
          'Node.js',
        ],
        outcomes: [
          'Improved delivery tracking automation through geofencing notifications',
          'Enhanced operational visibility for dispatch and logistics teams',
          'Reduced manual configuration overhead via tenant-level defaults',
        ],
      },
    ],
  },
  {
    id: 'sekady',
    title: 'Sekady',
    subtitle: 'Construction Finance Platform',
    role: 'Full-Stack Feature Developer',
    duration: 'July 2023 – December 2025',
    context:
      'Financial management tool for construction projects requiring performance-sensitive features, real-time geo-information, and complex invoice management with bulk operation support.',
    description:
      'Engineered high-impact features for a construction finance SaaS platform — including a performant AG Grid invoice grouping module, Mapbox API integration for live project mapping, and backend API optimisations that delivered 15–25% faster response times.',
    highlights: [
      'Engineered invoice grouping module using AG Grid with bulk actions and custom cell renderers',
      'Integrated Mapbox API for real-time geo-information and interactive project maps',
      'Optimised critical backend API endpoints for data retrieval and reduced response times by 15–25%',
      'Built reusable component architecture reducing code duplication across invoice workflows',
      'Enabled bulk invoice processing, cutting manual steps by 40%',
    ],
    techStack: [
      'React',
      'TypeScript',
      'AG Grid',
      'Mapbox API',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
    ],
    outcomes: [
      '+15–25% improvement in API response times',
      '-40% reduction in manual processing steps via bulk invoice actions',
      'Enhanced UX with live location-based data for project management',
    ],
    accentColor: ACCENT_COLORS.purple,
  },
  {
    id: 'idla',
    title: 'IDLA',
    subtitle: 'Flutter Mobile App',
    role: 'Mobile UI Contributor',
    duration: '2023',
    context:
      'Cross-platform mobile application developed during the early career phase, exposing full-stack thinking in a mobile context.',
    description:
      'Contributed to a cross-platform Flutter mobile application, implementing screens, navigation logic, and state management while delivering mobile-specific UI enhancements.',
    highlights: [
      'Implemented multiple application screens with responsive mobile layouts',
      'Built navigation logic and route management across the app',
      'Integrated state management patterns for mobile data flows',
      'Delivered mobile-specific UI enhancements improving visual consistency',
    ],
    techStack: ['Flutter', 'Dart'],
    outcomes: [
      'Delivered fully functional mobile screens on schedule',
      'Broadened cross-platform development experience',
    ],
    accentColor: ACCENT_COLORS.pink,
  },
]

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────

const skills: Skill[] = [
  // Primary — largest constellation nodes
  { name: 'React', category: 'frontend', level: 'primary', description: 'Primary framework — 3+ years of production experience building scalable component systems' },
  { name: 'TypeScript', category: 'frontend', level: 'primary', description: 'Strictly typed throughout all projects; interfaces, generics, and utility types' },
  { name: 'JavaScript', category: 'frontend', level: 'primary', description: 'ES6+ — async/await, closures, prototypes, and performance patterns' },

  // Strong — medium nodes
  { name: 'Redux Toolkit', category: 'frontend', level: 'strong', description: 'Complex state management for multi-customer forms and dispatch workflows' },
  { name: 'React Query', category: 'frontend', level: 'strong', description: 'Server state management, caching, and optimistic updates' },
  { name: 'Node.js', category: 'backend', level: 'strong', description: 'RESTful API development and backend optimisation' },
  { name: 'Express.js', category: 'backend', level: 'strong', description: 'MVC architecture, JWT auth, and API endpoint design' },
  { name: 'MongoDB', category: 'backend', level: 'strong', description: 'Primary database — schema design and query optimisation' },
  { name: 'Cypress', category: 'testing', level: 'strong', description: 'End-to-end test automation; achieved 85%+ coverage on NGAT' },
  { name: 'Jest', category: 'testing', level: 'strong', description: 'Unit and integration testing across frontend and backend' },
  { name: 'React Testing Library', category: 'testing', level: 'strong', description: 'Component-level testing with a user-behaviour-first approach' },

  // Familiar — smaller nodes
  { name: 'Flutter', category: 'mobile', level: 'familiar', description: 'Cross-platform mobile UI contributor on the IDLA project' },
  { name: 'Socket.io', category: 'backend', level: 'familiar', description: 'Real-time bidirectional communication; improved user engagement by 25%' },
  { name: 'AG Grid', category: 'frontend', level: 'familiar', description: 'High-performance data grids with bulk actions and custom renderers (Sekady)' },
  { name: 'Mapbox API', category: 'tools', level: 'familiar', description: 'Real-time geo-information and interactive project maps (Sekady)' },
  { name: 'Firebase', category: 'backend', level: 'familiar', description: 'Cloud database and real-time data sync' },
  { name: 'MySQL', category: 'backend', level: 'familiar', description: 'Relational database design and SQL querying' },
  { name: 'Git', category: 'tools', level: 'familiar', description: 'Advanced usage — cherry-picks, branch management, multi-env release coordination' },
  { name: 'Jira', category: 'tools', level: 'familiar', description: 'Agile/Scrum sprint planning and issue tracking' },
  { name: 'Azure DevOps', category: 'tools', level: 'familiar', description: 'CI/CD pipeline management and project tracking' },
  { name: 'Postman', category: 'tools', level: 'familiar', description: 'API testing and documentation' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'familiar', description: 'Utility-first styling for rapid UI development' },
  { name: 'Bootstrap', category: 'frontend', level: 'familiar', description: 'Component-based responsive layout system' },
]

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────

const experience: Experience[] = [
  {
    company: 'In Time Tec',
    role: 'Software Engineer',
    duration: 'July 2023 – Present',
    location: PERSONAL_DETAILS.location,
    description:
      'Full-time software engineer contributing to multiple product platforms in the logistics and construction finance domains. Progressed from backend trainee to frontend lead, owning end-to-end feature delivery, testing automation, and production incident response.',
    platforms: [
      {
        platform: 'dm-web (Dispatch Management)',
        role: 'Frontend Developer',
        duration: 'January 2026 – Present',
        description:
          'React-based frontend for the active dispatch management web application, focused on multi-customer shipment, geofencing, and production stability.',
        contributions: [
          'Led end-to-end geofencing system implementation across tenant settings, location modals, and coordinate validation',
          'Resolved 10+ critical production bugs in multi-customer invoicing including email delivery, broker fees, and attachments',
          'Optimised API performance through segregated fetch operations, preventing timeouts on large datasets',
          'Enhanced multi-customer shipment workflows with partial orders UI, draft management, and customer-specific displays',
          'Managed multiple DEV→TEST→MAIN release cycles with targeted cherry-picks',
        ],
        impact: [
          'Improved delivery tracking automation through geofencing capabilities',
          'Ensured billing reliability and data integrity across multi-customer scenarios',
          'Reduced production incidents through rapid issue resolution',
          'Enhanced user experience in shipment creation and invoice management workflows',
        ],
        techStack: ['React', 'TypeScript', 'Redux', 'REST APIs', 'GPS/Geolocation APIs', 'Feature Flags', 'Git'],
      },
      {
        platform: 'NGAT (Roll On Dispatch)',
        role: 'Frontend Lead',
        duration: 'July 2023 – December 2025',
        description:
          'Dispatch management platform requiring complex UI workflows, reusable component architecture, validation systems, and a robust testing foundation.',
        contributions: [
          'Architected scalable UI components using React and TypeScript for long-term maintainability',
          'Built confirmation flows and advanced validation logic across the platform',
          'Established testing automation infrastructure with Cypress and Jest',
          'Led cross-functional collaboration on frontend architecture decisions',
          'Championed code review processes and version control best practices',
        ],
        impact: [
          '+30% workflow efficiency improvement',
          '-20% reduction in UI errors through validation enhancements',
          '85%+ test coverage achievement',
          '-15% reduction in post-deployment defects',
        ],
        techStack: ['React', 'TypeScript', 'Cypress', 'Jest', 'Agile/Scrum', 'CI/CD'],
      },
      {
        platform: 'Sekady (Construction Finance)',
        role: 'Full-Stack Feature Developer',
        duration: 'July 2023 – December 2025',
        description:
          'Financial management tool for construction projects requiring performance-sensitive UI features, real-time map data, and backend API optimisation.',
        contributions: [
          'Engineered invoice grouping feature using AG Grid with reusable component architecture and bulk actions',
          'Optimised critical API endpoints for data retrieval, cutting response times by 15–25%',
          'Integrated Mapbox API for real-time geo-information and interactive project mapping',
        ],
        impact: [
          '-40% reduction in manual processing steps through bulk invoice actions',
          '+15–25% improvement in API response times',
          'Enhanced UX with live location-based data for project management',
        ],
        techStack: ['React', 'TypeScript', 'AG Grid', 'Mapbox API', 'Node.js', 'MongoDB', 'Express.js'],
      },
    ],
  },
  {
    company: 'In Time Tec',
    role: 'Software Engineer Trainee',
    duration: 'January 2023 – June 2023',
    location: PERSONAL_DETAILS.location,
    description:
      'Focused on backend development and real-time feature implementation, building a strong foundation in API design, authentication, and testing that underpins all subsequent frontend work.',
    platforms: [
      {
        platform: 'Backend Development',
        role: 'Software Engineer Trainee',
        duration: 'January 2023 – June 2023',
        description:
          'Built secure RESTful APIs and implemented real-time communication features using Node.js, Express.js, and MongoDB.',
        contributions: [
          'Built secure RESTful APIs with Node.js, Express.js, and MongoDB using MVC architecture',
          'Implemented JWT-based authentication and authorisation',
          'Integrated Socket.io for real-time bidirectional communication',
          'Wrote unit and integration tests with Jest achieving 80%+ coverage',
        ],
        impact: [
          'Supported 10+ critical application endpoints',
          'Secured API access for sensitive operations',
          '+25% improvement in user engagement through real-time features',
          '80%+ code coverage achievement',
        ],
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Jest', 'MVC Architecture'],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// METRICS
// 6 key quantified achievements
// ─────────────────────────────────────────────

const metrics: Metric[] = [
  {
    id: 'workflow-efficiency',
    value: '+30%',
    label: 'Workflow Efficiency',
    description: 'Improved dispatch workflow efficiency through validation logic, confirmation flows, and reusable UI systems on the NGAT platform',
    project: 'NGAT',
    color: ACCENT_COLORS.cyan,
  },
  {
    id: 'test-coverage',
    value: '85%+',
    label: 'Test Coverage',
    description: 'Consistent frontend test coverage achieved using Cypress and Jest across the NGAT platform',
    project: 'NGAT',
    color: ACCENT_COLORS.purple,
  },
  {
    id: 'manual-processing',
    value: '-40%',
    label: 'Manual Processing',
    description: 'Reduced manual invoice processing steps by building bulk action capabilities with AG Grid on the Sekady platform',
    project: 'Sekady',
    color: ACCENT_COLORS.cyan,
  },
  {
    id: 'api-response-time',
    value: '+25%',
    label: 'API Response Time',
    description: 'Improved API response times by 15–25% through targeted backend optimisation and segregated fetch operations on Sekady',
    project: 'Sekady',
    color: ACCENT_COLORS.purple,
  },
  {
    id: 'critical-bugs-fixed',
    value: '10+',
    label: 'Critical Bugs Fixed',
    description: 'Resolved 10+ critical production bugs in the NGAT MCS feature covering invoicing, email delivery, broker fees, and API timeouts',
    project: 'NGAT MCS',
    color: ACCENT_COLORS.pink,
  },
  {
    id: 'ui-error-reduction',
    value: '-20%',
    label: 'UI Error Reduction',
    description: 'Reduced UI error rate by 20% through systematic validation logic enhancements and confirmation flow improvements across NGAT',
    project: 'NGAT',
    color: ACCENT_COLORS.green,
  },
]

// ─────────────────────────────────────────────
// CONTACT
// References PERSONAL_DETAILS — no string duplication
// ─────────────────────────────────────────────

const contact: ContactInfo = {
  email: PERSONAL_DETAILS.email,
  linkedin: PERSONAL_DETAILS.linkedin,
  github: PERSONAL_DETAILS.github,
  resumeUrl: PERSONAL_DETAILS.resumeUrl,
  location: PERSONAL_DETAILS.location,
}

// ─────────────────────────────────────────────
// NAMED EXPORT — single source of truth
// ─────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  personal,
  projects,
  skills,
  experience,
  metrics,
  contact,
}

// Convenience named exports
export { PERSONAL_DETAILS, ACCENT_COLORS, PLACEHOLDER_IMAGE }
