// components/ui/ScrollToTop.tsx
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ScrollToTopProps {
  className?: string;
  threshold?: number;
  smooth?: boolean;
  showProgress?: boolean;
  variant?: 'default' | 'construction' | 'minimal';
}

export const ScrollToTop = ({ 
  className,
  threshold = 300,
  smooth = true,
  showProgress = false,
  variant = 'default'
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsVisible(scrollTop > threshold);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const variants = {
    default: {
      button: cn(
        "bg-amber-400 text-black hover:bg-amber-500",
        "shadow-lg hover:shadow-xl"
      ),
      progress: "stroke-amber-600"
    },
    construction: {
      button: cn(
        "bg-slate-800 text-amber-400 hover:bg-slate-700",
        "border-2 border-amber-400/30 hover:border-amber-400",
        "shadow-2xl hover:shadow-amber-400/20"
      ),
      progress: "stroke-amber-400"
    },
    minimal: {
      button: cn(
        "bg-white/90 text-slate-600 hover:bg-white",
        "shadow-md hover:shadow-lg backdrop-blur-sm"
      ),
      progress: "stroke-slate-600"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
    >
      <button
        onClick={scrollToTop}
        className={cn(
          "relative w-12 h-12 rounded-full transition-all duration-300",
          "transform hover:scale-110 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
          "flex items-center justify-center",
          currentVariant.button
        )}
        aria-label="Scroll to top"
      >
        {/* Progress circle */}
        {showProgress && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="stroke-current opacity-20"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={cn("transition-all duration-300", currentVariant.progress)}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${scrollProgress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        )}

        {/* Arrow icon */}
        <ArrowUpIcon className="w-5 h-5 relative z-10" />
      </button>
    </div>
  );
};

// Enhanced scroll to top with navigation dots
interface ScrollNavigationProps {
  sections: { id: string; label: string }[];
  className?: string;
}

export const ScrollNavigation = ({ sections, className }: ScrollNavigationProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 100);

      // Find active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element);

      const current = sectionElements.find(({ element }) => {
        const rect = element!.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        "fixed right-6 top-1/2 transform -translate-y-1/2 z-40",
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      <nav className="flex flex-col space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "group relative w-3 h-3 rounded-full transition-all duration-300",
              "hover:scale-125 focus:outline-none focus:scale-125",
              activeSection === section.id
                ? "bg-amber-400 scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            )}
            aria-label={`Go to ${section.label}`}
          >
            {/* Tooltip */}
            <span className={cn(
              "absolute right-6 top-1/2 transform -translate-y-1/2",
              "bg-slate-800 text-white text-xs py-1 px-2 rounded",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "pointer-events-none whitespace-nowrap"
            )}>
              {section.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Reading progress bar
export const ReadingProgress = ({ className }: { className?: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 bg-slate-200 z-50",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Floating action buttons group
interface FloatingActionsProps {
  className?: string;
  showScrollToTop?: boolean;
  showBackToTop?: boolean;
  customActions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export const FloatingActions = ({ 
  className,
  showScrollToTop = true,
  customActions = []
}: FloatingActionsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 flex flex-col-reverse space-y-reverse space-y-3",
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {/* Custom actions */}
      {customActions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={cn(
            "w-12 h-12 rounded-full shadow-lg transition-all duration-300",
            "transform hover:scale-110 active:scale-95",
            "flex items-center justify-center",
            "transition-all duration-300",
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            action.variant === 'primary'
              ? "bg-amber-400 text-black hover:bg-amber-500"
              : "bg-white text-slate-600 hover:bg-gray-50"
          )}
          style={{ transitionDelay: `${index * 50}ms` }}
          aria-label={action.label}
        >
          {action.icon}
        </button>
      ))}

      {/* Main scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={cn(
            "w-14 h-14 bg-amber-400 text-black rounded-full shadow-lg",
            "hover:bg-amber-500 transition-all duration-300",
            "transform hover:scale-110 active:scale-95",
            "flex items-center justify-center",
            "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// Arrow up icon
const ArrowUpIcon = ({ className }: { className?: string }) => (
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
      d="M5 15l7-7 7 7" 
    />
  </svg>
);

export default ScrollToTop;