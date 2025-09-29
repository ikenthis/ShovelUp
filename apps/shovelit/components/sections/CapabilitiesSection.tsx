// components/sections/CapabilitiesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { CapabilityCard } from "@/types";
import { CAPABILITIES } from "@/constants/features";
import { cn } from "@/utils/cn";

interface CapabilitiesSectionProps {
  className?: string;
}

export const CapabilitiesSection = ({
  className,
}: CapabilitiesSectionProps) => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [selectedCapability, setSelectedCapability] =
    useState<CapabilityCard | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-capability-id");
            if (id) {
              setVisibleCards((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = document.querySelectorAll("[data-capability-card]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      className={cn("section-padding relative overflow-hidden", className)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-400/2 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/1 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCardComponent
              key={capability.id}
              capability={capability}
              index={index}
              isVisible={visibleCards.has(capability.id)}
              isHovered={hoveredCard === capability.id}
              onHover={() => setHoveredCard(capability.id)}
              onLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCapability(capability)}
            />
          ))}
        </div>

        {/* Modal for detailed capability view */}
        {selectedCapability && (
          <CapabilityModal
            capability={selectedCapability}
            onClose={() => setSelectedCapability(null)}
          />
        )}
      </div>
    </section>
  );
};

const SectionHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "text-center mb-20 transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
    >
      <div className="relative">
        <h2 className="text-4xl md:text-6xl font-light text-white mb-6 font-system">
          Our Capabilities
        </h2>
        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent blur-xl opacity-0 animate-pulse" />
      </div>
      <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
        Powerful tools designed to transform your construction workflow and
        elevate your project management experience
      </p>
      <div className="mt-8 w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full" />
    </div>
  );
};

interface CapabilityCardComponentProps {
  capability: CapabilityCard;
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const CapabilityCardComponent = ({
  capability,
  index,
  isVisible,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: CapabilityCardComponentProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <div
      data-capability-card
      data-capability-id={capability.id}
      className={cn(
        "group relative cursor-pointer",
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl",
        "border border-white/20 rounded-3xl p-8",
        "transition-all duration-700 ease-out",
        "hover:scale-105 hover:-translate-y-6",
        "hover:shadow-2xl hover:shadow-amber-400/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
        isHovered &&
          "border-amber-400/40 bg-gradient-to-br from-white/15 to-white/8"
      )}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Learn more about ${capability.title}`}
    >
      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-amber-400/10 to-amber-600/5 rounded-3xl opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100"
        )}
      />

      {/* Animated border */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 transition-all duration-500",
          isHovered && "opacity-100 animate-pulse"
        )}
      />

      <div className="relative z-10">
        {/* Icon Container */}
        <div className="relative mb-8">
          <div
            className={cn(
              "w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl",
              "flex items-center justify-center shadow-xl shadow-amber-400/30",
              "transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            )}
          >
            <span className="text-black text-3xl font-bold">
              {capability.icon}
            </span>
          </div>
          {/* Glow effect */}
          <div
            className={cn(
              "absolute -inset-4 bg-amber-400/20 rounded-full blur-xl opacity-0 transition-opacity duration-500",
              isHovered && "opacity-100"
            )}
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h3
            className={cn(
              "text-2xl font-semibold text-white transition-colors duration-300",
              "group-hover:text-amber-400"
            )}
          >
            {capability.title}
          </h3>

          <p className="text-gray-300 leading-relaxed text-lg">
            {capability.description}
          </p>

          {/* Features preview */}
          <div className="space-y-3">
            {capability.features.slice(0, 2).map((feature, featureIndex) => (
              <div
                key={feature}
                className={cn(
                  "flex items-center space-x-3 text-sm text-gray-400",
                  "transition-all duration-300",
                  isHovered && "text-amber-400"
                )}
                style={{
                  transitionDelay: `${isHovered ? featureIndex * 100 : 0}ms`,
                }}
              >
                <CheckIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            {capability.features.length > 2 && (
              <div className="text-xs text-gray-500 ml-7">
                +{capability.features.length - 2} more features
              </div>
            )}
          </div>

          {/* Learn More Link */}
          <div
            className={cn(
              "flex items-center text-amber-400 font-medium pt-4",
              "transition-all duration-300 group-hover:translate-x-2"
            )}
          >
            <span>Explore Feature</span>
            <ChevronRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 bg-amber-400 rounded-full opacity-0 transition-all duration-1000",
              isHovered && "opacity-30 animate-float"
            )}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface CapabilityModalProps {
  capability: CapabilityCard;
  onClose: () => void;
}

const CapabilityModal = ({ capability, onClose }: CapabilityModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    setTimeout(() => setIsVisible(true), 50);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4",
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative w-full max-w-4xl",
          "bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl",
          "border border-white/20 rounded-3xl overflow-hidden",
          "transition-all duration-500 ease-out",
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        )}
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 p-8 lg:p-12">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all duration-300 z-10 p-3 hover:bg-white/10 rounded-xl group"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-8 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-400/40">
                <span className="text-black text-4xl font-bold">
                  {capability.icon}
                </span>
              </div>
              <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-3">
                {capability.title}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </div>
          </div>

          <p className="text-gray-300 text-xl leading-relaxed mb-10">
            {capability.description}
          </p>

          {/* Features grid */}
          <div className="mb-10">
            <h4 className="text-2xl font-bold text-white mb-8 flex items-center">
              Key Features
              <div className="ml-4 w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {capability.features.map((feature, index) => (
                <div
                  key={feature}
                  className={cn(
                    "flex items-center space-x-4 p-6",
                    "bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10",
                    "hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300",
                    "group cursor-default"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isVisible
                      ? "fadeInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckIcon className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-400/30">
              Try This Feature
            </button>
            <button className="flex-1 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

export default CapabilitiesSection;