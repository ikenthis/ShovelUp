// components/layout/Footer.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/constants/features';
import { cn } from '@/utils/cn';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className={cn(
      "relative overflow-hidden",
      className
    )}>
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-amber-900/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-amber-400/3 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/2 rounded-full blur-3xl" />
      
      {/* Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      
      <div className="relative z-10">
        <div className="container pt-20 pb-12">
          {/* Main footer content */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Company info */}
            <div className="lg:col-span-2">
              <CompanySection onNavigate={handleNavigation} />
            </div>

            {/* Navigation links */}
            <FooterSection
              title="Platform"
              links={FOOTER_LINKS.platform}
              onNavigate={handleNavigation}
            />

            <FooterSection
              title="Company"
              links={FOOTER_LINKS.company}
              onNavigate={handleNavigation}
            />

            <FooterSection
              title="Support"
              links={FOOTER_LINKS.support}
              onNavigate={handleNavigation}
            />
          </div>

          {/* Newsletter signup */}
          <NewsletterSection />

          {/* Security badges */}
          <SecurityBadges />

          {/* Bottom section */}
          <div className="border-t border-white/10 mt-16 pt-10">
            <BottomSection 
              currentYear={currentYear}
              onNavigate={handleNavigation}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface CompanySectionProps {
  onNavigate: (href: string) => void;
}

const CompanySection = ({ onNavigate }: CompanySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="transform hover:scale-105 transition-transform duration-300 inline-block">
        <Logo 
          className="mb-8" 
          onClick={() => onNavigate('/')}
        />
      </div>
      
      <p className="text-gray-300 text-lg mb-8 max-w-sm leading-relaxed">
        Empowering construction professionals to build better, connect smarter, and succeed faster with cutting-edge technology.
      </p>
      
      {/* Social links */}
      <div className="flex space-x-4 mb-10">
        {SOCIAL_LINKS.map((social, index) => (
          <SocialLink
            key={social.label}
            social={social}
            onNavigate={onNavigate}
            index={index}
          />
        ))}
      </div>

      {/* Contact info */}
      <div className="space-y-4 text-gray-300">
        <ContactItem
          icon={<MailIcon className="w-5 h-5 text-amber-400" />}
          text="hello@shovelup.com"
          delay={0}
        />
        <ContactItem
          icon={<PhoneIcon className="w-5 h-5 text-amber-400" />}
          text="+1 (555) 123-4567"
          delay={100}
        />
        <ContactItem
          icon={<LocationIcon className="w-5 h-5 text-amber-400" />}
          text="San Francisco, CA"
          delay={200}
        />
      </div>
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
  delay: number;
}

const ContactItem = ({ icon, text, delay }: ContactItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn(
      "flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-pointer",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
    )}>
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="group-hover:text-white transition-colors duration-300">{text}</span>
    </div>
  );
};

interface FooterSectionProps {
  title: string;
  links: Array<{ href: string; label: string }>;
  onNavigate: (href: string) => void;
}

const FooterSection = ({ title, links, onNavigate }: FooterSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <h5 className="text-white font-semibold text-xl mb-8 relative">
        {title}
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
      </h5>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={link.href}>
            <button
              onClick={() => onNavigate(link.href)}
              className={cn(
                "text-gray-400 hover:text-amber-400 transition-all duration-300 text-left group relative",
                "hover:translate-x-2 transform"
              )}
              style={{
                animationDelay: `${600 + index * 100}ms`,
                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -mx-2 -my-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SocialLinkProps {
  social: { href: string; label: string; icon: string; ariaLabel: string };
  onNavigate: (href: string) => void;
  index: number;
}

const SocialLink = ({ social, onNavigate, index }: SocialLinkProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      onClick={() => onNavigate(social.href)}
      className={cn(
        "w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl",
        "flex items-center justify-center transition-all duration-300 group relative overflow-hidden",
        "hover:bg-amber-400 hover:border-amber-400 hover:scale-110 hover:-translate-y-1",
        "transform hover:shadow-lg hover:shadow-amber-400/30",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      aria-label={social.ariaLabel}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-white group-hover:text-black transition-colors duration-300 text-xl relative z-10">
        {social.icon}
      </span>
    </button>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className={cn(
      "mt-20 pt-16 border-t border-white/10 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative">
          <h4 className="text-3xl font-light text-white mb-6 font-system">
            Stay Updated with ShovelUp!
          </h4>
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent blur-xl opacity-50" />
        </div>
        
        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          Get the latest construction industry insights, product updates, and exclusive tips delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 outline-none"
              disabled={status === 'loading'}
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={cn(
              "px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500",
              "hover:from-amber-500 hover:to-amber-600 text-black rounded-2xl font-semibold",
              "transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/30",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "flex items-center justify-center space-x-3 min-w-[140px]"
            )}
          >
            {status === 'loading' ? (
              <>
                <LoadingSpinner />
                <span>Subscribing...</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </form>
        
        {message && (
          <div className={cn(
            "p-4 rounded-xl backdrop-blur-sm border transition-all duration-300",
            status === 'success' 
              ? "text-green-400 bg-green-400/10 border-green-400/30" 
              : "text-red-400 bg-red-400/10 border-red-400/30"
          )}>
            {message}
          </div>
        )}
        
        <p className="text-gray-500 text-sm mt-6">
          No spam, ever. Unsubscribe anytime with one click.
        </p>
      </div>
    </div>
  );
};

const SecurityBadges = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "mt-16 pt-12 border-t border-white/10 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <p className="text-center text-gray-500 text-sm mb-8">
        Trusted & Secure Platform
      </p>
      <div className="flex justify-center items-center flex-wrap gap-6">
        {['SOC 2', 'GDPR', 'ISO 27001', 'SSL'].map((badge, index) => (
          <SecurityBadge key={badge} text={badge} index={index} />
        ))}
      </div>
    </div>
  );
};

const SecurityBadge = ({ text, index }: { text: string; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1400 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl text-sm text-gray-400",
      "border border-white/10 hover:border-amber-400/30 hover:bg-white/10",
      "transition-all duration-300 transform hover:scale-105",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      {text}
    </div>
  );
};

interface BottomSectionProps {
  currentYear: number;
  onNavigate: (href: string) => void;
}

const BottomSection = ({ currentYear, onNavigate }: BottomSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "flex flex-col lg:flex-row justify-between items-center text-gray-400 transition-all duration-1000",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
        <p className="text-center sm:text-left">&copy; {currentYear} ShovelUp! All rights reserved.</p>
        <div className="flex items-center space-x-2 text-sm">
          <span>Made with</span>
          <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
          <span>for construction professionals</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center lg:justify-end space-x-8 text-sm">
        {FOOTER_LINKS.legal.map((link, index) => (
          <button
            key={link.href}
            onClick={() => onNavigate(link.href)}
            className="hover:text-amber-400 transition-colors duration-300 hover:underline underline-offset-4"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Icon components
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
);

export default Footer;