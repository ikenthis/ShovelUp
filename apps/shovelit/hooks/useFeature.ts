// hooks/useFeatures.ts
import { useState, useCallback, useEffect, useRef } from 'react';
import { Feature } from '@/types';

interface UseFeaturesOptions {
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  pauseOnHover?: boolean;
  enableKeyboardNavigation?: boolean;
}

interface UseFeaturesReturn {
  activeFeature: Feature;
  activeIndex: number;
  setActiveFeature: (index: number) => void;
  nextFeature: () => void;
  previousFeature: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  isFirst: boolean;
  isLast: boolean;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
  reset: () => void;
  progress: number;
}

export const useFeatures = (
  features: Feature[],
  options: UseFeaturesOptions = {}
): UseFeaturesReturn => {
  const {
    autoplay = false,
    autoplayDelay = 5000,
    loop = true,
    pauseOnHover = false,
    enableKeyboardNavigation = true
  } = options;

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoplay);
  const [progress, setProgress] = useState(0);

  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Validation
  if (!features || features.length === 0) {
    throw new Error('useFeatures requires a non-empty array of features');
  }

  // Core navigation functions
  const setActiveFeature = useCallback((index: number) => {
    if (index >= 0 && index < features.length) {
      setActiveIndex(index);
      setProgress(0);
      pausedTimeRef.current = 0;
    }
  }, [features.length]);

  const nextFeature = useCallback(() => {
    if (!loop && activeIndex === features.length - 1) return;
    setActiveIndex((current) => (current + 1) % features.length);
    setProgress(0);
    pausedTimeRef.current = 0;
  }, [features.length, loop, activeIndex]);

  const previousFeature = useCallback(() => {
    if (!loop && activeIndex === 0) return;
    setActiveIndex((current) => 
      current === 0 ? features.length - 1 : current - 1
    );
    setProgress(0);
    pausedTimeRef.current = 0;
  }, [features.length, loop, activeIndex]);

  const goToFirst = useCallback(() => {
    setActiveFeature(0);
  }, [setActiveFeature]);

  const goToLast = useCallback(() => {
    setActiveFeature(features.length - 1);
  }, [setActiveFeature, features.length]);

  // Playback controls
  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (autoplay) {
      setIsPaused(false);
    }
  }, [autoplay]);

  const toggle = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  const reset = useCallback(() => {
    setActiveIndex(0);
    setProgress(0);
    pausedTimeRef.current = 0;
    if (autoplay) {
      setIsPaused(false);
    }
  }, [autoplay]);

  // Autoplay logic with progress tracking
  useEffect(() => {
    if (!autoplay || isPaused || features.length <= 1) {
      return;
    }

    startTimeRef.current = Date.now() - pausedTimeRef.current;
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progressPercent = Math.min((elapsed / autoplayDelay) * 100, 100);
      setProgress(progressPercent);
      
      if (elapsed >= autoplayDelay) {
        nextFeature();
      }
    }, 50); // Update progress every 50ms for smooth animation

    return () => {
      clearInterval(progressInterval);
    };
  }, [autoplay, isPaused, features.length, autoplayDelay, nextFeature, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'h':
          event.preventDefault();
          previousFeature();
          break;
        case 'ArrowRight':
        case 'l':
          event.preventDefault();
          nextFeature();
          break;
        case 'Home':
          event.preventDefault();
          goToFirst();
          break;
        case 'End':
          event.preventDefault();
          goToLast();
          break;
        case ' ':
        case 'k':
          event.preventDefault();
          toggle();
          break;
        case 'r':
          event.preventDefault();
          reset();
          break;
        default:
          // Handle number keys for direct navigation
          const num = parseInt(event.key);
          if (!isNaN(num) && num >= 1 && num <= features.length) {
            event.preventDefault();
            setActiveFeature(num - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    enableKeyboardNavigation,
    nextFeature,
    previousFeature,
    goToFirst,
    goToLast,
    toggle,
    reset,
    setActiveFeature,
    features.length
  ]);

  // Pause on hover (requires external mouse event handling)
  useEffect(() => {
    if (!pauseOnHover) return;

    const handleMouseEnter = () => {
      if (!isPaused) {
        pausedTimeRef.current = Date.now() - startTimeRef.current;
        pause();
      }
    };

    const handleMouseLeave = () => {
      if (isPaused && autoplay) {
        resume();
      }
    };

    // Note: This would need to be attached to the specific container element
    // in the component that uses this hook
    return () => {
      // Cleanup handled by component
    };
  }, [pauseOnHover, isPaused, autoplay, pause, resume]);

  // Computed values
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === features.length - 1;
  const activeFeature = features[activeIndex];

  return {
    activeFeature,
    activeIndex,
    setActiveFeature,
    nextFeature,
    previousFeature,
    goToFirst,
    goToLast,
    isFirst,
    isLast,
    isPaused,
    pause,
    resume,
    toggle,
    reset,
    progress
  };
};

// Additional helper hooks

// Hook for automatic cycling through features
export const useAutoFeatures = (
  features: Feature[],
  delay: number = 3000
) => {
  return useFeatures(features, {
    autoplay: true,
    autoplayDelay: delay,
    loop: true,
    pauseOnHover: true
  });
};

// Hook for manual-only feature navigation
export const useManualFeatures = (features: Feature[]) => {
  return useFeatures(features, {
    autoplay: false,
    enableKeyboardNavigation: true
  });
};

// Hook with intersection observer for pause/resume based on visibility
export const useVisibleFeatures = (
  features: Feature[],
  options?: UseFeaturesOptions
) => {
  const [isVisible, setIsVisible] = useState(true);
  const featuresHook = useFeatures(features, options);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && options?.autoplay) {
          featuresHook.resume();
        } else {
          featuresHook.pause();
        }
      },
      { threshold: 0.5 }
    );

    // This would need to be attached to a ref in the consuming component
    return () => observer.disconnect();
  }, [featuresHook, options?.autoplay]);

  return {
    ...featuresHook,
    isVisible
  };
};

// Type exports for better TypeScript support
export type { UseFeaturesOptions, UseFeaturesReturn };