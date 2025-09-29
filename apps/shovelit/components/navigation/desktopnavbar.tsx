// components/navigation/DesktopNavBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/button';
import { clsx } from 'clsx';
import { NavLink } from '@/types';

const NAV_LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

interface DesktopNavBarProps {
  className?: string;
  transparent?: boolean;
  fixed?: boolean;
}

export const DesktopNavBar = ({ 
  className,
  transparent = false,
  fixed = true
}: DesktopNavBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    if (fixed) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [fixed]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
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
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const navbarClasses = clsx(
    'transition-all duration-500 ease-out relative',
    fixed && 'sticky top-0 z-50',
    {
      'bg-slate-900/90 backdrop-blur-xl border-b border-amber-400/30 shadow-xl shadow-black/20': 
        (isScrolled && fixed) || !transparent,
      'bg-transparent border-b border-transparent': 
        !isScrolled && fixed && transparent,
    },
    className
  );

  return (
    <header className={navbarClasses}>
      {/* Animated background glow */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-amber-900/10 to-slate-900/20 opacity-50" />
      )}
      
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        {/* Enhanced Logo */}
        <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
          <Logo 
            href="/"
            onClick={() => router.push('/')}
            className="relative"
          />
        </div>

        {/* Enhanced Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          {NAV_LINKS.map(({ href, label }, index) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              isActive={activeSection === href || (pathname === href)}
              isHovered={hoveredLink === href}
              onClick={() => scrollToSection(href)}
              onHover={() => setHoveredLink(href)}
              onLeave={() => setHoveredLink(null)}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignIn}
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 px-6 py-2 rounded-xl font-medium"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            onClick={handleGetStarted}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-400/30"
          >
            Let's Shovel!
          </Button>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <div className="lg:hidden">
          <IconButton
            icon={<MenuIcon isOpen={isMobileMenuOpen} />}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-mobile-menu
            className="w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-300"
          />
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            links={NAV_LINKS}
            activeSection={activeSection}
            onItemClick={scrollToSection}
            onSignIn={handleSignIn}
            onGetStarted={handleGetStarted}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};

// Enhanced Navigation Item Component
interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}

const NavItem = ({ 
  href, 
  label, 
  isActive, 
  isHovered, 
  onClick, 
  onHover, 
  onLeave,
  index 
}: NavItemProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={clsx(
        'relative px-3 py-2 text-sm font-medium transition-all duration-300 group',
        'focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg',
        'transform hover:scale-110 hover:-translate-y-1',
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        {
          'text-amber-400': isActive,
          'text-gray-300 hover:text-white': !isActive,
        }
      )}
    >
      {/* Text with enhanced spacing */}
      <span className="relative z-10 tracking-wide">{label}</span>
      
      {/* Active indicator line */}
      <div className={clsx(
        'absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-400 rounded-full transition-all duration-300',
        isActive ? 'w-8' : 'w-0 group-hover:w-6'
      )} />
      
      {/* Hover glow effect */}
      <div className={clsx(
        'absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 via-amber-400/20 to-amber-400/10 opacity-0 transition-all duration-300 blur-sm',
        isHovered && 'opacity-100'
      )} />
      
      {/* Floating particles on hover */}
      {isHovered && (
        <>
          <div className="absolute -top-2 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-float opacity-60" />
          <div className="absolute -top-1 right-1/4 w-0.5 h-0.5 bg-amber-400 rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }} />
        </>
      )}
    </button>
  );
};

// Enhanced Mobile Menu Component
interface MobileMenuProps {
  links: NavLink[];
  activeSection: string;
  onItemClick: (href: string) => void;
  onSignIn: () => void;
  onGetStarted: () => void;
  onClose: () => void;
}

const MobileMenu = ({ 
  links, 
  activeSection,
  onItemClick, 
  onSignIn, 
  onGetStarted, 
  onClose 
}: MobileMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className={clsx(
          "absolute top-full right-0 w-80 max-w-[90vw]",
          "bg-slate-900/95 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl lg:hidden z-50",
          "transition-all duration-300 ease-out",
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4"
        )}
        data-mobile-menu
      >
        <div className="p-3">
          {/* Navigation Links */}
          <div className="space-y-1 mb-3">
            {links.map(({ href, label }, index) => (
              <button
                key={href}
                onClick={() => onItemClick(href)}
                className={clsx(
                  "block w-full text-left px-3 py-2 rounded-xl transition-all duration-300 group",
                  "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/50",
                  activeSection === href 
                    ? "text-amber-400 bg-amber-400/10" 
                    : "text-gray-300 hover:text-white"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isVisible ? 'slideInRight 0.4s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{label}</span>
                  {activeSection === href && (
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-700">
            <Button
              variant="ghost"
              fullWidth
              onClick={onSignIn}
              className="text-gray-300 hover:text-white hover:bg-white/10 justify-start rounded-xl py-3 transition-all duration-300"
            >
              Sign In
            </Button>
            <Button
              fullWidth
              onClick={onGetStarted}
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-xl py-3 transition-all duration-300 transform hover:scale-105"
            >
              Let's Shovel!
            </Button>
          </div>
        </div>
        
        {/* Decorative glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-2xl blur-lg opacity-30 -z-10" />
      </div>
    </>
  );
};

// Enhanced Animated Menu Icon
interface MenuIconProps {
  isOpen: boolean;
}

const MenuIcon = ({ isOpen }: MenuIconProps) => (
  <div className="w-6 h-6 flex flex-col justify-center items-center relative">
    <span
      className={clsx(
        'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-full',
        isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1.5'
      )}
    />
    <span
      className={clsx(
        'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-full my-1',
        isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
      )}
    />
    <span
      className={clsx(
        'bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-full',
        isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1.5'
      )}
    />
    
    {/* Glow effect */}
    <div className={clsx(
      'absolute inset-0 bg-amber-400/20 rounded-full blur-md opacity-0 transition-opacity duration-300',
      isOpen && 'opacity-100'
    )} />
  </div>
);

export default DesktopNavBar;