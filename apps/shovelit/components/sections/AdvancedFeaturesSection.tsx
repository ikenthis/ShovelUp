// components/sections/AdvancedFeaturesSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Feature } from '@/types';
import { ADVANCED_FEATURES } from '@/constants/features';
import { cn } from '@/utils/cn';

interface AdvancedFeaturesSectionProps {
  className?: string;
}

export const AdvancedFeaturesSection = ({ className }: AdvancedFeaturesSectionProps) => {
  const [inViewItems, setInViewItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setInViewItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('[data-feature-card]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="advanced-features" 
      className={cn("section-padding relative", className)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-amber-900/40" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="Revolutionary Construction Tools"
          description="Experience cutting-edge technology designed specifically for the construction industry's unique challenges and workflows."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANCED_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isInView={inViewItems.has(index)}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Ready to revolutionize your construction workflow?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Explore All Features
            </button>
            <button className="btn-outline">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "text-center mb-16 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-system">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isInView: boolean;
  delay: number;
}

const FeatureCard = ({ feature, index, isInView, delay }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-feature-card
      data-index={index}
      className={cn(
        "card-feature group cursor-pointer",
        "transition-all duration-500",
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <span className="text-black text-2xl font-bold">
          {feature.icon}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-medium text-white mb-4 group-hover:text-amber-400 transition-colors">
        {feature.title}
      </h3>
      
      <p className="text-gray-300 leading-relaxed mb-6">
        {feature.description}
      </p>

      {/* Features list */}
      <div className="space-y-2">
        {getFeatureBenefits(feature.id).map((benefit, benefitIndex) => (
          <div 
            key={benefit}
            className={cn(
              "flex items-center text-sm text-gray-400",
              "transition-all duration-300",
              isHovered && "text-amber-400"
            )}
            style={{ 
              transitionDelay: `${isHovered ? benefitIndex * 100 : 0}ms` 
            }}
          >
            <CheckIcon className="w-4 h-4 mr-2 text-amber-400 flex-shrink-0" />
            {benefit}
          </div>
        ))}
      </div>

      {/* Hover overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 rounded-xl opacity-0 transition-opacity duration-300",
        isHovered && "opacity-100"
      )} />

      {/* Animated border */}
      <div className={cn(
        "absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 opacity-0 transition-opacity duration-300",
        "before:absolute before:inset-0.5 before:rounded-lg before:bg-slate-800",
        isHovered && "opacity-100"
      )} style={{ 
        background: isHovered 
          ? 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)' 
          : 'none'
      }} />
      
      {/* Content wrapper to stay above border */}
      <div className="relative z-10">
        {/* Content is already rendered above */}
      </div>
    </div>
  );
};

// Helper function to get feature benefits
const getFeatureBenefits = (featureId: string): string[] => {
  const benefits: Record<string, string[]> = {
    'ai-assistant': [
      'Smart scheduling optimization',
      'Risk prediction & alerts',
      'Automated progress reports'
    ],
    'live-collaboration-adv': [
      'Real-time document editing',
      'Instant team messaging',
      'HD video conferencing'
    ],
    'mobile-first': [
      'Offline functionality',
      'GPS location tracking',
      'Photo & file upload'
    ],
    'smart-analytics': [
      'Predictive cost analysis',
      'Performance benchmarks',
      'Custom dashboards'
    ]
  };
  
  return benefits[featureId] || [
    'Enhanced productivity',
    'Improved efficiency',
    'Better outcomes'
  ];
};

// Check icon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

export default AdvancedFeaturesSection;