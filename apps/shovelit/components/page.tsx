// app/page.tsx (Next.js 13+ App Router)
import { Suspense } from 'react';
import { Metadata } from 'next';
import { DesktopNavBar } from '@/components/navigation/desktopnavbar'; // Fixed: was 'desktopnavbar'
import { HeroSection } from '@/components/sections/HeroSection';
import { InteractiveFeaturesSection } from '@/components/sections/InteractiveFeaturesSection';
import { AdvancedFeaturesSection } from '@/components/sections/AdvancedFeaturesSection';
import { PlatformPreviewSection } from '@/components/sections/PlatformPreviewSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SEO_CONFIG } from '@/constants/features'; // Fixed: was '@/constanst/features'
import { cn, focusRing } from '@/utils/cn'; // Fixed: focusRing should be imported from utils/cn

// SEO Metadata (Next.js 13+ App Router)
export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  openGraph: {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.url,
    siteName: 'ShovelUp!',
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'ShovelUp! - The Future of Construction Management'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: SEO_CONFIG.url,
  }
};

interface HomepageProps {
  searchParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

// Skip to content for accessibility
const SkipToContent = () => (
  <a
    href="#main-content"
    className={cn(
      "sr-only focus:not-sr-only",
      "absolute top-4 left-4 z-50",
      "bg-amber-400 text-black px-4 py-2 rounded-md",
      "font-medium transition-all",
      focusRing()
    )}
  >
    Skip to main content
  </a>
);

// Header component
const Header = () => (
  <header className={cn(
    "bg-slate-900/90 backdrop-blur-sm",
    "border-b border-amber-400/20",
    "sticky top-0 z-50",
    "safe-top"
  )}>
    <DesktopNavBar transparent fixed />
  </header>
);

// Loading skeleton for sections
const SectionSkeleton = () => (
  <div className="section-padding">
    <div className="container">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-slate-700 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Analytics component for tracking
interface AnalyticsProps {
  searchParams?: HomepageProps['searchParams'];
}

const Analytics = ({ searchParams }: AnalyticsProps) => {
  // Track UTM parameters and page views
  // Implementation would depend on your analytics provider
  return null;
};

export default function Homepage({ searchParams }: HomepageProps) {
  return (
    <div className={cn(
      "min-h-screen bg-hero-gradient",
      "selection:bg-amber-400 selection:text-black"
    )}>
      <SkipToContent />
      <Header />
      
      <main id="main-content" role="main" className="relative">
        <Suspense fallback={<SectionSkeleton />}>
          <HeroSection showVideo />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <InteractiveFeaturesSection autoplay autoplayDelay={4000} />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <AdvancedFeaturesSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <PlatformPreviewSection id="platform-preview" />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CapabilitiesSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      
      <Footer />
      <ScrollToTop />
      <Analytics searchParams={searchParams} />
    </div>
  );
}

// Performance optimization: preload critical resources
export const preload = () => {
  if (typeof document !== 'undefined') {
    // Preload hero image
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://res.cloudinary.com/dylpmva1d/image/upload/v1756758523/SHUPUHD_xc4s1q.png';
    link.as = 'image';
    document.head.appendChild(link);
  }
};