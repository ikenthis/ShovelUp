// types/index.ts
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CapabilityCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// Navigation types
export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink extends NavLink {
  icon: string;
  ariaLabel: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  company: string;
  projectSize: string;
  improvement: Record<string, string>;
}

// Platform preview types
export interface TimelineItem {
  task: string;
  status: 'completed' | 'in-progress' | 'planned' | 'scheduled';
  icon: string;
}

export interface ChatMessage {
  user: string;
  role: string;
  message: string;
  timestamp: string;
}

export interface ProjectMetrics {
  progress: number;
  budget: {
    used: string;
    total: string;
    percentage: number;
  };
  timeline: {
    remaining: string;
    onTrack: boolean;
  };
  team: {
    active: number;
    total: number;
  };
}

export interface PlatformPreview {
  header: {
    projectName: string;
    status: string;
    progress: number;
  };
  timeline: TimelineItem[];
  chat: ChatMessage[];
  metrics: ProjectMetrics;
}

// CTA types
export interface CTAButton {
  text: string;
  href: string;
}

export interface CTAContent {
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton: CTAButton;
  disclaimer: string;
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  url: string;
}

// Component prop types
export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export interface FeatureTabsProps {
  features: Feature[];
  activeFeature: number;
  onFeatureChange: (index: number) => void;
}

export interface FeatureDisplayProps {
  feature: Feature;
  className?: string;
}

export interface StatDisplayProps {
  stats: StatItem[];
  className?: string;
}

export interface CapabilityCardProps extends CapabilityCard {
  className?: string;
}

export interface TestimonialCardProps extends Testimonial {
  className?: string;
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface DemoRequest {
  name: string;
  email: string;
  company: string;
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  phone?: string;
  message?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  budget: {
    allocated: number;
    used: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    estimatedCompletion: string;
  };
  team: User[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Theme and styling types
export type ThemeVariant = 'light' | 'dark';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

// Utility types
export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event handler types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// Animation and interaction types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  loop?: boolean;
}

export interface InteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isLoading: boolean;
  isDisabled: boolean;
}

// Error handling types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// Layout types
export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveConfig<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Hook return types
export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}