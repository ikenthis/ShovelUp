import { Feature, StatItem, CapabilityCard } from "@/types";

export const HERO_FEATURES: Feature[] = [
  {
    id: 'smart-hub',
    title: "Smart Project Hub",
    description: "AI-powered project management with real-time collaboration, automated progress tracking, and predictive analytics for construction timelines.",
    icon: "🏗️",
  },
  {
    id: 'professional-network',
    title: "Professional Network",
    description: "Connect with verified contractors, architects, and engineers. Build your reputation through skill endorsements and project showcases.",
    icon: "🤝",
  },
  {
    id: 'live-collaboration',
    title: "Live Team Collaboration",
    description: "Real-time messaging, file sharing, and video calls integrated directly into your project workspace. Never miss a beat.",
    icon: "💬",
  },
];

export const HERO_STATS: StatItem[] = [
  { value: "10K+", label: "Active Professionals" },
  { value: "2.5M+", label: "Projects Managed" },
  { value: "98%", label: "Success Rate" },
];

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: 'internal-team',
    icon: "🏢",
    title: "Internal Team Hub",
    description: "Centralized workspace for company teams with role-based access, skill tracking, and internal project coordination.",
    features: [
      "Employee skill matrices",
      "Internal project assignments",
      "Company-wide announcements",
      "Performance dashboards"
    ]
  },
  {
    id: 'ai-intelligence',
    icon: "🧠",
    title: "AI Project Intelligence",
    description: "Machine learning algorithms that predict delays, optimize resources, and suggest best practices based on historical data.",
    features: [
      "Predictive timeline analysis",
      "Risk assessment automation",
      "Resource optimization",
      "Cost overrun prevention"
    ]
  },
  {
    id: 'safety-compliance',
    icon: "🛡️",
    title: "Safety & Compliance",
    description: "Integrated safety protocols, compliance tracking, and automated reporting to keep projects safe and compliant.",
    features: [
      "Digital safety checklists",
      "Compliance documentation",
      "Incident reporting system",
      "Certification tracking"
    ]
  },
  {
    id: 'professional-network-ext',
    icon: "🌐",
    title: "Professional Network",
    description: "Connect with contractors, suppliers, and industry experts across the globe. Find talent, partnerships, and opportunities.",
    features: [
      "Verified professional profiles",
      "Skill-based matching",
      "Project collaboration invites",
      "Industry knowledge sharing"
    ]
  },
  {
    id: 'smart-integrations',
    icon: "🔗",
    title: "Smart Integrations",
    description: "Seamlessly connect with existing tools and systems your team already uses for maximum efficiency.",
    features: [
      "AutoCAD & BIM integration",
      "Accounting software sync",
      "Drone & IoT sensors",
      "Supply chain management"
    ]
  },
  {
    id: 'business-intelligence',
    icon: "📈",
    title: "Business Intelligence",
    description: "Deep insights into project performance, team productivity, and business growth opportunities.",
    features: [
      "Real-time project dashboards",
      "ROI tracking & analysis",
      "Team performance metrics",
      "Market trend insights"
    ]
  }
];

export const ADVANCED_FEATURES: Feature[] = [
  {
    id: 'ai-assistant',
    title: "AI Project Assistant",
    description: "Smart scheduling, risk prediction, and automated reporting powered by construction AI.",
    icon: "🤖",
  },
  {
    id: 'live-collaboration-adv',
    title: "Live Collaboration",
    description: "Real-time document editing, instant messaging, and video calls integrated in workflows.",
    icon: "⚡",
  },
  {
    id: 'mobile-first',
    title: "Mobile-First Design",
    description: "Full-featured mobile app for on-site project management and team communication.",
    icon: "📱",
  },
  {
    id: 'smart-analytics',
    title: "Smart Analytics",
    description: "Advanced project insights, performance metrics, and predictive cost analysis.",
    icon: "📊",
  },
];

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const FOOTER_LINKS = {
  platform: [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#mobile", label: "Mobile App" },
    { href: "#integrations", label: "Integrations" },
  ],
  company: [
    { href: "#about", label: "About Us" },
    { href: "#careers", label: "Careers" },
    { href: "#press", label: "Press" },
    { href: "#contact", label: "Contact" },
  ],
  support: [
    { href: "#help", label: "Help Center" },
    { href: "#docs", label: "Documentation" },
    { href: "#community", label: "Community" },
    { href: "#status", label: "Status" },
  ],
  legal: [
    { href: "#privacy", label: "Privacy Policy" },
    { href: "#terms", label: "Terms of Service" },
    { href: "#cookies", label: "Cookie Policy" },
  ]
};

