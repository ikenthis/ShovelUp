// components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Fixed: capitalized Button
import { HERO_STATS } from "@/constants/features";
import { cn } from "@/utils/cn";
import type { StatItem } from "@/types/index";

interface HeroSectionProps {
  className?: string;
  showVideo?: boolean;
}

export const HeroSection = ({
  className,
  showVideo = false,
}: HeroSectionProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById("hero-stats");
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        "relative py-20 text-center text-white overflow-hidden min-h-screen flex items-center",
        className
      )}
    >
      <HeroBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent
            onVideoClick={() => setIsVideoPlaying(true)}
            showVideo={showVideo}
          />
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <VideoModal onClose={() => setIsVideoPlaying(false)} />
      )}
    </section>
  );
};

// Background positioned to match your original exactly
const HeroBackground = () => (
  <div className="absolute inset-0 z-0">
    <img
      src="https://res.cloudinary.com/dylpmva1d/image/upload/v1756758523/SHUPUHD_xc4s1q.png"
      alt="ShovelUp Background Illustration"
      className="w-full h-full object-cover opacity-80 translate-x-60"
      loading="lazy"
    />
    {/* Match your original gradient exactly */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/40 to-amber-900/40" />
  </div>
);

interface HeroContentProps {
  onVideoClick: () => void;
  showVideo: boolean;
}

const HeroContent = ({ onVideoClick, showVideo }: HeroContentProps) => (
  <div className="text-left lg:text-left">
    <HeroTitle />
    <HeroDescription />
    <HeroActions onVideoClick={onVideoClick} showVideo={showVideo} />
    <HeroStats />
  </div>
);

const HeroTitle = () => {
  const [titleInView, setTitleInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleInView(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className={cn(
        "text-4xl md:text-6xl lg:text-7xl font-light mb-6 bg-gradient-to-r from-white via-yellow-200 to-amber-400 bg-clip-text text-transparent font-system transition-all duration-1000",
        titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      Build. Connect. Succeed.
    </h1>
  );
};

const HeroDescription = () => {
  const [descriptionInView, setDescriptionInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDescriptionInView(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-1000 delay-200",
        descriptionInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
    >
      <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light">
        The Future of Construction Management
      </p>
      <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl">
        ShovelUp! revolutionizes construction workflows by combining
        enterprise-grade project management with professional networking.
        Connect teams, streamline projects, and scale your business.
      </p>
    </div>
  );
};

interface HeroActionsProps {
  onVideoClick: () => void;
  showVideo: boolean;
}

const HeroActions = ({ onVideoClick, showVideo }: HeroActionsProps) => {
  const [actionsInView, setActionsInView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setActionsInView(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.push("/signup");
  };

  const handleWatchDemo = () => {
    if (showVideo) {
      onVideoClick();
    } else {
      // Smooth scroll to demo section
      const demoSection = document.getElementById("platform-preview");
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 delay-300",
        actionsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Using regular buttons with exact styling from original */}
      <button
        onClick={handleGetStarted}
        className="px-10 py-4 bg-amber-400 text-black rounded-xl text-lg font-semibold hover:bg-amber-500 transition-all transform hover:scale-105 shadow-2xl -translate-y-3 translate-x-3"
      >
        Start Building Today
      </button>

      <button
        onClick={handleWatchDemo}
        className="px-10 py-4 border-2 border-amber-400 text-white rounded-xl text-lg font-semibold hover:bg-amber-400/10 transition-all -translate-y-3 translate-x-3"
      >
        Watch Demo
      </button>
    </div>
  );
};

const HeroStats = () => {
  const [statsInView, setStatsInView] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          // Animate numbers
          HERO_STATS.forEach((stat, index) => {
            setTimeout(() => {
              animateNumber(stat.value, stat.label);
            }, index * 200);
          });
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById("hero-stats");
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumber = (value: string, label: string) => {
    const numericValue = parseInt(value.replace(/[^\d]/g, ""));
    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }

      setAnimatedStats((prev) => ({
        ...prev,
        [label]: Math.floor(current),
      }));
    }, duration / steps);
  };

  const formatStatValue = (stat: StatItem) => {
    const animatedValue = animatedStats[stat.label];
    if (animatedValue !== undefined) {
      if (stat.value.includes("K+")) {
        return `${(animatedValue / 1000).toFixed(1)}K+`;
      } else if (stat.value.includes("M+")) {
        return `${(animatedValue / 1000000).toFixed(1)}M+`;
      } else if (stat.value.includes("%")) {
        return `${animatedValue}%`;
      }
      return animatedValue.toString();
    }
    return stat.value;
  };

  return (
    <div
      id="hero-stats"
      className={cn(
        "grid grid-cols-3 gap-8 max-w-lg transition-all duration-1000 delay-500 -mt-12",
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
  stat: StatItem;
  value: string;
  delay: number;
  inView: boolean;
}

const StatItem = ({ stat, value, delay, inView }: StatItemProps) => (
  <div
    className={cn(
      "text-center lg:text-center transition-all duration-700",
      inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-2">
      {value}
    </div>
    <div className="text-gray-300 text-sm lg:text-base">{stat.label}</div>
  </div>
);

// Video Modal Component
interface VideoModalProps {
  onClose: () => void;
}

const VideoModal = ({ onClose }: VideoModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
          aria-label="Close video"
        >
          <CloseIcon />
        </button>

        {/* Video placeholder - replace with actual video */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <PlayIcon className="w-16 h-16 mx-auto mb-4 text-amber-400" />
            <p className="text-xl">Demo Video Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const RocketIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const PlayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 10a2 2 0 112 2H6V10z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default HeroSection;
