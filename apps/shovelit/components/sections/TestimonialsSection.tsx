// components/sections/TestimonialsSection.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Testimonial } from '@/types/index';
import { TESTIMONIALS, TRUSTED_COMPANIES } from '@/constants/features';
import { cn } from '@/utils/cn';

interface TestimonialsSectionProps {
  className?: string;
}

export const TestimonialsSection = ({ className }: TestimonialsSectionProps) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setDirection('next');
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused]);

  const handleTestimonialChange = (index: number) => {
    setDirection(index > activeTestimonial ? 'next' : 'prev');
    setActiveTestimonial(index);
  };

  const handlePrevious = () => {
    setDirection('prev');
    setActiveTestimonial(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setDirection('next');
    setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section 
      id="testimonials" 
      className={cn("section-padding relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-amber-900/40" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-400/3 rounded-full blur-2xl" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="Trusted by Industry Leaders"
          description="See what construction professionals are saying about ShovelUp! and how we're transforming their projects."
        />

        {/* Main testimonial display */}
        <TestimonialCarousel 
          testimonials={TESTIMONIALS}
          activeIndex={activeTestimonial}
          onTestimonialChange={handleTestimonialChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          direction={direction}
        />

        {/* Trusted companies */}
        <TrustedCompanies companies={TRUSTED_COMPANIES} />

        {/* Stats section */}
        <TestimonialStats />
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
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "text-center mb-20 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <h2 className="text-4xl md:text-6xl font-light text-white mb-6 font-system">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  activeIndex: number;
  onTestimonialChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  direction: 'next' | 'prev';
}

const TestimonialCarousel = ({ 
  testimonials, 
  activeIndex, 
  onTestimonialChange,
  onPrevious,
  onNext,
  direction
}: TestimonialCarouselProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={cn(
      "max-w-7xl mx-auto mb-24 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      {/* Main testimonial container */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl">
          <TestimonialCard 
            testimonial={testimonials[activeIndex]} 
            isActive={true}
            direction={direction}
          />
        </div>
        
        {/* Enhanced navigation arrows */}
        <button
          onClick={onPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-white/20"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
        </button>
        
        <button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-white/20"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
        </button>
      </div>

      {/* Enhanced navigation dots */}
      <div className="flex justify-center mt-10 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => onTestimonialChange(index)}
            className={cn(
              "h-3 rounded-full transition-all duration-500 relative overflow-hidden",
              index === activeIndex 
                ? "bg-amber-400 w-12 shadow-lg shadow-amber-400/30" 
                : "bg-gray-600 hover:bg-gray-500 w-3"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            {index === activeIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced thumbnail testimonials */}
      <div className="hidden xl:flex justify-center space-x-6 mt-16">
        {testimonials.map((testimonial, index) => (
          <TestimonialThumbnail
            key={testimonial.id}
            testimonial={testimonial}
            isActive={index === activeIndex}
            onClick={() => onTestimonialChange(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  direction: 'next' | 'prev';
}

const TestimonialCard = ({ testimonial, isActive, direction }: TestimonialCardProps) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [testimonial.id]);

  return (
    <div 
      key={animationKey}
      className={cn(
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden",
        "transition-all duration-700 ease-out",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-400/5 to-transparent rounded-full blur-2xl" />
      
      <div className="relative z-10">
        {/* Enhanced quote section */}
        <div className="mb-12">
          <div className="relative">
            <QuoteIcon className="w-16 h-16 text-amber-400 mx-auto mb-8 drop-shadow-lg" />
            <div className="absolute -inset-4 bg-amber-400/10 rounded-full blur-xl" />
          </div>
          <blockquote className="text-2xl lg:text-4xl font-light text-white leading-relaxed font-system max-w-4xl mx-auto">
            <span className="relative">
              "{testimonial.quote}"
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent opacity-0 animate-pulse" />
            </span>
          </blockquote>
        </div>

        {/* Enhanced author info */}
        <div className="flex items-center justify-center space-x-6 mb-12">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-400/30">
              <span className="text-black font-bold text-2xl">
                {testimonial.avatar}
              </span>
            </div>
            <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-lg animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-xl mb-1">
              {testimonial.author}
            </div>
            <div className="text-gray-300 text-lg mb-1">
              {testimonial.role}
            </div>
            <div className="text-amber-400 font-medium">
              {testimonial.company}
            </div>
          </div>
        </div>

        {/* Enhanced metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <MetricCard
            value={testimonial.projectSize}
            label="Team Size"
            icon="👥"
            delay={0}
          />
          {Object.entries(testimonial.improvement).map(([key, value], index) => (
            <MetricCard
              key={key}
              value={value}
              label={key.replace(/([A-Z])/g, ' $1').trim()}
              icon={getMetricIcon(key)}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  value: string;
  label: string;
  icon: string;
  delay: number;
}

const MetricCard = ({ value, label, icon, delay }: MetricCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn(
      "text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 group",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
        {value}
      </div>
      <div className="text-gray-400 text-sm font-medium capitalize">
        {label}
      </div>
    </div>
  );
};

const getMetricIcon = (key: string): string => {
  const icons: Record<string, string> = {
    'efficiency': '⚡',
    'timeReduction': '⏱️',
    'costSavings': '💰',
    'productivity': '📈',
    'quality': '⭐',
    'satisfaction': '😊'
  };
  return icons[key] || '📊';
};

interface TestimonialThumbnailProps {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const TestimonialThumbnail = ({ 
  testimonial, 
  isActive, 
  onClick,
  index 
}: TestimonialThumbnailProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-4 p-5 rounded-2xl transition-all duration-500 group relative overflow-hidden",
        "hover:scale-105 transform",
        isActive 
          ? "bg-white/15 backdrop-blur-lg border border-amber-400/40 shadow-lg shadow-amber-400/20" 
          : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent" />
      )}
      
      <div className="relative z-10 flex items-center space-x-4">
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
          isActive 
            ? "bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-400/30" 
            : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-amber-400 group-hover:to-amber-500"
        )}>
          <span className="text-black font-bold text-lg">
            {testimonial.avatar}
          </span>
        </div>
        <div className="text-left">
          <div className={cn(
            "font-semibold text-sm transition-colors",
            isActive ? "text-white" : "text-gray-300 group-hover:text-white"
          )}>
            {testimonial.author}
          </div>
          <div className="text-gray-400 text-xs">
            {testimonial.company}
          </div>
        </div>
      </div>
    </button>
  );
};

interface TrustedCompaniesProps {
  companies: string[];
}

const TrustedCompanies = ({ companies }: TrustedCompaniesProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "mb-24 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="text-center mb-12">
        <p className="text-gray-400 mb-4 text-lg">
          Trusted by leading construction companies worldwide
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <CompanyCard key={company} company={company} index={index} />
        ))}
      </div>
    </div>
  );
};

interface CompanyCardProps {
  company: string;
  index: number;
}

const CompanyCard = ({ company, index }: CompanyCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center relative overflow-hidden group",
        "hover:border-amber-400/30 hover:bg-white/10 transition-all duration-500",
        "transform hover:scale-105 hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent" />
      )}
      <div className="relative z-10">
        <div className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
          {company}
        </div>
        <div className="mt-3 w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-600 group-hover:from-amber-400 group-hover:to-amber-500 mx-auto rounded-full transition-all duration-300" />
      </div>
    </div>
  );
};

const TestimonialStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '500+', label: 'Happy Customers', icon: '😊', color: 'from-green-400 to-green-500' },
    { value: '98%', label: 'Satisfaction Rate', icon: '⭐', color: 'from-yellow-400 to-yellow-500' },
    { value: '2.5M+', label: 'Projects Completed', icon: '🏗️', color: 'from-blue-400 to-blue-500' },
    { value: '45%', label: 'Average Time Saved', icon: '⏱️', color: 'from-purple-400 to-purple-500' }
  ];

  return (
    <div className={cn(
      "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12 relative overflow-hidden",
      "transition-all duration-1000",
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    )}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-400/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-light text-white mb-4 font-system">
            The Numbers Speak for Themselves
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  stat: {
    value: string;
    label: string;
    icon: string;
    color: string;
  };
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn(
      "text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-700 group relative overflow-hidden",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {stat.icon}
        </div>
        <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 mb-3 group-hover:scale-105 transition-transform duration-300">
          {stat.value}
        </div>
        <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

// Icon Components
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default TestimonialsSection;