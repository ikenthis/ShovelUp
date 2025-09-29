// components/sections/CTASection.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CTA_CONTENT } from '@/constants/features';
import { cn } from '@/utils/cn';

interface CTASectionProps {
  className?: string;
}

export const CTASection = ({ className }: CTASectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('cta-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrimaryAction = async () => {
    setIsLoading(true);
    try {
      router.push(CTA_CONTENT.primaryButton.href);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecondaryAction = () => {
    router.push(CTA_CONTENT.secondaryButton.href);
  };

  return (
    <section 
      id="cta-section"
      className={cn("section-padding bg-amber-400 relative overflow-hidden", className)}
    >
      {/* Background decorations */}
      <BackgroundDecorations />
      
      <div className="container relative z-10">
        <div className={cn(
          "text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Main heading */}
          <h2 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 font-system",
            "max-w-4xl mx-auto leading-tight"
          )}>
            {CTA_CONTENT.title}
          </h2>
          
          {/* Description */}
          <p className={cn(
            "text-xl md:text-2xl text-amber-900 mb-12 max-w-4xl mx-auto leading-relaxed",
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {CTA_CONTENT.description}
          </p>
          
          {/* Action buttons */}
          <div className={cn(
            "flex flex-col md:flex-row gap-6 justify-center items-center mb-8",
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <button
              onClick={handlePrimaryAction}
              disabled={isLoading}
              className={cn(
                "group relative px-12 py-4 bg-black text-amber-400 rounded-xl text-xl font-bold",
                "hover:bg-slate-800 transition-all duration-300 transform hover:scale-105",
                "shadow-2xl hover:shadow-3xl",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
                "flex items-center space-x-3"
              )}
            >
              {isLoading ? (
                <>
                  <LoadingIcon className="w-6 h-6 animate-spin" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <RocketIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>{CTA_CONTENT.primaryButton.text}</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleSecondaryAction}
              className={cn(
                "group px-12 py-4 border-2 border-black text-black rounded-xl text-xl font-semibold",
                "hover:bg-black/10 transition-all duration-300 transform hover:scale-105",
                "flex items-center space-x-3"
              )}
            >
              <CalendarIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>{CTA_CONTENT.secondaryButton.text}</span>
            </button>
          </div>
          
          {/* Disclaimer */}
          <p className={cn(
            "text-amber-800 font-medium text-lg",
            "transition-all duration-1000 delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {CTA_CONTENT.disclaimer}
          </p>

          {/* Additional features highlight */}
          <FeaturesHighlight />

          {/* Social proof */}
          <SocialProof />
        </div>
      </div>
    </section>
  );
};

const BackgroundDecorations = () => (
  <>
    {/* Geometric shapes */}
    <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-600/20 rounded-full blur-3xl" />
    
    {/* Construction-themed patterns */}
    <div className="absolute top-0 left-0 w-full h-full opacity-5">
      <div className="construction-grid w-full h-full" />
    </div>
    
    {/* Animated elements */}
    <div className="absolute top-1/4 right-20 animate-float">
      <div className="w-8 h-8 bg-amber-600 rounded rotate-45" />
    </div>
    <div className="absolute bottom-1/3 left-16 animate-float" style={{ animationDelay: '1s' }}>
      <div className="w-6 h-6 bg-amber-700 rounded-full" />
    </div>
  </>
);

const FeaturesHighlight = () => {
  const features = [
    { icon: '🚀', text: '14-day free trial' },
    { icon: '💳', text: 'No credit card required' },
    { icon: '🎯', text: 'Setup in under 5 minutes' },
    { icon: '🛡️', text: 'Enterprise-grade security' }
  ];

  return (
    <div className="mt-16 pt-12 border-t border-amber-600/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureItem 
            key={feature.text} 
            feature={feature} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

interface FeatureItemProps {
  feature: { icon: string; text: string };
  index: number;
}

const FeatureItem = ({ feature, index }: FeatureItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800 + (index * 150));
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn(
      "flex flex-col items-center text-center transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="text-3xl mb-3 transform hover:scale-110 transition-transform">
        {feature.icon}
      </div>
      <span className="text-amber-900 font-medium">
        {feature.text}
      </span>
    </div>
  );
};

// Social proof component
const SocialProof = () => {
  const proofItems = [
    '500+ companies signed up this month',
    '4.9/5 on industry reviews',
    '#1 Construction Management Platform 2024',
    'Trusted by Fortune 500 construction firms'
  ];

  return (
    <div className="mt-12 pt-8 border-t border-amber-600/30">
      <p className="text-amber-800 mb-6 font-medium">
        Join the construction revolution
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {proofItems.map((item, index) => (
          <SocialProofItem key={item} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

interface SocialProofItemProps {
  item: string;
  index: number;
}

const SocialProofItem = ({ item, index }: SocialProofItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200 + (index * 200));
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn(
      "bg-black/10 rounded-lg p-4 text-center transition-all duration-500",
      "hover:bg-black/15 hover:scale-105 cursor-default",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <span className="text-amber-900 font-medium text-sm">
        {item}
      </span>
    </div>
  );
};

// Urgency/Scarcity component (optional)
const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Example: 48 hours from now
    const endTime = new Date().getTime() + (48 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/10 rounded-xl p-6 mt-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-black mb-4">
          Limited Time: Early Access Pricing
        </h3>
        <div className="flex justify-center space-x-4 text-black">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>
        <p className="text-amber-800 mt-4">
          Save 50% on your first year with early access pricing
        </p>
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="text-center">
    <div className="bg-black text-amber-400 rounded-lg px-3 py-2 font-bold text-xl min-w-[50px]">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-sm font-medium mt-1">{label}</div>
  </div>
);

// Icon Components
const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LoadingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default CTASection;