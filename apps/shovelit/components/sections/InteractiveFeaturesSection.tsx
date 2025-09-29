// components/sections/InteractiveFeaturesSection.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Feature } from '@/types';
import { HERO_FEATURES } from '@/constants/features';
import { cn } from '@/utils/cn';

interface InteractiveFeaturesSectionProps {
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const InteractiveFeaturesSection = ({ 
  className,
  autoplay = false,
  autoplayDelay = 5000 
}: InteractiveFeaturesSectionProps) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance features
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % HERO_FEATURES.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused]);

  // Handle feature change with animation
  const handleFeatureChange = useCallback((index: number) => {
    if (index === activeFeature || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFeature(index);
      setIsAnimating(false);
    }, 150);
  }, [activeFeature, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handleFeatureChange(activeFeature > 0 ? activeFeature - 1 : HERO_FEATURES.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleFeatureChange((activeFeature + 1) % HERO_FEATURES.length);
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFeature, handleFeatureChange, isPaused]);

  return (
    <section 
      className={cn(
        "py-20", 
        "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Why Construction Pros Choose ShovelUp!"
          description="Experience the perfect blend of social networking and project management, designed specifically for the construction industry."
        />
        
        {/* Stats moved here - positioned higher up */}
        <HeroStats />
        
        <FeatureTabs 
          features={HERO_FEATURES}
          activeFeature={activeFeature}
          onFeatureChange={handleFeatureChange}
          autoplay={autoplay}
          isPaused={isPaused}
          autoplayDelay={autoplayDelay}
        />
        
        <FeatureDisplay 
          feature={HERO_FEATURES[activeFeature]} 
          isAnimating={isAnimating}
        />

        {/* Navigation dots for mobile */}
        <NavigationDots
          total={HERO_FEATURES.length}
          active={activeFeature}
          onDotClick={handleFeatureChange}
        />

        {/* Keyboard shortcuts hint */}
        <KeyboardHints />
      </div>
    </section>
  );
};

// Hero Stats Component
const HeroStats = () => {
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStatsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const element = document.getElementById('hero-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Mock stats data - replace with your actual HERO_STATS
  const HERO_STATS = [
    { value: 50000, label: 'Active Users', suffix: '+' },
    { value: 98, label: 'Satisfaction', suffix: '%' },
    { value: 2500, label: 'Projects', suffix: '+' }
  ];

  const formatStatValue = (stat: any) => {
    if (stat.value >= 1000) {
      return `${(stat.value / 1000).toFixed(0)}K${stat.suffix || ''}`;
    }
    return `${stat.value}${stat.suffix || ''}`;
  };

  return (
    <div 
      id="hero-stats"
      className={cn(
        "grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16 -mt-8 transition-all duration-1000 delay-500",
        statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {HERO_STATS.map((stat, index) => (
        <StatItem
          key={stat.label}
          stat={stat}
          value={formatStatValue(stat)}
          delay={index * 100}
          inView={statsInView}
        />
      ))}
    </div>
  );
};

interface StatItemProps {
  stat: any;
  value: string;
  delay: number;
  inView: boolean;
}

const StatItem = ({ stat, value, delay, inView }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, stat.value, delay]);

  const displayValue = inView 
    ? `${count >= 1000 ? `${(count / 1000).toFixed(0)}K` : count}${stat.suffix || ''}`
    : '0';

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
        {displayValue}
      </div>
      <div className="text-gray-400 text-sm font-medium">
        {stat.label}
      </div>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const element = document.getElementById('features-header');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="features-header"
      className={cn(
        "text-center mb-12 transition-all duration-1000",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-system">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

interface FeatureTabsProps {
  features: Feature[];
  activeFeature: number;
  onFeatureChange: (index: number) => void;
  autoplay: boolean;
  isPaused: boolean;
  autoplayDelay: number;
}

const FeatureTabs = ({ 
  features, 
  activeFeature, 
  onFeatureChange,
  autoplay,
  isPaused,
  autoplayDelay
}: FeatureTabsProps) => (
  <div className="flex justify-center mb-8">
    <div className="flex flex-col lg:flex-row bg-slate-800/80 rounded-2xl lg:rounded-full p-1 gap-1 lg:gap-0 border border-slate-700/50">
      {features.map((feature, index) => (
        <FeatureTab
          key={feature.id}
          feature={feature}
          index={index}
          isActive={activeFeature === index}
          onClick={() => onFeatureChange(index)}
          autoplay={autoplay}
          isPaused={isPaused}
          autoplayDelay={autoplayDelay}
          isCurrentlyActive={activeFeature === index}
        />
      ))}
    </div>
  </div>
);

interface FeatureTabProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onClick: () => void;
  autoplay: boolean;
  isPaused: boolean;
  autoplayDelay: number;
  isCurrentlyActive: boolean;
}

const FeatureTab = ({ 
  feature, 
  isActive, 
  onClick,
  autoplay,
  isPaused,
  autoplayDelay,
  isCurrentlyActive
}: FeatureTabProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative px-4 py-3 lg:px-6 lg:py-3 rounded-xl lg:rounded-full transition-all duration-300 text-sm lg:text-base",
      "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800",
      isActive
        ? "bg-amber-400 text-black font-medium shadow-lg transform scale-105"
        : "text-gray-400 hover:text-white hover:bg-slate-700/50"
    )}
  >
    <span className="flex items-center gap-2">
      <span className="text-lg lg:text-xl">{feature.icon}</span>
      <span className="hidden lg:inline">{feature.title}</span>
      <span className="lg:hidden">{feature.title.split(' ')[0]}</span>
    </span>
    
    {/* Progress bar for autoplay */}
    {autoplay && isActive && !isPaused && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full overflow-hidden">
        <div 
          className="h-full bg-amber-300 animate-progress"
          style={{ animationDuration: `${autoplayDelay}ms` }}
        />
      </div>
    )}
  </button>
);

interface FeatureDisplayProps {
  feature: Feature;
  isAnimating: boolean;
}

const FeatureDisplay = ({ feature, isAnimating }: FeatureDisplayProps) => (
  <div className={cn(
    "max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/20 rounded-2xl p-8 mb-16 transition-all duration-300",
    "hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-400/10",
    isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
  )}>
    <div className="text-center">
      <div className={cn(
        "text-6xl mb-4 transition-all duration-500",
        isAnimating ? "animate-bounce" : ""
      )}>
        {feature.icon}
      </div>
      <h3 className="text-3xl font-light text-white mb-6 font-system">
        {feature.title}
      </h3>
      <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
        {feature.description}
      </p>
      
      {/* Feature benefits */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {getFeatureBenefits(feature.id).map((benefit, index) => (
          <div 
            key={benefit}
            className={cn(
              "bg-slate-900/70 rounded-lg p-4 transition-all duration-300",
              "hover:bg-slate-900/90 hover:scale-105"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-amber-400 text-sm font-medium">
              {benefit}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface NavigationDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

const NavigationDots = ({ total, active, onDotClick }: NavigationDotsProps) => (
  <div className="flex justify-center gap-2 lg:hidden">
    {Array.from({ length: total }, (_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          active === index 
            ? "bg-amber-400 w-8" 
            : "bg-gray-600 hover:bg-gray-500"
        )}
        aria-label={`Go to feature ${index + 1}`}
      />
    ))}
  </div>
);

const KeyboardHints = () => (
  <div className="hidden lg:block text-center mt-8">
    <p className="text-gray-500 text-sm">
      Use <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">←</kbd> 
      <kbd className="px-2 py-1 bg-slate-700 rounded text-xs mx-1">→</kbd> 
      to navigate • <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Space</kbd> to pause
    </p>
  </div>
);

// Helper function to get feature benefits
const getFeatureBenefits = (featureId: string): string[] => {
  const benefits: Record<string, string[]> = {
    'smart-hub': ['Real-time Updates', 'AI Predictions', 'Team Sync'],
    'professional-network': ['Verified Profiles', 'Skill Matching', 'Global Reach'],
    'live-collaboration': ['Instant Messaging', 'File Sharing', 'Video Calls']
  };
  
  return benefits[featureId] || ['Enhanced Workflow', 'Better Results', 'Time Savings'];
};

export default InteractiveFeaturesSection;