export const SOCIAL_LINKS = [
  { 
    href: "mailto:hello@shovelup.com", 
    label: "Email",
    icon: "📧",
    ariaLabel: "Send us an email"
  },
  { 
    href: "https://linkedin.com/company/shovelup", 
    label: "LinkedIn",
    icon: "💼",
    ariaLabel: "Follow us on LinkedIn"
  },
  { 
    href: "https://twitter.com/shovelup", 
    label: "Twitter",
    icon: "🐦",
    ariaLabel: "Follow us on Twitter"
  },
];

export const TESTIMONIALS = [
  {
    id: 'martinez-construction',
    quote: "ShovelUp! transformed how our 500+ person construction company manages projects. We've seen 40% faster project delivery and 60% better team coordination.",
    author: "James Martinez",
    role: "CEO, Martinez Construction Group",
    avatar: "JM",
    company: "Martinez Construction Group",
    projectSize: "500+ employees",
    improvement: {
      delivery: "40% faster",
      coordination: "60% better"
    }
  },
  {
    id: 'urban-builders',
    quote: "The AI-powered insights have revolutionized our project planning. We now predict and prevent delays before they happen.",
    author: "Sarah Chen",
    role: "Project Director, Urban Builders Inc.",
    avatar: "SC",
    company: "Urban Builders Inc.",
    projectSize: "200+ employees",
    improvement: {
      prediction: "95% accuracy",
      delays: "30% reduction"
    }
  },
  {
    id: 'steelworks-pro',
    quote: "The professional networking feature connected us with top-tier contractors across the country. Our project success rate has never been higher.",
    author: "Michael Rodriguez",
    role: "Operations Manager, SteelWorks Pro",
    avatar: "MR",
    company: "SteelWorks Pro",
    projectSize: "150+ employees",
    improvement: {
      network: "500+ connections",
      success: "98% rate"
    }
  }
];

export const TRUSTED_COMPANIES = [
  "BuildCorp",
  "SteelWorks",
  "Urban Build", 
  "ProConstruct",
  "MegaProjects",
  "ConstructTech",
  "BuildMaster",
  "EliteContractors"
];

export const PLATFORM_PREVIEW = {
  header: {
    projectName: "Downtown Plaza Project",
    status: "In Progress",
    progress: 67
  },
  timeline: [
    { task: "Foundation Complete", status: "completed", icon: "✅" },
    { task: "Framing in Progress", status: "in-progress", icon: "🔄" },
    { task: "Electrical Planned", status: "planned", icon: "⏳" },
    { task: "Plumbing Scheduled", status: "scheduled", icon: "📅" },
  ],
  chat: [
    {
      user: "Mike Chen",
      role: "Site Manager",
      message: "Foundation inspection passed! 🎉",
      timestamp: "2 min ago"
    },
    {
      user: "Sarah Williams", 
      role: "Architect",
      message: "Updated blueprints uploaded",
      timestamp: "5 min ago"
    },
    {
      user: "Carlos Rivera",
      role: "Safety Inspector", 
      message: "All safety protocols verified",
      timestamp: "1 hour ago"
    }
  ],
  metrics: {
    progress: 67,
    budget: {
      used: "$847K",
      total: "$1.2M",
      percentage: 70.6
    },
    timeline: {
      remaining: "4 months",
      onTrack: true
    },
    team: {
      active: 24,
      total: 30
    }
  }
};

export const CTA_CONTENT = {
  title: "Ready to ShovelUp! Your Success?",
  description: "Join the fastest-growing construction community and transform how you build, connect, and manage projects. Your next big opportunity is just one connection away.",
  primaryButton: {
    text: "Start Free Trial",
    href: "/signup"
  },
  secondaryButton: {
    text: "Schedule Demo", 
    href: "/demo"
  },
  disclaimer: "No credit card required • 14-day free trial"
};

// SEO and metadata constants
export const SEO_CONFIG = {
  title: "ShovelUp! - The Future of Construction Management",
  description: "Revolutionary construction platform combining enterprise-grade project management with professional networking. Connect teams, streamline projects, and scale your business.",
  keywords: [
    "construction management",
    "project management",
    "construction software",
    "team collaboration",
    "construction networking",
    "AI construction tools"
  ],
  ogImage: "/images/shovelup-og-image.png",
  url: "https://shovelup.com"
};